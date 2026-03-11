'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThermometerSun, Wind, Droplets, MapPin, ChevronRight } from 'lucide-react';

const STORY_STEPS = [
  {
    id: 0,
    tag: 'CHAPTER 01',
    heading: 'THE GREENHOUSE TRAP',
    icon: ThermometerSun,
    accent: '#FFE000',
    text: "Since the pre-industrial era, human activities have increased atmospheric CO₂ by over 50%. Greenhouse gases act like a literal blanket wrapped around Earth — every ton we emit thickens it. The planet has warmed 1.1°C and is accelerating.",
    stat: { value: '50%', label: 'CO₂ INCREASE SINCE 1750' },
    visual: '🌡️',
  },
  {
    id: 1,
    tag: 'CHAPTER 02',
    heading: 'THE CHAIN REACTION',
    icon: Wind,
    accent: '#FF6B00',
    text: "Warming doesn't just mean hotter days. It breaks the entire climate system: jet streams shift, monsoons fail, oceans acidify, permafrost thaws and releases more methane. One degree of warming cascades into dozens of catastrophes.",
    stat: { value: '5×', label: 'EXTREME EVENTS INCREASE' },
    visual: '🌪️',
  },
  {
    id: 2,
    tag: 'CHAPTER 03',
    heading: 'THE RISING TIDE',
    icon: Droplets,
    accent: '#00FFEE',
    text: "Sea levels are rising at 3.4mm per year — faster than at any point in recorded history. Thermal expansion + melting ice sheets = existential risk for 600 million coastal people. By 2100, cities like Mumbai, Miami and Jakarta will be underwater.",
    stat: { value: '600M', label: 'PEOPLE IN COASTAL RISK ZONES' },
    visual: '🌊',
  },
  {
    id: 3,
    tag: 'CHAPTER 04',
    heading: 'THE EXTINCTION WAVE',
    icon: MapPin,
    accent: '#BEFF00',
    text: "Climate change is triggering the sixth mass extinction. Over 1 million species face extinction in coming decades. Habitat fragmentation, temperature shifts, and ocean acidification are collapsing food webs that took millions of years to form.",
    stat: { value: '1M+', label: 'SPECIES THREATENED NOW' },
    visual: '🐘',
  },
];

export function ClimateIntro() {
  const [active, setActive] = useState(0);
  const current = STORY_STEPS[active];

  return (
    <section id="intro" className="bg-nb-white text-nb-black py-0 overflow-hidden">
      {/* Section header stripe */}
      <div className="bg-nb-black px-6 md:px-16 py-8 border-b-2 border-nb-yellow">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-nb-yellow text-xs tracking-widest mb-2">// ADAPTIVE STORY</p>
            <h2 className="font-display text-5xl md:text-7xl text-nb-white tracking-wider">
              UNDERSTANDING<br />THE CRISIS
            </h2>
          </div>
          <p className="font-mono text-nb-white/50 text-sm max-w-sm leading-relaxed">
            Choose your chapter. Each reveals a different dimension of the emergency unfolding around us.
          </p>
        </div>
      </div>

      {/* Chapter Selector Tabs */}
      <div className="bg-nb-black border-b-2 border-nb-yellow">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex overflow-x-auto">
          {STORY_STEPS.map(step => (
            <button
              key={step.id}
              onClick={() => setActive(step.id)}
              className={`flex-shrink-0 px-6 py-4 font-mono text-xs tracking-widest border-r-2 border-nb-yellow transition-all duration-200 ${
                active === step.id
                  ? 'bg-nb-yellow text-nb-black'
                  : 'text-nb-white/50 hover:text-nb-white hover:bg-nb-white/[0.04]'
              }`}
            >
              {step.tag}
            </button>
          ))}
        </div>
      </div>

      {/* Story Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Story */}
          <div>
            <div
              className="font-mono text-xs tracking-widest mb-4 px-3 py-1 w-fit"
              style={{ backgroundColor: current.accent, color: '#0a0a0a', border: '2px solid #0a0a0a' }}
            >
              {current.tag}
            </div>
            <h3 className="font-display text-5xl md:text-6xl leading-none tracking-wider text-nb-black mb-6">
              {current.heading}
            </h3>
            <p className="font-sans text-nb-black/70 text-base md:text-lg leading-relaxed mb-8">
              {current.text}
            </p>

            {/* Navigation arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActive(a => Math.max(0, a - 1))}
                disabled={active === 0}
                className="w-12 h-12 nb-border nb-shadow bg-nb-black text-nb-white flex items-center justify-center disabled:opacity-20 hover:bg-nb-yellow hover:text-nb-black transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setActive(a => Math.min(STORY_STEPS.length - 1, a + 1))}
                disabled={active === STORY_STEPS.length - 1}
                className="w-12 h-12 nb-border nb-shadow bg-nb-black text-nb-white flex items-center justify-center disabled:opacity-20 hover:bg-nb-yellow hover:text-nb-black transition-colors"
              >
                →
              </button>
              <span className="font-mono text-xs text-nb-black/40 tracking-widest">
                {active + 1} / {STORY_STEPS.length}
              </span>
            </div>
          </div>

          {/* Right: Big stat card */}
          <div className="flex flex-col gap-6">
            {/* Stat block */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="nb-border nb-shadow-xl p-8 relative overflow-hidden"
              style={{ backgroundColor: current.accent }}
            >
              <div className="absolute top-4 right-4 text-6xl opacity-20 select-none">
                {current.visual}
              </div>
              <p className="font-mono text-xs tracking-widest text-nb-black/60 mb-2">{current.stat.label}</p>
              <p className="font-display text-8xl leading-none text-nb-black">{current.stat.value}</p>
            </motion.div>

            {/* Chapter dots progress */}
            <div className="flex gap-2 items-center">
              {STORY_STEPS.map(step => (
                <button
                  key={step.id}
                  onClick={() => setActive(step.id)}
                  className={`h-2 transition-all duration-300 nb-border ${
                    active === step.id ? 'w-12 bg-nb-black' : 'w-4 bg-nb-black/20 hover:bg-nb-black/40'
                  }`}
                />
              ))}
            </div>

            {/* Quick-jump cards */}
            <div className="grid grid-cols-2 gap-3">
              {STORY_STEPS.map(step => {
                const Icon = step.icon;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActive(step.id)}
                    className={`p-4 nb-border text-left transition-all duration-150 group ${
                      active === step.id
                        ? 'bg-nb-black text-nb-white'
                        : 'bg-nb-white/50 text-nb-black hover:bg-nb-black hover:text-nb-white'
                    }`}
                    style={{ boxShadow: active === step.id ? `3px 3px 0px ${step.accent}` : '3px 3px 0px #0a0a0a' }}
                  >
                    <Icon size={16} className="mb-2" style={{ color: active === step.id ? step.accent : 'inherit' }} />
                    <p className="font-mono text-[10px] tracking-widest opacity-60">{step.tag}</p>
                    <p className="font-display text-sm tracking-wide mt-1">{step.heading}</p>
                    <ChevronRight size={14} className="mt-2 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
