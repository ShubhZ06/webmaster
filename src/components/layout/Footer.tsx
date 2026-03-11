'use client';

import React from 'react';
import { Github, Twitter, Instagram, ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';

const links = [
  { href: '#intro',     label: 'THE CRISIS' },
  { href: '#causes',    label: 'CAUSES'     },
  { href: '#impact',    label: 'IMPACT'     },
  { href: '#india',     label: 'INDIA'      },
  { href: '#solutions', label: 'SOLUTIONS'  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-nb-forest text-nb-surface border-t-2 border-nb-ink">
      {/* CTA Banner */}
      <div className="bg-nb-sun border-b-2 border-nb-ink px-6 md:px-16 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-nb-ink/50 text-xs tracking-widest mb-1">// TAKE THE FIRST STEP</p>
            <h3 className="font-display text-4xl md:text-6xl text-nb-ink tracking-wider">
              THE TIME IS NOW.
            </h3>
          </div>
          <button className="px-8 py-4 bg-nb-ink text-nb-sun nb-border font-mono font-bold text-sm tracking-widest uppercase nb-hover flex-shrink-0">
            START ACTING →
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-nb-sun nb-border flex items-center justify-center font-mono font-bold text-nb-ink text-sm">
              TP
            </div>
            <span className="font-display text-2xl tracking-widest text-nb-surface">
              TERRA<span className="text-nb-sun">PULSE</span>
            </span>
          </Link>
          <p className="font-mono text-nb-surface/50 text-xs leading-relaxed mb-6">
            A brutally honest, interactive look at the climate emergency.
            Facts sourced from IPCC, NASA & UNEP.
          </p>
          <div className="flex gap-3">
            {[Twitter, Instagram, Github, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 nb-border border-nb-surface/30 flex items-center justify-center text-nb-surface/50 hover:bg-nb-sun hover:text-nb-ink hover:border-nb-sun transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-mono text-[10px] tracking-widest text-nb-sun mb-6">EXPLORE</h4>
          <ul className="space-y-3">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-xs text-nb-surface/50 hover:text-nb-sun tracking-widest transition-colors flex items-center gap-2 group"
                >
                  <span className="w-4 h-px bg-nb-surface/20 group-hover:w-6 group-hover:bg-nb-sun transition-all" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-mono text-[10px] tracking-widest text-nb-sun mb-6">RESOURCES</h4>
          <ul className="space-y-3">
            {['IPCC REPORTS', 'NASA CLIMATE', 'UNEP PROGRAMME', 'CARBON TRACKER', 'CLIMATE ACTION'].map(r => (
              <li key={r}>
                <a
                  href="#"
                  className="font-mono text-xs text-nb-surface/50 hover:text-nb-sun tracking-widest transition-colors flex items-center gap-2 group"
                >
                  <span className="w-4 h-px bg-nb-surface/20 group-hover:w-6 group-hover:bg-nb-sun transition-all" />
                  {r}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-mono text-[10px] tracking-widest text-nb-sun mb-6">STAY INFORMED</h4>
          <p className="font-mono text-xs text-nb-surface/40 leading-relaxed mb-4">
            Climate updates, action guides, and data drops — monthly.
          </p>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-transparent border-2 border-nb-surface/25 px-4 py-3 font-mono text-xs text-nb-surface placeholder:text-nb-surface/25 focus:outline-none focus:border-nb-sun transition-colors"
            />
            <button
              type="submit"
              className="w-full py-3 bg-nb-sun text-nb-ink nb-border border-nb-ink font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 nb-hover"
            >
              SUBSCRIBE <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-nb-surface/15 px-6 md:px-16 py-5 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[10px] text-nb-surface/30 tracking-widest">
          © {year} TERRAPULSE — EDUCATIONAL USE ONLY
        </p>
        <div className="flex gap-6">
          {['PRIVACY', 'TERMS', 'ACCESSIBILITY'].map(l => (
            <a key={l} href="#" className="font-mono text-[10px] text-nb-surface/30 hover:text-nb-sun tracking-widest transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
