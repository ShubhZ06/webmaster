'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { indiaImpacts } from '@/lib/data';
import SectionWrapper from '../ui/SectionWrapper';
import { AnimatedCard } from '../ui/AnimatedCard';
import { MapPin } from 'lucide-react';

export default function IndiaImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start center'],
  });

  const mapScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const mapOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <SectionWrapper id="india" className="bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(241,245,249,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(241,245,249,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(15,23,42,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.5)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-slate-100"
          >
            Climate Crisis in India
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300"
          >
            India is among the most vulnerable countries to climate change, facing severe risks from rising temperatures to shifting monsoon patterns.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conceptual Map Area */}
          <motion.div 
            style={{ scale: mapScale, opacity: mapOpacity }}
            className="relative lg:h-[600px] w-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 shadow-inner overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20 dark:opacity-40">
               {/* Decorative background circle */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-full blur-[80px]" />
            </div>
            
            <div className="relative w-full aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 p-8 flex flex-col items-center justify-center">
              <span className="text-slate-400 dark:text-slate-500 font-mono text-xl tracking-widest uppercase mb-4">India Vulnerability Map</span>
              <div className="w-24 h-24 border-4 border-dashed border-slate-300 dark:border-slate-600 rounded-full animate-spin-slow flex items-center justify-center mb-8">
                <MapPin className="text-emerald-500" size={32} />
              </div>
              <p className="text-center text-slate-500 dark:text-slate-400 max-w-sm">
                Interactive geographic visualization showing regional climate impacts across the subcontinent.
              </p>

              {/* Placed Pins */}
              {indiaImpacts.map((impact, i) => (
                <motion.div
                  key={`pin-${impact.id}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (i * 0.2), type: 'spring' }}
                  className="absolute hidden md:flex flex-col items-center"
                  style={{ top: `${impact.y}%`, left: `${impact.x}%` }}
                >
                  <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse" />
                  <div className="mt-2 px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur text-xs font-bold rounded-full shadow-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {impact.region}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Details List */}
          <div className="space-y-6">
            {indiaImpacts.map((impact, index) => (
              <AnimatedCard 
                key={impact.id}
                delay={0.2 + (index * 0.1)}
                className="bg-white dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 text-red-500 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                        {impact.region}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                      {impact.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {impact.description}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
