'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(to: number, decimals: number, duration: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((eased * to).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, to, decimals, duration]);
  return val;
}

const STATS = [
  {
    value: 1.1, decimals: 1, suffix: '°C', prefix: '+',
    label: 'GLOBAL TEMP RISE', sub: 'Since pre-industrial era',
    accent: '#E63946', accentLight: '#FDECEA',
    desc: 'Every fraction of a degree matters',
  },
  {
    value: 421, decimals: 0, suffix: ' PPM', prefix: '',
    label: 'CO₂ CONCENTRATION', sub: 'Highest in 3 million years',
    accent: '#1B4965', accentLight: '#E9F4FA',
    desc: 'Pre-industrial level was 280 ppm',
  },
  {
    value: 3.4, decimals: 1, suffix: 'mm', prefix: '',
    label: 'SEA LEVEL RISE/YR', sub: 'Accelerating every decade',
    accent: '#40916C', accentLight: '#EBF9F3',
    desc: 'Threatening 600M coastal people',
  },
  {
    value: 1, decimals: 0, suffix: 'M+', prefix: '',
    label: 'SPECIES AT RISK', sub: 'Per IPCC 6th Assessment',
    accent: '#774936', accentLight: '#F7EDE9',
    desc: 'One million now face extinction',
  },
];

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const val = useCountUp(stat.value, stat.decimals, 2.5, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="relative overflow-hidden group cursor-default nb-border bg-nb-surface transition-all duration-200"
      style={{
        borderColor: stat.accent,
        boxShadow: `4px 4px 0 ${stat.accent}`,
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translate(-3px,-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translate(0,0)')}
    >
      {/* Bg tint */}
      <div className="absolute inset-0 opacity-40" style={{ backgroundColor: stat.accentLight }} />

      <div className="relative p-6 md:p-8">
        <p className="font-mono text-[10px] tracking-widest mb-4" style={{ color: stat.accent }}>{stat.label}</p>

        <div className="font-display leading-none mb-3" style={{ color: stat.accent }}>
          <span className="text-3xl">{stat.prefix}</span>
          <span className="text-6xl md:text-7xl counting">{val.toFixed(stat.decimals)}</span>
          <span className="text-3xl">{stat.suffix}</span>
        </div>

        {/* Divider expanding on hover */}
        <div
          className="h-[2px] w-12 mb-3 transition-all duration-300 group-hover:w-full"
          style={{ backgroundColor: stat.accent }}
        />

        <p className="font-mono text-nb-ink/70 text-xs tracking-wide mb-1">{stat.sub}</p>
        <p className="font-mono text-nb-ink/40 text-[10px] tracking-widest">{stat.desc}</p>
      </div>
    </motion.div>
  );
}

export function ImpactStats() {
  return (
    <section id="impact" className="bg-nb-surface py-0 overflow-hidden border-t-2 border-nb-forest/20">
      {/* Header */}
      <div className="px-6 md:px-16 py-10 border-b-2 border-nb-forest/20 bg-nb-bg">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-nb-forest text-xs tracking-widest mb-2">// THE NUMBERS</p>
            <h2 className="font-display text-5xl md:text-7xl text-nb-ink tracking-wider">
              BRUTAL<br />FACTS
            </h2>
          </div>
          <p className="font-mono text-nb-ink/50 text-sm max-w-xs leading-relaxed">
            Not projections. Not models. Measurements. Taken this year, from instruments on the ground and in orbit.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Consensus callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-8 bg-nb-forest nb-border nb-shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <p className="font-mono text-[10px] tracking-widest text-nb-surface/60 mb-1">SCIENTIFIC CONSENSUS</p>
            <p className="font-display text-3xl md:text-4xl text-nb-surface tracking-wider">
              97% OF CLIMATE SCIENTISTS AGREE. THIS ISN&apos;T A DEBATE.
            </p>
          </div>
          <div className="font-display text-8xl text-nb-surface/15 flex-shrink-0">97%</div>
        </motion.div>
      </div>
    </section>
  );
}
