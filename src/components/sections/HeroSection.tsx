'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Zap, ThermometerSun, Droplets } from 'lucide-react';

const TYPING_LINES = [
  'IS WARMING.',
  'IS BURNING.',
  'IS DROWNING.',
  'NEEDS YOU.',
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineIdx, setLineIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [tick, setTick] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const target = TYPING_LINES[lineIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < target.length) {
          setDisplayed(target.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1));
        } else {
          setIsDeleting(false);
          setLineIdx(i => (i + 1) % TYPING_LINES.length);
        }
      }
      setTick(t => t + 1);
    }, isDeleting ? 60 : 110);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, lineIdx, tick]);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY   = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fadeOut     = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToNext = () =>
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

  const liveStats = [
    { icon: ThermometerSun, label: 'TEMP RISE',  value: '+1.1°C', color: '#FF2D2D' },
    { icon: Droplets,       label: 'CO₂ PPM',    value: '421',    color: '#0028FF' },
    { icon: Zap,            label: 'SEA LEVEL',  value: '+3.4mm', color: '#00FFEE' },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-nb-black nb-stripes flex flex-col"
    >
      {/* Huge background number */}
      <motion.div
        style={{ y: parallaxY, opacity: fadeOut }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span
          className="font-display text-[30vw] leading-none text-nb-white/[0.025] select-none"
          aria-hidden
        >
          2°C
        </span>
      </motion.div>

      {/* Yellow accent border block top-left */}
      <div className="absolute top-0 left-0 w-2 h-full bg-nb-yellow z-10" />

      {/* MAIN CONTENT */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-20 flex-1 flex flex-col justify-center pt-28 pb-16 px-6 md:px-16 max-w-7xl mx-auto w-full"
      >
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="nb-tag text-nb-yellow border-nb-yellow inline-flex items-center gap-2 mb-6 w-fit"
        >
          <span className="w-2 h-2 rounded-full bg-nb-red animate-pulse inline-block" />
          LIVE CRISIS DATA — 2026
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-display text-[14vw] sm:text-[10vw] md:text-[8vw] leading-none uppercase tracking-tight mb-4"
        >
          <span className="block text-nb-white">OUR PLANET</span>
          <span className="block text-nb-yellow min-h-[1.1em]">
            {displayed}
            <span className="inline-block w-[0.08em] h-[0.85em] bg-nb-yellow align-middle ml-1 animate-pulse" />
          </span>
        </motion.h1>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-nb-white/60 text-sm md:text-base max-w-xl mb-10 leading-relaxed"
        >
          Global temperatures are rising. Ecosystems are collapsing.
          But it&apos;s not too late. The truth is brutal — and so are the facts.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button
            onClick={scrollToNext}
            className="px-8 py-4 bg-nb-yellow text-nb-black nb-border nb-shadow-lg nb-hover font-mono font-bold text-sm tracking-widest uppercase"
          >
            ⚡ EXPLORE THE CRISIS
          </button>
          <a
            href="#solutions"
            className="px-8 py-4 bg-transparent text-nb-white nb-border-white nb-border nb-hover font-mono font-bold text-sm tracking-widest uppercase text-center"
            onClick={e => {
              e.preventDefault();
              const el = document.querySelector('#solutions');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }}
          >
            TAKE ACTION →
          </a>
        </motion.div>

        {/* Live Stat Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3"
        >
          {liveStats.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-4 py-2 nb-border nb-shadow bg-nb-black/50 backdrop-blur-sm"
              style={{ borderColor: color }}
            >
              <Icon size={14} style={{ color }} />
              <span className="font-mono text-[10px] tracking-widest text-nb-white/50">{label}</span>
              <span className="font-display text-lg tracking-wider" style={{ color }}>{value}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scrolldown */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 font-mono text-[10px] tracking-widest text-nb-white/40 hover:text-nb-yellow transition-colors group"
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>

      {/* Horizontal ticker */}
      <div className="relative z-20 border-t-2 border-nb-yellow bg-nb-yellow overflow-hidden py-2">
        <div className="nb-marquee-track whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="font-mono text-xs text-nb-black tracking-widest">
              {['🔥 GLOBAL TEMP: +1.1°C', '💧 SEA LEVEL RISING', '🌍 421 PPM CO₂', '⚡ 1M+ SPECIES AT RISK', '🏔️ GLACIERS RETREATING', '🌪️ EXTREME EVENTS UP 5X'].map(t => (
                <span key={t} className="mr-12">{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
