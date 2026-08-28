// src/hooks/useTrackVisita.js
//
// Úsalo UNA VEZ en el layout/App de tu web PÚBLICA (no en el AdminDashboard,
// para no contar tus propias visitas de administrador como visitas de clientes).
//
// Ejemplo en App.jsx:
//   import { useTrackVisita } from "./hooks/useTrackVisita";
//   function App() {
//     useTrackVisita();
//     return ( ...tu app... )
//   }

import { useEffect } from "react";

const API_URL = "http://localhost:4000/api";

export function useTrackVisita() {
  useEffect(() => {
    // Evita contar varias veces la misma sesión de navegador en el mismo día
    const hoy = new Date().toISOString().split("T")[0];
    const clave = "visita_registrada";
    const ultima = sessionStorage.getItem(clave);

    if (ultima === hoy) return;

    fetch(`${API_URL}/visita`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ruta: window.location.pathname }),
    })
      .then(() => sessionStorage.setItem(clave, hoy))
      .catch(() => {
        /* si falla, no pasa nada — no bloqueamos la navegación del usuario */
      });
  }, []);
}
