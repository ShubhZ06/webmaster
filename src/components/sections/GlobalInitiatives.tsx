'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const initiatives = [
  {
    year: '2015',
    title: 'Paris Agreement',
    desc: 'Adopted by 196 Parties at COP 21, its goal is to limit global warming to well below 2, preferably to 1.5 degrees Celsius, compared to pre-industrial levels.'
  },
  {
    year: '2030',
    title: 'Sustainable Development Goals',
    desc: 'Goal 13 specifically calls for urgent action to combat climate change and its impacts by the target year of 2030.'
  },
  {
    year: '2050',
    title: 'Net Zero Coalition',
    desc: 'A growing coalition of countries, cities, businesses, and institutions pledging to reach net-zero emissions by 2050.'
  }
];

export default function GlobalInitiatives() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section id="initiatives" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-5xl mx-auto px-6" ref={containerRef}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-900">Global Initiatives</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            The world is waking up. Frameworks and coalitions are taking shape globally to accelerate the transition to a sustainable future.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-emerald-100 rounded-full -translate-x-1/2" />
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-emerald-600 rounded-full -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16">
            {initiatives.map((item, index) => (
              <div key={item.year} className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white -translate-x-1/2 z-10 shadow-lg shadow-emerald-500/50" />
                
                {/* Empty Half */}
                <div className="hidden md:block md:w-1/2" />
                
                {/* Content Half */}
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full md:w-1/2 pl-20 md:pl-0"
                >
                   <div className={`bg-emerald-50 p-8 rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/50 transition-shadow ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                     <span className="inline-block px-4 py-1 bg-emerald-200 text-emerald-900 font-bold rounded-full mb-4">{item.year}</span>
                     <h3 className="text-2xl font-bold mb-3 text-slate-900">{item.title}</h3>
                     <p className="text-slate-600 text-lg leading-relaxed">{item.desc}</p>
                   </div>
                </motion.div>
                
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
