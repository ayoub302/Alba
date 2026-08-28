// routes/admin.js
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import process from "node:process";

dotenv.config();

const router = Router();

const jwtCheck = auth({
  audience: "belleza-arabe-api",
  issuerBaseURL: "https://dev-uwowt36tx31qj7v5.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// GET /api/admin/citas
router.get("/citas", jwtCheck, async (req, res) => {
  const { fecha } = req.query;
  try {
    const citas = await prisma.cita.findMany({
      where: fecha ? { fecha } : undefined,
      orderBy: [{ fecha: "asc" }, { hora: "asc" }],
    });
    res.json(citas);
  } catch (err) {
    console.error("❌ Error en GET /api/admin/citas:", err);
    res.status(500).json({ error: "Error al listar citas" });
  }
});

// PATCH /api/admin/citas/:id/confirmar
router.patch("/citas/:id/confirmar", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
  try {
    const cita = await prisma.cita.update({
      where: { id },
      data: { estado: "confirmada" },
    });
    res.json({ ok: true, message: "Cita confirmada", cita });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Cita no encontrada" });
    }
    console.error(err);
    res.status(500).json({ error: "Error al confirmar la cita" });
  }
});

// PATCH /api/admin/citas/:id/cancelar
router.patch("/citas/:id/cancelar", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
  try {
    const cita = await prisma.cita.update({
      where: { id },
      data: { estado: "cancelada" },
    });
    res.json({ ok: true, message: "Cita cancelada", cita });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Cita no encontrada" });
    }
    console.error(err);
    res.status(500).json({ error: "Error al cancelar la cita" });
  }
});

// GET /api/admin/estadisticas
router.get("/estadisticas", jwtCheck, async (req, res) => {
  try {
    const total = await prisma.cita.count();
    const hoy = new Date().toISOString().split("T")[0];
    const hoyCount = await prisma.cita.count({ where: { fecha: hoy } });
    res.json({ total, hoy: hoyCount, fecha_actual: hoy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
});

export default router;
