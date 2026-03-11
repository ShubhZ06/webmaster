"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { fadeUpVariant, staggerContainerCustom } from "@/lib/animations";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      // Parallax effect for the background text and elements only on larger screens
      gsap.to(textRef.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => matchMedia.revert();
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-earth-950 pt-20"
    >
      {/* Background Graphic overlay */}
      <div className="absolute inset-0 z-0 bg-hero-pattern opacity-10" />

      {/* Main Content */}
      <motion.div
        ref={textRef}
        variants={staggerContainerCustom(0.2, 0.1)}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 z-10 flex flex-col items-center text-center mt-[-10vh]"
      >
        <motion.div variants={fadeUpVariant} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-earth-800/80 border border-leaf-500/30 text-leaf-400 text-sm font-medium tracking-wide">
          THE CLIMATE CRISIS IS HERE
        </motion.div>
        
        <motion.h1 
          variants={fadeUpVariant}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-earth-50 drop-shadow-lg"
        >
          Our Planet <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-leaf-400 to-ocean-500">
            Our Respon<span className="text-leaf-500">sibility</span>
          </span>
        </motion.h1>
        
        <motion.p 
          variants={fadeUpVariant}
          className="max-w-2xl text-lg md:text-xl text-earth-300 mb-10 leading-relaxed font-light"
        >
          Global temperatures are rising. Ecosystems are collapsing. But it&apos;s not too late. Discover the facts, understand the impact, and take meaningful action today.
        </motion.p>
        
        <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={scrollToNext}
            className="px-8 py-4 rounded-lg bg-leaf-600 hover:bg-leaf-500 text-earth-50 font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] transform hover:-translate-y-1"
          >
            Explore The Crisis
          </button>
          <a
            href="#solutions"
            className="px-8 py-4 rounded-lg bg-earth-800 hover:bg-earth-700 text-earth-100 font-semibold border border-earth-700 hover:border-earth-600 transition-all duration-300 text-center"
          >
            Take Action Now
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer text-earth-400 hover:text-leaf-400 transition-colors"
        onClick={scrollToNext}
      >
        <span className="text-sm uppercase tracking-widest font-medium mb-2">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
