// routes/visita.js
// Endpoint PÚBLICO (sin autenticación) para registrar una visita a la web.
// En server.js: import visitaRouter from "./routes/visita.js";  app.use("/api/visita", visitaRouter);

import express from "express";
import { prisma } from "../server.js";

const router = express.Router();

// POST /api/visita  { ruta: "/" }
router.post("/", async (req, res) => {
  try {
    const ruta =
      typeof req.body?.ruta === "string" ? req.body.ruta.slice(0, 200) : "/";

    await prisma.visita.create({ data: { ruta } });

    res.status(201).json({ ok: true });
  } catch (err) {
    // No queremos que un fallo aquí rompa la navegación del usuario,
    // así que solo lo logueamos y devolvemos ok igualmente.
    console.error("❌ Error registrando visita:", err);
    res.status(200).json({ ok: false });
  }
});

export default router;
