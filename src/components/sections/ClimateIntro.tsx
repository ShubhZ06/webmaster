"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ThermometerSun, Wind, Droplets, MapPin } from "lucide-react";
import Image from "next/image";

export function ClimateIntro() {
  const cards = [
    {
      icon: <ThermometerSun className="w-8 h-8 text-leaf-500 mb-4" />,
      title: "Global Warming",
      description: "The long-term heating of Earth's climate system observed since the pre-industrial period.",
    },
    {
      icon: <Wind className="w-8 h-8 text-ocean-500 mb-4" />,
      title: "Extreme Weather",
      description: "Increased frequency and severity of storms, droughts, and heatwaves globally.",
    },
    {
      icon: <Droplets className="w-8 h-8 text-blue-500 mb-4" />,
      title: "Sea Level Rise",
      description: "Rising sea levels threaten coastal communities and ecosystems worldwide.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-earth-400 mb-4" />,
      title: "Habitat Loss",
      description: "Changing ecosystems force species to migrate, adapt, or face extinction.",
    },
  ];

  return (
    <SectionWrapper
      id="intro"
      title="Understanding the Crisis"
      subtitle="Climate change refers to long-term shifts in temperatures and weather patterns."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6 text-earth-300 text-lg leading-relaxed">
          <p>
            While Earth&apos;s climate has fluctuated in the past, the current period of warming is occurring more rapidly than many past events. It is largely driven by human activities, particularly the burning of fossil fuels (like coal, oil, and gas), which produce heat-trapping gases.
          </p>
          <p>
            When these greenhouse gases are released into the atmosphere, they act like a blanket wrapped around the Earth, trapping the sun&apos;s heat and raising temperatures.
          </p>
          <p>
            This shift doesn&apos;t just mean warmer days. Because the Earth is a system, where everything is connected, changes in one area can influence changes in all others.
          </p>
        </div>
        
        {/* Placeholder for an image or animation */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-earth-800">
          <div className="absolute inset-0 bg-gradient-to-tr from-earth-900/80 to-transparent z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1615092296061-e2ccfeb2f3d6?q=80&w=2000&auto=format&fit=crop" 
            alt="Dry cracked earth indicating drought" 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <AnimatedCard key={card.title} delay={index * 0.1}>
            {card.icon}
            <h3 className="text-xl font-bold text-earth-100 mb-2">{card.title}</h3>
            <p className="text-earth-400 text-sm leading-relaxed">{card.description}</p>
          </AnimatedCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
