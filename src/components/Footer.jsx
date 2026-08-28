import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP = "https://wa.me/34688766728";
const TIKTOK = "https://www.tiktok.com/@peluqueriaalba";
const INSTAGRAM = "https://www.instagram.com/peluqueria_alba_quipuzkoa/";
const FACEBOOK = "https://www.facebook.com/profile.php?id=100091501124434";

// Iconos de redes dibujados a medida
function InstagramIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.3-1.5 1.6-1.5H17.5V4.3C17 4.2 16 4 14.9 4c-2.3 0-3.9 1.4-3.9 4v2.5H8.5v3H11V21" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 3c.3 2.4 1.8 4 4.5 4.2V10c-1.6.1-3.1-.4-4.5-1.3v6.4a5.7 5.7 0 1 1-5-5.6v2.9a2.8 2.8 0 1 0 2 2.7V3h3Z" />
    </svg>
  );
}

const socialLinks = [
  { href: INSTAGRAM, label: "Instagram", Icon: InstagramIcon },
  { href: FACEBOOK, label: "Facebook", Icon: FacebookIcon },
  { href: TIKTOK, label: "TikTok", Icon: TikTokIcon },
];

const legalLinks = [
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
  { href: "/politica-de-cookies", label: "Política de cookies" },
  { href: "/aviso-legal", label: "Aviso legal" },
];

// Cenefa de estrellas de ocho puntas (motivo geométrico árabe)
const starPattern =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%23c9a06c' stroke-width='0.9' opacity='0.55'%3E%3Cpath d='M20 4 L23 14 L33 11 L26 19 L33 27 L23 24 L20 34 L17 24 L7 27 L14 19 L7 11 L17 14 Z'/%3E%3C/g%3E%3C/svg%3E";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        background: "#16302a",
        color: "#f2ead9",
        overflow: "hidden",
      }}
    >
      {/* cenefa geométrica superior */}
      <div
        style={{
          height: "clamp(18px, 2.5vw, 26px)",
          backgroundImage: `url("${starPattern}")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "40px 40px",
          backgroundPosition: "center",
          borderBottom: "1px solid rgba(201,160,108,0.35)",
          borderTop: "1px solid rgba(201,160,108,0.35)",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 3vw, 1.5rem) clamp(1.5rem, 3vw, 2.5rem)",
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(1rem, 2vw, 1.75rem)",
        }}
      >
        {/* ---- ARCO MORISCO CON EL LOGO DENTRO ---- */}
        <div
          style={{
            position: "relative",
            width: "clamp(140px, 25vw, 220px)",
          }}
        >
          <svg
            viewBox="0 0 220 190"
            width="100%"
            height="auto"
            style={{ display: "block" }}
          >
            <path
              d="M 14 190 L 14 96 C 14 45 55 8 110 8 C 165 8 206 45 206 96 L 206 190"
              fill="none"
              stroke="#c9a06c"
              strokeWidth="1.4"
              opacity="0.85"
            />
            <path
              d="M 30 190 L 30 98 C 30 55 63 24 110 24 C 157 24 190 55 190 98 L 190 190"
              fill="none"
              stroke="#c9a06c"
              strokeWidth="1"
              opacity="0.35"
            />
            <circle cx="110" cy="8" r="3" fill="#c9a06c" opacity="0.9" />
          </svg>

          <div
            style={{
              position: "absolute",
              top: "clamp(40px, 8vw, 68px)",
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)",
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "0.08em",
                color: "#f2ead9",
                fontFamily: "'Georgia', serif",
                lineHeight: 1.05,
              }}
            >
              Alba
            </span>
            <span
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)",
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "0.08em",
                color: "#f2ead9",
                fontFamily: "'Georgia', serif",
                lineHeight: 1.05,
              }}
            >
              Salon
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: "clamp(8px, 1vw, 10px)",
            color: "#a3835f",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginTop: "-0.5rem",
            textAlign: "center",
          }}
        >
          Belleza con esencia árabe
        </span>

        {/* divisor con rombo geométrico */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            width: "clamp(100px, 20vw, 160px)",
          }}
        >
          <span
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(201,160,108,0.3)",
            }}
          />
          <span
            style={{
              width: "clamp(5px, 0.8vw, 7px)",
              height: "clamp(5px, 0.8vw, 7px)",
              background: "#c9a06c",
              transform: "rotate(45deg)",
              opacity: 0.75,
            }}
          />
          <span
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(201,160,108,0.3)",
            }}
          />
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
            color: "#cdb896",
            fontWeight: 300,
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            maxWidth: "clamp(280px, 60vw, 26rem)",
            lineHeight: 1.7,
            padding: "0 0.5rem",
          }}
        >
          Salón exclusivo para mujeres en Errenteria, Gipuzkoa.
        </p>

        {/* ---- BOTÓN WHATSAPP + REDES SOCIALES ---- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(0.5rem, 1vw, 0.9rem)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            style={{
              width: "clamp(40px, 5vw, 50px)",
              height: "clamp(44px, 5.5vw, 56px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(201,160,108,0.45)",
              borderRadius: "25px 25px 6px 6px",
              transition: "all 0.3s ease",
              color: "#d8b586",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#c9a06c";
              e.currentTarget.style.color = "#16302a";
              e.currentTarget.style.borderColor = "#c9a06c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#d8b586";
              e.currentTarget.style.borderColor = "rgba(201,160,108,0.45)";
            }}
          >
            <Phone size="clamp(15px, 2vw, 18px)" strokeWidth={1.6} />
          </a>

          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              style={{
                width: "clamp(38px, 4.5vw, 46px)",
                height: "clamp(38px, 4.5vw, 46px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(201,160,108,0.45)",
                borderRadius: "50%",
                transition: "all 0.3s ease",
                color: "#d8b586",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#c9a06c";
                e.currentTarget.style.color = "#16302a";
                e.currentTarget.style.borderColor = "#c9a06c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#d8b586";
                e.currentTarget.style.borderColor = "rgba(201,160,108,0.45)";
              }}
            >
              <Icon size="clamp(14px, 1.8vw, 17px)" strokeWidth={1.6} />
            </a>
          ))}
        </div>

        {/* ---- ENLACES LEGALES ---- */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.8rem, 1.5vw, 1.5rem)",
            marginTop: "0.25rem",
            padding: "0 0.5rem",
          }}
        >
          {legalLinks.map((link, i) => (
            <span
              key={link.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(0.8rem, 1.5vw, 1.5rem)",
              }}
            >
              <Link
                to={link.href}
                style={{
                  fontSize: "clamp(0.6rem, 0.75vw, 0.75rem)",
                  color: "#a3835f",
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "color 0.25s ease, border-color 0.25s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#e2cba4";
                  e.currentTarget.style.borderColor = "rgba(201,160,108,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#a3835f";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                {link.label}
              </Link>
              {i < legalLinks.length - 1 && (
                <span
                  style={{
                    color: "rgba(163,131,95,0.4)",
                    fontSize: "clamp(0.6rem, 0.75vw, 0.75rem)",
                  }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        <p
          style={{
            fontSize: "clamp(0.55rem, 0.7vw, 0.72rem)",
            color: "#7c9088",
            letterSpacing: "0.05em",
            marginTop: "0.25rem",
            textAlign: "center",
            padding: "0 0.5rem",
          }}
        >
          © 2026 Peluquería Alba · Errenteria, Gipuzkoa · Todos los derechos
          reservados
        </p>
      </div>
    </footer>
  );
}