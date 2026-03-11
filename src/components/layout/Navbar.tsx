"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedButton from '../ui/AnimatedButton';

const links = [
  { name: 'Initiatives', href: '#initiatives' },
  { name: 'Our Impact', href: '#impact' },
  { name: 'Educational Resources', href: '#resources' },
  { name: 'Get Involved', href: '#get-involved' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-black/5 dark:border-white/10 shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-green-100 p-2 rounded-xl group-hover:bg-green-200 transition-colors">
            <Leaf className="w-6 h-6 text-green-dark" />
          </div>
          <span className="font-bold text-xl tracking-tight text-green-dark">EarthRescue</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-green-DEFAULT transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="#donate">
            <AnimatedButton variant="outline" size="sm">Donate</AnimatedButton>
          </Link>
          <Link href="#join">
            <AnimatedButton variant="primary" size="sm">Join Movement</AnimatedButton>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-foreground/80 hover:bg-black/5 rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-black/5 dark:border-white/10 bg-white dark:bg-black overflow-hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-4">
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium py-2 text-foreground/80 hover:text-green-DEFAULT"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-black/10 dark:bg-white/10 my-2" />
              <div className="flex flex-col gap-3">
                <AnimatedButton variant="outline" className="w-full justify-center">Donate</AnimatedButton>
                <AnimatedButton variant="primary" className="w-full justify-center">Join Movement</AnimatedButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
