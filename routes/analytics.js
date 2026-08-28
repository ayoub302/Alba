// routes/analytics.js
// Endpoint PROTEGIDO. En server.js:
//   import analyticsRouter from "./routes/analytics.js";
//   app.use("/api/admin/analytics", jwtCheck, analyticsRouter);
// (jwtCheck es el mismo middleware que ya usas en /api/admin/citas)

import express from "express";
import { prisma } from "../server.js";

const router = express.Router();

function lunesDeLaSemana(fecha) {
  const d = new Date(fecha);
  const dia = d.getDay(); // 0 = domingo ... 6 = sábado
  const diff = d.getDate() - dia + (dia === 0 ? -6 : 1);
  const lunes = new Date(d.setDate(diff));
  lunes.setHours(0, 0, 0, 0);
  return lunes;
}

function isoFecha(date) {
  return date.toISOString().split("T")[0];
}

// GET /api/admin/analytics/semanal?desde=YYYY-MM-DD
// "desde" es cualquier fecha dentro de la semana que quieres consultar (por defecto: hoy).
router.get("/semanal", async (req, res) => {
  try {
    const base = req.query.desde ? new Date(req.query.desde) : new Date();
    const inicio = lunesDeLaSemana(base);
    const fin = new Date(inicio);
    fin.setDate(fin.getDate() + 7); // exclusivo (siguiente lunes)

    const [visitas, citasSemana, resenasSemana, mensajesSemana] =
      await Promise.all([
        prisma.visita.findMany({
          where: { creado: { gte: inicio, lt: fin } },
          select: { creado: true },
        }),
        prisma.cita.findMany({
          where: { creado: { gte: inicio, lt: fin } },
          select: { creado: true, estado: true },
        }),
        prisma.resena.findMany({
          where: { creado: { gte: inicio, lt: fin } },
          select: { creado: true, estado: true },
        }),
        prisma.mensaje.findMany({
          where: { creado: { gte: inicio, lt: fin } },
          select: { creado: true },
        }),
      ]);

    // Desglose día a día (lunes a domingo)
    const porDia = [];
    for (let i = 0; i < 7; i++) {
      const dia = new Date(inicio);
      dia.setDate(dia.getDate() + i);
      const diaISO = isoFecha(dia);

      const visitasDia = visitas.filter(
        (v) => isoFecha(v.creado) === diaISO,
      ).length;
      const citasDia = citasSemana.filter(
        (c) => isoFecha(c.creado) === diaISO,
      ).length;

      porDia.push({ fecha: diaISO, visitas: visitasDia, citas: citasDia });
    }

    const citasConfirmadas = citasSemana.filter(
      (c) => c.estado === "confirmada",
    ).length;
    const citasCanceladas = citasSemana.filter(
      (c) => c.estado === "cancelada",
    ).length;
    const resenasPublicadas = resenasSemana.filter(
      (r) => r.estado === "publicada",
    ).length;

    const tasaConversion =
      visitas.length > 0
        ? Math.round((citasSemana.length / visitas.length) * 1000) / 10
        : 0;

    res.json({
      semana: {
        desde: isoFecha(inicio),
        hasta: isoFecha(new Date(fin.getTime() - 86400000)),
      },
      resumen: {
        visitas: visitas.length,
        citasNuevas: citasSemana.length,
        citasConfirmadas,
        citasCanceladas,
        resenasNuevas: resenasSemana.length,
        resenasPublicadas,
        mensajesNuevos: mensajesSemana.length,
        tasaConversion,
      },
      porDia,
    });
  } catch (err) {
    console.error("❌ Error generando análisis semanal:", err);
    res.status(500).json({ error: "Error al generar el análisis" });
  }
});

export default router;
