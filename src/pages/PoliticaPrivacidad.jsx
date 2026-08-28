import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PoliticaPrivacidad() {
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
            Política de Privacidad
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
            1. Responsable del tratamiento
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            Peluquería Alba (en adelante, "el Titular") con domicilio social en
            Donostia Kalea, 6 bajo, 20100 Errenteria (Gipuzkoa), España. Correo
            electrónico de contacto: hola@peluqueriaalba.com
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
            2. Finalidad del tratamiento
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            Los datos personales facilitados a través de los formularios de
            contacto serán tratados con las siguientes finalidades:
          </p>
          <ul
            style={{ color: "#8a7a5c", lineHeight: 1.7, paddingLeft: "1.5rem" }}
          >
            <li>
              Gestionar las consultas y solicitudes de información realizadas
              por el usuario.
            </li>
            <li>Responder a las peticiones de reserva de cita o servicios.</li>
            <li>
              Remitir comunicaciones comerciales, únicamente con el
              consentimiento expreso del usuario.
            </li>
            <li>
              Gestionar la relación contractual y administrativa con los
              clientes.
            </li>
          </ul>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#5c4033",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          >
            3. Legitimación
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            La base legal para el tratamiento de datos es:
          </p>
          <ul
            style={{ color: "#8a7a5c", lineHeight: 1.7, paddingLeft: "1.5rem" }}
          >
            <li>
              <strong>Consentimiento del interesado:</strong> Al enviar el
              formulario de contacto, el usuario consiente el tratamiento de sus
              datos.
            </li>
            <li>
              <strong>Ejecución de un contrato:</strong> Para la prestación de
              servicios de peluquería y estética solicitados por el cliente.
            </li>
            <li>
              <strong>Interés legítimo:</strong> Para gestionar consultas y
              mejorar la calidad del servicio.
            </li>
          </ul>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#5c4033",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          >
            4. Conservación de los datos
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            Los datos se conservarán mientras se mantenga la relación comercial
            y, posteriormente, durante los plazos legalmente exigidos (por
            ejemplo, plazos fiscales). Cuando ya no sean necesarios para la
            finalidad para la que fueron recogidos, se eliminarán de forma
            segura.
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
            5. Destinatarios
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            No se cederán datos a terceros, salvo obligación legal. Pueden tener
            acceso a los datos proveedores de servicios tecnológicos (hosting,
            email, etc.) que actúan como encargados del tratamiento bajo
            contrato.
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
            6. Derechos de los usuarios
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            Cualquier persona tiene derecho a:
          </p>
          <ul
            style={{ color: "#8a7a5c", lineHeight: 1.7, paddingLeft: "1.5rem" }}
          >
            <li>Acceder a sus datos personales.</li>
            <li>Solicitar la rectificación o supresión.</li>
            <li>Solicitar la limitación del tratamiento.</li>
            <li>Oponerse al tratamiento.</li>
            <li>Ejercer el derecho a la portabilidad de los datos.</li>
            <li>Retirar el consentimiento en cualquier momento.</li>
          </ul>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7, marginTop: "1rem" }}>
            Puede ejercer estos derechos enviando un correo electrónico a
            hola@peluqueriaalba.com o una carta a la dirección indicada. También
            tiene derecho a presentar una reclamación ante la Agencia Española
            de Protección de Datos (www.aepd.es).
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
            7. Seguridad
          </h2>
          <p style={{ color: "#8a7a5c", lineHeight: 1.7 }}>
            El Titular aplica las medidas técnicas y organizativas necesarias
            para garantizar la seguridad de los datos personales y evitar su
            alteración, pérdida, tratamiento o acceso no autorizado, conforme al
            RGPD y a la LOPDGDD.
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
