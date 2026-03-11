'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: '#home',      label: 'HOME'      },
  { href: '#intro',     label: 'THE CRISIS' },
  { href: '#causes',    label: 'CAUSES'    },
  { href: '#impact',    label: 'IMPACT'    },
  { href: '#india',     label: 'INDIA'     },
  { href: '#solutions', label: 'SOLUTIONS' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      const sections = navLinks.map(l => l.href.substring(1));
      let current = sections[0];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && el.getBoundingClientRect().top <= 110) current = sec;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href === '#home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-nb-black border-b-2 border-nb-yellow py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          onClick={e => scrollTo(e, '#home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-nb-yellow nb-border flex items-center justify-center font-mono font-bold text-nb-black text-sm nb-shadow group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform">
            TP
          </div>
          <span className="font-display text-2xl tracking-widest text-nb-white">
            TERRA<span className="text-nb-yellow">PULSE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={e => scrollTo(e, link.href)}
                className={`relative px-3 py-1.5 font-mono text-xs tracking-widest transition-all duration-150 ${
                  isActive
                    ? 'bg-nb-yellow text-nb-black'
                    : 'text-nb-white hover:text-nb-yellow'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-nb-yellow -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <button className="hidden md:block font-mono text-xs tracking-widest px-5 py-2 bg-nb-yellow text-nb-black nb-border nb-shadow nb-hover font-bold uppercase">
          ACT NOW
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-10 h-10 bg-nb-yellow text-nb-black nb-border nb-shadow flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-nb-black border-t-2 border-nb-yellow"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map(link => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={e => scrollTo(e, link.href)}
                    className={`px-4 py-3 font-mono text-sm tracking-widest border-l-4 transition-all ${
                      isActive
                        ? 'border-nb-yellow text-nb-yellow bg-nb-yellow/10'
                        : 'border-transparent text-nb-white/70 hover:border-nb-yellow/50 hover:text-nb-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button className="mt-4 w-full py-3 bg-nb-yellow text-nb-black font-mono font-bold text-sm tracking-widest nb-border nb-shadow">
                ACT NOW
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
