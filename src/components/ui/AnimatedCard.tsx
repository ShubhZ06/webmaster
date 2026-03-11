"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUpVariant } from "@/lib/animations";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedCard({ children, delay = 0, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`bg-earth-900/40 backdrop-blur-md border border-earth-800 rounded-xl p-6 hover:border-leaf-600/50 transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
