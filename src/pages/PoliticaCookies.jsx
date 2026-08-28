import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PoliticaCookies() {
  return (
    <div
      style={{
        background: "#faf6f0",
        minHeight: "100vh",
        padding: "clamp(6rem, 14vw, 10rem) clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 4rem)",
      }}
    >
      <div
        style={{
          maxWidth: "min(900px, 100%)",
          margin: "0 auto",
          background: "#fff",
          padding: "clamp(1.5rem, 4vw, 3rem)",
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
              fontSize: "clamp(2rem, 5vw, 2.5rem)",
              fontWeight: 600,
              color: "#5c4033",
              marginBottom: "clamp(0.75rem, 1.5vw, 1.5rem)",
            }}
          >
            Política de Cookies
          </h1>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              marginBottom: "2rem",
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            Última actualización: 24 de agosto de 2026
          </p>

          <h2
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "#5c4033",
              marginBottom: "1rem",
              marginTop: "clamp(1.5rem, 3vw, 2rem)",
            }}
          >
            1. ¿Qué son las cookies?
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            Las cookies son pequeños archivos de texto que se almacenan en el
            dispositivo del usuario al navegar por una página web. Sirven para
            recordar preferencias, facilitar la navegación y analizar el
            tráfico.
          </p>

          <h2
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "#5c4033",
              marginBottom: "1rem",
              marginTop: "clamp(1.5rem, 3vw, 2rem)",
            }}
          >
            2. Cookies utilizadas en este sitio web
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            Este sitio web utiliza las siguientes cookies:
          </p>

          {/* Tabla con scroll horizontal en móviles */}
          <div
            style={{
              overflowX: "auto",
              marginTop: "1rem",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth: "480px",
                borderCollapse: "collapse",
                fontSize: "clamp(0.75rem, 0.85vw, 0.9rem)",
              }}
            >
              <thead>
                <tr style={{ background: "#f5ebdc" }}>
                  <th
                    style={{
                      padding: "clamp(6px, 0.8vw, 10px)",
                      border: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    Nombre
                  </th>
                  <th
                    style={{
                      padding: "clamp(6px, 0.8vw, 10px)",
                      border: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    Tipo
                  </th>
                  <th
                    style={{
                      padding: "clamp(6px, 0.8vw, 10px)",
                      border: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    Propósito
                  </th>
                  <th
                    style={{
                      padding: "clamp(6px, 0.8vw, 10px)",
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
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    _ga
                  </td>
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    Analítica (Google Analytics)
                  </td>
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    Medir visitas y comportamiento del usuario
                  </td>
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    2 años
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    _gid
                  </td>
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    Analítica (Google Analytics)
                  </td>
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    Contar sesiones
                  </td>
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    24 horas
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    NID
                  </td>
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    Terceros (Google Maps)
                  </td>
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    Personalizar mapas integrados
                  </td>
                  <td style={{ padding: "clamp(6px, 0.8vw, 10px)", border: "1px solid #ddd" }}>
                    6 meses
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "#5c4033",
              marginBottom: "1rem",
              marginTop: "clamp(1.5rem, 3vw, 2rem)",
            }}
          >
            3. Cookies de terceros
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            Algunas cookies proceden de servicios externos como Google Analytics
            o Google Maps. Los datos que recogen son gestionados por esos
            proveedores conforme a sus propias políticas.
          </p>

          <h2
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "#5c4033",
              marginBottom: "1rem",
              marginTop: "clamp(1.5rem, 3vw, 2rem)",
            }}
          >
            4. Gestión y desactivación de cookies
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            El usuario puede configurar su navegador para rechazar o eliminar
            cookies. A continuación se indican los enlaces de ayuda de los
            navegadores más comunes:
          </p>
          <ul
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              paddingLeft: "clamp(1rem, 2vw, 1.5rem)",
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
            <li>Firefox: Opciones → Privacidad → Cookies</li>
            <li>Safari: Preferencias → Privacidad</li>
            <li>Edge: Configuración → Cookies</li>
          </ul>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              marginTop: "1rem",
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            Si se desactivan las cookies, algunas funciones del sitio podrían no
            estar disponibles.
          </p>

          <h2
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "#5c4033",
              marginBottom: "1rem",
              marginTop: "clamp(1.5rem, 3vw, 2rem)",
            }}
          >
            5. Consentimiento
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            Al acceder por primera vez a este sitio web, se muestra un banner
            donde se solicita al usuario su consentimiento para la instalación
            de cookies no esenciales. El consentimiento puede retirarse en
            cualquier momento modificando las opciones del navegador.
          </p>

          <div
            style={{
              marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            <Link
              to="/"
              style={{
                color: "#b78e56",
                textDecoration: "underline",
                fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
              }}
            >
              ← Volver al inicio
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}