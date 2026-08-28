import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PoliticaCookies() {
  return (
    <div
      style={{
        background: "#faf6f0",
        minHeight: "100vh",
        padding: "10rem 1.5rem 4rem",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          padding: "3rem",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(92,64,51,0.06)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 600,
              color: "#5c4033",
              marginBottom: "1.5rem",
            }}
          >
            Política de Cookies
          </h1>
          <p
            style={{ color: "#8a7a5c", lineHeight: 1.7, marginBottom: "2rem" }}
          >
            Última actualización: 24 de agosto de 2026
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#5c4033",
              marginBottom: "1rem",
            }}
          >
            1. ¿Qué son las cookies?
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            Las cookies son pequeños archivos de texto que se almacenan en el
            dispositivo del usuario al navegar por una página web. Sirven para
            recordar preferencias, facilitar la navegación y analizar el
            tráfico.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#5c4033",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          >
            2. Cookies utilizadas en este sitio web
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            Este sitio web utiliza las siguientes cookies:
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr style={{ background: "#f5ebdc" }}>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Nombre
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Tipo
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Propósito
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Duración
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  _ga
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Analítica (Google Analytics)
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Medir visitas y comportamiento del usuario
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  2 años
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  _gid
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Analítica (Google Analytics)
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Contar sesiones
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  24 horas
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  NID
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Terceros (Google Maps)
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Personalizar mapas integrados
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  6 meses
                </td>
              </tr>
            </tbody>
          </table>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#5c4033",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          >
            3. Cookies de terceros
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            Algunas cookies proceden de servicios externos como Google Analytics
            o Google Maps. Los datos que recogen son gestionados por esos
            proveedores conforme a sus propias políticas.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#5c4033",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          >
            4. Gestión y desactivación de cookies
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            El usuario puede configurar su navegador para rechazar o eliminar
            cookies. A continuación se indican los enlaces de ayuda de los
            navegadores más comunes:
          </p>
          <ul
            style={{ color: "#8a7a5c", lineHeight: 1.7, paddingLeft: "1.5rem" }}
          >
            <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
            <li>Firefox: Opciones → Privacidad → Cookies</li>
            <li>Safari: Preferencias → Privacidad</li>
            <li>Edge: Configuración → Cookies</li>
          </ul>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7, marginTop: "1rem" }}>
            Si se desactivan las cookies, algunas funciones del sitio podrían no
            estar disponibles.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#5c4033",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          >
            5. Consentimiento
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            Al acceder por primera vez a este sitio web, se muestra un banner
            donde se solicita al usuario su consentimiento para la instalación
            de cookies no esenciales. El consentimiento puede retirarse en
            cualquier momento modificando las opciones del navegador.
          </p>

          <div style={{ marginTop: "2.5rem" }}>
            <Link
              to="/"
              style={{ color: "#b78e56", textDecoration: "underline" }}
            >
              ← Volver al inicio
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
