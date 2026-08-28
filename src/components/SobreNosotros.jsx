import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SobreNosotros() {
  const team = [
    {
      name: "Alba",
      role: "Directora & Estilista Principal",
      bio: "Con más de 10 años de experiencia en peluquería de alta gama, Alba fundó este salón con la visión de traer la sofisticación árabe a cada cliente. Especialista en alisados y coloración.",
      image:
        "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&q=80",
    },
    {
      name: "Layla",
      role: "Colorista & Tratamientos Capilares",
      bio: "Experta en técnicas de coloración árabe y tratamientos a la proteína. Layla transforma cada cabello en una obra de arte con precisión y dedicación.",
      image:
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&q=80",
    },
    {
      name: "Noor",
      role: "Maquillista & Asesora de Imagen",
      bio: "Apasionada por realzar la belleza natural de cada mujer. Noor combina técnicas tradicionales árabes con las últimas tendencias en maquillaje y estilismo.",
      image:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
    },
  ];

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
    <div style={{ background: "#faf6f0", minHeight: "100vh" }}>
      {/* ---- HERO ---- */}
      <section
        style={{
          padding: "clamp(6rem, 12vw, 10rem) clamp(1rem, 3vw, 1.5rem) clamp(3rem, 6vw, 6rem)",
          textAlign: "center",
          background: "linear-gradient(180deg, #1a120b 0%, #2d1f16 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 50%, rgba(183,142,86,0.08) 0%, transparent 50%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <span
            style={{
              fontSize: "clamp(0.6rem, 0.75vw, 0.75rem)",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#b78e56",
            }}
          >
            Descubre quiénes somos
          </span>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              color: "#faf6f0",
              marginTop: "1rem",
              fontFamily: "'Georgia', serif",
              lineHeight: 1.1,
            }}
          >
            Belleza <span style={arabicStyle}>αɾαႦҽ</span>
          </h1>
          <p
            style={{
              marginTop: "1.5rem",
              maxWidth: "min(600px, 90vw)",
              marginLeft: "auto",
              marginRight: "auto",
              color: "rgba(250,246,240,0.7)",
              fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
              lineHeight: 1.8,
              fontFamily: "'Georgia', serif",
              fontWeight: 300,
              padding: "0 0.5rem",
            }}
          >
            Un espacio donde la tradición se encuentra con la innovación, y cada
            mujer descubre su mejor versión.
          </p>
        </motion.div>
      </section>

      {/* ---- NUESTRA HISTORIA ---- */}
      <section style={{ padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 3vw, 1.5rem)" }}>
        <div style={{ maxWidth: "min(900px, 100%)", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "clamp(0.6rem, 0.75vw, 0.75rem)",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#b78e56",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{ width: "clamp(24px, 3vw, 32px)", height: "1px", background: "#b78e56" }}
              />
              Nuestra historia
            </div>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 300,
                color: "#5c4033",
                fontFamily: "'Georgia', serif",
                marginBottom: "1.5rem",
              }}
            >
              De un sueño a tu{" "}
              <span style={{ fontWeight: 600, fontStyle: "italic" }}>
                refugio de belleza
              </span>
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                color: "#8a7a5c",
                fontWeight: 300,
                lineHeight: 1.8,
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
              }}
            >
              <p>
                Peluquería Alba nació de una pasión compartida: la de crear un
                espacio donde la belleza árabe se fusione con las técnicas más
                avanzadas del mercado europeo. Inspiradas en los lujosos salones
                de Marrakech, Dubái y El Cairo, hemos diseñado cada rincón para
                que te sientas en un oasis de tranquilidad y sofisticación.
              </p>
              <p>
                Somos un salón exclusivo para mujeres, donde la privacidad y el
                confort son prioridad. Desde nuestros alisados capilares con
                técnicas árabes hasta nuestra coloración personalizada, cada
                servicio está pensado para resaltar tu belleza natural.
              </p>
              <p>
                Nuestra filosofía es simple: tratamos a cada cliente como si
                fuera la única. Por eso nuestro 100% de satisfacción no es un
                número, es un compromiso.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- VALORES ---- */}
      <section style={{ padding: "0 clamp(1rem, 3vw, 1.5rem) clamp(3rem, 6vw, 6rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "clamp(2rem, 3vw, 3rem)" }}
          >
            <span
              style={{
                fontSize: "clamp(0.6rem, 0.75vw, 0.75rem)",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#b78e56",
              }}
            >
              Lo que nos define
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 300,
                color: "#5c4033",
                marginTop: "0.75rem",
                fontFamily: "'Georgia', serif",
              }}
            >
              Nuestros valores
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
              gap: "clamp(1.5rem, 2vw, 2rem)",
            }}
          >
            {[
              {
                title: "Exclusividad",
                desc: "Espacio 100% femenino donde la privacidad y el confort son sagrados.",
              },
              {
                title: "Excelencia",
                desc: "Técnicas árabes auténticas combinadas con productos de primera calidad.",
              },
              {
                title: "Pasión",
                desc: "Cada corte, cada color, cada tratamiento lo hacemos con el corazón.",
              },
              {
                title: "Confianza",
                desc: "Escuchamos, asesoramos y cuidamos de ti como si fueras familia.",
              },
            ].map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: "#fff",
                  padding: "clamp(1.5rem, 2vw, 2rem)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px rgba(92,64,51,0.06)",
                  border: "1px solid rgba(183,142,86,0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(1.1rem, 1.25vw, 1.25rem)",
                    fontWeight: 600,
                    color: "#5c4033",
                    fontFamily: "'Georgia', serif",
                    marginBottom: "0.75rem",
                  }}
                >
                  {val.title}
                </h3>
                <p
                  style={{
                    color: "#8a7a5c",
                    lineHeight: 1.7,
                    fontWeight: 300,
                    fontFamily: "'Georgia', serif",
                    fontSize: "clamp(0.9rem, 0.95vw, 1rem)",
                  }}
                >
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- EQUIPO DETALLADO ---- */}
      <section
        style={{
          padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 3vw, 1.5rem)",
          background: "#f5ebdc",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "clamp(2rem, 3.5vw, 3.5rem)" }}
          >
            <span
              style={{
                fontSize: "clamp(0.6rem, 0.75vw, 0.75rem)",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#b78e56",
              }}
            >
              Nuestro equipo
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "#5c4033",
                marginTop: "0.75rem",
                fontFamily: "'Georgia', serif",
              }}
            >
              Las manos detrás de tu belleza
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "clamp(1.5rem, 3vw, 3rem)",
            }}
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(92,64,51,0.08)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    height: "clamp(220px, 32vw, 320px)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      display: "block",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>
                <div style={{ padding: "clamp(1.25rem, 2vw, 2rem)", flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)",
                      fontWeight: 600,
                      color: "#5c4033",
                      fontFamily: "'Georgia', serif",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)",
                      color: "#b78e56",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      marginBottom: "1rem",
                    }}
                  >
                    {member.role}
                  </p>
                  <p
                    style={{
                      color: "#8a7a5c",
                      lineHeight: 1.7,
                      fontWeight: 300,
                      fontFamily: "'Georgia', serif",
                      fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)",
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section style={{ padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 3vw, 1.5rem)", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 300,
              color: "#5c4033",
              fontFamily: "'Georgia', serif",
              marginBottom: "1rem",
            }}
          >
            ¿Lista para tu transformación?
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              marginBottom: "2rem",
              fontFamily: "'Georgia', serif",
              fontWeight: 300,
              fontSize: "clamp(0.9rem, 1vw, 1rem)",
            }}
          >
            Reserva tu cita y vive la experiencia Belleza Árabe.
          </p>
          <div
            style={{
              display: "flex",
              gap: "clamp(0.5rem, 1vw, 1rem)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/reserva"
              style={{
                padding: "clamp(12px, 1.5vw, 17px) clamp(24px, 4vw, 40px)",
                background: "#b78e56",
                color: "#faf6f0",
                fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "999px",
                transition: "all 0.3s ease",
                border: "2px solid #b78e56",
                display: "inline-block",
                minWidth: "clamp(120px, 15vw, 160px)",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#b78e56";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#b78e56";
                e.currentTarget.style.color = "#faf6f0";
              }}
            >
              Reservar Cita
            </Link>
            <Link
              to="/"
              style={{
                padding: "clamp(12px, 1.5vw, 17px) clamp(24px, 4vw, 40px)",
                background: "transparent",
                border: "2px solid rgba(92,64,51,0.3)",
                color: "#5c4033",
                fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "999px",
                transition: "all 0.3s ease",
                display: "inline-block",
                minWidth: "clamp(120px, 15vw, 160px)",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(92,64,51,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              Volver al inicio
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}