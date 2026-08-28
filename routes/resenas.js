// routes/resenas.js
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import process from "node:process";

dotenv.config();

const router = Router();

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const jwtCheck = auth({
  audience: "belleza-arabe-api",
  issuerBaseURL: "https://dev-uwowt36tx31qj7v5.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// ============================================
// PÚBLICO: GET /api/resenas (solo publicadas)
// ============================================
router.get("/", async (req, res) => {
  try {
    const resenas = await prisma.resena.findMany({
      where: { estado: "publicada" },
      orderBy: { publicado: "desc" },
      select: {
        id: true,
        nombre: true,
        mensaje: true,
        rating: true,
        publicado: true,
      },
    });
    res.json(resenas);
  } catch (err) {
    console.error("❌ Error en GET /api/resenas:", err);
    res.status(500).json({ error: "Error al cargar reseñas" });
  }
});

// ============================================
// PÚBLICO: POST /api/resenas (crear reseña)
// ============================================
router.post("/", async (req, res) => {
  const { nombre, mensaje, rating } = req.body;

  if (!nombre || !mensaje || !rating) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating debe ser entre 1 y 5" });
  }

  if (mensaje.length > 500) {
    return res
      .status(400)
      .json({ error: "El mensaje no puede superar los 500 caracteres" });
  }

  try {
    const resena = await prisma.resena.create({
      data: {
        nombre: nombre.trim(),
        mensaje: mensaje.trim(),
        rating: Number(rating),
        estado: "pendiente",
      },
    });
    console.log("✅ Reseña guardada:", resena);
    res.status(201).json({ ok: true, message: "Reseña enviada correctamente" });
  } catch (err) {
    console.error("❌ Error en POST /api/resenas:", err);
    res.status(500).json({ error: "Error al guardar la reseña" });
  }
});

// ============================================
// ADMIN: GET /api/admin/resenas (todas, para moderar)
// ============================================
router.get("/admin/resenas", jwtCheck, async (req, res) => {
  try {
    const resenas = await prisma.resena.findMany({
      orderBy: { creado: "desc" },
    });
    res.json(resenas);
  } catch (err) {
    console.error("❌ Error en GET /api/admin/resenas:", err);
    res.status(500).json({ error: "Error al cargar reseñas" });
  }
});

// ============================================
// ADMIN: PATCH /api/admin/resenas/:id/publicar
// ============================================
router.patch("/admin/resenas/:id/publicar", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const resena = await prisma.resena.update({
      where: { id },
      data: {
        estado: "publicada",
        publicado: new Date(),
      },
    });
    res.json({ ok: true, message: "Reseña publicada", resena });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }
    console.error(err);
    res.status(500).json({ error: "Error al publicar la reseña" });
  }
});

// ============================================
// ADMIN: PATCH /api/admin/resenas/:id/rechazar
// ============================================
router.patch("/admin/resenas/:id/rechazar", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const resena = await prisma.resena.update({
      where: { id },
      data: { estado: "rechazada" },
    });
    res.json({ ok: true, message: "Reseña rechazada", resena });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }
    console.error(err);
    res.status(500).json({ error: "Error al rechazar la reseña" });
  }
});

// ============================================
// ADMIN: DELETE /api/admin/resenas/:id (eliminar definitivo)
// ============================================
router.delete("/admin/resenas/:id", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    await prisma.resena.delete({ where: { id } });
    res.json({ ok: true, message: "Reseña eliminada" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }
    console.error(err);
    res.status(500).json({ error: "Error al eliminar la reseña" });
  }
});

export default router;
