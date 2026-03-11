'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, TargetAndTransition } from 'framer-motion';
import { solutions } from '@/lib/data';
import { CheckCircle } from 'lucide-react';

const CHALLENGES = [
  { id: 'c1', label: 'I want to reduce my carbon footprint', tag: 'INDIVIDUAL' },
  { id: 'c2', label: 'I want to influence policy',           tag: 'CIVIC'      },
  { id: 'c3', label: 'I want to change my diet',            tag: 'LIFESTYLE'  },
  { id: 'c4', label: 'I want to invest sustainably',        tag: 'FINANCIAL'  },
];

const ACCENTS      = ['#2D6A4F', '#1B4965', '#40916C', '#F4A261'];
const ACCENT_LIGHTS = ['#E8F5EE', '#E9F4FA', '#EBF9F3', '#FDF3EC'];

function TiltCard({ children, className, style, onClick, whileHover }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void; whileHover?: TargetAndTransition }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 180, damping: 18 });
  const handleMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);
  const handleLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={onClick}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 700 }}
      className={className} whileHover={whileHover}>
      {children}
    </motion.div>
  );
}

export default function SolutionsSection() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const toggleComplete = (id: string) =>
    setCompleted(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

  return (
    <section id="solutions" className="bg-nb-bg py-0 overflow-hidden border-t-2 border-nb-forest/20">
      {/* Header */}
      <div className="bg-nb-forest px-6 md:px-16 py-10 border-b-2 border-nb-ink/20">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-nb-sage text-xs tracking-widest mb-2">// THE PATH FORWARD</p>
            <h2 className="font-display text-5xl md:text-7xl text-nb-surface tracking-wider">
              SOLUTIONS<br />EXIST.
            </h2>
          </div>
          <p className="font-mono text-nb-surface/50 text-sm max-w-xs leading-relaxed">
            No one can do everything. Everyone can do something. Pick yours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 space-y-16">

        {/* Challenge selector */}
        <div>
          <p className="font-mono text-xs text-nb-ink/40 tracking-widest mb-6">
            // WHAT DO YOU WANT TO CHANGE?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {CHALLENGES.map((ch, i) => {
              const isActive = selectedChallenge === ch.id;
              return (
                <motion.button
                  key={ch.id}
                  onClick={() => setSelectedChallenge(isActive ? null : ch.id)}
                  whileTap={{ scale: 0.98 }}
                  className="p-5 nb-border text-left transition-all duration-150 relative overflow-hidden bg-nb-surface"
                  style={{
                    backgroundColor: isActive ? ACCENT_LIGHTS[i] : '#FAFAF5',
                    borderColor: isActive ? ACCENTS[i] : 'rgba(26,46,26,0.2)',
                    boxShadow: isActive ? `5px 5px 0 ${ACCENTS[i]}` : '3px 3px 0 rgba(26,46,26,0.12)',
                  }}
                >
                  <span
                    className="font-mono text-[9px] tracking-widest block mb-2"
                    style={{ color: ACCENTS[i] }}
                  >
                    {ch.tag}
                  </span>
                  <span className="font-display text-xl tracking-wide text-nb-ink">
                    {ch.label}
                  </span>
                  {isActive && (
                    <motion.div layoutId="challenge-check" className="absolute top-4 right-4">
                      <CheckCircle size={20} style={{ color: ACCENTS[i] }} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Solution Cards */}
        <div>
          <p className="font-mono text-xs text-nb-ink/40 tracking-widest mb-6">
            // ALL SOLUTIONS — CLICK TO MARK DONE
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {solutions.map((solution, i) => {
              const Icon = solution.icon;
              const accent = ACCENTS[i % ACCENTS.length];
              const accentLight = ACCENT_LIGHTS[i % ACCENT_LIGHTS.length];
              const isDone = completed.includes(solution.id);

              return (
                <TiltCard
                  key={solution.id}
                  onClick={() => toggleComplete(solution.id)}
                  className="relative cursor-pointer group nb-border overflow-hidden bg-nb-surface"
                  style={{
                    borderColor: isDone ? accent : 'rgba(26,46,26,0.18)',
                    boxShadow: isDone ? `5px 5px 0 ${accent}` : '3px 3px 0 rgba(26,46,26,0.12)',
                    backgroundColor: isDone ? accentLight : '#FAFAF5',
                  }}
                  whileHover={{ y: -4 }}
                >
                  {/* Top stripe */}
                  <div className="h-1 w-full" style={{ backgroundColor: accent }} />

                  <div className="p-6">
                    <div
                      className="w-12 h-12 flex items-center justify-center nb-border mb-5 transition-transform group-hover:rotate-6"
                      style={{ backgroundColor: accent, borderColor: '#1A2E1A' }}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="font-display text-2xl tracking-wider text-nb-ink mb-3">{solution.title}</h3>
                    <p className="font-mono text-nb-ink/55 text-xs leading-relaxed mb-5">{solution.description}</p>

                    <span
                      className="font-mono text-[10px] tracking-widest px-2 py-1 nb-border"
                      style={{
                        backgroundColor: isDone ? accent : 'transparent',
                        color: isDone ? 'white' : accent,
                        borderColor: accent,
                      }}
                    >
                      {isDone ? '✓ DONE' : solution.action.toUpperCase()}
                    </span>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        {completed.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-nb-forest nb-border nb-shadow-xl"
          >
            <p className="font-mono text-[10px] text-nb-surface/60 tracking-widest mb-2">YOUR PROGRESS</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-nb-surface/20 nb-border overflow-hidden">
                <motion.div
                  className="h-full bg-nb-sun"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completed.length / solutions.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 100 }}
                />
              </div>
              <span className="font-display text-3xl text-nb-surface">
                {completed.length}/{solutions.length}
              </span>
            </div>
            <p className="font-display text-xl text-nb-surface mt-2 tracking-wide">
              {completed.length === solutions.length
                ? '🌍 LEGEND. EVERY SOLUTION ADOPTED.'
                : 'KEEP GOING — EVERY ACTION MATTERS.'}
            </p>
          </motion.div>
        )}

        {/* CTA trio */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-4"
        >
          {[
            { label: 'SHARE THIS SITE',      sub: 'Spread the word',    accent: '#2D6A4F', light: '#E8F5EE', cta: 'SHARE →'      },
            { label: 'IPCC REPORT',          sub: 'Read the science',   accent: '#1B4965', light: '#E9F4FA', cta: 'READ →'       },
            { label: 'CARBON CALCULATOR',    sub: 'Find your footprint',accent: '#F4A261', light: '#FDF3EC', cta: 'CALCULATE →'  },
          ].map(item => (
            <div
              key={item.label}
              className="p-6 nb-border nb-hover cursor-pointer bg-nb-surface"
              style={{ borderColor: item.accent, boxShadow: `4px 4px 0 ${item.accent}`, backgroundColor: item.light }}
            >
              <p className="font-display text-2xl tracking-wider text-nb-ink mb-1">{item.label}</p>
              <p className="font-mono text-xs text-nb-ink/50 tracking-widest mb-4">{item.sub}</p>
              <span
                className="font-mono text-xs tracking-widest px-3 py-1.5 font-bold nb-border"
                style={{ backgroundColor: item.accent, color: 'white', borderColor: '#1A2E1A' }}
              >
                {item.cta}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
