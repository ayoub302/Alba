import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";

const navLeft = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotras", href: "#nosotras" },
];

const navRight = [
  { label: "Reseñas", href: "#resenas" },
  { label: "Contacto", href: "#contacto" },
];

const allLinks = [...navLeft, ...navRight];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.5s ease",
          background: scrolled
            ? "rgba(245,235,220,0.95)"
            : "linear-gradient(to bottom, rgba(245,235,220,0.9), transparent)",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(183,142,86,0.2)" : "none",
          padding: scrolled ? "8px 0" : "16px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* Navegación izquierda */}
          <nav
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "2rem",
            }}
            className="lg-flex"
          >
            {navLeft.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  position: "relative",
                  padding: "8px 0",
                  fontSize: "14px",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  color: "#5c4033",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#b78e56")}
                onMouseLeave={(e) => (e.target.style.color = "#5c4033")}
              >
                {link.label}
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: "50%",
                    width: 0,
                    height: "2px",
                    background: "#b78e56",
                    transition: "all 0.3s ease",
                    borderRadius: "2px",
                  }}
                  className="nav-underline"
                />
              </a>
            ))}
          </nav>

          {/* LOGO */}
          <a
            href="#inicio"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                position: "relative",
                width: scrolled ? 85 : 120,
                height: scrolled ? 85 : 120,
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                viewBox="0 0 120 120"
                style={{ width: "100%", height: "100%" }}
              >
                <defs>
                  <linearGradient
                    id="albaGold"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#e8cfa0" />
                    <stop offset="50%" stopColor="#c9a86a" />
                    <stop offset="100%" stopColor="#a8864a" />
                  </linearGradient>
                  <linearGradient
                    id="albaBg"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f5ebdc" />
                    <stop offset="100%" stopColor="#e8d8c4" />
                  </linearGradient>
                </defs>

                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="url(#albaBg)"
                  stroke="url(#albaGold)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke="url(#albaGold)"
                  strokeWidth="0.8"
                  opacity="0.4"
                />

                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                  (deg) => (
                    <circle
                      key={deg}
                      cx="60"
                      cy="10"
                      r="2.5"
                      fill="#c9a86a"
                      opacity="0.5"
                      transform={`rotate(${deg} 60 60)`}
                    />
                  ),
                )}

                <path
                  d="M60 70 C54 58 52 46 60 38 C68 46 66 58 60 70 Z"
                  fill="url(#albaGold)"
                  opacity="0.9"
                />
                <path
                  d="M60 70 C46 68 38 56 44 46 C52 50 58 58 60 70 Z"
                  fill="url(#albaGold)"
                  opacity="0.85"
                />
                <path
                  d="M60 70 C74 68 82 56 76 46 C68 50 62 58 60 70 Z"
                  fill="url(#albaGold)"
                  opacity="0.85"
                />
                <circle cx="60" cy="56" r="3" fill="#5c4033" opacity="0.6" />

                <path
                  id="albaArcTop"
                  d="M 18,60 A 42,42 0 0 1 102,60"
                  fill="none"
                />
                <text
                  fontSize="8.5"
                  letterSpacing="0.3em"
                  fill="#5c4033"
                  fontFamily="'Georgia', serif"
                  fontWeight="600"
                >
                  <textPath
                    href="#albaArcTop"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    ALBA SALON
                  </textPath>
                </text>

                <path
                  id="albaArcBottom"
                  d="M 98,72 A 42,42 0 0 1 22,72"
                  fill="none"
                />
                <text
                  fontSize="6.5"
                  letterSpacing="0.2em"
                  fill="#8a7a5c"
                  fontFamily="'Georgia', serif"
                >
                  <textPath
                    href="#albaArcBottom"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    ESTÉTICA &amp; BELLEZA
                  </textPath>
                </text>

                <line
                  x1="15"
                  y1="60"
                  x2="25"
                  y2="60"
                  stroke="#c9a86a"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="95"
                  y1="60"
                  x2="105"
                  y2="60"
                  stroke="#c9a86a"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="20"
                  y1="55"
                  x2="25"
                  y2="55"
                  stroke="#c9a86a"
                  strokeWidth="0.6"
                  opacity="0.3"
                />
                <line
                  x1="20"
                  y1="65"
                  x2="25"
                  y2="65"
                  stroke="#c9a86a"
                  strokeWidth="0.6"
                  opacity="0.3"
                />
                <line
                  x1="95"
                  y1="55"
                  x2="100"
                  y2="55"
                  stroke="#c9a86a"
                  strokeWidth="0.6"
                  opacity="0.3"
                />
                <line
                  x1="95"
                  y1="65"
                  x2="100"
                  y2="65"
                  stroke="#c9a86a"
                  strokeWidth="0.6"
                  opacity="0.3"
                />

                <text
                  x="60"
                  y="90"
                  fontSize="14"
                  fill="#5c4033"
                  fontFamily="'Dancing Script', 'Brush Script MT', cursive"
                  textAnchor="middle"
                  opacity="0.8"
                >
                  Alba
                </text>
              </svg>
            </div>
          </a>

          {/* Navegación derecha + CTA + LoginButton */}
          <div
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "2rem",
            }}
            className="lg-flex"
          >
            <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {navRight.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    position: "relative",
                    padding: "8px 0",
                    fontSize: "14px",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                    color: "#5c4033",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#b78e56")}
                  onMouseLeave={(e) => (e.target.style.color = "#5c4033")}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <Link
              to="/reserva"
              style={{
                position: "relative",
                padding: "10px 28px",
                background: "transparent",
                border: "2px solid #b78e56",
                color: "#5c4033",
                fontSize: "12px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                textDecoration: "none",
                overflow: "hidden",
                transition: "all 0.3s ease",
                borderRadius: "4px",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#f5ebdc";
                e.currentTarget.querySelector(".btn-fill").style.transform =
                  "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#5c4033";
                e.currentTarget.querySelector(".btn-fill").style.transform =
                  "scaleX(0)";
              }}
            >
              <span
                className="btn-fill"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#b78e56",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s ease",
                  zIndex: -1,
                }}
              />
              <span style={{ position: "relative", zIndex: 1 }}>
                Reservar Cita
              </span>
            </Link>

            {/* 👇 AQUÍ VA EL LoginButton */}
            <LoginButton />
          </div>

          {/* Mobile hamburger */}
          <button
            style={{
              display: "flex",
              justifySelf: "end",
              padding: "8px",
              background: "none",
              border: "none",
              color: "#b78e56",
              cursor: "pointer",
            }}
            className="lg-hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 40,
              background: "rgba(245,235,220,0.98)",
              backdropFilter: "blur(14px)",
              borderBottom: "1px solid rgba(183,142,86,0.2)",
              paddingTop: "96px",
              pointerEvents: mobileOpen ? "auto" : "none",
            }}
            className="lg-hidden"
          >
            <div style={{ padding: "1.5rem" }}>
              {allLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                    color: "#5c4033",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderLeft: "2px solid transparent",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#b78e56";
                    e.target.style.borderLeftColor = "#b78e56";
                    e.target.style.background = "rgba(183,142,86,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#5c4033";
                    e.target.style.borderLeftColor = "transparent";
                    e.target.style.background = "transparent";
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/reserva"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    marginTop: "1rem",
                    padding: "14px",
                    background: "#b78e56",
                    color: "#f5ebdc",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    textDecoration: "none",
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#c9a86a";
                    e.target.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#b78e56";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Reservar Cita
                </Link>

                {/* 👇 LoginButton en móvil también */}
                <div style={{ marginTop: "1rem", textAlign: "center" }}>
                  <LoginButton />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&display=swap');
        
        @media (min-width: 1024px) {
          .lg-flex { display: flex !important; }
          .lg-hidden { display: none !important; }
        }
        .nav-underline {
          transition: all 0.3s ease;
        }
        a:hover .nav-underline {
          width: 100% !important;
          left: 0 !important;
        }
      `}</style>
    </>
  );
}
