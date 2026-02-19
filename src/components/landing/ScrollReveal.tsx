"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const defaultUp = { opacity: 0, y: 32 };
const defaultVisible = { opacity: 1, y: 0 };

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  initial?: { opacity: number; y: number };
  transition?: { duration: number; delay?: number };
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  once = true,
  initial = defaultUp,
  transition = { duration: 0.5, delay },
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? defaultVisible : initial}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
