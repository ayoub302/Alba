// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import process from "node:process";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Sembrando base de conocimiento...");

  // Limpiar datos existentes
  await prisma.conocimiento.deleteMany({});
  console.log("🧹 Datos anteriores eliminados");

  const conocimientos = [
    // ============================================
    // SERVICIOS - CORTES
    // ============================================
    {
      categoria: "servicios",
      subtitulo: "cortes",
      pregunta: "¿Qué tipos de corte ofrecen?",
      respuesta: `✂️ **Tipos de corte que ofrecemos:**

**Corte Clásico** (25-30€) - Corte tradicional y pulcro
**Corte Moderno** (30-35€) - Tendencias actuales con textura
**Corte Degradado** (35-40€) - Degradado perfecto con técnica profesional
**Corte Largo** (40-45€) - Para cabellos largos con capas y movimiento
**Corte Infantil** (20€) - Para niños hasta 12 años

⏱️ **Duración:** 30-60 minutos
💇‍♀️ **Incluye:** Lavado, corte y peinado básico

📌 **Recomendación:** Consulta previa para elegir el estilo perfecto para ti.`,
      keywords: "corte cabello tipos precio duración infantil",
      prioridad: 10,
      activo: true,
    },
    {
      categoria: "servicios",
      subtitulo: "cortes",
      pregunta: "¿Cuánto dura un corte de cabello?",
      respuesta: `⏱️ **Duración de los cortes:**

- **Corte básico:** 30-40 minutos
- **Corte con lavado:** 40-50 minutos
- **Corte con peinado:** 50-60 minutos
- **Corte complejo (degradado, capas):** 45-60 minutos

💡 **Consejo:** Reserva con 15 minutos de margen para no tener prisa.`,
      keywords: "duración tiempo corte minutos",
      prioridad: 8,
      activo: true,
    },
    {
      categoria: "servicios",
      subtitulo: "cortes",
      pregunta: "¿Qué corte me recomiendan para cabello fino?",
      respuesta: `💇‍♀️ **Cortes recomendados para cabello fino:**

**Los mejores cortes:**
- **Bob texturizado** - Aporta volumen y movimiento
- **Pixie corto** - Da cuerpo y facilidad de peinado
- **Capas largas** - Crea ilusión de densidad

**Qué evitar:**
- ❌ Cortes muy largos sin capas (aplastan)
- ❌ Corte recto y pesado (sin movimiento)
- ❌ Demasiadas capas (puede debilitar)

**Trucos para dar volumen:**
- 💨 Secar con la cabeza hacia abajo
- 🌊 Usar mousse voluminizador
- 🌀 Peinar con cepillo redondo

💡 **Nuestros estilistas** te asesorarán con el corte perfecto.`,
      keywords: "cabello fino volumen densidad",
      prioridad: 7,
      activo: true,
    },

    // ============================================
    // SERVICIOS - TINTES Y COLORACIÓN
    // ============================================
    {
      categoria: "servicios",
      subtitulo: "tintes",
      pregunta: "¿Cuánto cuesta un tinte completo?",
      respuesta: `🎨 **Precios de coloración:**

**Tinte completo** (60-80€) - Coloración total del cabello
**Reflejos / Mechas** (70-90€) - Iluminación natural
**Balayage / Ombré** (80-100€) - Efecto degradado sun-kissed
**Color fantasía** (70-90€) - Colores vibrantes (rosa, azul, morado...)
**Retoque de raíz** (40-50€) - Mantenimiento de raíz

⏱️ **Duración:** 1.5 - 2.5 horas
💆‍♀️ **Incluye:** Consulta, coloración, lavado y peinado

🔬 **Marcas:** L'Oréal, Wella, Schwarzkopf - calidad profesional garantizada.

💡 **Pack especial:** Tinte + Corte + Tratamiento por 100€ (ahorro 15€)`,
      keywords: "tinte color mechas balayage precio fantasía",
      prioridad: 10,
      activo: true,
    },
    {
      categoria: "servicios",
      subtitulo: "tintes",
      pregunta: "¿Qué tono de tinte me recomiendan para cabello oscuro?",
      respuesta: `🌟 **Recomendaciones para cabello oscuro:**

**Para un cambio sutil:**
- **Reflejos miel** - Aporta calidez sin mucho mantenimiento
- **Caramelo** - Ilumina el rostro de forma natural

**Para cambio drástico:**
- **Rubio ceniza** - Proceso gradual para evitar daño
- **Cobre** - Tonos rojizos que favorecen mucho

**Tips importantes:**
1️⃣ El proceso para aclarar cabello oscuro requiere 2-3 sesiones
2️⃣ Usamos productos con protección para minimizar daño
3️⃣ Recomendamos tratamientos de hidratación post-coloración

📅 **Precio:** 80-100€ dependiendo del proceso
⏱️ **Duración:** 2-3 horas por sesión

💡 **Ven a consulta** para ver muestras de colores y decidir juntas.`,
      keywords: "cabello oscuro tinte recomendación color",
      prioridad: 9,
      activo: true,
    },
    {
      categoria: "servicios",
      subtitulo: "tintes",
      pregunta: "¿Cuánto dura el tinte en el cabello?",
      respuesta: `⏳ **Duración del tinte según tipo:**

**Tinte permanente:**
- Duración: 4-6 semanas
- Cobertura total de canas
- No se va con los lavados

**Tinte semi-permanente:**
- Duración: 4-8 lavados
- Sin amoníaco, menos agresivo
- Ideal para probar colores

**Reflejos/Mechas:**
- Duración: 6-8 semanas
- Crecimiento natural más disimulado
- Menos mantenimiento

**Factores que afectan la duración:**
- 🧴 Frecuencia de lavado
- 🌡️ Temperatura del agua
- ☀️ Exposición al sol
- 🏊 Cloro y agua de mar

💡 **Consejo:** Usa champú para cabello teñido y agua fría para mantener el color.`,
      keywords: "duración tinte lavados mantenimiento",
      prioridad: 8,
      activo: true,
    },

    // ============================================
    // SERVICIOS - TRATAMIENTOS
    // ============================================
    {
      categoria: "servicios",
      subtitulo: "tratamientos",
      pregunta: "¿Qué tratamientos capilares ofrecen?",
      respuesta: `💆‍♀️ **Tratamientos profesionales:**

**Hidratación Profunda** (35-45€) - Reparación intensiva para cabello seco
**Keratinización** (60-80€) - Alisado y reparación de la fibra capilar
**Tratamiento Anti-caída** (40-50€) - Fortalecimiento y estimulación
**Botox Capilar** (50-70€) - Nutrición profunda y brillo
**Olaplex** (45-60€) - Reparación de enlaces para cabello dañado
**Tratamiento de brillo** (30-40€) - Brillo extra y suavidad

⏱️ **Duración:** 45 minutos - 2 horas

✨ **Resultados:** Cabello más sano, fuerte y brillante desde la primera sesión.

💡 **Recomendación:** 1 sesión al mes para mantener resultados óptimos.

🎁 **Pack de 3 tratamientos:** Paga 2 y llévate 3 (ahorro 30%)`,
      keywords: "tratamiento hidratación keratina caída botox olaplex",
      prioridad: 9,
      activo: true,
    },
    {
      categoria: "servicios",
      subtitulo: "tratamientos",
      pregunta: "¿Qué es el tratamiento Olaplex y para qué sirve?",
      respuesta: `💎 **Tratamiento Olaplex - Reparación capilar avanzada:**

**¿Qué es?**
Es un tratamiento que repara los enlaces rotos del cabello, devolviéndole su fuerza y elasticidad natural.

**¿Para qué sirve?**
- 🔧 Repara cabello dañado por coloraciones
- 💪 Fortalece cabello frágil y quebradizo
- ✨ Aporta brillo y suavidad
- 🛡️ Protege contra futuros daños

**Proceso:**
1️⃣ Aplicación del producto en cabello húmedo
2️⃣ Tiempo de acción: 20-30 minutos
3️⃣ Lavado y acondicionado

**Precio:** 45-60€
**Duración:** 45-60 minutos

💡 **Ideal para:** Cabello teñido, decolorado o muy dañado.
🌟 **Resultado:** Cabello renovado y más manejable.`,
      keywords: "olaplex reparación daño enlaces",
      prioridad: 8,
      activo: true,
    },

    // ============================================
    // PRODUCTOS
    // ============================================
    {
      categoria: "productos",
      subtitulo: "marcas",
      pregunta: "¿Qué marcas de productos usan en la peluquería?",
      respuesta: `🏆 **Marcas profesionales que utilizamos:**

**Coloración:**
- 💜 L'Oréal Professionnel - Excelente cobertura y duración
- 💛 Wella - Tonos naturales y brillo intenso
- 🖤 Schwarzkopf - Calidad profesional alemana

**Tratamientos:**
- 💚 Olaplex - Reparación capilar número 1
- 💙 Moroccanoil - Aceite de argán para nutrición
- ❤️ Redken - Cuidado diario profesional
- 💎 Kérastase - Tratamientos de lujo

**Cuidado diario:**
- 🌿 Davines - Productos naturales italianos
- 🌸 Oribe - Alta gama con ingredientes premium

✅ **Todos los productos** están testados dermatológicamente.
✅ **Sin parabenos** ni sales agresivas.

🛍️ **Disponibles para compra** en nuestra tienda física.`,
      keywords: "marcas productos loreal wella olaplex kerastase",
      prioridad: 8,
      activo: true,
    },
    {
      categoria: "productos",
      subtitulo: "recomendaciones",
      pregunta: "¿Qué champú me recomiendan para mi tipo de cabello?",
      respuesta: `🧴 **Recomendaciones de champú según tu tipo de cabello:**

**Cabello graso:**
- Shampú equilibrante de Redken
- Con arcilla y limón para control de sebo

**Cabello seco:**
- Shampú hidratante de Moroccanoil
- Con aceite de argán y vitamina E

**Cabello teñido:**
- Shampú para cabello teñido de L'Oréal
- Sin sulfatos, protege el color

**Cabello rizado:**
- Shampú definidor de Davines
- Con ingredientes naturales que definen los rizos

**Cabello fino:**
- Shampú voluminizador de Oribe
- Aporta cuerpo sin apelmazar

💡 **Consejo:** Aplica la mascarilla 2 veces por semana para mejores resultados.

🛍️ **Disponible en tienda:** Todos estos productos los tenemos en la peluquería.`,
      keywords: "champú shampoo recomendación tipo cabello",
      prioridad: 7,
      activo: true,
    },

    // ============================================
    // CONSEJOS POR TIPO DE CABELLO
    // ============================================
    {
      categoria: "consejos",
      subtitulo: "cabello_rizado",
      pregunta: "¿Cómo cuidar mi cabello rizado correctamente?",
      respuesta: `🌀 **Guía completa para cabello rizado:**

**Lavado (1-2 veces por semana):**
- Shampú sin sulfatos que respete el rizo
- Acondicionador con mucha hidratación

**Peinado (siempre en húmedo):**
- Usa peine de dientes anchos
- Nunca cepilles en seco (rompe el rizo)
- Aplica crema de peinado para definir

**Secado:**
- Al natural o con difusor a baja temperatura
- No frotes con toalla, mejor presiona suavemente

**Noche:**
- Usa funda de satén para evitar fricción
- Recoge con scrunchie, nunca con goma elástica

**Productos recomendados:**
- 🌿 Crema de peinado Davines
- 💧 Gel definidor para rizos
- 🌸 Aceite para sellar la hidratación

✨ **Mantén tus rizos definidos, hidratados y sin encrespamiento.**`,
      keywords: "rizado rizos cuidado definición crema",
      prioridad: 9,
      activo: true,
    },
    {
      categoria: "consejos",
      subtitulo: "cabello_graso",
      pregunta: "¿Cómo controlar el cabello graso?",
      respuesta: `🌟 **Control del cabello graso:**

**Lavado correcto:**
- Lava solo las raíces, no medios y puntas
- Usa agua tibia, el agua caliente activa las glándulas sebáceas
- Aclara con agua fría para cerrar poros

**Frecuencia:**
- Cada 2-3 días como máximo
- Lavar a diario empeora el problema

**Productos específicos:**
- Shampú equilibrante para cabello graso
- Evita acondicionador en raíces
- Mascarilla detox 1 vez al mes

**Hábitos:**
- No toques constantemente el cabello
- Cepilla solo lo necesario (distribuye grasa)
- Cambia la funda de almohada semanalmente

⚠️ **Evita:** Shampús muy agresivos que irritan el cuero cabelludo y producen más grasa.`,
      keywords: "graso sebo control limpieza",
      prioridad: 7,
      activo: true,
    },
    {
      categoria: "consejos",
      subtitulo: "cabello_seco",
      pregunta: "¿Cómo hidratar el cabello seco?",
      respuesta: `💧 **Recuperación para cabello seco:**

**Hidratación profunda:**
- Mascarilla hidratante 2 veces por semana
- Deja actuar 20-30 minutos con calor (gorro térmico)
- Aceite de coco o argán pre-lavado

**Lavado:**
- Shampú hidratante sin sulfatos
- Acondicionador rico siempre (sí o sí)
- Agua filtrada (la cal reseca el cabello)

**Peinado:**
- Protector térmico antes de cualquier calor
- Reduce el uso de secador y plancha
- Corta puntas cada 2-3 meses

**Productos recomendados:**
- 🥥 Aceite de argán Moroccanoil
- 💧 Mascarilla hidratante L'Oréal
- 🌿 Spray de protección térmica

✨ **Resultado:** Cabello suave, brillante y manejable.

💡 **Tratamiento profesional:** Recomendamos tratamiento de hidratación profunda en la peluquería (35€).`,
      keywords: "seco hidratación puntas abiertas",
      prioridad: 7,
      activo: true,
    },

    // ============================================
    // CUIDADOS POST-SERVICIO
    // ============================================
    {
      categoria: "consejos",
      subtitulo: "post_servicio",
      pregunta: "¿Cómo cuidar el cabello después de un tinte?",
      respuesta: `🌈 **Cuidados post-tinte:**

**Primera semana:**
- 🚿 Espera 48-72h antes del primer lavado
- 🌡️ Usa agua fría/tibia (el calor abre la cutícula)
- 🧴 Shampú específico para cabello teñido

**Mantenimiento:**
- ⏰ Espaciar lavados (2-3 veces por semana)
- 💆‍♀️ Mascarilla semanal para hidratar
- 🛡️ Protector solar capilar (UV daña el color)

**Productos:**
- L'Oréal Vitamin Color (protege el color)
- Olaplex (repara y mantiene brillo)

**Evita:**
- 🏊 Piscinas (cloro) y playa (sal) las primeras 2 semanas
- 🌬️ Secado con calor alto
- ✂️ Cortar el cabello 2 semanas después

🎯 **Resultado:** Color duradero y brillante hasta 8 semanas.`,
      keywords: "post tinte cuidados lavado mantenimiento color",
      prioridad: 9,
      activo: true,
    },
    {
      categoria: "consejos",
      subtitulo: "post_servicio",
      pregunta: "¿Cómo mantener el cabello liso después de un alisado?",
      respuesta: `✨ **Mantenimiento de cabello alisado:**

**Primeras 72h:**
- 🚫 No mojes el cabello
- 🚫 No uses coleteros ni horquillas
- 🚫 No te metas el cabello detrás de las orejas
- 🛌 Duerme con el cabello suelto

**Mantenimiento:**
- 🧴 Shampú sin sulfatos (conserva el alisado)
- 💧 Acondicionador ligero (no apelmaza)
- 🛡️ Protector térmico SIEMPRE

**Frecuencia de alisado:**
- Alisado con keratina: cada 3-4 meses
- Alisado japonés: cada 6-8 meses
- Botox capilar: cada 2-3 meses

**Productos recomendados:**
- 🌿 Shampú hidratante Wella
- 💧 Aceite de argán para brillo
- 🛡️ Spray protector térmico

💡 **Consejo:** Usa mascarilla hidratante 1 vez por semana para mantener el cabello sano.`,
      keywords: "alisado keratina mantenimiento liso",
      prioridad: 8,
      activo: true,
    },

    // ============================================
    // PREGUNTAS FRECUENTES - GENERALES
    // ============================================
    {
      categoria: "preguntas_frecuentes",
      subtitulo: "horario",
      pregunta: "¿Cuál es el horario de atención?",
      respuesta: `🕐 **Horario de atención al público:**

📅 **Lunes a Viernes:** 9:00 - 20:00
📅 **Sábados:** 9:00 - 15:00
📅 **Domingos:** Cerrado

📍 **Dirección:** Calle Principal #123, Tu Ciudad
📞 **Teléfono:** +34 123 456 789
📧 **Email:** info@albaestetica.com

💡 **Recomendación:** Reserva con 24-48h de anticipación para asegurar tu hora.

🌐 **Reserva online:** Disponible en nuestra web 24/7.`,
      keywords: "horario abierto cerrar sábado domingo",
      prioridad: 10,
      activo: true,
    },
    {
      categoria: "preguntas_frecuentes",
      subtitulo: "sin_cita",
      pregunta: "¿Puedo venir sin cita previa?",
      respuesta: `⏰ **Atención sin cita previa:**

✅ **Sí, aceptamos clientes sin cita,** siempre que haya disponibilidad.

**Mejores días para venir sin cita:**
- 📅 **Lunes a Miércoles:** Mayor disponibilidad
- 📅 **Jueves y Viernes:** Aceptamos pero con espera
- 📅 **Sábados:** Recomendamos reservar con antelación

**Servicios rápidos sin cita:**
- ✂️ Corte básico (30-45 min)
- 💇‍♀️ Lavado y peinado (30 min)
- 💆‍♀️ Tratamiento exprés (30 min)

**Servicios que necesitan cita:**
- 🎨 Tintes y coloraciones (1.5-2.5h)
- 💆‍♀️ Tratamientos profundos (+1h)
- ✨ Alisados y keratina (+2h)

📱 **Reserva en:** www.albaestetica.com/reservas
📞 **Llama al:** +34 123 456 789`,
      keywords: "sin cita disponible urgencia espera",
      prioridad: 9,
      activo: true,
    },
    {
      categoria: "preguntas_frecuentes",
      subtitulo: "precios",
      pregunta: "¿Cuánto cuesta un servicio en la peluquería?",
      respuesta: `💰 **Guía de precios aproximados:**

**Cortes:**
- ✂️ Corte básico: 25-30€
- ✂️ Corte con lavado: 30-35€
- ✂️ Corte con peinado: 35-40€

**Coloración:**
- 🎨 Tinte completo: 60-80€
- 🎨 Reflejos/Mechas: 70-90€
- 🎨 Balayage/Ombré: 80-100€
- 🎨 Retoque raíz: 40-50€

**Tratamientos:**
- 💧 Hidratación: 35-45€
- 💎 Keratina/Alisado: 60-80€
- 💆‍♀️ Botox capilar: 50-70€
- 💚 Olaplex: 45-60€

📌 **Estos son precios orientativos.** 
✅ Consulta presupuesto personalizado según tu cabello.
💡 **Pregunta por nuestros packs** con descuento.`,
      keywords: "precios costo precio servicios",
      prioridad: 10,
      activo: true,
    },
    {
      categoria: "preguntas_frecuentes",
      subtitulo: "cancelacion",
      pregunta: "¿Cuál es la política de cancelación?",
      respuesta: `📋 **Política de cancelación:**

**Plazos:**
- ✅ Cancelación con +24h: Sin coste
- ⚠️ Cancelación 12-24h: 50% del servicio
- ❌ Cancelación -12h: 100% del servicio

**Cómo cancelar:**
- 📱 Por teléfono: +34 123 456 789
- 📧 Por email: info@albaestetica.com
- 🌐 Desde la web: Mi reserva > Cancelar

**Cambios de fecha:**
- ✅ Gratis con +48h de antelación
- ⚠️ 10€ de recargo con -48h

💡 **Consejo:** Si no puedes venir, avísanos para dar tu hora a otro cliente.

**Excepto por emergencias:** Casos justificados se valoran individualmente.`,
      keywords: "cancelación anular cambio política",
      prioridad: 8,
      activo: true,
    },
    {
      categoria: "preguntas_frecuentes",
      subtitulo: "info",
      pregunta: "¿Dónde está ubicada la peluquería?",
      respuesta: `📍 **Encuéntranos en:**

**Dirección:**
Calle Principal #123
Centro Comercial Plaza Bella
Ciudad, CP 12345

**Cómo llegar:**
- 🚗 **Coche:** Parking gratuito en el centro comercial
- 🚌 **Bus:** Líneas 1, 2 y 3 (parada Plaza Bella)
- 🚶‍♀️ **A pie:** 5 min desde el centro de la ciudad

**Puntos de referencia:**
- Junto a la plaza principal
- Enfrente del parque central
- Local con fachada rosa (no te la pierdas)

📞 **Teléfono:** +34 123 456 789
📧 **Email:** info@albaestetica.com

🌐 **Web:** www.albaestetica.com
📱 **Instagram:** @albaestetica`,
      keywords: "ubicación dirección como llegar",
      prioridad: 10,
      activo: true,
    },
  ];

  // Insertar datos
  for (const conocimiento of conocimientos) {
    await prisma.conocimiento.create({
      data: conocimiento,
    });
  }

  console.log("✅ Base de conocimiento sembrada correctamente");
  console.log(`📚 ${conocimientos.length} registros insertados`);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    globalThis.process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
