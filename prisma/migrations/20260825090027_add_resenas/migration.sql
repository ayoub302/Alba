-- CreateTable
CREATE TABLE "Resena" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "creado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publicado" TIMESTAMP(3),

    CONSTRAINT "Resena_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Resena_estado_idx" ON "Resena"("estado");

-- CreateIndex
CREATE INDEX "Resena_creado_idx" ON "Resena"("creado");
