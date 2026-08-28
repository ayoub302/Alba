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
        padding: "8rem 1.5rem",
        background: "#faf6f0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gap: "4rem",
          alignItems: "center",
        }}
        className="about-grid"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#b78e56",
            }}
          >
            <span
              style={{ width: "32px", height: "1px", background: "#b78e56" }}
            />
            Sobre nosotras
          </div>

          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "#5c4033",
              marginTop: "1rem",
              fontFamily: "'Georgia', serif",
              lineHeight: 1.1,
            }}
          >
            Nuestra esencia <span style={arabicStyle}>αɾαႦҽ</span>
          </h2>

          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              color: "#8a7a5c",
              fontWeight: 300,
              lineHeight: 1.7,
              fontFamily: "'Georgia', serif",
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

          <div
            style={{
              marginTop: "2.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
          >
            {[
              { n: "5,0", l: "Valoración" },
              { n: "100%", l: "Satisfacción" },
              { n: "2+", l: "Años fidelidad" },
            ].map((stat) => (
              <div key={stat.l}>
                <div
                  style={{
                    fontSize: "1.875rem",
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
                    fontSize: "0.75rem",
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginTop: "2.5rem" }}
          >
            <Link
              to="/sobre-nosotros"
              style={{
                display: "inline-block",
                padding: "14px 36px",
                background: "transparent",
                border: "2px solid #b78e56",
                color: "#b78e56",
                fontSize: "0.8rem",
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

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative" }}
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
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-1.5rem",
              right: "-1.5rem",
              background: "#faf6f0",
              padding: "1.5rem",
              boxShadow: "0 20px 60px rgba(92,64,51,0.1)",
              borderRadius: "8px",
              maxWidth: "16rem",
              border: "1px solid rgba(183,142,86,0.15)",
            }}
          >
            <p
              style={{
                fontSize: "0.875rem",
                color: "#b78e56",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Experiencia Alba
            </p>
            <p
              style={{
                fontSize: "1.25rem",
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

      <style>{`
        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
