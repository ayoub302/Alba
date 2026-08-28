// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import process from "node:process";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "express-oauth2-jwt-bearer";
import contactRouter from "./routes/contact.js";
// 👇 IMPORTAMOS LAS RUTAS DE ANALYTICS
import visitaRouter from "./routes/visita.js";
import analyticsRouter from "./routes/analytics.js";
// 👇 IMPORTAMOS LA RUTA DE IA
import aiRouter from "./routes/ai.js";

dotenv.config();

const app = express();
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// 👇 EXPORTAMOS PRISMA PARA QUE LO USEN LAS RUTAS
export { prisma };

// ============================================
// AUTH0
// ============================================
const jwtCheck = auth({
  audience: "belleza-arabe-api",
  issuerBaseURL: "https://dev-uwowt36tx31qj7v5.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// ============================================
// MIDDLEWARE
// ============================================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://alba-pied-eight.vercel.app",
      "https://alba.onrender.com",
    ],
    credentials: true,
  }),
);
app.use(express.json());

// ============================================
// RUTAS DE CONTACTO
// ============================================
app.use("/api/contact", contactRouter);

// ============================================
// RUTAS DE ANALYTICS
// ============================================
// Ruta PÚBLICA para registrar visitas (sin autenticación)
app.use("/api/visita", visitaRouter);
// Ruta PROTEGIDA para consultar analytics (requiere Auth0)
app.use("/api/admin/analytics", jwtCheck, analyticsRouter);

// ============================================
// RUTA DE IA (PÚBLICA)
// ============================================
app.use("/api/ai", aiRouter);

// ============================================
// CITAS - PÚBLICAS
// ============================================

// GET /api/citas
app.get("/api/citas", async (req, res) => {
  const { fecha } = req.query;
  try {
    const citas = await prisma.cita.findMany({
      where: fecha ? { fecha } : undefined,
      orderBy: [{ fecha: "asc" }, { hora: "asc" }],
    });
    res.json(citas);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Error al listar citas" });
  }
});

// GET /api/citas/disponibles
app.get("/api/citas/disponibles", async (req, res) => {
  const { fecha } = req.query;
  if (!fecha) return res.status(400).json({ error: "Fecha requerida" });
  try {
    const citas = await prisma.cita.findMany({
      where: { fecha },
      select: { hora: true },
    });
    res.json({ ocupadas: citas.map((c) => c.hora) });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Error al consultar disponibilidad" });
  }
});

// POST /api/citas
app.post("/api/citas", async (req, res) => {
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

  try {
    const cita = await prisma.cita.create({
      data: {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        pais: pais.trim().toUpperCase(),
        prefijo: prefijo.trim(),
        servicio: servicio.trim(),
        precio: precio ? parseFloat(precio) : null,
        personas: Number(personas) || 1,
        fecha,
        hora,
        notas: notas?.trim() || null,
        estado: "pendiente",
      },
    });
    console.log("✅ Cita guardada:", cita);
    res.status(201).json(cita);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Esa hora ya está reservada" });
    }
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Error al guardar la cita" });
  }
});

// ============================================
// CITAS - ADMIN (PROTEGIDAS)
// ============================================

// GET /api/admin/citas
app.get("/api/admin/citas", jwtCheck, async (req, res) => {
  const { fecha } = req.query;
  try {
    const citas = await prisma.cita.findMany({
      where: fecha ? { fecha } : undefined,
      orderBy: [{ fecha: "asc" }, { hora: "asc" }],
    });
    res.json(citas);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Error al listar citas" });
  }
});

// PATCH /api/admin/citas/:id/confirmar
app.patch("/api/admin/citas/:id/confirmar", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const cita = await prisma.cita.update({
      where: { id },
      data: { estado: "confirmada" },
    });
    res.json({ ok: true, message: "Cita confirmada", cita });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Cita no encontrada" });
    console.error(err);
    res.status(500).json({ error: "Error al confirmar" });
  }
});

// PATCH /api/admin/citas/:id/cancelar
app.patch("/api/admin/citas/:id/cancelar", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const cita = await prisma.cita.update({
      where: { id },
      data: { estado: "cancelada" },
    });
    res.json({ ok: true, message: "Cita cancelada", cita });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Cita no encontrada" });
    console.error(err);
    res.status(500).json({ error: "Error al cancelar" });
  }
});

// GET /api/admin/estadisticas
app.get("/api/admin/estadisticas", jwtCheck, async (req, res) => {
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

// ============================================
// RESEÑAS - PÚBLICAS
// ============================================

// GET /api/resenas
app.get("/api/resenas", async (req, res) => {
  try {
    const resenas = await prisma.resena.findMany({
      where: { estado: "publicada" },
      orderBy: { publicado: "desc" },
    });
    res.json(resenas);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Error al cargar reseñas" });
  }
});

// POST /api/resenas
app.post("/api/resenas", async (req, res) => {
  const { nombre, mensaje, rating } = req.body;

  console.log("📝 Body:", { nombre, mensaje, rating });

  if (!nombre || !mensaje || !rating) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating debe ser entre 1 y 5" });
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
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Error al guardar la reseña" });
  }
});

// ============================================
// RESEÑAS - ADMIN (PROTEGIDAS)
// ============================================

// GET /api/admin/resenas
app.get("/api/admin/resenas", jwtCheck, async (req, res) => {
  try {
    const resenas = await prisma.resena.findMany({
      orderBy: { creado: "desc" },
    });
    res.json(resenas);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Error al cargar reseñas" });
  }
});

// PATCH /api/admin/resenas/:id/publicar
app.patch("/api/admin/resenas/:id/publicar", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const resena = await prisma.resena.update({
      where: { id },
      data: { estado: "publicada", publicado: new Date() },
    });
    res.json({ ok: true, message: "Reseña publicada", resena });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Reseña no encontrada" });
    console.error(err);
    res.status(500).json({ error: "Error al publicar" });
  }
});

// PATCH /api/admin/resenas/:id/rechazar
app.patch("/api/admin/resenas/:id/rechazar", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.resena.update({
      where: { id },
      data: { estado: "rechazada" },
    });
    res.json({ ok: true, message: "Reseña rechazada" });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Reseña no encontrada" });
    console.error(err);
    res.status(500).json({ error: "Error al rechazar" });
  }
});

// DELETE /api/admin/resenas/:id
app.delete("/api/admin/resenas/:id", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.resena.delete({ where: { id } });
    res.json({ ok: true, message: "Reseña eliminada" });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Reseña no encontrada" });
    console.error(err);
    res.status(500).json({ error: "Error al eliminar" });
  }
});

// ============================================
// ARRANCA EL SERVIDOR
// ============================================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
  console.log(`   🔓 Públicas:`);
  console.log(`      GET  /api/citas`);
  console.log(`      GET  /api/citas/disponibles`);
  console.log(`      POST /api/citas`);
  console.log(`      GET  /api/resenas`);
  console.log(`      POST /api/resenas`);
  console.log(`      POST /api/contact`);
  console.log(`      POST /api/visita        ✅ NUEVA`);
  console.log(`      POST /api/ai/chat       ✅ IA ASISTENTE`);
  console.log(`      GET  /api/ai/preguntas-sugeridas  ✅ IA SUGERENCIAS`);
  console.log(`   🔒 Admin (requiere Auth0):`);
  console.log(`      GET  /api/admin/citas`);
  console.log(`      PATCH /api/admin/citas/:id/confirmar`);
  console.log(`      PATCH /api/admin/citas/:id/cancelar`);
  console.log(`      GET  /api/admin/estadisticas`);
  console.log(`      GET  /api/admin/resenas`);
  console.log(`      PATCH /api/admin/resenas/:id/publicar`);
  console.log(`      PATCH /api/admin/resenas/:id/rechazar`);
  console.log(`      DELETE /api/admin/resenas/:id`);
  console.log(`      GET  /api/contact/admin`);
  console.log(`      PATCH /api/contact/:id/leer`);
  console.log(`      DELETE /api/contact/:id`);
  console.log(`      GET  /api/admin/analytics/semanal  ✅ NUEVA`);
});
