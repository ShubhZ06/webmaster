"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";
import { ArrowRight, Leaf, Zap, Trees } from "lucide-react";

export function CallToAction() {
  const actions = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Transition to Clean Energy",
      desc: "Switch to renewable energy sources for your home or support policies that accelerate the grid transition.",
    },
    {
      icon: <Leaf className="w-6 h-6 text-leaf-400" />,
      title: "Reduce Carbon Footprint",
      desc: "Eat more plant-based meals, walk or cycle, and reduce your reliance on single-use plastics.",
    },
    {
      icon: <Trees className="w-6 h-6 text-pine-400" />,
      title: "Support Conservation",
      desc: "Donate to or volunteer with organizations actively restoring critical ecosystems and planting trees.",
    },
  ];

  return (
    <SectionWrapper id="solutions" className="bg-earth-900 border-t border-earth-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-leaf-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-ocean-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-6xl font-black text-earth-50 mb-6">
          Be Part of the Solution
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-xl text-earth-300 mb-12 leading-relaxed max-w-2xl mx-auto">
          Every massive change begins with individual actions. What will your contribution be to a sustainable future?
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          {actions.map((action, i) => (
            <motion.div 
              key={action.title}
              variants={fadeUpVariant}
              className="bg-earth-800/50 backdrop-blur border border-earth-700 p-6 rounded-xl hover:bg-earth-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-earth-900 flex items-center justify-center mb-4 ring-1 ring-earth-700">
                {action.icon}
              </div>
              <h3 className="text-lg font-bold text-earth-100 mb-2">{action.title}</h3>
              <p className="text-earth-400 text-sm leading-relaxed">{action.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-leaf-600 hover:bg-leaf-500 text-white font-bold transition-all flex items-center justify-center gap-2 group">
            Join the Movement
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-leaf-600/50 text-leaf-400 hover:bg-leaf-600/10 font-bold transition-all">
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
