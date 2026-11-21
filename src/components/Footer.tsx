import React from 'react';
import Link from 'next/link';
import { Shield, ExternalLink, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-1 text-text-secondary text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-blue/10 border border-brand-blue/30">
                <Shield className="w-4 h-4 text-brand-blueLight" />
              </div>
              <span className="font-bold text-text-primary">ScamShield AI</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed max-w-xs">
              Multi-tier AI and heuristic threat intelligence platform for detecting smishing, UPI fraud, and phishing attacks targeting Indian users.
            </p>
            <div className="pt-1">
              <span className="text-2xs font-semibold px-2 py-1 rounded-md bg-surface-3 border border-surface-border text-text-muted">
                PromptWars × Code1 Innovators · PS01
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/scanner" className="hover:text-text-primary transition-colors">Message Scanner</Link></li>
              <li><Link href="/scanner?tab=screenshot" className="hover:text-text-primary transition-colors">Screenshot Analyzer</Link></li>
              <li><Link href="/scanner?tab=url" className="hover:text-text-primary transition-colors">URL Inspector</Link></li>
              <li><Link href="/dashboard" className="hover:text-text-primary transition-colors">Security Dashboard</Link></li>
              <li><Link href="/awareness" className="hover:text-text-primary transition-colors">Awareness Center</Link></li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-3">Emergency Contacts</h4>
            <div className="space-y-2.5 text-xs">
              <a href="tel:1930" className="flex items-center gap-2 hover:text-text-primary transition-colors group">
                <Phone className="w-3.5 h-3.5 text-status-safe shrink-0" />
                <div>
                  <span className="font-semibold text-status-safe">1930</span>
                  <span className="text-text-muted"> · National Cybercrime Helpline (24x7)</span>
                </div>
              </a>
              <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span className="font-mono">cybercrime.gov.in</span>
              </a>
              <a href="https://sancharsaathi.gov.in/sfc/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span>Chakshu — Report Fraudulent SMS/Calls</span>
              </a>
              <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span>RBI Integrated Ombudsman</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-surface-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-text-muted">
          <p className="max-w-xl leading-relaxed">
            <strong className="text-text-subtle">Disclaimer:</strong> ScamShield AI provides automated threat risk assessment. It cannot guarantee detection of all novel attacks. Always verify directly with your official bank or institution before taking financial action.
          </p>
          <p className="shrink-0">© {new Date().getFullYear()} ScamShield AI</p>
        </div>
      </div>
    </footer>
  );
}
