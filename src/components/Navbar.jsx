import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { Menu, X } from "lucide-react";

const navLeft = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotras", href: "#nosotras" },
];

const navRight = [
  { label: "Reseñas", href: "#resenas" },
  { label: "Contacto", href: "#contacto" },
];

const allLinks = [...navLeft, ...navRight];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-[#f5ebdc]/95 backdrop-blur-xl border-b border-[#b78e56]/20 py-2"
            : "bg-gradient-to-b from-[#f5ebdc]/90 to-transparent py-4"
        }`}
        style={
          mobileOpen && window.innerWidth < 1024
            ? { paddingTop: "clamp(80px, 15vw, 120px)" }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
          {/* Navegación izquierda - Desktop */}
          <nav className="hidden lg:flex items-center justify-end gap-6 xl:gap-8">
            {navLeft.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-2 text-[11px] xl:text-[13px] font-light tracking-[0.12em] text-[#5c4033] hover:text-[#b78e56] transition-colors duration-300 group uppercase whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-1/2 w-0 h-[1.5px] bg-[#b78e56] transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </nav>

          {/* LOGO */}
          <a href="#inicio" className="flex items-center justify-center shrink-0">
            <div
              className={`relative transition-all duration-500 ease-out ${
                scrolled
                  ? "w-16 h-16 md:w-20 md:h-20"
                  : "w-20 h-20 md:w-28 md:h-28"
              }`}
            >
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <defs>
                  <linearGradient id="albaGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e8cfa0" />
                    <stop offset="50%" stopColor="#c9a86a" />
                    <stop offset="100%" stopColor="#a8864a" />
                  </linearGradient>
                  <linearGradient id="albaBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5ebdc" />
                    <stop offset="100%" stopColor="#e8d8c4" />
                  </linearGradient>
                </defs>

                <circle cx="60" cy="60" r="54" fill="url(#albaBg)" stroke="url(#albaGold)" strokeWidth="1.5" />
                <circle cx="60" cy="60" r="46" fill="none" stroke="url(#albaGold)" strokeWidth="0.8" opacity="0.4" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <circle
                    key={deg}
                    cx="60"
                    cy="10"
                    r="2.5"
                    fill="#c9a86a"
                    opacity="0.5"
                    transform={`rotate(${deg} 60 60)`}
                  />
                ))}
                <path d="M60 70 C54 58 52 46 60 38 C68 46 66 58 60 70 Z" fill="url(#albaGold)" opacity="0.9" />
                <path d="M60 70 C46 68 38 56 44 46 C52 50 58 58 60 70 Z" fill="url(#albaGold)" opacity="0.85" />
                <path d="M60 70 C74 68 82 56 76 46 C68 50 62 58 60 70 Z" fill="url(#albaGold)" opacity="0.85" />
                <circle cx="60" cy="56" r="3" fill="#5c4033" opacity="0.6" />

                <path id="albaArcTop" d="M 18,60 A 42,42 0 0 1 102,60" fill="none" />
                <text fontSize="8.5" letterSpacing="0.3em" fill="#5c4033" fontFamily="'Georgia', serif" fontWeight="600">
                  <textPath href="#albaArcTop" startOffset="50%" textAnchor="middle">ALBA SALON</textPath>
                </text>

                <path id="albaArcBottom" d="M 98,72 A 42,42 0 0 1 22,72" fill="none" />
                <text fontSize="6.5" letterSpacing="0.2em" fill="#8a7a5c" fontFamily="'Georgia', serif">
                  <textPath href="#albaArcBottom" startOffset="50%" textAnchor="middle">ESTÉTICA &amp; BELLEZA</textPath>
                </text>

                <line x1="15" y1="60" x2="25" y2="60" stroke="#c9a86a" strokeWidth="1" opacity="0.4" />
                <line x1="95" y1="60" x2="105" y2="60" stroke="#c9a86a" strokeWidth="1" opacity="0.4" />
                <line x1="20" y1="55" x2="25" y2="55" stroke="#c9a86a" strokeWidth="0.6" opacity="0.3" />
                <line x1="20" y1="65" x2="25" y2="65" stroke="#c9a86a" strokeWidth="0.6" opacity="0.3" />
                <line x1="95" y1="55" x2="100" y2="55" stroke="#c9a86a" strokeWidth="0.6" opacity="0.3" />
                <line x1="95" y1="65" x2="100" y2="65" stroke="#c9a86a" strokeWidth="0.6" opacity="0.3" />

                <text x="60" y="90" fontSize="14" fill="#5c4033" fontFamily="'Dancing Script', 'Brush Script MT', cursive" textAnchor="middle" opacity="0.8">Alba</text>
              </svg>
            </div>
          </a>

          {/* Navegación derecha + CTA + LoginButton */}
          <div className="hidden lg:flex items-center justify-start gap-4 xl:gap-8">
            <nav className="flex items-center gap-4 xl:gap-8">
              {navRight.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative py-2 text-[11px] xl:text-[13px] font-light tracking-[0.12em] text-[#5c4033] hover:text-[#b78e56] transition-colors duration-300 group uppercase whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-[1.5px] bg-[#b78e56] transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
                </a>
              ))}
            </nav>

            <Link
              to="/reserva"
              className="relative px-5 xl:px-7 py-2 xl:py-2.5 bg-transparent border-2 border-[#b78e56] text-[#5c4033] font-medium text-[10px] xl:text-xs uppercase tracking-[0.15em] overflow-hidden group transition-colors duration-300 hover:text-[#f5ebdc]"
            >
              <span className="absolute inset-0 bg-[#b78e56] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              <span className="relative z-10">Reservar Cita</span>
            </Link>

            <LoginButton />
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden justify-self-end p-2 text-[#b78e56] hover:text-[#c9a86a] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 bg-[#f5ebdc]/98 backdrop-blur-xl border-b border-[#b78e56]/20 pt-20 md:pt-24 lg:hidden"
          >
            <div className="p-4 md:p-6 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
              {allLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="block py-3 px-4 text-sm md:text-base font-light tracking-wider text-[#5c4033] hover:text-[#b78e56] hover:bg-[#b78e56]/5 border-l-2 border-transparent hover:border-[#b78e56] transition-all uppercase"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 mt-2"
              >
                <Link
                  to="/reserva"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 bg-[#b78e56] text-[#f5ebdc] font-medium text-sm md:text-base text-center uppercase tracking-wider hover:bg-[#c9a86a] transition-colors rounded"
                >
                  Reservar Cita
                </Link>
                <div className="flex justify-center">
                  <LoginButton />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&display=swap');
      `}</style>
    </>
  );
}