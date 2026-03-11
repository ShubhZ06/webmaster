'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { climateCauses } from '@/lib/data';

export default function CausesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const ACCENTS = ['#FFE000', '#FF2D2D', '#BEFF00', '#00FFEE', '#FF6B00', '#FF3DFF'];

  return (
    <section id="causes" className="bg-nb-black py-0 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-16 py-10 border-b-2 border-nb-white/10">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-nb-yellow text-xs tracking-widest mb-2">// ROOT CAUSES</p>
            <h2 className="font-display text-5xl md:text-7xl text-nb-white tracking-wider">
              WHAT&apos;S<br />DRIVING THIS?
            </h2>
          </div>
          <p className="font-mono text-nb-white/40 text-sm max-w-xs leading-relaxed">
            Human activities are the primary driver. Click any card to expand.
          </p>
        </div>
      </div>

      {/* Cause Cards — interactive accordion grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {climateCauses.map((cause, i) => {
            const Icon = cause.icon;
            const accent = ACCENTS[i % ACCENTS.length];
            const isExpanded = expanded === cause.id;
            const isHovered = hoveredId === cause.id;

            return (
              <motion.div
                key={cause.id}
                layout
                onClick={() => setExpanded(isExpanded ? null : cause.id)}
                onHoverStart={() => setHoveredId(cause.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="relative cursor-pointer overflow-hidden nb-border transition-all duration-200"
                style={{
                  boxShadow: isHovered || isExpanded ? `6px 6px 0px ${accent}` : '4px 4px 0px rgba(255,255,255,0.15)',
                  borderColor: isExpanded ? accent : 'rgba(255,255,255,0.15)',
                }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <motion.img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-nb-black/50" />
                  {/* Index */}
                  <div
                    className="absolute top-3 left-3 font-mono text-[10px] tracking-widest px-2 py-0.5"
                    style={{ backgroundColor: accent, color: '#0a0a0a', border: '1.5px solid #0a0a0a' }}
                  >
                    0{i + 1}
                  </div>
                  {/* Icon */}
                  <div
                    className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center nb-border"
                    style={{ backgroundColor: accent, borderColor: '#0a0a0a' }}
                  >
                    <Icon size={18} className="text-nb-black" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 bg-nb-black">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-2xl tracking-wider text-nb-white">
                      {cause.title}
                    </h3>
                    <motion.span
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      className="text-nb-white/40 font-mono text-xl leading-none"
                    >
                      +
                    </motion.span>
                  </div>

                  {/* Accent bar */}
                  <motion.div
                    className="h-0.5 mb-3"
                    style={{ backgroundColor: accent }}
                    initial={{ width: '2rem' }}
                    animate={{ width: isExpanded ? '100%' : '2rem' }}
                    transition={{ duration: 0.3 }}
                  />

                  <p className="font-mono text-nb-white/60 text-xs leading-relaxed">
                    {cause.description}
                  </p>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="mt-4 pt-4 border-t font-mono text-xs space-y-2"
                          style={{ borderColor: accent + '44' }}
                        >
                          <p className="text-nb-white/50 leading-relaxed">
                            This cause is responsible for a significant portion of global greenhouse gas emissions.
                            Addressing it requires systemic change at government, industry, and individual levels.
                          </p>
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-nb-black font-bold text-[10px] tracking-widest mt-2"
                            style={{ backgroundColor: accent }}
                          >
                            LEARN MORE →
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-nb-white/10 px-6 md:px-16 py-5 max-w-7xl mx-auto flex items-center justify-between">
        <span className="font-mono text-xs text-nb-white/30 tracking-widest">
          {climateCauses.length} ROOT CAUSES IDENTIFIED
        </span>
        <span className="font-mono text-xs text-nb-yellow tracking-widest">
          CLICK CARDS TO EXPAND ↑
        </span>
      </div>
    </section>
  );
}
