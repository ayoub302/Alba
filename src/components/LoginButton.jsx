// src/components/LoginButton.jsx
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span>👋 {user?.name || user?.email}</span>
        <LogoutButton />
      </div>
    );
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{
        padding: "10px 24px",
        background: "#b78e56",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 500,
      }}
    >
      Admin
    </button>
  );
}

// Componente LogoutButton
function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      style={{
        padding: "8px 16px",
        background: "transparent",
        color: "#5c4033",
        border: "1px solid #5c4033",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Cerrar sesión
    </button>
  );
}
