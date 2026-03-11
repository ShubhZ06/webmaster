'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { solutions } from '@/lib/data';
import { CheckCircle } from 'lucide-react';

const CHALLENGES = [
  { id: 'c1', label: 'I want to reduce my carbon footprint', tag: 'INDIVIDUAL' },
  { id: 'c2', label: 'I want to influence policy', tag: 'CIVIC' },
  { id: 'c3', label: 'I want to change my diet', tag: 'LIFESTYLE' },
  { id: 'c4', label: 'I want to invest sustainably', tag: 'FINANCIAL' },
];

const ACCENTS = ['#FFE000', '#BEFF00', '#00FFEE', '#FF6B00'];

export default function SolutionsSection() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);

  const toggleComplete = (id: string) =>
    setCompleted(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

  return (
    <section id="solutions" className="bg-nb-black py-0 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-16 py-10 border-b-2 border-nb-yellow">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-nb-yellow text-xs tracking-widest mb-2">// THE PATH FORWARD</p>
            <h2 className="font-display text-5xl md:text-7xl text-nb-white tracking-wider">
              SOLUTIONS<br />EXIST.
            </h2>
          </div>
          <p className="font-mono text-nb-white/40 text-sm max-w-xs leading-relaxed">
            Every action counts. Choose your starting point and build from there.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 space-y-16">

        {/* Interactive challenge selector */}
        <div>
          <p className="font-mono text-xs text-nb-white/40 tracking-widest mb-6">
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
                  className="p-5 nb-border text-left transition-all duration-150 group relative overflow-hidden"
                  style={{
                    backgroundColor: isActive ? ACCENTS[i] : 'transparent',
                    borderColor: isActive ? ACCENTS[i] : 'rgba(255,255,255,0.15)',
                    boxShadow: isActive ? `5px 5px 0px ${ACCENTS[i]}88` : 'none',
                  }}
                >
                  <span
                    className="font-mono text-[9px] tracking-widest block mb-2"
                    style={{ color: isActive ? '#0a0a0a' : ACCENTS[i] }}
                  >
                    {ch.tag}
                  </span>
                  <span
                    className="font-display text-xl tracking-wide"
                    style={{ color: isActive ? '#0a0a0a' : '#f5f0e8' }}
                  >
                    {ch.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="challenge-check"
                      className="absolute top-4 right-4"
                    >
                      <CheckCircle size={20} className="text-nb-black" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Solution Cards */}
        <div>
          <p className="font-mono text-xs text-nb-white/40 tracking-widest mb-6">
            // ALL SOLUTIONS — CLICK TO MARK DONE
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {solutions.map((solution, i) => {
              const Icon = solution.icon;
              const accent = ACCENTS[i % ACCENTS.length];
              const isDone = completed.includes(solution.id);

              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => toggleComplete(solution.id)}
                  className="relative cursor-pointer group nb-border overflow-hidden"
                  style={{
                    borderColor: isDone ? accent : 'rgba(255,255,255,0.12)',
                    boxShadow: isDone ? `5px 5px 0px ${accent}` : '3px 3px 0px rgba(255,255,255,0.08)',
                  }}
                  whileHover={{ y: -4 }}
                >
                  {isDone && (
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{ backgroundColor: accent }}
                    />
                  )}

                  {/* Top accent stripe */}
                  <div className="h-1 w-full" style={{ backgroundColor: accent }} />

                  <div className="p-6">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 flex items-center justify-center nb-border mb-5 transition-transform group-hover:rotate-6"
                      style={{ backgroundColor: accent, borderColor: '#0a0a0a' }}
                    >
                      <Icon size={20} className="text-nb-black" />
                    </div>

                    <h3 className="font-display text-2xl tracking-wider text-nb-white mb-3">
                      {solution.title}
                    </h3>
                    <p className="font-mono text-nb-white/50 text-xs leading-relaxed mb-5">
                      {solution.description}
                    </p>

                    {/* Action tag */}
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-[10px] tracking-widest px-2 py-1"
                        style={{
                          backgroundColor: isDone ? accent : 'transparent',
                          color: isDone ? '#0a0a0a' : accent,
                          border: `1.5px solid ${accent}`,
                        }}
                      >
                        {isDone ? '✓ DONE' : solution.action.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        {completed.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-nb-yellow nb-border nb-shadow-xl"
          >
            <p className="font-mono text-[10px] text-nb-black/60 tracking-widest mb-2">YOUR PROGRESS</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-nb-black/20 nb-border overflow-hidden">
                <motion.div
                  className="h-full bg-nb-black"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completed.length / solutions.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 100 }}
                />
              </div>
              <span className="font-display text-3xl text-nb-black">
                {completed.length}/{solutions.length}
              </span>
            </div>
            <p className="font-display text-xl text-nb-black mt-2 tracking-wide">
              {completed.length === solutions.length ? '🌍 LEGEND. EVERY SOLUTION ADOPTED.' : 'KEEP GOING — EVERY ACTION MATTERS.'}
            </p>
          </motion.div>
        )}

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-4"
        >
          {[
            { label: 'SHARE THIS SITE', sub: 'Spread the word', accent: '#FFE000', cta: 'SHARE →' },
            { label: 'IPCC REPORT', sub: 'Read the science', accent: '#BEFF00', cta: 'READ →' },
            { label: 'CARBON CALCULATOR', sub: 'Find your footprint', accent: '#00FFEE', cta: 'CALCULATE →' },
          ].map(item => (
            <div
              key={item.label}
              className="p-6 nb-border nb-hover cursor-pointer"
              style={{ borderColor: item.accent, boxShadow: `4px 4px 0 ${item.accent}` }}
            >
              <p className="font-display text-3xl tracking-wider text-nb-white mb-1">{item.label}</p>
              <p className="font-mono text-xs text-nb-white/50 tracking-widest mb-4">{item.sub}</p>
              <span
                className="font-mono text-xs tracking-widest px-3 py-1.5 font-bold"
                style={{ backgroundColor: item.accent, color: '#0a0a0a', border: '1.5px solid #0a0a0a' }}
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
