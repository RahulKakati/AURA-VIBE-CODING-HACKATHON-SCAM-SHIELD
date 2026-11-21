import React from 'react';
import Link from 'next/link';
import { ShieldCheck, PhoneCall, Globe, AlertTriangle, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-cyber-border bg-cyber-darkest text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyber-blue/20 border border-cyber-cyan/40">
                <ShieldCheck className="w-5 h-5 text-cyber-cyan" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">
                SCAM<span className="text-cyber-cyan">SHIELD</span> AI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next-generation AI & heuristic intelligence platform designed to protect users from smishing, UPI payment traps, KYC fraud, and online financial threats.
            </p>
            <div className="pt-1">
              <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-cyber-card border border-cyber-border text-slate-300">
                PromptWars X Code1 Innovators • PS01
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 text-cyber-cyan">
              Detection Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/scanner" className="hover:text-cyber-cyan transition-colors">
                  AI Message Scanner
                </Link>
              </li>
              <li>
                <Link href="/scanner?tab=screenshot" className="hover:text-cyber-cyan transition-colors">
                  Screenshot OCR Analyzer
                </Link>
              </li>
              <li>
                <Link href="/scanner?tab=url" className="hover:text-cyber-cyan transition-colors">
                  Safe URL Inspector
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-cyber-cyan transition-colors">
                  Session Threat Dashboard
                </Link>
              </li>
              <li>
                <Link href="/awareness" className="hover:text-cyber-cyan transition-colors">
                  Cyber Threat Quiz & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Indian Cyber Helplines */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 flex items-center gap-2 text-cyber-cyan">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Official Indian Cybercrime Helplines & Portals
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a
                href="tel:1930"
                className="p-3 rounded-lg bg-cyber-card/70 border border-cyber-border hover:border-emerald-500/50 hover:bg-cyber-card transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span>National Helpline</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
                      Toll-Free 24x7
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Call <strong className="text-emerald-400 text-sm">1930</strong> immediately within the golden hour to freeze fraudulent banking transactions.
                  </p>
                </div>
              </a>

              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-cyber-card/70 border border-cyber-border hover:border-cyber-cyan/50 hover:bg-cyber-card transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span>Cybercrime Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyber-cyan group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Lodge formal cyber complaints online at <span className="text-cyber-cyan font-mono">cybercrime.gov.in</span> with Indian Police.
                  </p>
                </div>
              </a>

              <a
                href="https://sancharsaathi.gov.in/sfc/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-cyber-card/70 border border-cyber-border hover:border-cyber-cyan/50 hover:bg-cyber-card transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span>Chakshu Portal</span>
                    <Globe className="w-3.5 h-3.5 text-cyber-cyan" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Report suspected fraudulent SMS, calls, and WhatsApp fraud numbers to Department of Telecommunications.
                  </p>
                </div>
              </a>

              <a
                href="https://cms.rbi.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-cyber-card/70 border border-cyber-border hover:border-cyber-cyan/50 hover:bg-cyber-card transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span>RBI Ombudsman</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyber-cyan" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Escalate unauthorized electronic banking transactions to Reserve Bank of India Integrated Ombudsman.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-cyber-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-start gap-2 max-w-2xl">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <strong>Security Disclaimer:</strong> ScamShield AI provides automated threat risk assessment using multi-tier heuristic analysis and Google Gemini AI intelligence. It is designed to assist user decision-making and cannot guarantee detection of all zero-day or customized social engineering attacks. Always verify directly through verified official banking channels before taking financial action.
            </p>
          </div>
          <div className="text-center md:text-right shrink-0">
            <p>© {new Date().getFullYear()} SCAMSHIELD AI. All rights reserved.</p>
            <p className="text-slate-600">Built for PromptWars X Code1 Innovators</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
