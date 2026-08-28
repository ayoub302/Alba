import { motion } from "framer-motion";
import {
  Scissors,
  Sparkles,
  Crown,
  Palette,
  Star,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Alisado capilar",
    desc: "Alisado duradero que respeta la fibra capilar con resultados profesionales.",
    badge: "Top #1",
    img: "https://kimi-web-img.kimi.ai/img/www.insidegoldcoast.com.au/2054be3b57d01bec6f7cf7d804a572acdfb86c54.jpg",
  },
  {
    icon: Crown,
    title: "Tratamiento proteína",
    desc: "Fidelidad absoluta. Clientas que repiten desde hace más de 2 años.",
    badge: "Premium",
    img: "https://kimi-web-img.kimi.ai/img/cms.hastehair.com/4be6784cce5473cdbadc46392977b23ba7872cce.jpg",
  },
  {
    icon: Palette,
    title: "Coloración",
    desc: "Mechas, balayage y color a medida con técnicas árabes exclusivas.",
    badge: null,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Sbl-RjjiG-1W_PM14d_QyDAswCYeFXGO2RuN6WIagA&s=10",
  },
  {
    icon: Scissors,
    title: "Corte profesional",
    desc: "Para el día a día y eventos especiales con un acabado impecable.",
    badge: null,
    img: "https://kimi-web-img.kimi.ai/img/www.crystallook.ca/c6fd47c0525cfbf489639ed267c10e6d985a9bf1.webp",
  },
  {
    icon: Star,
    title: "Estética & Eventos",
    desc: "Cuidado facial, peinados de boda y celebraciones inolvidables.",
    badge: "Nuevo",
    img: "https://kimi-web-img.kimi.ai/img/whimsical-cdn.wedissimo.com/48cfd23683d978dadd8df496bc5d171eabccfca6.jpg",
  },
];

export default function Services() {
  return (
    <section
      id="servicios"
      style={{
        padding: "8rem 1.5rem",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fondo decorativo sutil */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(212,167,116,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-5%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(212,167,116,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "5rem", textAlign: "center" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#d4a574",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{ width: "40px", height: "1px", background: "#d4a574" }}
            />
            Nuestros servicios
            <span
              style={{ width: "40px", height: "1px", background: "#d4a574" }}
            />
          </div>

          <h2
            style={{
              fontSize: "clamp(2.8rem, 5.5vw, 4rem)",
              fontWeight: 300,
              color: "#f5f0e8",
              lineHeight: 1.1,
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Rituales de{" "}
            <span style={{ fontWeight: 600, color: "#d4a574" }}>belleza</span>
          </h2>

          <p
            style={{
              marginTop: "1.25rem",
              maxWidth: "28rem",
              margin: "1.25rem auto 0",
              color: "#8a8278",
              fontSize: "1.05rem",
              fontWeight: 400,
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              lineHeight: 1.7,
            }}
          >
            Cada tratamiento es una experiencia. Tecnología capilar con
            tradición árabe.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{
                background: "#141414",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,167,116,0.3)";
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px -12px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Imagen */}
              <div
                style={{
                  position: "relative",
                  height: "280px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    filter: "brightness(0.85)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.filter = "brightness(1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.filter = "brightness(0.85)";
                  }}
                />

                {/* Overlay gradiente */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)",
                  }}
                />

                {/* Badge */}
                {service.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: "1.25rem",
                      left: "1.25rem",
                      padding: "6px 16px",
                      background: "rgba(212,167,116,0.15)",
                      color: "#d4a574",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      borderRadius: "999px",
                      border: "1px solid rgba(212,167,116,0.25)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {service.badge}
                  </span>
                )}

                {/* Icono flotante */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1.25rem",
                    right: "1.25rem",
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(212,167,116,0.12)",
                    border: "1px solid rgba(212,167,116,0.2)",
                    backdropFilter: "blur(12px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <service.icon size={20} color="#d4a574" strokeWidth={1.5} />
                </div>
              </div>

              {/* Contenido */}
              <div style={{ padding: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 500,
                      color: "#f5f0e8",
                      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {service.title}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    color="#8a8278"
                    style={{ transition: "all 0.3s ease" }}
                    className="arrow-icon"
                  />
                </div>

                <p
                  style={{
                    color: "#6b6560",
                    fontSize: "0.95rem",
                    fontWeight: 400,
                    lineHeight: 1.7,
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  }}
                >
                  {service.desc}
                </p>

                {/* Línea decorativa */}
                <div
                  style={{
                    marginTop: "1.5rem",
                    height: "1px",
                    background:
                      "linear-gradient(to right, rgba(212,167,116,0.3), transparent)",
                    width: "40%",
                    transition: "width 0.5s ease",
                  }}
                  className="service-line"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .arrow-icon {
          opacity: 0;
          transform: translate(-4px, 4px);
        }
        div:hover .arrow-icon {
          opacity: 1;
          transform: translate(0, 0);
          color: #d4a574 !important;
        }
        div:hover .service-line {
          width: 80% !important;
        }
      `}</style>
    </section>
  );
}
