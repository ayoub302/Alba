// routes/ai.js
import express from "express";
import process from "node:process";
import { prisma } from "../server.js";

const router = express.Router();

// Modelo principal: se puede sobreescribir con la variable de entorno OPENROUTER_MODEL
// Lista completa y actualizada siempre en: https://openrouter.ai/models?max_price=0
const MODELO_PRINCIPAL =
  process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001";

const MODELOS_FALLBACK = [
  "mistralai/mistral-7b-instruct",
  "meta-llama/llama-3.2-3b-instruct",
  "qwen/qwen-2.5-7b-instruct",
  "deepseek/deepseek-chat",
];

async function buscarConocimiento(pregunta) {
  const resultados = await prisma.conocimiento.findMany({
    where: {
      activo: true,
      OR: [
        { pregunta: { contains: pregunta, mode: "insensitive" } },
        { keywords: { contains: pregunta, mode: "insensitive" } },
      ],
    },
    orderBy: { prioridad: "desc" },
    take: 5,
  });
  return resultados;
}

async function llamarOpenRouter(modelo, contexto, historial, message) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://alba-pied-eight.vercel.app",
        "X-Title": "Alba Estética",
      },
      body: JSON.stringify({
        model: modelo,
        messages: [
          { role: "system", content: contexto },
          ...historial.map((h) => ({
            role: h.role === "user" ? "user" : "assistant",
            content: h.content,
          })),
          { role: "user", content: message },
        ],
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error?.message || "Error en OpenRouter");
    err.data = data;
    err.status = response.status;
    throw err;
  }

  return data;
}

router.post("/chat", async (req, res) => {
  try {
    const { message, historial = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensaje requerido" });
    }

    const conocimientos = await buscarConocimiento(message);

    let contexto = `Eres "Alba", asesora de belleza de la peluquería "Alba Estética".\n\n`;
    contexto += `INFORMACIÓN:\n`;
    conocimientos.forEach((k) => {
      contexto += `- ${k.pregunta || k.subtitulo}: ${k.respuesta}\n`;
    });

    // Intenta con el modelo principal, y si falla prueba con los de respaldo
    const modelosAProbar = [MODELO_PRINCIPAL, ...MODELOS_FALLBACK];
    let data;
    let ultimoError;

    for (const modelo of modelosAProbar) {
      try {
        console.log(`🔄 Intentando con modelo: ${modelo}`);
        data = await llamarOpenRouter(modelo, contexto, historial, message);
        console.log(`✅ Modelo funcionó: ${modelo}`);
        break;
      } catch (err) {
        console.error(`❌ Error con modelo "${modelo}":`, err.message);
        ultimoError = err;
      }
    }

    if (!data) {
      throw ultimoError || new Error("Ningún modelo de OpenRouter respondió");
    }

    const respuesta =
      data.choices?.[0]?.message?.content ||
      data.choices?.[0]?.message?.reasoning ||
      "Lo siento, no pude procesar tu pregunta.";

    res.json({ respuesta });
  } catch (error) {
    console.error("❌ Error en AI chat:", error);
    res.status(500).json({
      error: "Error al procesar tu mensaje",
      respuesta:
        "Lo siento, estoy teniendo problemas. ¿Quieres contactar con la peluquería directamente? 📞",
    });
  }
});

router.get("/preguntas-sugeridas", async (req, res) => {
  try {
    const preguntas = await prisma.conocimiento.findMany({
      where: {
        activo: true,
        pregunta: { not: null },
      },
      select: {
        pregunta: true,
        categoria: true,
        prioridad: true,
      },
      orderBy: { prioridad: "desc" },
      take: 6,
    });
    res.json(preguntas);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error al cargar sugerencias" });
  }
});

export default router;
