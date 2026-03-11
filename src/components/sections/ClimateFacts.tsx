'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, ThermometerSun, Wind, AlertTriangle } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';

const facts = [
  {
    icon: ThermometerSun,
    title: "1.2°C Warmer",
    desc: "The Earth is now about 1.2°C warmer than it was in the late 1800s. The decade 2011-2020 was the warmest on record."
  },
  {
    icon: Droplets,
    title: "Sea Level Rise",
    desc: "Global mass loss from glaciers and ice sheets contributed to a sea-level rise of roughly 3.4 mm per year from 1993 to 2022."
  },
  {
    icon: Wind,
    title: "CO₂ Concentration",
    desc: "Atmospheric CO₂ concentrations are higher than at any time in at least 2 million years, crossing 420 ppm recently."
  },
  {
    icon: AlertTriangle,
    title: "Extreme Events",
    desc: "Climate change is making extreme weather events, such as heatwaves, heavy rainfall, and droughts, more frequent and severe."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function ClimateFacts() {
  return (
    <section id="facts" className="py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Climate Reality Check</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            The data is undeniable. The urgency is monumental. Let the facts speak for themselves.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <AnimatedCard className="h-full flex flex-col items-center text-center p-8 bg-white border border-slate-100 shadow-lg shadow-slate-200/50 rounded-3xl group hover:border-emerald-200">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">{fact.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {fact.desc}
                  </p>
                </AnimatedCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
