'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { indiaImpacts } from '@/lib/data';
import { AlertTriangle } from 'lucide-react';

const MAP_DOTS = [
  { id: 'in-1', x: '38%', y: '18%', label: 'HIMALAYAS',  color: '#1B4965', light: '#E9F4FA' },
  { id: 'in-2', x: '25%', y: '72%', label: 'COAST',      color: '#40916C', light: '#EBF9F3' },
  { id: 'in-3', x: '48%', y: '52%', label: 'CENTRAL',    color: '#E63946', light: '#FDECEA' },
  { id: 'in-4', x: '78%', y: '35%', label: 'NORTHEAST',  color: '#F4A261', light: '#FDF3EC' },
];

export default function IndiaImpactSection() {
  const [activeId, setActiveId] = useState<string>(indiaImpacts[0].id);
  const activeImpact = indiaImpacts.find(i => i.id === activeId)!;
  const activeDot = MAP_DOTS.find(d => d.id === activeId)!;

  return (
    <section id="india" className="bg-nb-bg text-nb-ink py-0 overflow-hidden border-t-2 border-nb-forest/20">
      {/* Header */}
      <div className="bg-nb-ocean px-6 md:px-16 py-10 border-b-2 border-nb-ink/20">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-nb-mist text-xs tracking-widest mb-2">// INDIA FOCUS</p>
            <h2 className="font-display text-5xl md:text-7xl text-white tracking-wider">
              GROUND<br />ZERO
            </h2>
          </div>
          <p className="font-mono text-white/50 text-sm max-w-xs leading-relaxed">
            1.4 billion people. Four climate flashpoints. Tap a region.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid lg:grid-cols-2 gap-12 items-start">
        {/* Interactive Map Panel */}
        <div
          className="relative aspect-[3/4] nb-border overflow-hidden bg-nb-mist/30"
          style={{ borderColor: activeDot?.color, boxShadow: `8px 8px 0 ${activeDot?.color}` }}
        >
          {/* Dot grid bg */}
          <div className="absolute inset-0 nb-dots opacity-60" />

          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-mono text-[10px] text-nb-ink/20 tracking-widest text-center px-8">
              INDIA VULNERABILITY MAP
            </p>
          </div>

          {/* Map Dots */}
          {MAP_DOTS.map(dot => {
            const isActive = dot.id === activeId;
            return (
              <button
                key={dot.id}
                onClick={() => setActiveId(dot.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{ left: dot.x, top: dot.y }}
              >
                {/* Pulse rings */}
                {isActive && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: dot.color }}
                      animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: dot.color }}
                      animate={{ scale: [1, 1.8], opacity: [0.25, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                    />
                  </>
                )}
                {/* Dot */}
                <motion.div
                  className="relative w-6 h-6 flex items-center justify-center nb-border rounded-full cursor-pointer"
                  animate={{ scale: isActive ? 1.4 : 1 }}
                  style={{ backgroundColor: dot.color, borderColor: '#1A2E1A' }}
                >
                  <span className="text-white text-[8px] font-mono font-bold">!</span>
                </motion.div>
                {/* Label */}
                <div
                  className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-widest px-2 py-0.5 nb-border"
                  style={{ backgroundColor: dot.light, color: dot.color, borderColor: dot.color }}
                >
                  {dot.label}
                </div>
              </button>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 font-mono text-[9px] text-nb-ink/40 space-y-1 bg-nb-surface/80 p-2 nb-border">
            <p>TAP DOT TO EXPLORE</p>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-nb-red inline-block" /> HIGH RISK
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="flex flex-col gap-6">
          {/* Active impact card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="nb-border p-8 relative overflow-hidden bg-nb-surface"
              style={{ borderColor: activeDot?.color, boxShadow: `6px 6px 0 ${activeDot?.color}` }}
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 opacity-[0.08]"
                style={{ backgroundColor: activeDot?.color, borderRadius: '100% 0 0 0' }}
              />
              <div
                className="font-mono text-[10px] tracking-widest px-3 py-1 w-fit mb-4 nb-border"
                style={{ backgroundColor: activeDot?.light, color: activeDot?.color, borderColor: activeDot?.color }}
              >
                {activeImpact.region.toUpperCase()}
              </div>
              <h3 className="font-display text-4xl md:text-5xl tracking-wider text-nb-ink mb-4">
                {activeImpact.title}
              </h3>
              <div className="h-0.5 w-16 mb-4" style={{ backgroundColor: activeDot?.color }} />
              <p className="font-mono text-nb-ink/70 text-sm leading-relaxed">
                {activeImpact.description}
              </p>
              <div className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-widest text-nb-ink/40">
                <AlertTriangle size={12} />
                VERIFIED BY IPCC ASSESSMENT REPORT 6
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Region selector */}
          <div className="grid grid-cols-2 gap-3">
            {indiaImpacts.map(impact => {
              const dot = MAP_DOTS.find(d => d.id === impact.id)!;
              const isActive = impact.id === activeId;
              return (
                <button
                  key={impact.id}
                  onClick={() => setActiveId(impact.id)}
                  className="p-4 nb-border text-left transition-all duration-150 bg-nb-surface"
                  style={{
                    borderColor: isActive ? dot.color : 'rgba(26,46,26,0.2)',
                    boxShadow: isActive ? `4px 4px 0 ${dot.color}` : '3px 3px 0 rgba(26,46,26,0.15)',
                    backgroundColor: isActive ? dot.light : '#FAFAF5',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dot.color }} />
                    <span className="font-mono text-[9px] tracking-widest text-nb-ink/50">{impact.region}</span>
                  </div>
                  <p className="font-display text-lg tracking-wide text-nb-ink">{impact.title}</p>
                </button>
              );
            })}
          </div>

          {/* Bottom stat */}
          <div className="p-6 bg-nb-ocean nb-border nb-shadow flex items-center gap-4">
            <div className="font-display text-5xl text-nb-amber">4th</div>
            <div>
              <p className="font-mono text-xs text-white/60 tracking-widest">GLOBAL RANKING</p>
              <p className="font-sans text-sm text-white/80">India is the 4th most climate-vulnerable nation on Earth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
