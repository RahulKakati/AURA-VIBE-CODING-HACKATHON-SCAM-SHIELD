'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X, ScanLine, LayoutDashboard, BookOpen, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Threat Scanner', href: '/scanner', icon: ScanLine },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Awareness Hub', href: '/awareness', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-surface-1/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-blue/10 border border-brand-blue/30 group-hover:bg-brand-blue/15 transition-colors">
              <Shield className="w-4 h-4 text-brand-blueLight" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-text-primary tracking-tight">
                ScamShield
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-brand-blue/15 text-brand-accent border border-brand-blue/25 leading-none">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-surface-3 text-text-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Status */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-status-safe font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-status-safe animate-pulse" />
              <span>Engine Online</span>
            </div>
            <Link
              href="/scanner"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-brand-blue hover:bg-brand-blueSubtle text-white text-sm font-semibold transition-colors shadow-brand"
            >
              <ScanLine className="w-3.5 h-3.5" />
              Scan Message
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-surface-border bg-surface-1 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-surface-3 text-text-primary'
                    : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                }`}
              >
                {link.name}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-brand-blueLight" />}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/scanner"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-brand-blue text-white font-semibold text-sm"
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
