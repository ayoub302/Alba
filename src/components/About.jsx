import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  const arabicStyle = {
    fontFamily: "'Georgia', serif",
    fontWeight: 700,
    fontStyle: "italic",
    background:
      "linear-gradient(135deg, #b78e56 0%, #e8cfa0 50%, #a8864a 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "0.15em",
    display: "inline-block",
  };

  return (
    <section
      id="nosotras"
      style={{
        padding: "6rem 1rem",
        background: "#faf6f0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gap: "3rem",
          alignItems: "center",
          gridTemplateColumns: "1fr",
        }}
        className="about-grid"
      >
        {/* COLUMNA IZQUIERDA - TEXTO */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ padding: "0 0.5rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#b78e56",
            }}
          >
            <span
              style={{ width: "28px", height: "1px", background: "#b78e56" }}
            />
            Sobre nosotras
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "#5c4033",
              marginTop: "0.75rem",
              fontFamily: "'Georgia', serif",
              lineHeight: 1.1,
            }}
          >
            Nuestra esencia <span style={arabicStyle}>αɾαႦҽ</span>
          </h2>

          <div
            style={{
              marginTop: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              color: "#8a7a5c",
              fontWeight: 300,
              lineHeight: 1.7,
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
            }}
          >
            <p>
              Fusionamos la elegancia de los salones árabes con las técnicas más
              avanzadas del mercado.
            </p>
            <p>
              Un espacio exclusivo para mujeres, donde cada detalle está pensado
              para tu bienestar y confianza.
            </p>
          </div>

          {/* ESTADÍSTICAS - RESPONSIVE */}
          <div
            style={{
              marginTop: "2rem",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            {[
              { n: "5,0", l: "Valoración" },
              { n: "100%", l: "Satisfacción" },
              { n: "2+", l: "Años fidelidad" },
            ].map((stat) => (
              <div key={stat.l} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                    fontWeight: 700,
                    color: "#b78e56",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {stat.n}
                </div>
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "clamp(0.6rem, 0.8vw, 0.75rem)",
                    color: "#8a7a5c",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {stat.l}
                </div>
              </div>
            ))}
          </div>

          {/* BOTÓN */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginTop: "2rem", textAlign: "center" }}
          >
            <Link
              to="/sobre-nosotros"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "transparent",
                border: "2px solid #b78e56",
                color: "#b78e56",
                fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "999px",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#b78e56";
                e.target.style.color = "#faf6f0";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#b78e56";
              }}
            >
              Conócenos más
            </Link>
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA - IMAGEN */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", padding: "0 0.5rem" }}
        >
          <div
            style={{
              aspectRatio: "4/5",
              overflow: "hidden",
              background: "#f5ebdc",
              borderRadius: "8px",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
              alt="Salón Belleza Árabe"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
          </div>

          {/* TARJETA FLOTANTE - RESPONSIVE */}
          <div
            style={{
              position: "absolute",
              bottom: "-1rem",
              right: "0.5rem",
              background: "#faf6f0",
              padding: "clamp(1rem, 2vw, 1.5rem)",
              boxShadow: "0 20px 60px rgba(92,64,51,0.1)",
              borderRadius: "8px",
              maxWidth: "clamp(180px, 30vw, 280px)",
              border: "1px solid rgba(183,142,86,0.15)",
              width: "auto",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.6rem, 0.8vw, 0.75rem)",
                color: "#b78e56",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Experiencia Alba
            </p>
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1.25rem)",
                fontWeight: 300,
                color: "#5c4033",
                marginTop: "4px",
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
              }}
            >
              Tu momento, tu belleza
            </p>
          </div>
        </motion.div>
      </div>

      {/* RESPONSIVE: TABLETS Y MÓVILES */}
      <style>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 4rem !important;
          }
        }

        @media (max-width: 480px) {
          .about-grid {
            gap: 2rem !important;
          }
        }

        @media (min-width: 1024px) {
          .about-grid {
            gap: 5rem !important;
          }
        }

        /* Ajuste para la tarjeta flotante en móviles */
        @media (max-width: 480px) {
          .about-grid > div:last-child > div:last-child {
            bottom: -0.5rem !important;
            right: 0.25rem !important;
            max-width: 150px !important;
            padding: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}