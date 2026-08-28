import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  Send,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// ✅ CORREGIDO - Usa variable de entorno
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// ✅ Reseñas de muestra (SIEMPRE van a estar)
const reviewsMuestra = [
  {
    text: "Muy profesionales y amables. Se preocupan por hacerlo a la perfección.",
    author: "Ada Bienzobas",
    rating: 5,
  },
  {
    text: "Llevo dos años con el tratamiento a la proteína. Siempre vuelvo.",
    author: "Hajar Lebiad",
    rating: 5,
  },
  {
    text: "Peluquería 10/10. Amables, buen trato y los tratamientos son de alta calidad.",
    author: "Fatiha Nabil",
    rating: 5,
  },
];

export default function Reviews() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [indiceActual, setIndiceActual] = useState(0);

  const MAX_CHARS = 250;

  // Función para cargar las reseñas de la API y combinarlas con las muestras
  const cargarResenas = useCallback(async () => {
    setCargando(true);
    try {
      const response = await fetch(`${API_URL}/resenas`);
      if (!response.ok) {
        throw new Error("Error al cargar reseñas");
      }
      const data = await response.json();

      // Combinamos los 3 fijos + los que vienen de la base de datos
      const nombresMuestra = reviewsMuestra.map((r) => r.author);
      const nuevasResenas = data.filter(
        (r) => !nombresMuestra.includes(r.nombre),
      );

      setResenas([...reviewsMuestra, ...nuevasResenas]);
    } catch (err) {
      console.error("❌ Error al cargar reseñas:", err);
      setResenas(reviewsMuestra);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      if (!mounted) return;
      await cargarResenas();
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, [cargarResenas]);

  // 👇 Funciones de las flechas
  const siguienteResena = () => {
    setIndiceActual((prev) => (prev + 1) % resenas.length);
  };

  const anteriorResena = () => {
    setIndiceActual((prev) => (prev - 1 + resenas.length) % resenas.length);
  };

  const resenaActual = resenas[indiceActual];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("El nombre es obligatorio.");
      setSuccess("");
      return;
    }
    if (!message.trim()) {
      setError("El mensaje es obligatorio.");
      setSuccess("");
      return;
    }
    if (message.length > MAX_CHARS) {
      setError(`El mensaje no puede superar los ${MAX_CHARS} caracteres.`);
      setSuccess("");
      return;
    }
    if (rating === 0) {
      setError("Por favor, selecciona una puntuación de estrellas.");
      setSuccess("");
      return;
    }

    setError("");
    setEnviando(true);

    try {
      const response = await fetch(`${API_URL}/resenas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name.trim(),
          mensaje: message.trim(),
          rating: rating,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al enviar la reseña");
      }

      await response.json();

      setSuccess("¡Comentario enviado correctamente!");
      setName("");
      setMessage("");
      setRating(0);
      setHoverRating(0);

      await cargarResenas();

      setTimeout(() => {
        setIsFormOpen(false);
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message || "Error al enviar la reseña");
    } finally {
      setEnviando(false);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setError("");
    setSuccess("");
  };

  return (
    <section
      id="resenas"
      style={{ padding: "8rem 1.5rem", background: "#f5ebdc" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "4rem", textAlign: "center" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
            Voces reales
            <span
              style={{ width: "32px", height: "1px", background: "#b78e56" }}
            />
          </div>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "#5c4033",
              marginTop: "1rem",
              fontFamily: "'Georgia', serif",
            }}
          >
            Lo que dicen{" "}
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>
              nuestras clientas
            </span>
          </h2>
        </motion.div>

        {cargando && (
          <div
            style={{ textAlign: "center", padding: "2rem", color: "#8a7a5c" }}
          >
            <p>Cargando reseñas...</p>
          </div>
        )}

        {!cargando && resenas.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "2rem", color: "#8a7a5c" }}
          >
            <p>No hay reseñas publicadas todavía. ¡Sé la primera!</p>
          </div>
        )}

        {!cargando && resenas.length > 0 && (
          <>
            {/* 👇 CARRUSEL CON FLECHAS */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              {/* Botón Izquierda */}
              <button
                onClick={anteriorResena}
                style={{
                  background: "none",
                  border: "1px solid rgba(183,142,86,0.3)",
                  borderRadius: "50%",
                  padding: "0.75rem",
                  cursor: "pointer",
                  color: "#b78e56",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "rgba(183,142,86,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "transparent")
                }
              >
                <ChevronLeft size={24} />
              </button>

              {/* Tarjeta Actual */}
              <motion.div
                key={indiceActual}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: "#faf6f0",
                  padding: "2rem",
                  borderRadius: "8px",
                  maxWidth: "600px",
                  width: "100%",
                  boxShadow: "0 4px 15px rgba(92,64,51,0.05)",
                }}
              >
                <Quote
                  size={32}
                  color="#d4c4a8"
                  style={{ marginBottom: "1rem" }}
                />
                <p
                  style={{
                    color: "#6b5b45",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  "{resenaActual.text || resenaActual.mensaje}"
                </p>
                <div
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid rgba(183,142,86,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "9999px",
                      background: "rgba(183,142,86,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#5c4033",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {(resenaActual.author || resenaActual.nombre || "?")[0]}
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 500,
                        color: "#5c4033",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {resenaActual.author || resenaActual.nombre}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        color: "#b78e56",
                        fontSize: "0.875rem",
                        marginTop: "2px",
                      }}
                    >
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={12}
                          fill={
                            j < (resenaActual.rating || 5) ? "#b78e56" : "none"
                          }
                          color="#b78e56"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Botón Derecha */}
              <button
                onClick={siguienteResena}
                style={{
                  background: "none",
                  border: "1px solid rgba(183,142,86,0.3)",
                  borderRadius: "50%",
                  padding: "0.75rem",
                  cursor: "pointer",
                  color: "#b78e56",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "rgba(183,142,86,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "transparent")
                }
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Puntos indicadores */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "3rem",
              }}
            >
              {resenas.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndiceActual(i)}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background:
                      i === indiceActual ? "#b78e56" : "rgba(183,142,86,0.3)",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                />
              ))}
            </div>
          </>
        )}

        {!isFormOpen && (
          <div style={{ textAlign: "center", marginTop: "0rem" }}>
            <motion.button
              onClick={() => setIsFormOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "1rem 2.5rem",
                background: "#b78e56",
                color: "#faf6f0",
                border: "none",
                borderRadius: "999px",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
                boxShadow: "0 4px 15px rgba(183,142,86,0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Send size={18} />
              Añade tu comentario
            </motion.button>
          </div>
        )}

        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              style={{
                marginTop: "3rem",
                background: "#fff",
                padding: "2.5rem",
                borderRadius: "16px",
                boxShadow: "0 20px 60px rgba(92,64,51,0.08)",
                border: "1px solid rgba(183,142,86,0.15)",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
                overflow: "hidden",
              }}
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
                    fontSize: "1.8rem",
                    fontWeight: 600,
                    color: "#5c4033",
                    fontFamily: "'Georgia', serif",
                    margin: 0,
                  }}
                >
                  Deja tu comentario
                </h3>
                <button
                  onClick={handleClose}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#8a7a5c",
                    padding: "0.25rem",
                    borderRadius: "50%",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "rgba(183,142,86,0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "transparent")
                  }
                >
                  <X size={24} />
                </button>
              </div>

              {error && (
                <div
                  style={{
                    background: "#ffe5e5",
                    color: "#d32f2f",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1.25rem",
                    fontSize: "0.9rem",
                  }}
                >
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              {success && (
                <div
                  style={{
                    background: "#e6f7e6",
                    color: "#2e7d32",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1.25rem",
                    fontSize: "0.9rem",
                  }}
                >
                  <Send size={18} />
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#5c4033",
                    fontWeight: 500,
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    marginBottom: "1.25rem",
                    border: "1px solid rgba(183,142,86,0.3)",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontFamily: "'Inter', sans-serif",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                    background: "#faf6f0",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#b78e56")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(183,142,86,0.3)")
                  }
                />

                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#5c4033",
                    fontWeight: 500,
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  Mensaje
                </label>
                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value.slice(0, MAX_CHARS))
                  }
                  placeholder="Escribe tu experiencia (máx. 250 caracteres)"
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    marginBottom: "0.5rem",
                    border: "1px solid rgba(183,142,86,0.3)",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontFamily: "'Inter', sans-serif",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                    background: "#faf6f0",
                    resize: "vertical",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#b78e56")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(183,142,86,0.3)")
                  }
                />
                <div
                  style={{
                    textAlign: "right",
                    fontSize: "0.85rem",
                    color: message.length >= MAX_CHARS ? "#d32f2f" : "#8a7a5c",
                    marginBottom: "1.25rem",
                  }}
                >
                  {message.length}/{MAX_CHARS}
                </div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#5c4033",
                    fontWeight: 500,
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  Valoración
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: "0.25rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <Star
                        size={32}
                        color="#b78e56"
                        fill={
                          (hoverRating || rating) >= star
                            ? "#b78e56"
                            : "transparent"
                        }
                        style={{ transition: "fill 0.2s ease" }}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={enviando}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background: enviando ? "#c4b49a" : "#b78e56",
                    color: "#faf6f0",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    cursor: enviando ? "wait" : "pointer",
                    transition: "background 0.3s ease",
                    fontFamily: "'Georgia', serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    opacity: enviando ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!enviando) e.target.style.background = "#a0784a";
                  }}
                  onMouseLeave={(e) => {
                    if (!enviando) e.target.style.background = "#b78e56";
                  }}
                >
                  <Send size={18} />
                  {enviando ? "Enviando..." : "Enviar comentario"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
