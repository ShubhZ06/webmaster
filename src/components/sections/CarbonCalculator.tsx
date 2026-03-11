'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Car, Zap, ShoppingBag, Utensils } from 'lucide-react';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444']; // Green, Blue, Amber, Red

export default function CarbonCalculator() {
  const [transport, setTransport] = useState(10);
  const [energy, setEnergy] = useState(150);
  const [food, setFood] = useState('average');
  const [shopping, setShopping] = useState(100);

  // Simple hardcoded emission factors for demonstration purposes
  const transportEmissions = transport * 0.2; // approx kg CO2 per km
  const energyEmissions = energy * 0.4; // approx kg CO2 per kWh
  
  const foodEmissionsMap: Record<string, number> = {
    vegan: 1.5,
    vegetarian: 2.0,
    average: 4.5,
    meat_heavy: 7.0
  };
  const foodEmissions = (foodEmissionsMap[food] || foodEmissionsMap.average) * 30; // approx per month
  
  const shoppingEmissions = shopping * 0.5; // very rough estimate

  const totalEmissions = transportEmissions + energyEmissions + foodEmissions + shoppingEmissions;

  const data = [
    { name: 'Transport', value: transportEmissions },
    { name: 'Home Energy', value: energyEmissions },
    { name: 'Food/Diet', value: foodEmissions },
    { name: 'Shopping/Goods', value: shoppingEmissions }
  ];

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-blue-950 to-emerald-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Calculate Your Footprint</h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Small changes in your daily life can have a massive impact. Estimate your monthly carbon footprint relative to average citizens.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white/10 rounded-3xl p-6 md:p-10 border border-white/20 backdrop-blur-xl">
          {/* Controls */}
          <div className="w-full lg:w-1/2 space-y-8 flex flex-col justify-center">
            
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-emerald-100 font-medium text-lg">
                <Car className="text-emerald-400" /> Weekly Commute (km)
              </label>
              <input 
                type="range" min="0" max="500" step="10" 
                value={transport} 
                onChange={(e) => setTransport(parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-emerald-950/50 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-right font-bold text-xl">{transport} km</div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-emerald-100 font-medium text-lg">
                <Zap className="text-teal-400" /> Monthly Electricity (kWh)
              </label>
              <input 
                type="range" min="50" max="1000" step="10" 
                value={energy} 
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className="w-full accent-teal-500 h-2 bg-emerald-950/50 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-right font-bold text-xl">{energy} kWh</div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-emerald-100 font-medium text-lg">
                <Utensils className="text-amber-400" /> Primary Diet
              </label>
              <select 
                value={food} 
                onChange={(e) => setFood(e.target.value)}
                className="w-full bg-slate-800/80 border border-emerald-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              >
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="average">Average Omnivore</option>
                <option value="meat_heavy">Meat Heavy</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-emerald-100 font-medium text-lg">
                <ShoppingBag className="text-blue-400" /> Monthly Shopping ($)
              </label>
              <input 
                type="range" min="0" max="2000" step="50" 
                value={shopping} 
                onChange={(e) => setShopping(parseInt(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-emerald-950/50 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-right font-bold text-xl">${shopping}</div>
            </div>

          </div>

          {/* Visualization */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-slate-900/40 rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-2">Monthly CO₂ Emitted</h3>
            <div className="text-5xl font-extrabold text-emerald-400 mb-8">
              {Math.round(totalEmissions)} <span className="text-2xl text-emerald-100 font-medium">kg</span>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={((value: number) => [`${Math.round(value)} kg`, 'CO₂']) as any} 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-300 mt-6 text-center max-w-sm">
              Note: Estimates are conceptual for educational awareness, utilizing generalized emission factors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
