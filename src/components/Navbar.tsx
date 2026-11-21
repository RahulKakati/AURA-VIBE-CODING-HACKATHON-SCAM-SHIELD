'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ScanLine, LayoutDashboard, BookOpen, ChevronRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Platform', href: '/' },
    { name: 'Threat Scanner', href: '/scanner', icon: ScanLine },
    { name: 'Security Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Awareness Hub', href: '/awareness', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#06090F]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Mark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 group-hover:border-blue-500/40 group-hover:bg-blue-600/15 transition-all">
              <ShieldCheck className="w-4.5 h-4.5 text-blue-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-white tracking-tight">
                ScamShield<span className="text-blue-500 font-extrabold">.ai</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-slate-400 uppercase">
                Enterprise
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-tight transition-all ${
                    isActive
                      ? 'bg-white/[0.08] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Multi-Tier Engine Online</span>
            </div>
            <Link
              href="/scanner"
              className="btn-primary text-xs font-bold px-4 py-2"
            >
              <ScanLine className="w-3.5 h-3.5" />
              Scan a Message
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0A0E18] px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/[0.08] text-white'
                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-blue-500" />}
              </Link>
            );
          })}
          <div className="pt-3">
            <Link
              href="/scanner"
              onClick={() => setIsOpen(false)}
              className="w-full btn-primary text-xs py-2.5 justify-center"
            >
              <ScanLine className="w-4 h-4" />
              Scan a Message
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
