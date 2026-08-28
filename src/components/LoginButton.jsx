// src/components/LoginButton.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    return (
      <Link
        to="/dashboard"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "clamp(36px, 4vw, 48px)",
          height: "clamp(36px, 4vw, 48px)",
          borderRadius: "50%",
          background: "rgba(183,142,86,0.15)",
          border: "1.5px solid rgba(183,142,86,0.3)",
          color: "#b78e56",
          transition: "all 0.25s ease",
          textDecoration: "none",
          flexShrink: 0,
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
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)",
            fontWeight: 700,
            color: "#b78e56",
          }}
        >
          {(user?.name || user?.email || "U")[0].toUpperCase()}
        </span>
      </Link>
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