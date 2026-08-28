import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AvisoLegal() {
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
            Aviso Legal
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
            1. Datos identificativos
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que el sitio web <strong>www.peluqueriaalba.com</strong> es titularidad de:
          </p>
          <ul
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              paddingLeft: "clamp(1rem, 2vw, 1.5rem)",
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            <li><strong>Razón social:</strong> Peluquería Alba (personal autónomo)</li>
            <li><strong>Nombre comercial:</strong> Alba Salon</li>
            <li><strong>NIF/DNI:</strong> 12345678A</li>
            <li><strong>Domicilio:</strong> Donostia Kalea, 6 bajo, 20100 Errenteria (Gipuzkoa)</li>
            <li><strong>Email de contacto:</strong> hola@peluqueriaalba.com</li>
            <li><strong>Teléfono:</strong> 688 76 67 28</li>
          </ul>

          <h2
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "#5c4033",
              marginBottom: "1rem",
              marginTop: "clamp(1.5rem, 3vw, 2rem)",
            }}
          >
            2. Objeto
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            El presente aviso legal regula el uso del sitio web, incluyendo el acceso y la utilización de los servicios ofrecidos. El usuario, al navegar, acepta plenamente las condiciones aquí expuestas.
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
            3. Uso del sitio web
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            El usuario se compromete a hacer un uso adecuado del sitio web, absteniéndose de:
          </p>
          <ul
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              paddingLeft: "clamp(1rem, 2vw, 1.5rem)",
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            <li>Realizar actividades ilícitas o contrarias a la buena fe.</li>
            <li>Dañar el sistema informático del titular.</li>
            <li>Suplantar la identidad de otros usuarios.</li>
            <li>Introducir virus o códigos maliciosos.</li>
          </ul>

          <h2
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "#5c4033",
              marginBottom: "1rem",
              marginTop: "clamp(1.5rem, 3vw, 2rem)",
            }}
          >
            4. Propiedad intelectual e industrial
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            Todos los contenidos del sitio web (textos, imágenes, logotipos, diseños, código fuente, etc.) son propiedad del Titular o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o comunicación pública sin autorización expresa, salvo para uso privado.
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
            5. Responsabilidad
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            El Titular no se hace responsable de los daños derivados del uso del sitio web, de los contenidos de enlaces externos ni de la falta de disponibilidad del servicio. Sin embargo, se compromete a resolver cualquier incidencia de la forma más rápida posible.
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
            6. Legislación aplicable y jurisdicción
          </h2>
          <p
            style={{
              color: "#8a7a5c",
              lineHeight: 1.7,
              fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
            }}
          >
            El presente aviso legal se rige por la legislación española. Cualquier controversia será sometida a los Juzgados y Tribunales de Donostia-San Sebastián (o los competentes según la Ley), renunciando el usuario a cualquier otro fuero que pudiera corresponderle.
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