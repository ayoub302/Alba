// src/components/LoginButton.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { LogOut, User, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  if (isAuthenticated) {
    return (
      <div style={{ position: "relative" }}>
        {/* Botón de usuario */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(0.2rem, 0.5vw, 0.5rem)",
            padding: "clamp(4px, 0.6vw, 8px) clamp(6px, 0.8vw, 10px)",
            background: "rgba(183,142,86,0.15)",
            color: "#b78e56",
            border: "1px solid rgba(183,142,86,0.3)",
            borderRadius: "999px",
            cursor: "pointer",
            fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)",
            fontWeight: 600,
            transition: "all 0.3s ease",
            fontFamily: "'Inter', sans-serif",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(183,142,86,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(183,142,86,0.15)";
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "clamp(28px, 3vw, 36px)",
              height: "clamp(28px, 3vw, 36px)",
              borderRadius: "50%",
              background: "#b78e56",
              color: "#fff",
              fontSize: "clamp(0.8rem, 1vw, 1rem)",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {(user?.name || user?.email || "U")[0].toUpperCase()}
          </span>
        </button>

        {/* Dropdown mejorado (se despliega hacia la izquierda en móvil) */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              minWidth: "clamp(200px, 40vw, 280px)",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
              border: "1px solid rgba(183,142,86,0.15)",
              padding: "0.5rem",
              zIndex: 100,
              animation: "slideDown 0.2s ease",
              // En móviles, si no cabe a la derecha, se despliega a la izquierda
              right: window.innerWidth < 600 ? "auto" : "0",
              left: window.innerWidth < 600 ? "auto" : "auto",
              transform: window.innerWidth < 600 ? "translateX(-20px)" : "none",
            }}
          >
            <style>
              {`
                @keyframes slideDown {
                  from { opacity: 0; transform: translateY(-8px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}
            </style>

            {/* Info del usuario */}
            <div
              style={{
                padding: "0.75rem 1rem",
                borderBottom: "1px solid rgba(183,142,86,0.1)",
                marginBottom: "0.25rem",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  color: "#5c4033",
                  fontSize: "clamp(0.8rem, 0.9vw, 0.9rem)",
                }}
              >
                {user?.name || "Usuario"}
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: "clamp(0.65rem, 0.75vw, 0.75rem)",
                  color: "#8a7a5c",
                  wordBreak: "break-all",
                }}
              >
                {user?.email}
              </p>
            </div>

            {/* Link al Dashboard */}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.6rem 1rem",
                color: "#5c4033",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "clamp(0.75rem, 0.85vw, 0.85rem)",
                transition: "background 0.2s ease",
                width: "100%",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(183,142,86,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Shield size={18} />
              Panel de administración
            </Link>

            {/* Botón de logout */}
            <button
              onClick={() => {
                setIsOpen(false);
                logout({ logoutParams: { returnTo: window.location.origin } });
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.6rem 1rem",
                color: "#a8452f",
                background: "transparent",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "clamp(0.75rem, 0.85vw, 0.85rem)",
                transition: "background 0.2s ease",
                width: "100%",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(168,69,47,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        )}

        {/* Cerrar dropdown al hacer click fuera */}
        {isOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
            }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  // Botón de login (no autenticado)
  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{
        padding: "clamp(6px, 0.6vw, 8px) clamp(12px, 1.5vw, 18px)",
        background: "#b78e56",
        color: "#faf6f0",
        border: "2px solid #b78e56",
        borderRadius: "999px",
        cursor: "pointer",
        fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)",
        fontWeight: 600,
        letterSpacing: "0.05em",
        transition: "all 0.3s ease",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        alignItems: "center",
        gap: "0.3rem",
        whiteSpace: "nowrap",
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
      <User size={18} />
      Admin
    </button>
  );
}
