'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThermometerSun, Wind, Droplets, MapPin, ChevronRight } from 'lucide-react';

const STORY_STEPS = [
  {
    id: 0, tag: 'CHAPTER 01', heading: 'THE GREENHOUSE TRAP',
    icon: ThermometerSun, accent: '#E63946', accentLight: '#FDECEA',
    text: "Since the pre-industrial era, human activities have increased atmospheric CO₂ by over 50%. Greenhouse gases act like a blanket around Earth — every ton we emit thickens it. The planet has warmed 1.1°C and is accelerating.",
    stat: { value: '50%', label: 'CO₂ INCREASE SINCE 1750' },
    visual: '🌡️',
  },
  {
    id: 1, tag: 'CHAPTER 02', heading: 'THE CHAIN REACTION',
    icon: Wind, accent: '#F4A261', accentLight: '#FDF3EC',
    text: "Warming doesn't just mean hotter days. It breaks the entire climate system: jet streams shift, monsoons fail, oceans acidify, permafrost thaws releasing more methane. One degree cascades into dozens of catastrophes.",
    stat: { value: '5×', label: 'EXTREME EVENTS INCREASE' },
    visual: '🌪️',
  },
  {
    id: 2, tag: 'CHAPTER 03', heading: 'THE RISING TIDE',
    icon: Droplets, accent: '#1B4965', accentLight: '#E9F4FA',
    text: "Sea levels rise at 3.4mm per year — faster than any point in recorded history. Thermal expansion + melting ice = existential risk for 600 million coastal people. Mumbai, Miami and Jakarta face permanent flooding by 2100.",
    stat: { value: '600M', label: 'PEOPLE IN COASTAL RISK ZONES' },
    visual: '🌊',
  },
  {
    id: 3, tag: 'CHAPTER 04', heading: 'THE EXTINCTION WAVE',
    icon: MapPin, accent: '#2D6A4F', accentLight: '#E8F5EE',
    text: "Climate change is triggering the sixth mass extinction. Over 1 million species face extinction this century. Habitat fragmentation, temperature shifts, and ocean acidification are collapsing food webs built over millions of years.",
    stat: { value: '1M+', label: 'SPECIES THREATENED NOW' },
    visual: '🐘',
  },
];

export function ClimateIntro() {
  const [active, setActive] = useState(0);
  const current = STORY_STEPS[active];

  return (
    <section id="intro" className="bg-nb-surface text-nb-ink py-0 overflow-hidden">
      {/* Section header stripe */}
      <div className="bg-nb-mint/40 border-b-2 border-nb-forest px-6 md:px-16 py-8">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-nb-forest text-xs tracking-widest mb-2">// ADAPTIVE STORY</p>
            <h2 className="font-display text-5xl md:text-7xl text-nb-ink tracking-wider">
              UNDERSTANDING<br />THE CRISIS
            </h2>
          </div>
          <p className="font-mono text-nb-ink/50 text-sm max-w-sm leading-relaxed">
            Choose your chapter. Each reveals a different dimension of the emergency unfolding around us.
          </p>
        </div>
      </div>

      {/* Chapter Selector Tabs */}
      <div className="border-b-2 border-nb-forest/20 bg-nb-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex overflow-x-auto">
          {STORY_STEPS.map(step => (
            <button
              key={step.id}
              onClick={() => setActive(step.id)}
              className={`flex-shrink-0 px-6 py-4 font-mono text-xs tracking-widest border-r-2 border-nb-forest/20 transition-all duration-200 ${
                active === step.id
                  ? 'text-nb-surface border-b-4 border-b-nb-forest'
                  : 'text-nb-ink/50 hover:text-nb-ink'
              }`}
              style={active === step.id ? { backgroundColor: current.accent } : {}}
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
              className="font-mono text-xs tracking-widest mb-4 px-3 py-1 w-fit nb-border"
              style={{ backgroundColor: current.accentLight, color: current.accent, borderColor: current.accent }}
            >
              {current.tag}
            </div>
            <h3 className="font-display text-5xl md:text-6xl leading-none tracking-wider text-nb-ink mb-6">
              {current.heading}
            </h3>
            <p className="font-sans text-nb-ink/70 text-base md:text-lg leading-relaxed mb-8">
              {current.text}
            </p>

            {/* Navigation arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActive(a => Math.max(0, a - 1))}
                disabled={active === 0}
                className="w-12 h-12 nb-border nb-shadow bg-nb-surface text-nb-ink flex items-center justify-center disabled:opacity-25 hover:bg-nb-forest hover:text-nb-surface transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setActive(a => Math.min(STORY_STEPS.length - 1, a + 1))}
                disabled={active === STORY_STEPS.length - 1}
                className="w-12 h-12 nb-border nb-shadow bg-nb-surface text-nb-ink flex items-center justify-center disabled:opacity-25 hover:bg-nb-forest hover:text-nb-surface transition-colors"
              >
                →
              </button>
              <span className="font-mono text-xs text-nb-ink/40 tracking-widest">
                {active + 1} / {STORY_STEPS.length}
              </span>
            </div>
          </div>

          {/* Right: Big stat card */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="nb-border nb-shadow-xl p-8 relative overflow-hidden"
              style={{ backgroundColor: current.accentLight, borderColor: current.accent, boxShadow: `8px 8px 0 ${current.accent}` }}
            >
              <div className="absolute top-4 right-4 text-6xl opacity-20 select-none">{current.visual}</div>
              <p className="font-mono text-xs tracking-widest mb-2" style={{ color: current.accent }}>{current.stat.label}</p>
              <p className="font-display text-8xl leading-none" style={{ color: current.accent }}>{current.stat.value}</p>
            </motion.div>

            {/* Progress dots */}
            <div className="flex gap-2">
              {STORY_STEPS.map(step => (
                <button
                  key={step.id}
                  onClick={() => setActive(step.id)}
                  className={`h-2 transition-all duration-300 nb-border ${
                    active === step.id ? 'w-12' : 'w-4 opacity-30 hover:opacity-60'
                  }`}
                  style={{ backgroundColor: active === step.id ? step.accent : '#1A2E1A', borderColor: '#1A2E1A' }}
                />
              ))}
            </div>

            {/* Quick-jump cards */}
            <div className="grid grid-cols-2 gap-3">
              {STORY_STEPS.map(step => {
                const Icon = step.icon;
                const isActive = active === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActive(step.id)}
                    className="p-4 nb-border text-left transition-all duration-150 group"
                    style={{
                      backgroundColor: isActive ? step.accentLight : '#FAFAF5',
                      borderColor: isActive ? step.accent : '#1A2E1A',
                      boxShadow: `3px 3px 0 ${isActive ? step.accent : '#1A2E1A'}`,
                    }}
                  >
                    <Icon size={16} className="mb-2" style={{ color: step.accent }} />
                    <p className="font-mono text-[10px] tracking-widest opacity-50">{step.tag}</p>
                    <p className="font-display text-sm tracking-wide mt-1 text-nb-ink">{step.heading}</p>
                    <ChevronRight size={14} className="mt-2 opacity-30 group-hover:opacity-80 transition-opacity text-nb-ink" />
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
