"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (next === "light") {
      document.documentElement.dataset.theme = "light";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem("mim-theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark / light mode"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 px-4 py-2.5 text-[0.65rem] tracking-[0.22em] uppercase font-medium border border-[color:var(--color-gold)] bg-[color:var(--color-canvas)]/85 backdrop-blur-md text-[color:var(--color-ink)] hover:text-[color:var(--color-gold)] transition-colors duration-300 shadow-lg"
    >
      {theme === "light" ? "☾ Dark" : "☀ Light"}
    </button>
  );
}
