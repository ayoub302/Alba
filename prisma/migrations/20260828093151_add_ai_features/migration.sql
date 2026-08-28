-- CreateTable
CREATE TABLE "Conocimiento" (
    "id" SERIAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "subtitulo" TEXT,
    "pregunta" TEXT,
    "respuesta" TEXT NOT NULL,
    "keywords" TEXT,
    "prioridad" INTEGER NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conocimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversacion" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "clienteId" TEXT,
    "mensajes" JSONB NOT NULL,
    "resumen" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'activa',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conversacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreguntaFrecuente" (
    "id" SERIAL NOT NULL,
    "pregunta" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "vecesPreguntada" INTEGER NOT NULL DEFAULT 1,
    "ultimaVez" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respuestaSugerida" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PreguntaFrecuente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackIA" (
    "id" SERIAL NOT NULL,
    "conversacionId" TEXT,
    "mensajeId" TEXT,
    "util" BOOLEAN,
    "comentario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedbackIA_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Conocimiento_categoria_idx" ON "Conocimiento"("categoria");

-- CreateIndex
CREATE INDEX "Conocimiento_activo_idx" ON "Conocimiento"("activo");

-- CreateIndex
CREATE INDEX "Conocimiento_prioridad_idx" ON "Conocimiento"("prioridad");

-- CreateIndex
CREATE INDEX "Conversacion_sessionId_idx" ON "Conversacion"("sessionId");

-- CreateIndex
CREATE INDEX "Conversacion_clienteId_idx" ON "Conversacion"("clienteId");

-- CreateIndex
CREATE INDEX "Conversacion_estado_idx" ON "Conversacion"("estado");

-- CreateIndex
CREATE INDEX "Conversacion_createdAt_idx" ON "Conversacion"("createdAt");

-- CreateIndex
CREATE INDEX "PreguntaFrecuente_categoria_idx" ON "PreguntaFrecuente"("categoria");

-- CreateIndex
CREATE INDEX "PreguntaFrecuente_vecesPreguntada_idx" ON "PreguntaFrecuente"("vecesPreguntada");

-- CreateIndex
CREATE INDEX "FeedbackIA_conversacionId_idx" ON "FeedbackIA"("conversacionId");

-- CreateIndex
CREATE INDEX "FeedbackIA_createdAt_idx" ON "FeedbackIA"("createdAt");

-- CreateIndex
CREATE INDEX "Cita_estado_idx" ON "Cita"("estado");
