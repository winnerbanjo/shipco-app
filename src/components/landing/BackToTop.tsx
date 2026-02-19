"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#121212] text-white shadow-xl transition-all hover:bg-[#e3201b] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#e3201b] focus:ring-offset-2"
      aria-label="Back to top"
    >
      <ChevronUp className="h-6 w-6" strokeWidth={2} />
    </button>
  );
}
