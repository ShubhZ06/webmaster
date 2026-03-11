'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { solutions } from '@/lib/data';
import SectionWrapper from '../ui/SectionWrapper';

export default function SolutionsSection() {
  return (
    <SectionWrapper id="solutions" className="bg-slate-50 dark:bg-slate-900 py-24 object-contain">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-slate-100"
            >
              The Path Forward
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 dark:text-slate-300"
            >
              Every action counts. Together, we can build a sustainable future through innovation, policy changes, and individual choices.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
              Take Action Now
            </button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Decorative blob */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-150 group-hover:bg-emerald-500/20 transition-all duration-500" />
                
                <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-inner">
                  <Icon size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 relative z-10">
                  {solution.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed relative z-10">
                  {solution.description}
                </p>
                
                <div className="mt-auto relative z-10">
                  <span className="inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                    {solution.action}
                    <motion.span
                      className="ml-2 inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
