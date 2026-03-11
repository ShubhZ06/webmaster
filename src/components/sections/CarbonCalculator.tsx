'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Car, Zap, ShoppingBag, Utensils } from 'lucide-react';

const CATEGORIES = [
  { key: 'transport', label: 'Transport', color: '#2D6A4F', light: '#E8F5EE' },
  { key: 'energy',    label: 'Home Energy', color: '#1B4965', light: '#E9F4FA' },
  { key: 'food',      label: 'Food / Diet', color: '#F4A261', light: '#FDF3EC' },
  { key: 'shopping',  label: 'Shopping',    color: '#E63946', light: '#FDECEA' },
];

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 180, damping: 18 });
  const handleMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);
  const handleLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 700 }}
      className={className}>
      {children}
    </motion.div>
  );
}

export default function CarbonCalculator() {
  const [transport, setTransport] = useState(10);
  const [energy, setEnergy] = useState(150);
  const [food, setFood] = useState('average');
  const [shopping, setShopping] = useState(100);

  const transportEmissions = transport * 0.2;
  const energyEmissions = energy * 0.4;

  const foodEmissionsMap: Record<string, number> = {
    vegan: 1.5, vegetarian: 2.0, average: 4.5, meat_heavy: 7.0
  };
  const foodEmissions = (foodEmissionsMap[food] || foodEmissionsMap.average) * 30;
  const shoppingEmissions = shopping * 0.5;
  const totalEmissions = transportEmissions + energyEmissions + foodEmissions + shoppingEmissions;

  const breakdown = [
    { name: 'Transport',    value: transportEmissions, color: '#2D6A4F', light: '#E8F5EE' },
    { name: 'Home Energy',  value: energyEmissions,    color: '#1B4965', light: '#E9F4FA' },
    { name: 'Food / Diet',  value: foodEmissions,      color: '#F4A261', light: '#FDF3EC' },
    { name: 'Shopping',     value: shoppingEmissions,   color: '#E63946', light: '#FDECEA' },
  ];

  const maxVal = Math.max(...breakdown.map(b => b.value), 1);

  return (
    <section id="calculator" className="bg-nb-bg py-0 overflow-hidden border-t-2 border-nb-forest/20">
      {/* Header */}
      <div className="bg-nb-amber px-6 md:px-16 py-10 border-b-2 border-nb-ink/20">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-nb-ink/60 text-xs tracking-widest mb-2">// YOUR FOOTPRINT</p>
            <h2 className="font-display text-5xl md:text-7xl text-nb-ink tracking-wider">
              HOW MUCH<br />IS ON YOU?
            </h2>
          </div>
          <p className="font-mono text-nb-ink/50 text-sm max-w-xs leading-relaxed">
            Drag the sliders. Watch the numbers. It adds up faster than you think.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            {/* Transport */}
            <div className="p-5 nb-border bg-nb-surface nb-shadow" style={{ borderColor: '#2D6A4F' }}>
              <label className="flex items-center gap-2 font-mono text-xs tracking-widest text-nb-forest mb-3">
                <Car size={16} /> WEEKLY COMMUTE
              </label>
              <input
                type="range" min={0} max={500} step={10}
                value={transport}
                onChange={(e) => setTransport(Number(e.target.value))}
                className="w-full accent-nb-forest h-2 bg-nb-mint rounded-none appearance-none cursor-pointer"
              />
              <p className="font-display text-3xl text-nb-ink mt-2">{transport} <span className="text-lg text-nb-ink/40">KM</span></p>
            </div>

            {/* Energy */}
            <div className="p-5 nb-border bg-nb-surface nb-shadow" style={{ borderColor: '#1B4965' }}>
              <label className="flex items-center gap-2 font-mono text-xs tracking-widest text-nb-ocean mb-3">
                <Zap size={16} /> MONTHLY ELECTRICITY
              </label>
              <input
                type="range" min={50} max={1000} step={10}
                value={energy}
                onChange={(e) => setEnergy(Number(e.target.value))}
                className="w-full accent-nb-ocean h-2 bg-nb-mist rounded-none appearance-none cursor-pointer"
              />
              <p className="font-display text-3xl text-nb-ink mt-2">{energy} <span className="text-lg text-nb-ink/40">KWH</span></p>
            </div>

            {/* Diet */}
            <div className="p-5 nb-border bg-nb-surface nb-shadow" style={{ borderColor: '#F4A261' }}>
              <label className="flex items-center gap-2 font-mono text-xs tracking-widest text-nb-earth mb-3">
                <Utensils size={16} /> DIET
              </label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {(['vegan', 'vegetarian', 'average', 'meat_heavy'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => setFood(opt)}
                    className={`px-3 py-2.5 nb-border font-mono text-xs tracking-widest transition-all ${
                      food === opt
                        ? 'bg-nb-amber text-nb-ink nb-shadow-amber'
                        : 'bg-nb-surface text-nb-ink/50 hover:bg-nb-sand/30'
                    }`}
                  >
                    {opt === 'meat_heavy' ? 'MEAT HEAVY' : opt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Shopping */}
            <div className="p-5 nb-border bg-nb-surface nb-shadow" style={{ borderColor: '#E63946' }}>
              <label className="flex items-center gap-2 font-mono text-xs tracking-widest text-nb-red mb-3">
                <ShoppingBag size={16} /> MONTHLY SHOPPING
              </label>
              <input
                type="range" min={0} max={2000} step={50}
                value={shopping}
                onChange={(e) => setShopping(Number(e.target.value))}
                className="w-full accent-nb-red h-2 bg-red-100 rounded-none appearance-none cursor-pointer"
              />
              <p className="font-display text-3xl text-nb-ink mt-2">${shopping}</p>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <TiltCard
              className="p-8 nb-border nb-shadow-xl bg-nb-surface"
              style={{ borderColor: '#2D6A4F', boxShadow: '8px 8px 0 #2D6A4F' }}
            >
              <p className="font-mono text-xs tracking-widest text-nb-forest mb-2">MONTHLY CO₂ EMITTED</p>
              <p className="font-display text-[5rem] leading-none text-nb-ink">
                {Math.round(totalEmissions)}
                <span className="text-3xl text-nb-ink/30 ml-2">KG</span>
              </p>
              <div className="h-[2px] bg-nb-forest w-16 my-4" />
              <p className="font-mono text-nb-ink/40 text-xs">
                {totalEmissions < 200 ? 'Below average — nice.' :
                 totalEmissions < 400 ? 'Around the global mean. Room to improve.' :
                 'Well above average. Time to rethink some habits.'}
              </p>
            </TiltCard>

            {/* Bar breakdown */}
            <div className="p-6 nb-border bg-nb-surface nb-shadow">
              <p className="font-mono text-xs tracking-widest text-nb-ink/40 mb-6">// BREAKDOWN</p>
              <div className="space-y-4">
                {breakdown.map(b => (
                  <div key={b.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-xs tracking-widest text-nb-ink/70">{b.name.toUpperCase()}</span>
                      <span className="font-display text-lg text-nb-ink">{Math.round(b.value)} kg</span>
                    </div>
                    <div className="h-4 nb-border overflow-hidden" style={{ borderColor: b.color }}>
                      <motion.div
                        className="h-full"
                        style={{ backgroundColor: b.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(b.value / maxVal) * 100}%` }}
                        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Context */}
            <div className="p-5 nb-border bg-nb-mint/40 nb-shadow-forest">
              <p className="font-mono text-xs tracking-widest text-nb-forest mb-2">FOR CONTEXT</p>
              <p className="font-mono text-nb-ink/60 text-xs leading-relaxed">
                The global average is roughly 350 kg CO₂/month. To stay under 1.5°C warming, 
                each person needs to get below 200 kg. These are rough estimates for awareness — not lab results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
