"use client";

import React from 'react';
import { Leaf, Github, Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white mb-6">
              <Leaf className="text-emerald-500" />
              <span>Terra<span className="text-emerald-500 font-normal">Pulse</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 pr-4">
              A visually engaging journey through the causes, impacts, and solutions to the global climate crisis. Building awareness for a sustainable future.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#about" className="hover:text-emerald-400 transition-colors">The Crisis</Link></li>
              <li><Link href="#causes" className="hover:text-emerald-400 transition-colors">Root Causes</Link></li>
              <li><Link href="#impact" className="hover:text-emerald-400 transition-colors">Global Impact</Link></li>
              <li><Link href="#india" className="hover:text-emerald-400 transition-colors">India Focus</Link></li>
              <li><Link href="#solutions" className="hover:text-emerald-400 transition-colors">Solutions</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">IPCC Reports</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">UN Environment Programme</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Carbon Footprint Calculator</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Climate Action Tracker</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Data Sources</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Stay Informed</h4>
            <p className="text-sm text-slate-400 mb-4">
              Join our newsletter for monthly updates on climate action and solutions.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 px-4 pr-12 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-white"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-600 hover:bg-emerald-500 rounded-md flex items-center justify-center text-white transition-colors">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} TerraPulse. Created for educational purposes.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
