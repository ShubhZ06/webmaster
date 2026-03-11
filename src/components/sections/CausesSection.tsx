'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { climateCauses } from '@/lib/data';

// Environmental accent palette per card
const ACCENTS = ['#2D6A4F', '#1B4965', '#F4A261', '#40916C', '#E63946', '#774936'];
const ACCENT_LIGHTS = ['#E8F5EE', '#E9F4FA', '#FDF3EC', '#EBF9F3', '#FDECEA', '#F7EDE9'];

export default function CausesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="causes" className="bg-nb-bg py-0 overflow-hidden border-t-2 border-nb-forest/20">
      {/* Header */}
      <div className="px-6 md:px-16 py-10 border-b-2 border-nb-forest/20 bg-nb-mint/30">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-nb-forest text-xs tracking-widest mb-2">// ROOT CAUSES</p>
            <h2 className="font-display text-5xl md:text-7xl text-nb-ink tracking-wider">
              WHAT&apos;S<br />DRIVING THIS?
            </h2>
          </div>
          <p className="font-mono text-nb-ink/50 text-sm max-w-xs leading-relaxed">
            Human activities are the primary driver. Click any card to explore deeper.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {climateCauses.map((cause, i) => {
            const Icon = cause.icon;
            const accent = ACCENTS[i % ACCENTS.length];
            const accentLight = ACCENT_LIGHTS[i % ACCENT_LIGHTS.length];
            const isExpanded = expanded === cause.id;

            return (
              <motion.div
                key={cause.id}
                layout
                onClick={() => setExpanded(isExpanded ? null : cause.id)}
                className="relative cursor-pointer overflow-hidden nb-border bg-nb-surface transition-all duration-200"
                style={{
                  borderColor: isExpanded ? accent : 'rgba(26,46,26,0.18)',
                  boxShadow: isExpanded ? `6px 6px 0 ${accent}` : '4px 4px 0 rgba(26,46,26,0.15)',
                }}
                whileHover={{ y: -3 }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <motion.img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-nb-ink/25" />
                  {/* Index tag */}
                  <div
                    className="absolute top-3 left-3 font-mono text-[10px] tracking-widest px-2 py-0.5 nb-border"
                    style={{ backgroundColor: accentLight, color: accent, borderColor: accent }}
                  >
                    0{i + 1}
                  </div>
                  {/* Icon badge */}
                  <div
                    className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center nb-border"
                    style={{ backgroundColor: accent, borderColor: '#1A2E1A' }}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 bg-nb-surface">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-2xl tracking-wider text-nb-ink">{cause.title}</h3>
                    <motion.span
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      className="text-nb-ink/40 font-mono text-xl leading-none"
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
                  <p className="font-mono text-nb-ink/60 text-xs leading-relaxed">
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
                          className="mt-4 pt-4 border-t font-mono text-xs space-y-3"
                          style={{ borderColor: accent + '40' }}
                        >
                          <p className="text-nb-ink/60 leading-relaxed">
                            This cause significantly contributes to global greenhouse gas
                            emissions. Addressing it requires systemic change at government,
                            industry, and individual levels.
                          </p>
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 font-bold text-[10px] tracking-widest nb-border"
                            style={{ backgroundColor: accentLight, color: accent, borderColor: accent }}
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
      <div className="border-t-2 border-nb-forest/20 px-6 md:px-16 py-5 max-w-7xl mx-auto flex items-center justify-between">
        <span className="font-mono text-xs text-nb-ink/30 tracking-widest">{climateCauses.length} ROOT CAUSES IDENTIFIED</span>
        <span className="font-mono text-xs text-nb-forest tracking-widest">CLICK TO EXPAND ↑</span>
      </div>
    </section>
  );
}
