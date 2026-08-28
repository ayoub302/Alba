import { useRef } from "react";

export function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty(
      "--x",
      ((e.clientX - rect.left) / rect.width) * 100 + "%",
    );
    ref.current.style.setProperty(
      "--y",
      ((e.clientY - rect.top) / rect.height) * 100 + "%",
    );
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`relative overflow-hidden ${className}`}
      style={{
        "--x": "50%",
        "--y": "50%",
      }}
    >
      {/* Efecto spotlight al hacer hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-400 hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(circle at var(--x) var(--y), rgba(160, 114, 91, 0.15) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
