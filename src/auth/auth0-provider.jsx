// src/auth/auth0-provider.jsx
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Valores con fallbacks para desarrollo y producción
  const domain =
    import.meta.env.VITE_AUTH0_DOMAIN || "dev-uwowt36tx31qj7v5.us.auth0.com";
  const clientId =
    import.meta.env.VITE_AUTH0_CLIENT_ID || "FzBHEQmqJWfdZRvYrU4ipPc61ehLasBf";
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE || "belleza-arabe-api";

  // ✅ REDIRECT URI DINÁMICO - usa la URL actual del navegador
  const redirectUri =
    import.meta.env.VITE_AUTH0_CALLBACK_URL ||
    `${window.location.origin}/callback`;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "/admin");
  };

  // ✅ Validación mejorada con más información
  if (!domain || !clientId) {
    console.error("❌ Error de configuración Auth0:", { domain, clientId });
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-bold">Error de configuración</h2>
          <p>Faltan variables de entorno de Auth0</p>
          <p className="text-sm text-gray-500">Domain: {domain || "❌"}</p>
          <p className="text-sm text-gray-500">Client ID: {clientId || "❌"}</p>
        </div>
      </div>
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
