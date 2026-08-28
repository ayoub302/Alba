-- CreateTable
CREATE TABLE "Visita" (
    "id" SERIAL NOT NULL,
    "ruta" TEXT NOT NULL DEFAULT '/',
    "creado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visita_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Visita_creado_idx" ON "Visita"("creado");
