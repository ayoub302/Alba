import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Send,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

// 👇 Usa variable de entorno
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const contactItems = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Donostia Kalea, 6 bajo\n20100 Errenteria",
  },
  { icon: Phone, label: "Teléfono", value: "688 76 67 28" },
];

const horario = [
  { dia: "Lunes", horas: "10:00 – 20:00" },
  { dia: "Martes", horas: "10:00 – 20:00" },
  { dia: "Miércoles", horas: "10:00 – 20:00" },
  { dia: "Jueves", horas: "10:00 – 20:00" },
  { dia: "Viernes", horas: "10:00 – 20:00" },
  { dia: "Sábado", horas: "10:00 – 20:00" },
  { dia: "Domingo", horas: "Cerrado", cerrado: true },
];

export default function Contact() {
  const [form, setForm] = useState({ nombre: "", telefono: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(form.telefono)) {
      setError(
        "El número de teléfono debe tener exactamente 9 dígitos (solo números).",
      );
      setEnviado(false);
      return;
    }

    if (!form.nombre || !form.telefono || !form.mensaje) {
      setError("Todos los campos son obligatorios.");
      setEnviado(false);
      return;
    }

    setError("");
    setEnviando(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          telefono: form.telefono.trim(),
          mensaje: form.mensaje.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al enviar el mensaje");
      }

      await response.json();

      setForm({ nombre: "", telefono: "", mensaje: "" });
      setError("");
      setEnviado(true);
      setTimeout(() => setEnviado(false), 5000);
    } catch (err) {
      console.error("❌ Error al enviar:", err);
      setError(err.message || "Error al enviar el mensaje");
      setEnviado(false);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section
      id="contacto"
      style={{
        padding: "6rem 1rem",
        background: "#faf6f0",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gap: "3rem",
          alignItems: "start",
          gridTemplateColumns: "1fr",
        }}
        className="contact-grid"
      >
        {/* ---- COLUMNA IZQUIERDA: FORMULARIO ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ padding: "0 0.5rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#b78e56",
            }}
          >
            <span
              style={{ width: "28px", height: "1px", background: "#b78e56" }}
            />
            Contacto
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
            Escríbenos
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              color: "#8a7a5c",
              fontWeight: 300,
              fontFamily: "'Georgia', serif",
              lineHeight: 1.7,
              fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
            }}
          >
            Si tienes cualquier duda o quieres más información, completa el
            formulario y lo recibiremos directamente.
          </p>

          {/* ---- FORMULARIO ---- */}
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <label
                style={{
                  fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                  fontWeight: 500,
                  color: "#5c4033",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                style={{
                  padding: "clamp(10px, 1.2vw, 14px) clamp(14px, 1.5vw, 18px)",
                  border: "1px solid rgba(183,142,86,0.3)",
                  borderRadius: "8px",
                  background: "#fff",
                  color: "#5c4033",
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#b78e56")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(183,142,86,0.3)")
                }
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <label
                style={{
                  fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                  fontWeight: 500,
                  color: "#5c4033",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Teléfono (9 dígitos)
              </label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                required
                maxLength={9}
                placeholder="Ej: 688766728"
                style={{
                  padding: "clamp(10px, 1.2vw, 14px) clamp(14px, 1.5vw, 18px)",
                  border: "1px solid rgba(183,142,86,0.3)",
                  borderRadius: "8px",
                  background: "#fff",
                  color: "#5c4033",
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#b78e56")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(183,142,86,0.3)")
                }
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <label
                style={{
                  fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                  fontWeight: 500,
                  color: "#5c4033",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Mensaje
              </label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Escribe tu consulta o duda"
                style={{
                  padding: "clamp(10px, 1.2vw, 14px) clamp(14px, 1.5vw, 18px)",
                  border: "1px solid rgba(183,142,86,0.3)",
                  borderRadius: "8px",
                  background: "#fff",
                  color: "#5c4033",
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
                  outline: "none",
                  resize: "vertical",
                  transition: "border-color 0.3s ease",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#b78e56")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(183,142,86,0.3)")
                }
              />
            </div>

            {/* ---- MENSAJE DE ERROR ---- */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    padding: "clamp(0.75rem, 1vw, 1.25rem) clamp(1rem, 1.5vw, 1.5rem)",
                    background: "#fdf9f5",
                    border: "1px solid rgba(163,53,38,0.25)",
                    borderRadius: "14px",
                    boxShadow: "0 8px 28px rgba(163,53,38,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(30px, 3vw, 36px)",
                      height: "clamp(30px, 3vw, 36px)",
                      borderRadius: "50%",
                      border: "1px solid rgba(163,53,38,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <AlertCircle size={16} color="#a33526" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: "#7a2e24",
                        margin: 0,
                        fontSize: "clamp(0.85rem, 1vw, 1rem)",
                        fontFamily: "'Georgia', serif",
                      }}
                    >
                      No hemos podido enviar tu mensaje
                    </p>
                    <p
                      style={{
                        color: "#9a5347",
                        margin: "5px 0 0 0",
                        fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)",
                        lineHeight: 1.55,
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={enviando}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "clamp(12px, 1.5vw, 16px) clamp(24px, 2.5vw, 32px)",
                background: enviando ? "#c4b49a" : "#b78e56",
                color: "#faf6f0",
                fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                border: "2px solid #b78e56",
                borderRadius: "999px",
                cursor: enviando ? "wait" : "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Georgia', serif",
                opacity: enviando ? 0.7 : 1,
                width: "100%",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                if (!enviando) {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#b78e56";
                }
              }}
              onMouseLeave={(e) => {
                if (!enviando) {
                  e.target.style.background = "#b78e56";
                  e.target.style.color = "#faf6f0";
                }
              }}
            >
              <Send size={16} />
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>

          {/* ---- MENSAJE DE ÉXITO ---- */}
          <AnimatePresence>
            {enviado && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{
                  marginTop: "1.25rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "clamp(0.75rem, 1vw, 1.25rem) clamp(1rem, 1.5vw, 1.5rem)",
                  background: "#fffdf9",
                  border: "1px solid rgba(183,142,86,0.28)",
                  borderRadius: "14px",
                  fontFamily: "'Georgia', serif",
                  boxShadow: "0 8px 28px rgba(183,142,86,0.08)",
                }}
              >
                <div
                  style={{
                    width: "clamp(30px, 3vw, 36px)",
                    height: "clamp(30px, 3vw, 36px)",
                    borderRadius: "50%",
                    border: "1px solid rgba(183,142,86,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={17} color="#b78e56" strokeWidth={1.6} />
                </div>
                <div>
                  <p
                    style={{
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "#5c4033",
                      margin: 0,
                      fontSize: "clamp(0.9rem, 1.05vw, 1.05rem)",
                    }}
                  >
                    Mensaje enviado con éxito
                  </p>
                  <p
                    style={{
                      color: "#8a7a5c",
                      margin: "5px 0 0 0",
                      fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)",
                      lineHeight: 1.55,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    Hemos recibido tu consulta. Nuestro equipo te contactará en
                    un plazo de 24 horas laborables. Gracias por confiar en
                    nosotros.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- INFO DE CONTACTO: TARJETA PREMIUM ---- */}
          <div
            style={{
              marginTop: "3rem",
              background:
                "linear-gradient(160deg, #2f2019 0%, #3d2b22 55%, #2f2019 100%)",
              borderRadius: "20px",
              padding: "1px",
              boxShadow: "0 30px 70px rgba(28,18,12,0.35)",
            }}
          >
            <div
              style={{
                border: "1px solid rgba(201,160,108,0.35)",
                borderRadius: "19px",
                padding: "clamp(1.5rem, 3vw, 3rem) clamp(1.5rem, 2.5vw, 2.75rem)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(201,160,108,0.035) 0px, rgba(201,160,108,0.035) 1px, transparent 1px, transparent 14px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "clamp(120px, 15vw, 190px)",
                  height: "clamp(120px, 15vw, 190px)",
                  borderRadius: "50%",
                  border: "1px solid rgba(201,160,108,0.22)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-14px",
                  right: "-14px",
                  width: "clamp(70px, 10vw, 110px)",
                  height: "clamp(70px, 10vw, 110px)",
                  borderRadius: "50%",
                  border: "1px solid rgba(201,160,108,0.18)",
                }}
              />

              <div style={{ position: "relative" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                  }}
                >
                  <span
                    style={{
                      width: "22px",
                      height: "1px",
                      background: "#c9a06c",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "clamp(0.6rem, 0.7vw, 0.7rem)",
                      fontWeight: 600,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#c9a06c",
                      margin: 0,
                    }}
                  >
                    Visítanos
                  </p>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#f6efe1",
                    fontFamily: "'Georgia', serif",
                    margin: "0.85rem 0 2.25rem 0",
                    letterSpacing: "0.01em",
                  }}
                >
                  Te esperamos
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.6rem",
                  }}
                >
                  {contactItems.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1.1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "clamp(32px, 3.5vw, 38px)",
                          height: "clamp(32px, 3.5vw, 38px)",
                          borderRadius: "50%",
                          border: "1px solid rgba(201,160,108,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <item.icon
                          size={16}
                          color="#d8b586"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div style={{ paddingTop: "6px" }}>
                        <p
                          style={{
                            fontSize: "clamp(0.55rem, 0.65vw, 0.68rem)",
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#a3835f",
                            margin: "0 0 0.35rem 0",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontSize: "clamp(0.85rem, 1vw, 1.02rem)",
                            color: "#f6efe1",
                            margin: 0,
                            lineHeight: 1.6,
                            fontWeight: 300,
                            fontFamily: "'Georgia', serif",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    margin: "2.25rem 0",
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "rgba(201,160,108,0.22)",
                    }}
                  />
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#c9a06c",
                      opacity: 0.6,
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "rgba(201,160,108,0.22)",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.1rem",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(32px, 3.5vw, 38px)",
                      height: "clamp(32px, 3.5vw, 38px)",
                      borderRadius: "50%",
                      border: "1px solid rgba(201,160,108,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={16} color="#d8b586" strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1, paddingTop: "6px" }}>
                    <p
                      style={{
                        fontSize: "clamp(0.55rem, 0.65vw, 0.68rem)",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#a3835f",
                        margin: "0 0 1rem 0",
                      }}
                    >
                      Horario de atención
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.65rem",
                      }}
                    >
                      {horario.map((h, i) => {
                        const hoy =
                          [
                            "Domingo",
                            "Lunes",
                            "Martes",
                            "Miércoles",
                            "Jueves",
                            "Viernes",
                            "Sábado",
                          ][new Date().getDay()] === h.dia;
                        return (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: "0.6rem",
                              fontFamily: "'Georgia', serif",
                              fontSize: "clamp(0.8rem, 0.9vw, 0.94rem)",
                            }}
                          >
                            <span
                              style={{
                                color: h.cerrado
                                  ? "rgba(246,239,225,0.4)"
                                  : hoy
                                    ? "#f6efe1"
                                    : "#e2cba4",
                                fontWeight: hoy ? 500 : 300,
                                fontStyle: hoy ? "normal" : "normal",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {h.dia}
                              {hoy && (
                                <span
                                  style={{
                                    marginLeft: "8px",
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "#2f2019",
                                    background: "#c9a06c",
                                    padding: "2px 7px",
                                    borderRadius: "999px",
                                    fontFamily: "system-ui, sans-serif",
                                    fontWeight: 600,
                                  }}
                                >
                                  Hoy
                                </span>
                              )}
                            </span>
                            <span
                              style={{
                                flex: 1,
                                borderBottom:
                                  "1px dotted rgba(201,160,108,0.3)",
                                transform: "translateY(-4px)",
                              }}
                            />
                            <span
                              style={{
                                color: h.cerrado ? "#c98b6c" : "#f6efe1",
                                fontWeight: h.cerrado ? 400 : 300,
                                fontStyle: h.cerrado ? "italic" : "normal",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {h.horas}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---- COLUMNA DERECHA: IMAGEN ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: "relative", padding: "0 0.5rem" }}
        >
          <div
            style={{
              aspectRatio: "3/4",
              overflow: "hidden",
              background: "#f5ebdc",
              borderRadius: "12px",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80"
              alt="Salón de belleza"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-0.75rem",
              left: "0.5rem",
              background: "#faf6f0",
              padding: "clamp(0.75rem, 1.5vw, 1.5rem)",
              boxShadow: "0 20px 60px rgba(92,64,51,0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(183,142,86,0.15)",
              maxWidth: "clamp(140px, 20vw, 220px)",
              width: "auto",
            }}
          >
            <div style={{ display: "flex", gap: "4px", color: "#b78e56" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size="clamp(12px, 1.2vw, 16px)" fill="#b78e56" color="#b78e56" />
              ))}
            </div>
            <p
              style={{
                fontSize: "clamp(0.7rem, 0.85vw, 0.875rem)",
                fontWeight: 500,
                color: "#5c4033",
                marginTop: "8px",
                fontFamily: "'Georgia', serif",
              }}
            >
              5,0 en Google Maps
            </p>
            <p
              style={{
                fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)",
                color: "#8a7a5c",
                marginTop: "2px",
              }}
            >
              5 reseñas reales
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
            gap: 4rem !important;
          }
        }

        @media (max-width: 480px) {
          .contact-grid {
            gap: 2rem !important;
          }
        }

        @media (min-width: 1024px) {
          .contact-grid {
            gap: 5rem !important;
          }
        }
      `}</style>
    </section>
  );
}