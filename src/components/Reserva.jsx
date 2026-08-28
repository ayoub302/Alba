// src/components/Reserva.jsx

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  PAISES,
  PAIS_DEFAULT,
  validarTelefono,
  limpiarNumero,
} from "../data/paises";

// ============================================
// CONFIGURACIÓN
// ============================================
const API_URL = "http://localhost:4000/api";

const SERVICIOS = [
  { nombre: "Alisado capilar", precio: 45 },
  { nombre: "Tratamiento a la proteína", precio: 55 },
  { nombre: "Coloración árabe", precio: 35 },
  { nombre: "Corte y peinado", precio: 25 },
  { nombre: "Maquillaje", precio: 40 },
  { nombre: "Otro / no lo sé aún", precio: null },
];

const HORARIOS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

// ============================================
// ESTILOS
// ============================================
const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  fontSize: "0.95rem",
  fontFamily: "'Georgia', serif",
  color: "#5c4033",
  background: "#fff",
  border: "1px solid rgba(183,142,86,0.3)",
  borderRadius: "8px",
  outline: "none",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
};

const labelStyle = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#8a7a5c",
  marginBottom: "0.5rem",
};

function Field({ label, children, hint }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {hint && (
        <p
          style={{
            fontSize: "0.75rem",
            color: "#8a7a5c",
            marginTop: "6px",
            fontFamily: "'Georgia', serif",
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

// ============================================
// SELECTOR DE PAÍS
// ============================================
function SelectorPais({ paisSeleccionado, onChange }) {
  const [abierto, setAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pais =
    PAISES.find((p) => p.codigo === paisSeleccionado) || PAIS_DEFAULT;

  const filtrados = PAISES.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.prefijo.includes(busqueda) ||
      p.codigo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        style={{
          ...inputStyle,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>{pais.bandera}</span>
        <span style={{ fontWeight: 500, color: "#5c4033" }}>
          {pais.prefijo}
        </span>
        <span style={{ color: "#8a7a5c", fontSize: "0.85rem" }}>
          {pais.nombre}
        </span>
        <span
          style={{ marginLeft: "auto", fontSize: "0.7rem", color: "#8a7a5c" }}
        >
          ▼
        </span>
      </button>

      {abierto && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid rgba(183,142,86,0.3)",
            borderRadius: "8px",
            boxShadow: "0 10px 40px rgba(92,64,51,0.12)",
            zIndex: 100,
            maxHeight: "280px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            placeholder="Buscar país..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              padding: "10px 14px",
              border: "none",
              borderBottom: "1px solid rgba(183,142,86,0.2)",
              outline: "none",
              fontFamily: "'Georgia', serif",
              fontSize: "0.9rem",
              color: "#5c4033",
            }}
            autoFocus
          />
          <div style={{ overflowY: "auto", maxHeight: "220px" }}>
            {filtrados.map((p) => (
              <button
                key={p.codigo}
                type="button"
                onClick={() => {
                  onChange(p.codigo);
                  setAbierto(false);
                  setBusqueda("");
                }}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "none",
                  background:
                    p.codigo === paisSeleccionado
                      ? "rgba(183,142,86,0.08)"
                      : "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'Georgia', serif",
                  fontSize: "0.9rem",
                  color: "#5c4033",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (p.codigo !== paisSeleccionado) {
                    e.target.style.background = "rgba(183,142,86,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (p.codigo !== paisSeleccionado) {
                    e.target.style.background = "transparent";
                  }
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{p.bandera}</span>
                <span style={{ fontWeight: 500, minWidth: "45px" }}>
                  {p.prefijo}
                </span>
                <span style={{ color: "#8a7a5c", fontSize: "0.85rem" }}>
                  {p.nombre}
                </span>
              </button>
            ))}
            {filtrados.length === 0 && (
              <p
                style={{
                  padding: "12px",
                  textAlign: "center",
                  color: "#8a7a5c",
                  fontSize: "0.85rem",
                }}
              >
                No se encontró ningún país
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// MODAL DE ÉXITO - CON MENSAJE PARA CLIENTES
// ============================================
function ModalExito({ visible, onClose, citaData }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          maxWidth: "500px",
          width: "100%",
          padding: "2.5rem 2rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>💌</div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontFamily: "'Georgia', serif",
            color: "#5c4033",
            marginBottom: "0.5rem",
          }}
        >
          ¡Hemos recibido tu solicitud!
        </h2>
        <p
          style={{
            color: "#8a7a5c",
            fontFamily: "'Georgia', serif",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            marginBottom: "1.5rem",
          }}
        >
          Gracias por confiar en Belleza Árabe. 💛
          <br />
          <strong>Te responderemos en menos de 24 horas</strong> para confirmar
          tu cita y resolver cualquier duda.
          <br />
          <br />
          <span style={{ fontSize: "0.85rem", color: "#b78e56" }}>
            Revisa tu correo y WhatsApp, que ahí te escribiremos.
          </span>
        </p>

        {citaData && (
          <div
            style={{
              background: "#faf6f0",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "left",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
              fontFamily: "'Georgia', serif",
              color: "#5c4033",
            }}
          >
            <p>
              <strong>Servicio:</strong> {citaData.servicio}
            </p>
            <p>
              <strong>Fecha:</strong> {citaData.fecha}
            </p>
            <p>
              <strong>Hora:</strong> {citaData.hora}
            </p>
            <p>
              <strong>Personas:</strong> {citaData.personas}
            </p>
            {citaData.precio && (
              <p>
                <strong>Precio orientativo:</strong>{" "}
                {citaData.precio * citaData.personas}€
              </p>
            )}
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            padding: "12px 40px",
            background: "#b78e56",
            color: "#faf6f0",
            border: "none",
            borderRadius: "999px",
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#a07d4a";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#b78e56";
          }}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function Reserva() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    pais: PAIS_DEFAULT.codigo,
    prefijo: PAIS_DEFAULT.prefijo,
    servicio: "",
    precio: null,
    personas: 1,
    fecha: "",
    hora: "",
    notas: "",
  });
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  const [citaGuardada, setCitaGuardada] = useState(null);
  const [ocupadas, setOcupadas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [cargandoHoras, setCargandoHoras] = useState(false);

  const precioTotal = form.precio ? form.precio * form.personas : null;

  // ============================================
  // CONSULTAR HORAS OCUPADAS
  // ============================================
  useEffect(() => {
    if (!form.fecha) return;

    const consultarDisponibilidad = async () => {
      setCargandoHoras(true);
      try {
        const res = await fetch(
          `${API_URL}/citas/disponibles?fecha=${form.fecha}`,
        );
        if (!res.ok) throw new Error("Error del servidor");
        const data = await res.json();
        setOcupadas(data.ocupadas || []);
      } catch {
        setError("No se pudo verificar disponibilidad. Intenta recargar.");
      } finally {
        setCargandoHoras(false);
      }
    };

    consultarDisponibilidad();
  }, [form.fecha]);

  // ============================================
  // HANDLERS
  // ============================================
  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "#b78e56";
    e.target.style.boxShadow = "0 0 0 3px rgba(183,142,86,0.12)";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "rgba(183,142,86,0.3)";
    e.target.style.boxShadow = "none";
  };

  const handlePaisChange = (codigo) => {
    const pais = PAISES.find((p) => p.codigo === codigo) || PAIS_DEFAULT;
    setForm((f) => ({
      ...f,
      pais: pais.codigo,
      prefijo: pais.prefijo,
      telefono: "",
    }));
    setError("");
  };

  const handleServicioChange = (e) => {
    const nombre = e.target.value;
    const serv = SERVICIOS.find((s) => s.nombre === nombre);
    setForm((f) => ({
      ...f,
      servicio: nombre,
      precio: serv ? serv.precio : null,
    }));
  };

  const handlePersonasChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > 10) val = 10;
    setForm((f) => ({ ...f, personas: val }));
  };

  // ============================================
  // ENVÍO DEL FORMULARIO
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito(false);

    // Validaciones
    if (!form.nombre.trim()) {
      setError("Por favor, introduce tu nombre.");
      return;
    }
    if (!form.telefono.trim()) {
      setError("Por favor, introduce tu teléfono.");
      return;
    }
    if (!form.servicio) {
      setError("Por favor, selecciona un servicio.");
      return;
    }

    const validacion = validarTelefono(form.telefono, form.pais);
    if (!validacion.valido) {
      setError(validacion.mensaje);
      return;
    }

    if (form.fecha && form.hora && ocupadas.includes(form.hora)) {
      setError("Esa hora ya ha sido reservada. Por favor, elige otra.");
      return;
    }

    setCargando(true);
    try {
      const res = await fetch(`${API_URL}/citas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          telefono: limpiarNumero(form.telefono),
          pais: form.pais,
          prefijo: form.prefijo,
          servicio: form.servicio,
          precio: form.precio,
          personas: form.personas,
          fecha: form.fecha,
          hora: form.hora,
          notas: form.notas.trim(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al guardar la cita");
      }

      setCitaGuardada({
        servicio: form.servicio,
        fecha: form.fecha,
        hora: form.hora,
        personas: form.personas,
        precio: form.precio,
      });
      setExito(true);
      setError("");

      // Resetear formulario
      setForm({
        nombre: "",
        telefono: "",
        pais: PAIS_DEFAULT.codigo,
        prefijo: PAIS_DEFAULT.prefijo,
        servicio: "",
        precio: null,
        personas: 1,
        fecha: "",
        hora: "",
        notas: "",
      });
      setOcupadas([]);
    } catch (err) {
      setError(
        err.message || "No se pudo guardar la cita. Inténtalo de nuevo.",
      );
    } finally {
      setCargando(false);
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div style={{ background: "#faf6f0", minHeight: "100vh" }}>
      <ModalExito
        visible={exito}
        onClose={() => setExito(false)}
        citaData={citaGuardada}
      />

      {/* HERO */}
      <section
        style={{
          padding: "10rem 1.5rem 5rem",
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
              "radial-gradient(circle at 70% 40%, rgba(183,142,86,0.08) 0%, transparent 50%)",
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
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#b78e56",
            }}
          >
            Reserva tu cita
          </span>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 300,
              color: "#faf6f0",
              marginTop: "1rem",
              fontFamily: "'Georgia', serif",
              lineHeight: 1.1,
            }}
          >
            Cuéntanos qué{" "}
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>
              necesitas
            </span>
          </h1>
          <p
            style={{
              marginTop: "1.5rem",
              maxWidth: "560px",
              marginLeft: "auto",
              marginRight: "auto",
              color: "rgba(250,246,240,0.7)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              fontFamily: "'Georgia', serif",
              fontWeight: 300,
            }}
          >
            Completa el formulario y te enviaremos la confirmación en menos de
            24 horas.
          </p>
        </motion.div>
      </section>

      {/* FORMULARIO */}
      <section style={{ padding: "5rem 1.5rem 6rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "16px",
            padding: "3rem 2.5rem",
            boxShadow: "0 20px 60px rgba(92,64,51,0.08)",
            border: "1px solid rgba(183,142,86,0.1)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* NOMBRE */}
            <Field label="Nombre completo *">
              <input
                type="text"
                value={form.nombre}
                onChange={update("nombre")}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Tu nombre"
                style={inputStyle}
              />
            </Field>

            {/* PAÍS + TELÉFONO */}
            <Field
              label="Teléfono *"
              hint={(() => {
                const p =
                  PAISES.find((x) => x.codigo === form.pais) || PAIS_DEFAULT;
                return `Formato: ${p.ejemplo} (${p.longitud} dígitos)`;
              })()}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  gap: "0.75rem",
                }}
              >
                <SelectorPais
                  paisSeleccionado={form.pais}
                  onChange={handlePaisChange}
                />
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={update("telefono")}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={(() => {
                    const p =
                      PAISES.find((x) => x.codigo === form.pais) ||
                      PAIS_DEFAULT;
                    return p.ejemplo;
                  })()}
                  style={inputStyle}
                />
              </div>
            </Field>

            {/* SERVICIO */}
            <Field label="Servicio deseado *">
              <select
                value={form.servicio}
                onChange={handleServicioChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="">Selecciona un servicio</option>
                {SERVICIOS.map((s) => (
                  <option key={s.nombre} value={s.nombre}>
                    {s.nombre}
                    {s.precio ? ` — ${s.precio}€` : ""}
                  </option>
                ))}
              </select>
              {form.precio && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#b78e56",
                    marginTop: "8px",
                    fontFamily: "'Georgia', serif",
                    fontWeight: 500,
                  }}
                >
                  Precio base: {form.precio}€
                  {form.personas > 1 && (
                    <span style={{ color: "#5c4033" }}>
                      {" "}
                      × {form.personas} personas ={" "}
                      <strong>{precioTotal}€</strong>
                    </span>
                  )}
                </p>
              )}
            </Field>

            {/* PERSONAS */}
            <Field label="Número de personas *" hint="Mínimo 1, máximo 10">
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      personas: Math.max(1, f.personas - 1),
                    }))
                  }
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: "1px solid rgba(183,142,86,0.3)",
                    background: "#fff",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: "#5c4033",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.personas}
                  onChange={handlePersonasChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    ...inputStyle,
                    width: "80px",
                    textAlign: "center",
                    fontVariantNumeric: "tabular-nums",
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      personas: Math.min(10, f.personas + 1),
                    }))
                  }
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: "1px solid rgba(183,142,86,0.3)",
                    background: "#fff",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: "#5c4033",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </button>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#8a7a5c",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {form.personas === 1
                    ? "1 persona"
                    : `${form.personas} personas`}
                </span>
              </div>
            </Field>

            {/* FECHA + HORA */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "0 1.5rem",
              }}
            >
              <Field label="Fecha preferida">
                <input
                  type="date"
                  value={form.fecha}
                  onChange={update("fecha")}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  min={new Date().toISOString().split("T")[0]}
                  style={inputStyle}
                />
              </Field>

              <Field label="Hora preferida">
                <select
                  value={form.hora}
                  onChange={update("hora")}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="">
                    {cargandoHoras
                      ? "Cargando horas..."
                      : "Selecciona una hora"}
                  </option>
                  {HORARIOS.map((h) => {
                    const isOcupada = ocupadas.includes(h);
                    return (
                      <option key={h} value={h} disabled={isOcupada}>
                        {h} {isOcupada ? "(ocupada)" : ""}
                      </option>
                    );
                  })}
                </select>
                {form.fecha && !cargandoHoras && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#8a7a5c",
                      marginTop: "6px",
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    {ocupadas.length === 0
                      ? "Todas las horas están libres para este día."
                      : `${ocupadas.length} hora(s) ya reservada(s).`}
                  </p>
                )}
              </Field>
            </div>

            {/* NOTAS */}
            <Field label="Notas adicionales">
              <textarea
                value={form.notas}
                onChange={update("notas")}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Cuéntanos cualquier detalle que debamos saber..."
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </Field>

            {error && (
              <p
                style={{
                  color: "#a8452f",
                  fontSize: "0.85rem",
                  marginBottom: "1.25rem",
                  fontFamily: "'Georgia', serif",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={cargando}
              style={{
                width: "100%",
                padding: "17px 40px",
                background: cargando ? "#c4b49a" : "#b78e56",
                color: "#faf6f0",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "2px solid #b78e56",
                borderRadius: "999px",
                cursor: cargando ? "wait" : "pointer",
                transition: "all 0.3s ease",
                opacity: cargando ? 0.8 : 1,
              }}
              onMouseEnter={(e) => {
                if (!cargando) {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#b78e56";
                }
              }}
              onMouseLeave={(e) => {
                if (!cargando) {
                  e.target.style.background = "#b78e56";
                  e.target.style.color = "#faf6f0";
                }
              }}
            >
              {cargando ? "Enviando..." : "Solicitar cita"}
            </button>

            <p
              style={{
                textAlign: "center",
                marginTop: "1rem",
                fontSize: "0.75rem",
                color: "#8a7a5c",
                fontFamily: "'Georgia', serif",
              }}
            >
              Te confirmaremos tu cita en menos de 24 horas por WhatsApp o
              correo.
            </p>
          </form>
        </motion.div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link
            to="/"
            style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#5c4033",
              textDecoration: "none",
              borderBottom: "1px solid rgba(92,64,51,0.3)",
              paddingBottom: "2px",
            }}
          >
            ← Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}
