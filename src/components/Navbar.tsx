'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, ShieldCheck, BarChart3, BookOpen, Menu, X, Zap } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'AI Threat Scanner', href: '/scanner', icon: ShieldAlert },
    { name: 'Security Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Awareness Hub & Quiz', href: '/awareness', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyber-border/70 cyber-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-blue/20 to-cyber-cyan/30 border border-cyber-cyan/40 shadow-lg shadow-cyber-cyan/10 group-hover:border-cyber-cyan transition-all">
              <ShieldCheck className="w-6 h-6 text-cyber-cyan group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wider text-white">
                  SCAM<span className="text-cyber-cyan">SHIELD</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                Don&apos;t Trust. Verify. Stay Protected.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyber-card text-cyber-cyan border border-cyber-cyan/30 shadow-sm shadow-cyber-cyan/10'
                      : 'text-slate-300 hover:text-white hover:bg-cyber-card/60'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-cyber-cyan/80" />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Status */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Multi-Layer Defense Online</span>
            </div>
            <Link
              href="/scanner"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-semibold text-sm hover:opacity-95 shadow-lg shadow-cyber-cyan/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 fill-cyber-darkest" />
              Scan a Message
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-cyber-card focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-cyber-border bg-cyber-darker/95 backdrop-blur-xl px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-cyber-card text-cyber-cyan border border-cyber-cyan/30'
                    : 'text-slate-300 hover:bg-cyber-card'
                }`}
              >
                {Icon && <Icon className="w-5 h-5 text-cyber-cyan" />}
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/scanner"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-semibold text-sm"
            >
              <Zap className="w-4 h-4 fill-cyber-darkest" />
              Scan a Message
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
