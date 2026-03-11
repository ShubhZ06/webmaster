'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { climateCauses } from '@/lib/data';
import SectionWrapper from '../ui/SectionWrapper';
import { AnimatedCard } from '../ui/AnimatedCard';

export default function CausesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start center'],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <SectionWrapper id="causes" className="bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-slate-100">
            What's Driving the Crisis?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300">
            Human activities are the primary driver of climate change, mainly through the emission of greenhouse gases.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {climateCauses.map((cause, index) => {
            const Icon = cause.icon;
            return (
              <AnimatedCard 
                key={cause.id} 
                delay={index * 0.1}
                className="group h-full overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                  <img 
                    src={cause.image} 
                    alt={cause.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                  />
                  <div className={`absolute top-4 right-4 z-20 w-12 h-12 rounded-full ${cause.color} flex items-center justify-center text-white shadow-lg shadow-black/20 transform group-hover:-translate-y-2 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                </div>
                
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {cause.title}
                  </h3>
                  <div className="w-12 h-1 bg-emerald-500 rounded-full mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cause.description}
                  </p>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
