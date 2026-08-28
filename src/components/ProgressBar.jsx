import { useEffect, useState } from "react";

export function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setWidth((scroll / height) * 100);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-0.75 bg-[#a0725b] z-9999 transition-[width] duration-100"
      style={{ width: `${width}%` }}
    />
  );
}
