import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const CONSENT_KEY = "cookie_consent_v2";

// Función auxiliar para leer localStorage de forma segura
const getStoredConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

export default function CookieBanner() {
  // Inicialización perezosa
  const [showBanner, setShowBanner] = useState(() => {
    return !getStoredConsent();
  });

  const [showPreferences, setShowPreferences] = useState(false);

  const [categories, setCategories] = useState(() => {
    const stored = getStoredConsent();
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          essential: true,
          analytics: parsed.analytics || false,
          marketing: parsed.marketing || false,
        };
      } catch {
        return { essential: true, analytics: false, marketing: false };
      }
    }
    return { essential: true, analytics: false, marketing: false };
  });

  const saveConsent = (data) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    setShowBanner(false);
    setShowPreferences(false);
    console.log("Consentimiento guardado:", data);
  };

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  };

  const handleSavePreferences = () => {
    saveConsent(categories);
  };

  const toggleCategory = (key) => {
    if (key === "essential") return;
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Banner inferior */}
      <AnimatePresence>
        {showBanner && !showPreferences && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              background: "#1a120b",
              color: "#faf6f0",
              padding: "clamp(1rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 1.5rem)",
              boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
              fontFamily: "'Georgia', serif",
            }}
          >
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0.75rem, 1.5vw, 1rem)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                Utilizamos cookies propias y de terceros para mejorar tu
                experiencia, analizar el tráfico y personalizar contenido.
                Puedes aceptarlas todas, rechazarlas o configurar tus
                preferencias.{" "}
                <Link
                  to="/politica-de-cookies"
                  style={{ color: "#e8cfa0", textDecoration: "underline" }}
                >
                  Política de Cookies
                </Link>
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "clamp(0.5rem, 1vw, 0.75rem)",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={handleAcceptAll}
                  style={{
                    padding: "clamp(8px, 1vw, 10px) clamp(16px, 2vw, 24px)",
                    background: "#b78e56",
                    color: "#faf6f0",
                    border: "2px solid #b78e56",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontSize: "clamp(0.7rem, 0.85vw, 0.875rem)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                    minWidth: "clamp(100px, 12vw, 140px)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "transparent")
                  }
                  onMouseLeave={(e) => (e.target.style.background = "#b78e56")}
                >
                  Aceptar todo
                </button>
                <button
                  onClick={handleRejectAll}
                  style={{
                    padding: "clamp(8px, 1vw, 10px) clamp(16px, 2vw, 24px)",
                    background: "transparent",
                    color: "#faf6f0",
                    border: "2px solid rgba(250,246,240,0.6)",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontSize: "clamp(0.7rem, 0.85vw, 0.875rem)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                    minWidth: "clamp(100px, 12vw, 140px)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "rgba(250,246,240,0.15)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "transparent")
                  }
                >
                  Rechazar todo
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  style={{
                    padding: "clamp(8px, 1vw, 10px) clamp(16px, 2vw, 24px)",
                    background: "transparent",
                    color: "#e8cfa0",
                    border: "2px solid #e8cfa0",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontSize: "clamp(0.7rem, 0.85vw, 0.875rem)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                    minWidth: "clamp(100px, 12vw, 140px)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "rgba(232,207,160,0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "transparent")
                  }
                >
                  Configurar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de preferencias */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 1001,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(0.75rem, 2vw, 1.5rem)",
            }}
            onClick={() => setShowPreferences(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#1a120b",
                color: "#faf6f0",
                borderRadius: "16px",
                maxWidth: "clamp(340px, 90vw, 600px)",
                width: "100%",
                padding: "clamp(1.25rem, 3vw, 2rem)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                fontFamily: "'Georgia', serif",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                    color: "#e8cfa0",
                  }}
                >
                  Preferencias de cookies
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#faf6f0",
                    padding: "4px",
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <p
                style={{
                  fontSize: "clamp(0.8rem, 0.9vw, 0.9rem)",
                  lineHeight: 1.6,
                  marginBottom: "1.5rem",
                  color: "#cdb896",
                }}
              >
                Gestiona las categorías de cookies que permites. Las cookies
                esenciales son necesarias para el funcionamiento del sitio y no
                pueden desactivarse.
              </p>

              {/* Categorías */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {/* Esenciales */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "0.75rem",
                    borderBottom: "1px solid rgba(250,246,240,0.1)",
                    gap: "0.5rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "600",
                        fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
                      }}
                    >
                      Cookies esenciales
                    </p>
                    <p
                      style={{
                        margin: "0.25rem 0 0",
                        fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                        color: "#cdb896",
                      }}
                    >
                      Necesarias para la navegación básica. Siempre activas.
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "clamp(0.7rem, 0.8vw, 0.85rem)",
                      color: "#b78e56",
                      flexShrink: 0,
                    }}
                  >
                    Siempre
                  </span>
                </div>

                {/* Analíticas */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "0.75rem",
                    borderBottom: "1px solid rgba(250,246,240,0.1)",
                    gap: "0.5rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "600",
                        fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
                      }}
                    >
                      Analíticas
                    </p>
                    <p
                      style={{
                        margin: "0.25rem 0 0",
                        fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                        color: "#cdb896",
                      }}
                    >
                      Nos ayudan a entender cómo interactúas con la web.
                    </p>
                  </div>
                  <button
                    onClick={() => toggleCategory("analytics")}
                    style={{
                      width: "clamp(38px, 4vw, 44px)",
                      height: "clamp(20px, 2vw, 24px)",
                      borderRadius: "999px",
                      border: "none",
                      background: categories.analytics ? "#b78e56" : "#4a4a4a",
                      position: "relative",
                      cursor: "pointer",
                      transition: "background 0.3s",
                      flexShrink: 0,
                    }}
                    aria-pressed={categories.analytics}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "clamp(1px, 0.15vw, 2px)",
                        left: categories.analytics
                          ? "clamp(18px, 2vw, 22px)"
                          : "clamp(1px, 0.15vw, 2px)",
                        width: "clamp(16px, 1.8vw, 20px)",
                        height: "clamp(16px, 1.8vw, 20px)",
                        borderRadius: "50%",
                        background: "#fff",
                        transition: "left 0.3s",
                      }}
                    />
                  </button>
                </div>

                {/* Marketing */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "0.75rem",
                    gap: "0.5rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "600",
                        fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
                      }}
                    >
                      Marketing
                    </p>
                    <p
                      style={{
                        margin: "0.25rem 0 0",
                        fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                        color: "#cdb896",
                      }}
                    >
                      Para mostrar publicidad más relevante.
                    </p>
                  </div>
                  <button
                    onClick={() => toggleCategory("marketing")}
                    style={{
                      width: "clamp(38px, 4vw, 44px)",
                      height: "clamp(20px, 2vw, 24px)",
                      borderRadius: "999px",
                      border: "none",
                      background: categories.marketing ? "#b78e56" : "#4a4a4a",
                      position: "relative",
                      cursor: "pointer",
                      transition: "background 0.3s",
                      flexShrink: 0,
                    }}
                    aria-pressed={categories.marketing}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "clamp(1px, 0.15vw, 2px)",
                        left: categories.marketing
                          ? "clamp(18px, 2vw, 22px)"
                          : "clamp(1px, 0.15vw, 2px)",
                        width: "clamp(16px, 1.8vw, 20px)",
                        height: "clamp(16px, 1.8vw, 20px)",
                        borderRadius: "50%",
                        background: "#fff",
                        transition: "left 0.3s",
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Botones de guardado */}
              <div
                style={{
                  display: "flex",
                  gap: "clamp(0.5rem, 1vw, 1rem)",
                  marginTop: "2rem",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={handleRejectAll}
                  style={{
                    background: "transparent",
                    color: "#faf6f0",
                    border: "2px solid rgba(250,246,240,0.6)",
                    padding: "clamp(8px, 1vw, 10px) clamp(14px, 1.5vw, 20px)",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontSize: "clamp(0.65rem, 0.75vw, 0.8rem)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                  }}
                >
                  Rechazar todo
                </button>
                <button
                  onClick={handleAcceptAll}
                  style={{
                    background: "transparent",
                    color: "#e8cfa0",
                    border: "2px solid #e8cfa0",
                    padding: "clamp(8px, 1vw, 10px) clamp(14px, 1.5vw, 20px)",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontSize: "clamp(0.65rem, 0.75vw, 0.8rem)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                  }}
                >
                  Aceptar todo
                </button>
                <button
                  onClick={handleSavePreferences}
                  style={{
                    background: "#b78e56",
                    color: "#faf6f0",
                    border: "2px solid #b78e56",
                    padding: "clamp(8px, 1vw, 10px) clamp(14px, 1.5vw, 20px)",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontSize: "clamp(0.65rem, 0.75vw, 0.8rem)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                  }}
                >
                  Guardar mis opciones
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}