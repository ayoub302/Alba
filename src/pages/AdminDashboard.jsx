// src/pages/AdminDashboard.jsx
import { useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  CalendarDays,
  Star,
  Inbox,
  RefreshCw,
  CalendarX,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";

// ============================================
// CONFIGURACIÓN GLOBAL
// ============================================
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const WHATSAPP_NUMBER = "34688766728";

// ============================================
// ESTILOS RESPONSIVE CON CLAMP (grandes en móvil)
// ============================================
const labelStyle = {
  display: "block",
  fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)",
  fontWeight: 700,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "#5c4033",
  marginBottom: "0.6rem",
};

const textareaStyle = {
  width: "100%",
  padding: "clamp(14px, 1.8vw, 20px) clamp(16px, 2vw, 24px)",
  fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
  fontFamily: "'Inter', sans-serif",
  color: "#5c4033",
  background: "#fff",
  border: "1.5px solid rgba(183,142,86,0.4)",
  borderRadius: "12px",
  outline: "none",
  resize: "vertical",
  minHeight: "clamp(90px, 12vw, 120px)",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "clamp(12px, 1.5vw, 18px) clamp(18px, 2.5vw, 32px)",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)",
  fontWeight: 700,
  fontFamily: "'Inter', sans-serif",
  transition: "all 0.25s ease",
  whiteSpace: "nowrap",
};

const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: "clamp(1rem, 3vw, 2rem)",
};

const modalContentStyle = {
  background: "#fff",
  borderRadius: "20px",
  maxWidth: "min(550px, 95vw)",
  width: "100%",
  padding: "clamp(1.5rem, 3vw, 2.5rem)",
  boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
  maxHeight: "90vh",
  overflowY: "auto",
};

// ============================================
// COMPONENTE: RESENA CARD (responsive)
// ============================================
function ResenaCard({
  resena,
  onPublicar,
  onRechazar,
  onEliminar,
  showActions = true,
  showEliminar = false,
}) {
  const [eliminando, setEliminando] = useState(false);
  const isMobile = window.innerWidth < 600;

  const handleEliminar = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar esta reseña?")) return;
    setEliminando(true);
    await onEliminar(resena.id);
    setEliminando(false);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "14px",
        padding: "clamp(1.2rem, 1.8vw, 2rem) clamp(1.2rem, 2vw, 2.5rem)",
        marginBottom: "1.2rem",
        border: "1px solid rgba(183,142,86,0.15)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "stretch" : "flex-start",
        gap: "clamp(1rem, 2vw, 2rem)",
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(0.8rem, 1.2vw, 1.5rem)",
            flexWrap: "wrap",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              fontWeight: 800,
              color: "#5c4033",
              fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {resena.nombre}
          </span>
          <span
            style={{
              fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
              color: "#b78e56",
            }}
          >
            {"⭐".repeat(resena.rating)}
          </span>
          <span
            style={{
              fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)",
              color: "#8a7a5c",
            }}
          >
            {new Date(resena.creado).toLocaleDateString()}
          </span>
        </div>
        <p
          style={{
            margin: "8px 0 0",
            color: "#6b5b45",
            fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.7,
          }}
        >
          {resena.mensaje}
        </p>
        {resena.estado === "publicada" && resena.publicado && (
          <p
            style={{
              fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)",
              color: "#4CAF50",
              margin: "8px 0 0",
            }}
          >
            ✅ Publicada el {new Date(resena.publicado).toLocaleDateString()}
          </p>
        )}
        {resena.estado === "rechazada" && (
          <p
            style={{
              fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)",
              color: "#a8452f",
              margin: "8px 0 0",
            }}
          >
            ❌ Rechazada
          </p>
        )}
      </div>

      {showActions && (
        <div
          style={{
            display: "flex",
            gap: "0.9rem",
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => onPublicar(resena.id)}
            style={{
              ...buttonStyle,
              padding: "clamp(10px, 1.2vw, 14px) clamp(16px, 2vw, 26px)",
              background: "#4CAF50",
              color: "#fff",
              fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
            }}
          >
            ✅ Publicar
          </button>
          <button
            onClick={() => onRechazar(resena.id)}
            style={{
              ...buttonStyle,
              padding: "clamp(10px, 1.2vw, 14px) clamp(16px, 2vw, 26px)",
              background: "#e67e22",
              color: "#fff",
              fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
            }}
          >
            Rechazar
          </button>
        </div>
      )}

      {showEliminar && (
        <button
          onClick={handleEliminar}
          disabled={eliminando}
          style={{
            ...buttonStyle,
            padding: "clamp(10px, 1.2vw, 14px) clamp(16px, 2vw, 26px)",
            background: "transparent",
            color: "#a8452f",
            border: "2px solid #a8452f",
            fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
          }}
        >
          {eliminando ? "..." : "🗑️ Eliminar"}
        </button>
      )}
    </div>
  );
}

// ============================================
// SECCIÓN: RESEÑAS
// ============================================
function ResenasSection({
  resenas,
  cargandoResenas,
  onPublicar,
  onRechazar,
  onEliminar,
}) {
  if (cargandoResenas) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "#8a7a5c" }}>
        <p style={{ fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)" }}>
          Cargando reseñas...
        </p>
      </div>
    );
  }

  const pendientes = resenas.filter((r) => r.estado === "pendiente");
  const publicadas = resenas.filter((r) => r.estado === "publicada");
  const rechazadas = resenas.filter((r) => r.estado === "rechazada");

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
          gap: "clamp(1rem, 1.8vw, 2rem)",
          marginBottom: "2.5rem",
        }}
      >
        {[
          { label: "Pendientes", valor: pendientes.length, color: "#e67e22" },
          { label: "Publicadas", valor: publicadas.length, color: "#4CAF50" },
          { label: "Rechazadas", valor: rechazadas.length, color: "#a8452f" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "clamp(1rem, 1.5vw, 1.8rem)",
              border: "1px solid rgba(183,142,86,0.12)",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.8rem, 0.9vw, 0.95rem)",
                color: "#8a7a5c",
                margin: "0 0 8px",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: "clamp(1.8rem, 2.2vw, 2.4rem)",
                fontWeight: 300,
                color: stat.color,
                margin: 0,
              }}
            >
              {stat.valor}
            </p>
          </div>
        ))}
      </div>

      {pendientes.length > 0 && (
        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              color: "#e67e22",
              fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)",
              marginBottom: "1.2rem",
            }}
          >
            📝 Pendientes de moderar
          </h3>
          {pendientes.map((resena) => (
            <ResenaCard
              key={resena.id}
              resena={resena}
              onPublicar={onPublicar}
              onRechazar={onRechazar}
              onEliminar={onEliminar}
            />
          ))}
        </div>
      )}

      {publicadas.length > 0 && (
        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              color: "#4CAF50",
              fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)",
              marginBottom: "1.2rem",
            }}
          >
            ✅ Publicadas
          </h3>
          {publicadas.map((resena) => (
            <ResenaCard
              key={resena.id}
              resena={resena}
              onPublicar={onPublicar}
              onRechazar={onRechazar}
              onEliminar={onEliminar}
              showActions={false}
            />
          ))}
        </div>
      )}

      {rechazadas.length > 0 && (
        <div>
          <h3
            style={{
              color: "#a8452f",
              fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)",
              marginBottom: "1.2rem",
            }}
          >
            ❌ Rechazadas
          </h3>
          {rechazadas.map((resena) => (
            <ResenaCard
              key={resena.id}
              resena={resena}
              onPublicar={onPublicar}
              onRechazar={onRechazar}
              onEliminar={onEliminar}
              showActions={false}
              showEliminar={true}
            />
          ))}
        </div>
      )}

      {resenas.length === 0 && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#8a7a5c" }}>
          <p style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}>
            No hay reseñas registradas.
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================
// SECCIÓN: MENSAJES
// ============================================
function MensajesSection({
  mensajes,
  cargandoMensajes,
  onLeer,
  onEliminar,
  onResponder,
}) {
  if (cargandoMensajes) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "#8a7a5c" }}>
        <p style={{ fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)" }}>
          Cargando mensajes...
        </p>
      </div>
    );
  }

  const pendientes = mensajes.filter((m) => m.estado === "pendiente");
  const leidos = mensajes.filter((m) => m.estado === "leido");
  const isMobile = window.innerWidth < 600;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
          gap: "clamp(1rem, 1.8vw, 2rem)",
          marginBottom: "2.5rem",
        }}
      >
        {[
          { label: "Pendientes", valor: pendientes.length, color: "#e67e22" },
          { label: "Leídos", valor: leidos.length, color: "#4CAF50" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "clamp(1rem, 1.5vw, 1.8rem)",
              border: "1px solid rgba(183,142,86,0.12)",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.8rem, 0.9vw, 0.95rem)",
                color: "#8a7a5c",
                margin: "0 0 8px",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: "clamp(1.8rem, 2.2vw, 2.4rem)",
                fontWeight: 300,
                color: stat.color,
                margin: 0,
              }}
            >
              {stat.valor}
            </p>
          </div>
        ))}
      </div>

      {pendientes.length > 0 && (
        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              color: "#e67e22",
              fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)",
              marginBottom: "1.2rem",
            }}
          >
            📩 Pendientes
          </h3>
          {pendientes.map((mensaje) => (
            <div
              key={mensaje.id}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding:
                  "clamp(1.2rem, 1.8vw, 2rem) clamp(1.2rem, 2vw, 2.5rem)",
                marginBottom: "1.2rem",
                border: "1px solid rgba(183,142,86,0.12)",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "stretch" : "flex-start",
                gap: "clamp(1rem, 2vw, 2rem)",
              }}
            >
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: 800,
                    color: "#5c4033",
                    fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)",
                    fontFamily: "'Inter', sans-serif",
                    margin: "0 0 8px",
                  }}
                >
                  {mensaje.nombre} • {mensaje.telefono}
                </p>
                <p
                  style={{
                    margin: "0 0 8px",
                    color: "#6b5b45",
                    fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.7,
                  }}
                >
                  {mensaje.mensaje}
                </p>
                <p
                  style={{
                    fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)",
                    color: "#8a7a5c",
                  }}
                >
                  {new Date(mensaje.creado).toLocaleDateString()}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.9rem",
                  flexShrink: 0,
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => onResponder(mensaje)}
                  style={{
                    ...buttonStyle,
                    padding: "clamp(10px, 1.2vw, 14px) clamp(16px, 2vw, 26px)",
                    background: "#25D366",
                    color: "#fff",
                    fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                  }}
                >
                  <MessageCircle size={18} style={{ marginRight: "8px" }} />{" "}
                  Responder
                </button>
                <button
                  onClick={() => onLeer(mensaje.id)}
                  style={{
                    ...buttonStyle,
                    padding: "clamp(10px, 1.2vw, 14px) clamp(16px, 2vw, 26px)",
                    background: "#4CAF50",
                    color: "#fff",
                    fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                  }}
                >
                  ✅ Leído
                </button>
                <button
                  onClick={() => onEliminar(mensaje.id)}
                  style={{
                    ...buttonStyle,
                    padding: "clamp(10px, 1.2vw, 14px) clamp(16px, 2vw, 26px)",
                    background: "transparent",
                    color: "#a8452f",
                    border: "2px solid #a8452f",
                    fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                  }}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {leidos.length > 0 && (
        <div>
          <h3
            style={{
              color: "#4CAF50",
              fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)",
              marginBottom: "1.2rem",
            }}
          >
            ✅ Leídos
          </h3>
          {leidos.map((mensaje) => (
            <div
              key={mensaje.id}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding:
                  "clamp(1.2rem, 1.8vw, 2rem) clamp(1.2rem, 2vw, 2.5rem)",
                marginBottom: "1.2rem",
                border: "1px solid rgba(183,142,86,0.12)",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "stretch" : "flex-start",
                gap: "clamp(1rem, 2vw, 2rem)",
              }}
            >
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: 800,
                    color: "#5c4033",
                    fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)",
                    fontFamily: "'Inter', sans-serif",
                    margin: "0 0 8px",
                  }}
                >
                  {mensaje.nombre} • {mensaje.telefono}
                </p>
                <p
                  style={{
                    margin: "0 0 8px",
                    color: "#6b5b45",
                    fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.7,
                  }}
                >
                  {mensaje.mensaje}
                </p>
                <p
                  style={{
                    fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)",
                    color: "#8a7a5c",
                  }}
                >
                  {new Date(mensaje.creado).toLocaleDateString()}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.9rem",
                  flexShrink: 0,
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => onResponder(mensaje)}
                  style={{
                    ...buttonStyle,
                    padding: "clamp(10px, 1.2vw, 14px) clamp(16px, 2vw, 26px)",
                    background: "#25D366",
                    color: "#fff",
                    fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                  }}
                >
                  <MessageCircle size={18} style={{ marginRight: "8px" }} />{" "}
                  Responder
                </button>
                <button
                  onClick={() => onEliminar(mensaje.id)}
                  style={{
                    ...buttonStyle,
                    padding: "clamp(10px, 1.2vw, 14px) clamp(16px, 2vw, 26px)",
                    background: "transparent",
                    color: "#a8452f",
                    border: "2px solid #a8452f",
                    fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                  }}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {mensajes.length === 0 && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#8a7a5c" }}>
          <p style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}>
            No hay mensajes registrados.
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================
// SECCIÓN: ANÁLISIS (gráfico + PDF)
// ============================================
const DIAS_CORTOS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function formatFechaCorta(iso) {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}

function formatFechaLarga(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function GraficoSemana({ porDia }) {
  const maxVisitas = Math.max(1, ...porDia.map((d) => d.visitas));
  const maxCitas = Math.max(1, ...porDia.map((d) => d.citas));

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "clamp(1rem, 2.5vw, 2.5rem)",
          height: "clamp(150px, 22vw, 200px)",
          padding: "0 6px",
        }}
      >
        {porDia.map((d, i) => (
          <div
            key={d.fecha}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                height: "clamp(100px, 16vw, 160px)",
              }}
            >
              <div
                title={`Visitas: ${d.visitas}`}
                style={{
                  width: "clamp(14px, 2vw, 22px)",
                  borderRadius: "6px 6px 0 0",
                  background: "#b78e56",
                  height: `${Math.max(4, (d.visitas / maxVisitas) * 100)}%`,
                  transition: "height 0.5s ease",
                }}
              />
              <div
                title={`Citas: ${d.citas}`}
                style={{
                  width: "clamp(14px, 2vw, 22px)",
                  borderRadius: "6px 6px 0 0",
                  background: "#5c4033",
                  height: `${Math.max(4, (d.citas / maxCitas) * 100)}%`,
                  transition: "height 0.5s ease",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "clamp(0.8rem, 1vw, 1rem)",
                color: "#a89a80",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: 700,
              }}
            >
              {DIAS_CORTOS[i]}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          marginTop: "2rem",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
            color: "#8a7a5c",
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#b78e56",
            }}
          />
          Visitas
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
            color: "#8a7a5c",
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#5c4033",
            }}
          />
          Citas nuevas
        </span>
      </div>
    </div>
  );
}

function generarInformePDF(analisis) {
  if (!analisis) return;

  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(92, 64, 51);
  doc.text("Belleza Árabe", 14, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(138, 122, 92);
  doc.text("Informe semanal de actividad", 14, 27);
  doc.text(
    `Semana del ${formatFechaLarga(analisis.semana.desde)} al ${formatFechaLarga(analisis.semana.hasta)}`,
    14,
    33,
  );

  doc.setDrawColor(183, 142, 86);
  doc.line(14, 38, 196, 38);

  let y = 50;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(92, 64, 51);
  doc.text("Resumen de la semana", 14, y);
  y += 10;

  const filas = [
    ["Visitas a la web", analisis.resumen.visitas],
    ["Citas nuevas", analisis.resumen.citasNuevas],
    ["Citas confirmadas", analisis.resumen.citasConfirmadas],
    ["Citas canceladas", analisis.resumen.citasCanceladas],
    ["Reseñas recibidas", analisis.resumen.resenasNuevas],
    ["Reseñas publicadas", analisis.resumen.resenasPublicadas],
    ["Mensajes de contacto recibidos", analisis.resumen.mensajesNuevos],
    ["Tasa de conversión", `${analisis.resumen.tasaConversion}%`],
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  filas.forEach(([label, valor]) => {
    doc.setTextColor(107, 91, 69);
    doc.text(String(label), 14, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(92, 64, 51);
    doc.text(String(valor), 165, y);
    doc.setFont("helvetica", "normal");
    y += 7.5;
  });

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(92, 64, 51);
  doc.text("Detalle día a día", 14, y);
  y += 9;

  doc.setFontSize(9.5);
  doc.setTextColor(138, 122, 92);
  doc.text("Día", 14, y);
  doc.text("Visitas", 100, y);
  doc.text("Citas nuevas", 145, y);
  y += 4;
  doc.setDrawColor(225, 213, 190);
  doc.line(14, y, 196, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  analisis.porDia.forEach((d) => {
    doc.setTextColor(92, 64, 51);
    doc.text(formatFechaLarga(d.fecha), 14, y);
    doc.text(String(d.visitas), 100, y);
    doc.text(String(d.citas), 145, y);
    y += 7;
  });

  doc.setFontSize(8);
  doc.setTextColor(168, 154, 128);
  doc.text(
    `Generado el ${new Date().toLocaleDateString()} — Panel de administración`,
    14,
    285,
  );
  doc.save(`informe-semanal-belleza-arabe-${analisis.semana.desde}.pdf`);
}

function AnalisisSection({
  analisis,
  cargandoAnalisis,
  semanaOffset,
  onCambiarSemana,
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "clamp(1rem, 1.8vw, 2rem)",
          marginBottom: "2.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(0.6rem, 1.2vw, 1.5rem)",
          }}
        >
          <button
            onClick={() => onCambiarSemana(semanaOffset - 1)}
            style={{
              width: "clamp(38px, 4.5vw, 48px)",
              height: "clamp(38px, 4.5vw, 48px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "2px solid rgba(183,142,86,0.4)",
              borderRadius: "50%",
              color: "#5c4033",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <span
            style={{
              fontSize: "clamp(1rem, 1.2vw, 1.3rem)",
              color: "#5c4033",
              minWidth: "clamp(180px, 28vw, 240px)",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            {analisis
              ? `${formatFechaCorta(analisis.semana.desde)} — ${formatFechaCorta(analisis.semana.hasta)}`
              : "Cargando semana..."}
            {semanaOffset === 0 && (
              <span
                style={{
                  color: "#b78e56",
                  fontSize: "0.9rem",
                  marginLeft: "10px",
                }}
              >
                · esta semana
              </span>
            )}
          </span>
          <button
            onClick={() => onCambiarSemana(semanaOffset + 1)}
            disabled={semanaOffset >= 0}
            style={{
              width: "clamp(38px, 4.5vw, 48px)",
              height: "clamp(38px, 4.5vw, 48px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "2px solid rgba(183,142,86,0.4)",
              borderRadius: "50%",
              color: semanaOffset >= 0 ? "#d8cdb8" : "#5c4033",
              cursor: semanaOffset >= 0 ? "not-allowed" : "pointer",
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <button
          onClick={() => generarInformePDF(analisis)}
          disabled={!analisis}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "clamp(12px, 1.5vw, 18px) clamp(20px, 2.5vw, 32px)",
            background: "#b78e56",
            color: "#faf6f0",
            border: "none",
            borderRadius: "12px",
            cursor: analisis ? "pointer" : "not-allowed",
            opacity: analisis ? 1 : 0.5,
            fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
          }}
        >
          <Download size={20} />
          Descargar informe PDF
        </button>
      </div>

      {cargandoAnalisis && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#8a7a5c" }}>
          <p style={{ fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)" }}>
            Calculando análisis...
          </p>
        </div>
      )}

      {!cargandoAnalisis && analisis && (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(1.5rem, 3vw, 3.5rem)",
              marginBottom: "2.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid rgba(183,142,86,0.15)",
            }}
          >
            {[
              {
                label: "Visitas",
                valor: analisis.resumen.visitas,
                color: "#b78e56",
              },
              {
                label: "Citas nuevas",
                valor: analisis.resumen.citasNuevas,
                color: "#5c4033",
              },
              {
                label: "Reseñas",
                valor: analisis.resumen.resenasNuevas,
                color: "#8a7a5c",
              },
              {
                label: "Mensajes",
                valor: analisis.resumen.mensajesNuevos,
                color: "#8a7a5c",
              },
              {
                label: "Conversión",
                valor: `${analisis.resumen.tasaConversion}%`,
                color: "#4CAF50",
              },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontSize: "clamp(2.2rem, 2.8vw, 2.8rem)",
                    fontWeight: 200,
                    color: stat.color,
                    margin: 0,
                    lineHeight: 1.1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stat.valor}
                </p>
                <p
                  style={{
                    fontSize: "clamp(0.8rem, 0.9vw, 0.95rem)",
                    color: "#a89a80",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    margin: "4px 0 0",
                    fontWeight: 700,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "clamp(1.8rem, 2.5vw, 3rem)",
              border: "1px solid rgba(183,142,86,0.1)",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(1.1rem, 1.3vw, 1.4rem)",
                fontWeight: 700,
                color: "#5c4033",
                margin: "0 0 1.8rem",
              }}
            >
              Visitas y citas por día
            </h3>
            <GraficoSemana porDia={analisis.porDia} />
          </div>

          {analisis.resumen.visitas === 0 && (
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.05vw, 1.1rem)",
                color: "#a89a80",
                fontStyle: "italic",
              }}
            >
              Aún no hay visitas registradas para esta semana. El contador
              empieza a sumar en cuanto esté activo en la web pública.
            </p>
          )}
        </>
      )}
    </div>
  );
}

// ============================================
// NAVEGACIÓN DE SECCIONES (más grande en móvil)
// ============================================
const SECCIONES = [
  { id: "citas", label: "Citas", icon: CalendarDays },
  { id: "resenas", label: "Reseñas", icon: Star },
  { id: "mensajes", label: "Mensajes", icon: Inbox },
  { id: "analisis", label: "Análisis", icon: BarChart3 },
];

function SeccionNav({ activa, onChange, counts }) {
  return (
    <div
      role="tablist"
      aria-label="Secciones del panel"
      style={{
        display: "flex",
        gap: "clamp(1rem, 2.5vw, 3rem)",
        marginBottom: "3rem",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      {SECCIONES.map(({ id, label, icon: Icon }) => {
        const isActive = activa === id;
        const count = counts[id];
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 1.2vw, 16px)",
              padding: "clamp(12px, 1.5vw, 20px) clamp(18px, 2.5vw, 32px)",
              background: isActive ? "#b78e56" : "transparent",
              border: isActive ? "none" : "2px solid rgba(183,142,86,0.3)",
              borderRadius: "60px",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 1.2vw, 1.3rem)",
              fontWeight: isActive ? 800 : 600,
              color: isActive ? "#fff" : "#5c4033",
              transition: "all 0.25s ease",
              boxShadow: isActive ? "0 8px 25px rgba(183,142,86,0.35)" : "none",
            }}
          >
            <Icon size={22} strokeWidth={isActive ? 2.8 : 2} />
            {label}
            {!!count && (
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  color: isActive ? "#fff" : "#b78e56",
                  background: isActive
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(183,142,86,0.15)",
                  borderRadius: "999px",
                  padding: "2px 12px",
                  lineHeight: 1.5,
                }}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================
// ADMIN DASHBOARD PRINCIPAL
// ============================================
export default function AdminDashboard() {
  const { getAccessTokenSilently } = useAuth0();

  // Estados
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [filtroFecha, setFiltroFecha] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [eliminando, setEliminando] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [accion, setAccion] = useState(null);

  const [resenas, setResenas] = useState([]);
  const [cargandoResenas, setCargandoResenas] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("citas");

  const [mensajes, setMensajes] = useState([]);
  const [cargandoMensajes, setCargandoMensajes] = useState(false);

  const [analisis, setAnalisis] = useState(null);
  const [cargandoAnalisis, setCargandoAnalisis] = useState(false);
  const [semanaOffset, setSemanaOffset] = useState(0);

  const [mensajeResponder, setMensajeResponder] = useState("");
  const [mensajeActual, setMensajeActual] = useState(null);
  const [modalWhatsApp, setModalWhatsApp] = useState(false);

  // ============================================
  // FUNCIONES DE CARGA
  // ============================================
  const cargarCitas = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });
      setCargando(true);
      setError("");
      const url = filtroFecha
        ? `${API_URL}/admin/citas?fecha=${filtroFecha}`
        : `${API_URL}/admin/citas`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Error al cargar citas");
      const data = await res.json();
      setCitas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [getAccessTokenSilently, filtroFecha]);

  const cargarResenas = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });
      setCargandoResenas(true);
      const res = await fetch(`${API_URL}/admin/resenas`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Error al cargar reseñas");
      const data = await res.json();
      setResenas(data);
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setCargandoResenas(false);
    }
  }, [getAccessTokenSilently]);

  const cargarMensajes = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });
      setCargandoMensajes(true);
      const res = await fetch(`${API_URL}/contact/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Error al cargar mensajes");
      const data = await res.json();
      setMensajes(data);
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setCargandoMensajes(false);
    }
  }, [getAccessTokenSilently]);

  const cargarAnalisis = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });
      setCargandoAnalisis(true);
      const hoy = new Date();
      hoy.setDate(hoy.getDate() + semanaOffset * 7);
      const desde = hoy.toISOString().split("T")[0];
      const res = await fetch(
        `${API_URL}/admin/analytics/semanal?desde=${desde}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!res.ok) throw new Error("Error al cargar el análisis");
      const data = await res.json();
      setAnalisis(data);
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setCargandoAnalisis(false);
    }
  }, [getAccessTokenSilently, semanaOffset]);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      if (!mounted) return;
      if (seccionActiva === "citas") await cargarCitas();
      else if (seccionActiva === "resenas") await cargarResenas();
      else if (seccionActiva === "mensajes") await cargarMensajes();
      else if (seccionActiva === "analisis") await cargarAnalisis();
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, [
    seccionActiva,
    cargarCitas,
    cargarResenas,
    cargarMensajes,
    cargarAnalisis,
  ]);

  // ============================================
  // ACCIONES DE RESEÑAS Y MENSAJES
  // ============================================
  const publicarResena = async (id) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });
      const res = await fetch(`${API_URL}/admin/resenas/${id}/publicar`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Error al publicar");
      await cargarResenas();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const rechazarResena = async (id) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });
      const res = await fetch(`${API_URL}/admin/resenas/${id}/rechazar`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Error al rechazar");
      await cargarResenas();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const eliminarResena = async (id) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });
      const res = await fetch(`${API_URL}/admin/resenas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Error al eliminar");
      await cargarResenas();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const leerMensaje = async (id) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });
      const res = await fetch(`${API_URL}/contact/${id}/leer`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Error al marcar como leído");
      await cargarMensajes();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const eliminarMensaje = async (id) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });
      const res = await fetch(`${API_URL}/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Error al eliminar");
      await cargarMensajes();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const abrirResponder = (mensaje) => {
    setMensajeActual(mensaje);
    setMensajeResponder(`Hola ${mensaje.nombre}, hemos recibido tu mensaje. `);
    setModalWhatsApp(true);
  };

  const enviarRespuestaWhatsApp = () => {
    if (!mensajeActual || !mensajeResponder.trim()) return;
    const numeroCompleto = `34${mensajeActual.telefono}`;
    const url = `https://wa.me/${numeroCompleto}?text=${encodeURIComponent(
      mensajeResponder,
    )}`;
    window.open(url, "_blank", "noreferrer");
    setModalWhatsApp(false);
    setMensajeResponder("");
    setMensajeActual(null);
  };

  // ============================================
  // ACCIONES DE CITAS
  // ============================================
  const enviarWhatsApp = (telefono, mensaje) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      mensaje,
    )}`;
    window.open(url, "_blank", "noreferrer");
  };

  const handleAceptar = (cita) => {
    setAccion("aceptar");
    setModalAbierto(cita);
    setMensaje("");
  };

  const handleCancelar = (cita) => {
    setAccion("cancelar");
    setModalAbierto(cita);
    setMotivo("");
  };

  const confirmarAccion = async () => {
    if (!modalAbierto) return;
    if (accion === "cancelar" && !motivo.trim()) {
      alert("❌ El motivo de cancelación es obligatorio.");
      return;
    }
    setEliminando(modalAbierto.id);
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });
      const endpoint =
        accion === "aceptar"
          ? `${API_URL}/admin/citas/${modalAbierto.id}/confirmar`
          : `${API_URL}/admin/citas/${modalAbierto.id}/cancelar`;
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("No se pudo realizar la acción");

      let mensajeWhatsApp = "";
      if (accion === "aceptar") {
        mensajeWhatsApp = `✨ ¡Hola ${modalAbierto.nombre}! Tu cita en Belleza Árabe ha sido CONFIRMADA.
📅 Fecha: ${formatFecha(modalAbierto.fecha)}
⏰ Hora: ${modalAbierto.hora}
💇 Servicio: ${modalAbierto.servicio}
👤 Personas: ${modalAbierto.personas}
${mensaje ? `📝 Nota: ${mensaje}` : "¡Te esperamos!"}
¡Gracias por confiar en Belleza Árabe! 💛`;
      } else {
        mensajeWhatsApp = `❌ Hola ${modalAbierto.nombre}, lamentamos informarte que tu cita en Belleza Árabe ha sido CANCELADA.
📅 Fecha: ${formatFecha(modalAbierto.fecha)}
⏰ Hora: ${modalAbierto.hora}
💇 Servicio: ${modalAbierto.servicio}
📝 Motivo: ${motivo}
Lamentamos las molestias. Puedes reservar nuevamente cuando quieras. 💛`;
      }
      enviarWhatsApp(modalAbierto.telefono, mensajeWhatsApp);
      setCitas((prev) => prev.filter((c) => c.id !== modalAbierto.id));
      setModalAbierto(null);
      setMotivo("");
      setMensaje("");
      setAccion(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setEliminando(null);
    }
  };

  const formatFecha = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const citasPorFecha = citas.reduce((acc, cita) => {
    if (!acc[cita.fecha]) acc[cita.fecha] = [];
    acc[cita.fecha].push(cita);
    return acc;
  }, {});
  const fechasOrdenadas = Object.keys(citasPorFecha).sort();

  // ============================================
  // RENDER PRINCIPAL (sin perfil duplicado)
  // ============================================
  return (
    <div
      style={{
        background: "#faf6f0",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        paddingTop: "clamp(80px, 14vw, 140px)",
      }}
    >
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(0.8rem, 2.5vw, 2.5rem)",
        }}
      >
        {/* ================================================ */}
        {/* NAVEGACIÓN DE SECCIONES (pestañas)              */}
        {/* ================================================ */}
        <SeccionNav
          activa={seccionActiva}
          onChange={setSeccionActiva}
          counts={{
            citas: citas.length,
            resenas: resenas.filter((r) => r.estado === "pendiente").length,
            mensajes: mensajes.filter((m) => m.estado === "pendiente").length,
          }}
        />

        {/* ===== SECCIÓN CITAS ===== */}
        {seccionActiva === "citas" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "clamp(1rem, 1.8vw, 2rem)",
                marginBottom: "2.5rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid rgba(183,142,86,0.15)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "clamp(1.8rem, 3vw, 4rem)",
                  flexWrap: "wrap",
                }}
              >
                {[
                  {
                    label: "Total citas",
                    valor: citas.length,
                    color: "#b78e56",
                  },
                  {
                    label: "Hoy",
                    valor: citas.filter(
                      (c) => c.fecha === new Date().toISOString().split("T")[0],
                    ).length,
                    color: "#5c4033",
                  },
                  {
                    label: "Esta semana",
                    valor: citas.filter((c) => {
                      const hoy = new Date();
                      const cita = new Date(c.fecha);
                      const diff = (cita - hoy) / (1000 * 60 * 60 * 24);
                      return diff >= 0 && diff <= 7;
                    }).length,
                    color: "#8a7a5c",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <p
                      style={{
                        fontSize: "clamp(2rem, 2.5vw, 2.6rem)",
                        fontWeight: 200,
                        color: stat.color,
                        margin: 0,
                        lineHeight: 1.1,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {stat.valor}
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(0.75rem, 0.9vw, 1rem)",
                        color: "#a89a80",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        margin: "6px 0 0",
                        fontWeight: 700,
                      }}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(0.6rem, 1.2vw, 1.5rem)",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "clamp(0.8rem, 0.9vw, 1rem)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#a89a80",
                      marginBottom: "6px",
                      fontWeight: 700,
                    }}
                  >
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      fontSize: "clamp(0.95rem, 1.1vw, 1.2rem)",
                      fontFamily: "'Inter', sans-serif",
                      color: "#5c4033",
                      background: "transparent",
                      border: "none",
                      borderBottom: "2px solid rgba(183,142,86,0.4)",
                      outline: "none",
                      fontWeight: 600,
                    }}
                  />
                </div>
                {filtroFecha && (
                  <button
                    onClick={() =>
                      setFiltroFecha(new Date().toISOString().split("T")[0])
                    }
                    style={{
                      background: "transparent",
                      color: "#8a7a5c",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "clamp(0.9rem, 1vw, 1.1rem)",
                      fontFamily: "'Inter', sans-serif",
                      textDecoration: "underline",
                      textUnderlineOffset: "4px",
                      fontWeight: 600,
                    }}
                  >
                    Hoy
                  </button>
                )}
                <button
                  onClick={cargarCitas}
                  title="Actualizar"
                  style={{
                    width: "clamp(42px, 5vw, 54px)",
                    height: "clamp(42px, 5vw, 54px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#b78e56",
                    color: "#faf6f0",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(168,69,47,0.08)",
                  border: "1px solid rgba(168,69,47,0.25)",
                  color: "#a8452f",
                  padding: "1.2rem 1.8rem",
                  borderRadius: "14px",
                  marginBottom: "2rem",
                  fontSize: "clamp(1rem, 1.1vw, 1.2rem)",
                }}
              >
                ❌ {error}
              </div>
            )}

            {cargando && (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem",
                  color: "#8a7a5c",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "4px solid rgba(183,142,86,0.2)",
                    borderTopColor: "#b78e56",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto 1.5rem",
                  }}
                />
                <style>
                  {`@keyframes spin { to { transform: rotate(360deg); } }`}
                </style>
                <p style={{ fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)" }}>
                  Cargando citas...
                </p>
              </div>
            )}

            {!cargando && citas.length === 0 && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: "center", padding: "5rem 2rem" }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto 1.5rem",
                    borderRadius: "50%",
                    border: "2px dashed rgba(183,142,86,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#b78e56",
                  }}
                >
                  <CalendarX size={36} strokeWidth={1.5} />
                </div>
                <p
                  style={{
                    fontSize: "clamp(1.2rem, 1.4vw, 1.5rem)",
                    fontWeight: 700,
                    color: "#5c4033",
                    margin: "0 0 10px",
                  }}
                >
                  No hay citas{" "}
                  {filtroFecha
                    ? `para el ${formatFecha(filtroFecha)}`
                    : "registradas"}
                </p>
                <p
                  style={{
                    fontSize: "clamp(1rem, 1.1vw, 1.2rem)",
                    color: "#a89a80",
                    margin: 0,
                  }}
                >
                  Aparecerán aquí en cuanto un cliente reserve.
                </p>
              </motion.div>
            )}

            {!cargando &&
              citas.length > 0 &&
              fechasOrdenadas.map((fecha) => (
                <motion.div
                  key={fecha}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginBottom: "2.5rem" }}
                >
                  <h2
                    style={{
                      fontSize: "clamp(1rem, 1.2vw, 1.3rem)",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#b78e56",
                      margin: "0 0 1.2rem",
                      paddingLeft: "6px",
                    }}
                  >
                    {formatFecha(fecha)}
                    <span
                      style={{
                        color: "#8a7a5c",
                        fontWeight: 600,
                        marginLeft: "12px",
                      }}
                    >
                      ({citasPorFecha[fecha].length} cita
                      {citasPorFecha[fecha].length > 1 ? "s" : ""})
                    </span>
                  </h2>

                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "18px",
                      border: "1px solid rgba(183,142,86,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    {citasPorFecha[fecha].map((cita) => (
                      <div
                        key={cita.id}
                        style={{
                          padding:
                            "clamp(1.2rem, 1.8vw, 2rem) clamp(1.2rem, 2.2vw, 2.5rem)",
                          borderBottom: "1px solid rgba(183,142,86,0.08)",
                          display: "grid",
                          gridTemplateColumns:
                            window.innerWidth < 600
                              ? "1fr 1fr"
                              : "100px 1fr 160px 130px 1fr",
                          gap: "clamp(0.6rem, 1.4vw, 1.8rem)",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontSize: "clamp(1.1rem, 1.3vw, 1.4rem)",
                              fontWeight: 800,
                              color: "#5c4033",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {cita.hora}
                          </span>
                        </div>
                        <div>
                          <p
                            style={{
                              margin: "0 0 6px",
                              fontWeight: 700,
                              color: "#5c4033",
                              fontSize: "clamp(1.05rem, 1.2vw, 1.25rem)",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {cita.nombre}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                              color: "#8a7a5c",
                            }}
                          >
                            {cita.prefijo} {cita.telefono}
                          </p>
                          {cita.notas && (
                            <p
                              style={{
                                margin: "8px 0 0",
                                fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
                                color: "#a8452f",
                                fontStyle: "italic",
                              }}
                            >
                              📝 {cita.notas}
                            </p>
                          )}
                        </div>
                        <div>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "8px 16px",
                              background: "rgba(183,142,86,0.12)",
                              color: "#5c4033",
                              borderRadius: "10px",
                              fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                              fontWeight: 700,
                            }}
                          >
                            {cita.servicio}
                          </span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          {cita.precio && (
                            <p
                              style={{
                                margin: "0 0 4px",
                                fontWeight: 800,
                                color: "#b78e56",
                                fontSize: "clamp(1.05rem, 1.2vw, 1.25rem)",
                              }}
                            >
                              {cita.precio * cita.personas}€
                            </p>
                          )}
                          <p
                            style={{
                              margin: 0,
                              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
                              color: "#8a7a5c",
                            }}
                          >
                            {cita.personas}{" "}
                            {cita.personas === 1 ? "persona" : "personas"}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.9rem",
                            justifyContent: "flex-end",
                            flexWrap: "wrap",
                          }}
                        >
                          <button
                            onClick={() => handleAceptar(cita)}
                            disabled={eliminando === cita.id}
                            style={{
                              ...buttonStyle,
                              background:
                                eliminando === cita.id ? "#c4b49a" : "#4CAF50",
                              color: "#fff",
                              opacity: eliminando === cita.id ? 0.6 : 1,
                              cursor:
                                eliminando === cita.id ? "wait" : "pointer",
                              padding:
                                "clamp(10px, 1.2vw, 14px) clamp(16px, 2vw, 26px)",
                              fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                            }}
                          >
                            ✅ Aceptar
                          </button>
                          <button
                            onClick={() => handleCancelar(cita)}
                            disabled={eliminando === cita.id}
                            style={{
                              ...buttonStyle,
                              background:
                                eliminando === cita.id ? "#c4b49a" : "#a8452f",
                              color: "#fff",
                              opacity: eliminando === cita.id ? 0.6 : 1,
                              cursor:
                                eliminando === cita.id ? "wait" : "pointer",
                              padding:
                                "clamp(10px, 1.2vw, 14px) clamp(16px, 2vw, 26px)",
                              fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                            }}
                          >
                            ❌ Cancelar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </>
        )}

        {/* ===== SECCIÓN RESEÑAS ===== */}
        {seccionActiva === "resenas" && (
          <ResenasSection
            resenas={resenas}
            cargandoResenas={cargandoResenas}
            onPublicar={publicarResena}
            onRechazar={rechazarResena}
            onEliminar={eliminarResena}
          />
        )}

        {/* ===== SECCIÓN MENSAJES ===== */}
        {seccionActiva === "mensajes" && (
          <MensajesSection
            mensajes={mensajes}
            cargandoMensajes={cargandoMensajes}
            onLeer={leerMensaje}
            onEliminar={eliminarMensaje}
            onResponder={abrirResponder}
          />
        )}

        {/* ===== SECCIÓN ANÁLISIS ===== */}
        {seccionActiva === "analisis" && (
          <AnalisisSection
            analisis={analisis}
            cargandoAnalisis={cargandoAnalisis}
            semanaOffset={semanaOffset}
            onCambiarSemana={setSemanaOffset}
          />
        )}
      </main>

      {/* ===== MODAL WHATSAPP ===== */}
      <AnimatePresence>
        {modalWhatsApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={modalOverlayStyle}
            onClick={() => {
              setModalWhatsApp(false);
              setMensajeResponder("");
              setMensajeActual(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={modalContentStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                style={{
                  color: "#5c4033",
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: "1.2rem",
                  fontSize: "clamp(1.5rem, 1.8vw, 2rem)",
                  fontWeight: 800,
                }}
              >
                💬 Responder por WhatsApp
              </h2>
              <p
                style={{
                  color: "#8a7a5c",
                  marginBottom: "1.8rem",
                  fontSize: "clamp(1rem, 1.15vw, 1.2rem)",
                }}
              >
                Escribe tu mensaje para {mensajeActual?.nombre} (
                {mensajeActual?.telefono})
              </p>
              <div style={{ marginBottom: "1.8rem" }}>
                <label style={labelStyle}>Mensaje</label>
                <textarea
                  value={mensajeResponder}
                  onChange={(e) => setMensajeResponder(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  style={textareaStyle}
                  rows={5}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1.2rem",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => {
                    setModalWhatsApp(false);
                    setMensajeResponder("");
                    setMensajeActual(null);
                  }}
                  style={{
                    ...buttonStyle,
                    background: "transparent",
                    color: "#5c4033",
                    border: "2px solid rgba(183,142,86,0.3)",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={enviarRespuestaWhatsApp}
                  style={{
                    ...buttonStyle,
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)",
                  }}
                >
                  <MessageCircle size={20} /> Enviar por WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MODAL CITAS ===== */}
      <AnimatePresence>
        {modalAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={modalOverlayStyle}
            onClick={() => {
              setModalAbierto(null);
              setMotivo("");
              setMensaje("");
              setAccion(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={modalContentStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                style={{
                  color: "#5c4033",
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: "1.2rem",
                  fontSize: "clamp(1.5rem, 1.8vw, 2rem)",
                  fontWeight: 800,
                }}
              >
                {accion === "aceptar"
                  ? "✅ Confirmar cita"
                  : "❌ Cancelar cita"}
              </h2>
              <p
                style={{
                  color: "#8a7a5c",
                  marginBottom: "1.8rem",
                  fontSize: "clamp(1rem, 1.15vw, 1.2rem)",
                }}
              >
                {accion === "aceptar"
                  ? "La cita será confirmada y el cliente recibirá un mensaje por WhatsApp."
                  : "La cita será cancelada y el cliente recibirá un mensaje por WhatsApp con el motivo."}
              </p>
              {accion === "aceptar" && (
                <div style={{ marginBottom: "1.8rem" }}>
                  <label style={labelStyle}>Mensaje adicional (opcional)</label>
                  <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Ej: ¡Te esperamos! Recuerda llegar 10 minutos antes."
                    style={textareaStyle}
                    rows={3}
                  />
                </div>
              )}
              {accion === "cancelar" && (
                <div style={{ marginBottom: "1.8rem" }}>
                  <label style={{ ...labelStyle, color: "#a8452f" }}>
                    Motivo de cancelación *
                  </label>
                  <textarea
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    placeholder="Ej: La estilista no podrá atenderte ese día..."
                    style={{
                      ...textareaStyle,
                      borderColor: motivo.trim()
                        ? "rgba(183,142,86,0.3)"
                        : "#a8452f",
                    }}
                    rows={3}
                    required
                  />
                  {!motivo.trim() && (
                    <p
                      style={{
                        color: "#a8452f",
                        fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                        marginTop: "8px",
                      }}
                    >
                      ⚠️ El motivo es obligatorio
                    </p>
                  )}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  gap: "1.2rem",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => {
                    setModalAbierto(null);
                    setMotivo("");
                    setMensaje("");
                    setAccion(null);
                  }}
                  style={{
                    ...buttonStyle,
                    background: "transparent",
                    color: "#5c4033",
                    border: "2px solid rgba(183,142,86,0.3)",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarAccion}
                  disabled={accion === "cancelar" && !motivo.trim()}
                  style={{
                    ...buttonStyle,
                    background: accion === "aceptar" ? "#4CAF50" : "#a8452f",
                    color: "#fff",
                    opacity: accion === "cancelar" && !motivo.trim() ? 0.5 : 1,
                    cursor:
                      accion === "cancelar" && !motivo.trim()
                        ? "not-allowed"
                        : "pointer",
                    fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)",
                  }}
                >
                  {accion === "aceptar"
                    ? "Confirmar y enviar"
                    : "Cancelar y enviar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
