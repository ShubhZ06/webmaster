"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  title?: string;
  subtitle?: string;
}

export function SectionWrapper({ 
  children, 
  id, 
  className,
  delay = 0,
  title,
  subtitle,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn("py-20 md:py-32 w-full", className)}
    >
      <div className="container-custom">
        {title && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-earth-50">{title}</h2>
            {subtitle && <p className="text-lg text-earth-300 leading-relaxed">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
