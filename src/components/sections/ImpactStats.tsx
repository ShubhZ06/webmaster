"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { StatCounter } from "@/components/ui/StatCounter";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";

export function ImpactStats() {
  const stats = [
    {
      value: 1.1,
      decimals: 1,
      suffix: "°C",
      title: "Global Temperature Rise",
      description: "Increase since the pre-industrial era, driving extreme weather.",
    },
    {
      value: 419,
      decimals: 0,
      suffix: " ppm",
      title: "Carbon Dioxide Levels",
      description: "Highest concentration in human history, as of recent measurements.",
    },
    {
      value: 3.4,
      decimals: 1,
      suffix: " mm",
      title: "Sea Level Rise per Year",
      description: "Threatening coastal cities and ecosystems globally.",
    },
    {
      value: 1000000,
      decimals: 0,
      suffix: "+",
      title: "Species at Risk",
      description: "Flora and fauna facing extinction due to habitat loss and climate change.",
    },
  ];

  return (
    <SectionWrapper
      id="impact"
      className="bg-earth-950 border-t border-earth-800"
    >
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            variants={fadeUpVariant}
            className="text-3xl md:text-5xl font-bold mb-6 text-earth-50"
          >
            The Numbers Tell the Story
          </motion.h2>
          <motion.p 
            variants={fadeUpVariant}
            className="text-lg text-earth-300 leading-relaxed"
          >
            The scientific consensus is clear. The data shows unprecedented changes to our Earth&apos;s climate system.
          </motion.p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="text-center p-6 rounded-2xl bg-earth-900/30 border border-earth-800 hover:border-earth-700 transition-colors"
          >
            <div className="text-4xl md:text-5xl font-black text-leaf-400 mb-4 tracking-tighter">
              <StatCounter
                to={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
                duration={2.5}
              />
            </div>
            <h3 className="text-xl font-bold text-earth-100 mb-2">{stat.title}</h3>
            <p className="text-earth-400 text-sm">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
