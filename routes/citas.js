// routes/citas.js
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import process from "node:process";

dotenv.config();

const router = Router();

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);
const isValidTime = (time) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time);
const isValidPais = (pais) => /^[A-Z]{2}$/.test(pais);
const isValidPrefijo = (prefijo) => /^\+\d{1,4}$/.test(prefijo);

// GET /api/citas
router.get("/", async (req, res) => {
  const { fecha } = req.query;
  try {
    const citas = await prisma.cita.findMany({
      where: fecha ? { fecha } : undefined,
      orderBy: [{ fecha: "asc" }, { hora: "asc" }],
    });
    res.json(citas);
  } catch (err) {
    console.error("❌ Error en GET /api/citas:", err);
    res.status(500).json({ error: "Error al listar citas" });
  }
});

// GET /api/citas/disponibles
router.get("/disponibles", async (req, res) => {
  const { fecha } = req.query;
  if (!fecha) return res.status(400).json({ error: "Fecha requerida" });
  if (!isValidDate(fecha)) {
    return res
      .status(400)
      .json({ error: "Formato de fecha inválido (YYYY-MM-DD)" });
  }
  try {
    const citas = await prisma.cita.findMany({
      where: { fecha },
      select: { hora: true },
    });
    res.json({ ocupadas: citas.map((c) => c.hora) });
  } catch (err) {
    console.error("❌ Error en disponibilidad:", err);
    res.status(500).json({ error: "Error al consultar disponibilidad" });
  }
});

// POST /api/citas
router.post("/", async (req, res) => {
  const {
    nombre,
    telefono,
    pais,
    prefijo,
    servicio,
    precio,
    personas,
    fecha,
    hora,
    notas,
  } = req.body;

  if (
    !nombre ||
    !telefono ||
    !pais ||
    !prefijo ||
    !servicio ||
    !fecha ||
    !hora
  ) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  if (!isValidDate(fecha)) {
    return res
      .status(400)
      .json({ error: "Formato de fecha inválido (YYYY-MM-DD)" });
  }
  if (!isValidTime(hora)) {
    return res.status(400).json({ error: "Formato de hora inválido (HH:MM)" });
  }
  if (!isValidPais(pais)) {
    return res
      .status(400)
      .json({ error: "Formato de país inválido (código ISO de 2 letras)" });
  }
  if (!isValidPrefijo(prefijo)) {
    return res
      .status(400)
      .json({ error: "Formato de prefijo inválido (ej: +34)" });
  }

  const numPersonas = Number(personas) || 1;
  if (numPersonas < 1 || numPersonas > 10) {
    return res
      .status(400)
      .json({ error: "El número de personas debe estar entre 1 y 10" });
  }
  if (precio && precio < 0) {
    return res.status(400).json({ error: "El precio no puede ser negativo" });
  }

  try {
    const cita = await prisma.cita.create({
      data: {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        pais: pais.trim().toUpperCase(),
        prefijo: prefijo.trim(),
        servicio: servicio.trim(),
        precio: precio ? parseFloat(precio) : null,
        personas: numPersonas,
        fecha,
        hora,
        notas: notas?.trim() || null,
        estado: "pendiente",
      },
    });
    console.log("✅ Cita guardada:", cita);
    res.status(201).json(cita);
  } catch (err) {
    console.error("❌ ERROR EN POST /api/citas:", err);
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Esa hora ya está reservada" });
    }
    res.status(500).json({ error: "Error al guardar la cita" });
  }
});

export default router;
