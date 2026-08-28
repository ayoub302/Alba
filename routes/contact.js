// routes/contact.js
import { Router } from "express";
// 👇 IMPORTAMOS PRISMA DESDE server.js (el mismo que ya funciona)
import { prisma } from "../server.js";
import { auth } from "express-oauth2-jwt-bearer";

const router = Router();

const jwtCheck = auth({
  audience: "belleza-arabe-api",
  issuerBaseURL: "https://dev-uwowt36tx31qj7v5.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// ============================================
// MENSAJES - PÚBLICOS
// ============================================

// POST /api/contact (Enviar mensaje desde el frontend)
router.post("/", async (req, res) => {
  const { nombre, telefono, mensaje } = req.body;

  if (!nombre || !telefono || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const nuevoMensaje = await prisma.mensaje.create({
      data: {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        mensaje: mensaje.trim(),
        estado: "pendiente",
      },
    });
    res.status(201).json({
      ok: true,
      message: "Mensaje enviado correctamente",
      mensaje: nuevoMensaje,
    });
  } catch (err) {
    console.error("❌ Error al enviar mensaje:", err);
    res.status(500).json({ error: "Error al enviar el mensaje" });
  }
});

// ============================================
// MENSAJES - ADMIN (PROTEGIDOS)
// ============================================

// GET /api/contact/admin (Traer todos los mensajes)
router.get("/admin", jwtCheck, async (req, res) => {
  try {
    const mensajes = await prisma.mensaje.findMany({
      orderBy: { creado: "desc" },
    });
    res.json(mensajes);
  } catch (err) {
    console.error("❌ Error al cargar mensajes:", err);
    res.status(500).json({ error: "Error al cargar mensajes" });
  }
});

// PATCH /api/contact/:id/leer (Marcar como leído)
router.patch("/:id/leer", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.mensaje.update({
      where: { id },
      data: { estado: "leido" },
    });
    res.json({ ok: true, message: "Mensaje marcado como leído" });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Mensaje no encontrado" });
    console.error(err);
    res.status(500).json({ error: "Error al marcar como leído" });
  }
});

// DELETE /api/contact/:id (Eliminar mensaje)
router.delete("/:id", jwtCheck, async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.mensaje.delete({ where: { id } });
    res.json({ ok: true, message: "Mensaje eliminado" });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Mensaje no encontrado" });
    console.error(err);
    res.status(500).json({ error: "Error al eliminar mensaje" });
  }
});

export default router;
