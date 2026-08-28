import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLeft = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Sobre Nosotros", href: "#nosotros" },
];

const navRight = [
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

const allLinks = [...navLeft, ...navRight];

export function Header() {
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
            ? "bg-black/90 backdrop-blur-xl border-b border-[#c9a961]/15 py-3"
            : "bg-gradient-to-b from-black/40 to-transparent py-4 md:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
          {/* Navegación izquierda - Desktop */}
          <nav className="hidden lg:flex items-center justify-end gap-6 xl:gap-8">
            {navLeft.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-2 text-[11px] xl:text-[13px] font-light tracking-[0.12em] text-gray-300 hover:text-[#e8d5a0] transition-colors duration-300 group uppercase whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-1/2 w-0 h-[1px] bg-[#c9a961] transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </nav>

          {/* Logo central */}
          <a
            href="#inicio"
            className="flex flex-col items-center justify-center group shrink-0"
          >
            <div
              className={`relative flex items-center justify-center transition-all duration-500 ${
                scrolled
                  ? "w-10 h-10 md:w-12 md:h-12"
                  : "w-12 h-12 md:w-16 md:h-16"
              }`}
            >
              {/* anillo exterior */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:rotate-[20deg]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="#c9a961"
                  strokeWidth="0.75"
                  opacity="0.55"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="41"
                  fill="none"
                  stroke="#c9a961"
                  strokeWidth="0.5"
                  opacity="0.35"
                />
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <line
                    key={deg}
                    x1="50"
                    y1="4"
                    x2="50"
                    y2="10"
                    stroke="#c9a961"
                    strokeWidth="0.75"
                    opacity="0.6"
                    transform={`rotate(${deg} 50 50)`}
                  />
                ))}
              </svg>
              {/* monograma */}
              <span
                className={`font-serif text-[#e8d5a0] leading-none transition-all duration-500 ${
                  scrolled ? "text-base md:text-xl" : "text-xl md:text-2xl"
                }`}
                style={{ letterSpacing: "0.02em" }}
              >
                A
              </span>
            </div>
            <div
              className={`flex flex-col items-center overflow-hidden transition-all duration-500 ${
                scrolled
                  ? "max-h-0 opacity-0 mt-0"
                  : "max-h-12 opacity-100 mt-1 md:mt-1.5"
              }`}
            >
              <span className="font-serif text-base md:text-lg font-medium tracking-[0.3em] text-[#e8d5a0] uppercase whitespace-nowrap">
                Alba
              </span>
              <span className="font-sans text-[8px] md:text-[9px] tracking-[0.35em] text-gray-500 uppercase whitespace-nowrap">
                Estética &amp; Belleza
              </span>
            </div>
          </a>

          {/* Navegación derecha + CTA - Desktop */}
          <div className="hidden lg:flex items-center justify-start gap-4 xl:gap-8">
            <nav className="flex items-center gap-4 xl:gap-8">
              {navRight.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative py-2 text-[11px] xl:text-[13px] font-light tracking-[0.12em] text-gray-300 hover:text-[#e8d5a0] transition-colors duration-300 group uppercase whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-[1px] bg-[#c9a961] transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
                </a>
              ))}
            </nav>
            <Link
              to="/reserva"
              className="relative px-5 xl:px-7 py-2 xl:py-2.5 bg-transparent border border-[#c9a961] text-[#e8d5a0] font-medium text-[10px] xl:text-xs uppercase tracking-[0.15em] overflow-hidden group transition-colors duration-300 hover:text-black whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-[#c9a961] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              <span className="relative">Reservar Cita</span>
            </Link>
          </div>

          {/* Menu Toggle Mobile */}
          <button
            className="lg:hidden justify-self-end p-2 text-[#c9a961] hover:text-[#e8d5a0] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </button>

          {/* espaciador para mantener el logo centrado en mobile */}
          <div className="hidden" />
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-black/97 backdrop-blur-xl border-b border-[#c9a961]/15 transition-all duration-300 pt-20 md:pt-24 ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="p-4 md:p-6 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
          {allLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 text-sm md:text-base font-light tracking-wider text-gray-300 hover:text-[#e8d5a0] hover:bg-white/5 border-l-2 border-transparent hover:border-[#c9a961] transition-all uppercase"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/reserva"
            onClick={() => setMobileOpen(false)}
            className="block mt-4 py-3 px-4 bg-[#c9a961] text-black font-medium text-sm md:text-base text-center uppercase tracking-wider hover:bg-[#e8d5a0] transition-colors"
          >
            Reservar Cita
          </Link>
        </div>
      </div>
    </>
  );
}
