import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import salonVideo from "../assets/salon.mp4";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "6rem 1rem 3rem",
        textAlign: "center",
      }}
    >
      {/* ---- VIDEO DE FONDO ---- */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src={salonVideo} type="video/mp4" />
      </video>

      {/* ---- OVERLAY oscuro ---- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(20,14,10,0.55) 0%, rgba(20,14,10,0.35) 40%, rgba(20,14,10,0.75) 100%)",
          zIndex: 1,
        }}
      />

      {/* ---- CONTENIDO ---- */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "min(900px, 95vw)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 0.5rem",
        }}
      >
        {/* ================= LOGO SVG RESPONSIVE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            width: "100%",
            maxWidth: "min(850px, 90vw)",
            marginBottom: "0.5rem",
          }}
        >
          <svg
            viewBox="0 0 800 420"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "min(50vh, 320px)",
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient
                id="goldGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#b78e56" />
                <stop offset="50%" stopColor="#e8cfa0" />
                <stop offset="100%" stopColor="#a8864a" />
              </linearGradient>
            </defs>

            {/* Belleza: La "ll" se sube con dy negativo */}
            <text
              x="400"
              y="180"
              textAnchor="middle"
              fill="url(#goldGradient)"
              fontFamily="Georgia, serif"
              fontSize="clamp(60px, 18vw, 140px)"
              fontWeight="500"
              textLength="clamp(280px, 75vw, 650px)"
              lengthAdjust="spacingAndGlyphs"
            >
              Bҽ
              <tspan dy="-0.15em">ʅʅ</tspan>
              <tspan dy="0.15em">ҽȥα</tspan>
            </text>

            {/* Arabe */}
            <text
              x="400"
              y="340"
              textAnchor="middle"
              fill="url(#goldGradient)"
              fontFamily="Georgia, serif"
              fontSize="clamp(40px, 12vw, 90px)"
              fontWeight="700"
              textLength="clamp(160px, 45vw, 380px)"
              lengthAdjust="spacingAndGlyphs"
            >
              αɾαႦҽ
            </text>
          </svg>
        </motion.div>
        {/* ================= FIN LOGO SVG ================= */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            marginTop: "0.25rem",
            maxWidth: "min(34rem, 90vw)",
            fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
            fontWeight: 300,
            color: "rgba(250,246,240,0.85)",
            lineHeight: 1.8,
            fontFamily: "'Georgia', serif",
            padding: "0 0.5rem",
          }}
        >
          Especialistas en alisado capilar, tratamientos a la proteína y
          coloración con técnicas árabes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: "clamp(1.5rem, 4vw, 2.75rem)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(0.5rem, 1.5vw, 1rem)",
            width: "100%",
            padding: "0 0.5rem",
          }}
        >
          <Link
            to="/reserva"
            style={{
              padding: "clamp(12px, 1.5vw, 17px) clamp(20px, 4vw, 40px)",
              background: "#b78e56",
              color: "#faf6f0",
              fontSize: "clamp(0.6rem, 0.9vw, 0.8rem)",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "999px",
              transition: "all 0.3s ease",
              border: "2px solid #b78e56",
              display: "inline-block",
              minWidth: "clamp(120px, 20vw, 160px)",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#e8cfa0";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#b78e56";
              e.target.style.color = "#faf6f0";
            }}
          >
            Reservar Cita
          </Link>
          <a
            href="#servicios"
            style={{
              padding: "clamp(12px, 1.5vw, 17px) clamp(20px, 4vw, 40px)",
              background: "transparent",
              border: "2px solid rgba(250,246,240,0.6)",
              color: "#faf6f0",
              fontSize: "clamp(0.6rem, 0.9vw, 0.8rem)",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "999px",
              transition: "all 0.3s ease",
              display: "inline-block",
              minWidth: "clamp(120px, 20vw, 160px)",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(250,246,240,0.15)";
              e.target.style.borderColor = "#faf6f0";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "rgba(250,246,240,0.6)";
            }}
          >
            Ver Servicios
          </a>
        </motion.div>
      </div>
    </section>
  );
}