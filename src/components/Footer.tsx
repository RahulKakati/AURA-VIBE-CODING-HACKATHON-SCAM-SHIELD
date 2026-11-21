import React from 'react';
import Link from 'next/link';
import { ExternalLink, Phone, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070D] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded bg-blue-600/10 border border-blue-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <span className="font-bold text-white tracking-tight text-sm">
                ScamShield<span className="text-blue-500">.ai</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Enterprise threat intelligence platform engineered to detect smishing, UPI payment traps, bank KYC impersonation, and fraudulent URLs.
            </p>
            <div className="pt-1">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-400">
                PromptWars × Code1 Innovators · PS01
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/scanner" className="hover:text-white transition-colors">
                  Suspicious Message Scanner
                </Link>
              </li>
              <li>
                <Link href="/scanner?tab=screenshot" className="hover:text-white transition-colors">
                  Screenshot OCR Analyzer
                </Link>
              </li>
              <li>
                <Link href="/scanner?tab=url" className="hover:text-white transition-colors">
                  Zero-Execution URL Inspector
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Security Telemetry Dashboard
                </Link>
              </li>
              <li>
                <Link href="/awareness" className="hover:text-white transition-colors">
                  Cyber Hygiene Hub &amp; Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Escalations */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-emerald-400" />
              Official Indian Cyber Incident Escalation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="tel:1930"
                className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all group block"
              >
                <div className="flex items-center justify-between text-white font-semibold text-xs mb-0.5">
                  <span>National Cyber Helpline</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400">24x7</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Dial <strong className="text-white">1930</strong> immediately to freeze recipient accounts within the golden hour.
                </p>
              </a>

              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all group block"
              >
                <div className="flex items-center justify-between text-white font-semibold text-xs mb-0.5">
                  <span>Cyber Crime Portal</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Lodge official cyber complaints at <span className="font-mono text-slate-300">cybercrime.gov.in</span>.
                </p>
              </a>

              <a
                href="https://sancharsaathi.gov.in/sfc/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all group block"
              >
                <div className="flex items-center justify-between text-white font-semibold text-xs mb-0.5">
                  <span>Chakshu (DoT)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Report suspicious SMS, spoofed calls, and WhatsApp scams to Sanchar Saathi.
                </p>
              </a>

              <a
                href="https://cms.rbi.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all group block"
              >
                <div className="flex items-center justify-between text-white font-semibold text-xs mb-0.5">
                  <span>RBI Ombudsman</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Escalate unauthorized banking and UPI debits to the Reserve Bank of India.
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] text-slate-500">
          <p className="max-w-2xl leading-relaxed">
            <strong className="text-slate-400">Security Disclaimer:</strong> ScamShield AI provides automated threat risk assessment using multi-tier heuristics and neural intelligence models. It cannot guarantee detection of all novel or targeted zero-day attacks. Verify directly through official banking channels before taking financial action.
          </p>
          <div className="shrink-0 text-slate-500">
            © {new Date().getFullYear()} ScamShield AI · Built for Hackathon PS01
          </div>
        </div>
      </div>
    </footer>
  );
}
