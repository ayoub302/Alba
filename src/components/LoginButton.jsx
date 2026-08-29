// src/components/LoginButton.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function LoginButton() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (isAuthenticated) {
    return (
      <div ref={containerRef} style={{ position: "relative", flexShrink: 0 }}>
        {/* Avatar / trigger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú de usuario"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(36px, 4vw, 48px)",
            height: "clamp(36px, 4vw, 48px)",
            borderRadius: "50%",
            background: open ? "rgba(183,142,86,0.3)" : "rgba(183,142,86,0.15)",
            border: "1.5px solid rgba(183,142,86,0.3)",
            color: "#b78e56",
            transition: "all 0.25s ease",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)",
              fontWeight: 700,
              color: "#b78e56",
            }}
          >
            {(user?.name || user?.email || "U")[0].toUpperCase()}
          </span>
        </button>

        {/* Overlay solo en móvil, para oscurecer el fondo */}
        {open && (
          <div
            className="fixed inset-0 lg:hidden"
            style={{ background: "rgba(0,0,0,0.3)", zIndex: 59 }}
            onClick={() => setOpen(false)}
          />
        )}

        {/* Dropdown: fixed+centrado abajo en móvil, absolute en desktop */}
        {open && (
          <div
            className="
              fixed left-1/2 -translate-x-1/2 bottom-4 w-[90vw] max-w-sm
              lg:absolute lg:left-auto lg:right-0 lg:translate-x-0 lg:bottom-auto lg:top-[calc(100%+10px)] lg:w-56
            "
            style={{
              zIndex: 60,
              background: "#f5ebdc",
              border: "1px solid rgba(183,142,86,0.3)",
              borderRadius: "14px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "14px 16px",
                borderBottom: "1px solid rgba(183,142,86,0.2)",
                fontSize: "0.85rem",
                color: "#5c4033",
                fontWeight: 600,
              }}
            >
              {user?.name || user?.email}
            </div>

            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 16px",
                color: "#5c4033",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <button
              onClick={() => {
                setOpen(false);
                logout({ logoutParams: { returnTo: window.location.origin } });
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                textAlign: "left",
                padding: "14px 16px",
                background: "transparent",
                border: "none",
                borderTop: "1px solid rgba(183,142,86,0.2)",
                color: "#b03a2e",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{
        padding: "clamp(6px, 0.8vw, 10px) clamp(12px, 1.5vw, 18px)",
        background: "#b78e56",
        color: "#faf6f0",
        border: "2px solid #b78e56",
        borderRadius: "999px",
        cursor: "pointer",
        fontSize: "clamp(0.65rem, 0.8vw, 0.85rem)",
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
      <User size="clamp(14px, 1.6vw, 18px)" />
      Admin
    </button>
  );
}