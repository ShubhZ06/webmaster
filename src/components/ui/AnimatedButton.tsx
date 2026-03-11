"use client";

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  iconPosition = 'left',
  ...props
}: AnimatedButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-colors rounded-full overflow-hidden group";
  
  const variants = {
    primary: "bg-green-DEFAULT text-white hover:bg-green-dark shadow-md",
    secondary: "bg-blue-DEFAULT text-white hover:bg-blue-dark shadow-md",
    outline: "border-2 border-green-DEFAULT text-green-dark hover:bg-green-50",
    ghost: "text-foreground hover:bg-black/5 dark:hover:bg-white/10",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Ripple effect overlay */}
      <span className="absolute inset-0 w-full h-full bg-white/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300 origin-center opacity-0 group-hover:opacity-100 ease-out" />
      
      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>
    </motion.button>
  );
}
