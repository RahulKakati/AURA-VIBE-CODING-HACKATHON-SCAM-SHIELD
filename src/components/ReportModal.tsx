'use client';

import React, { useState } from 'react';
import { ScanResult } from '@/lib/types';
import { X, Copy, Check, Printer, ShieldAlert, ExternalLink } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ScanResult;
}

export default function ReportModal({ isOpen, onClose, result }: ReportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const incidentId = `CYBER-${Date.now().toString(36).toUpperCase()}`;

  const formattedReport = `=====================================================
SCAMSHIELD AI - FORMAL CYBER THREAT INCIDENT REPORT
Generated: ${new Date(result.timestamp).toLocaleString()}
Incident Reference: ${incidentId}
=====================================================

1. RISK ASSESSMENT
- Risk Score: ${result.risk_score}/100
- Threat Level: ${result.risk_level}
- Threat Classification: ${result.threat_category}
- Confidence Rating: ${result.confidence}%
- Engine: ${result.engine_model || result.engine_used}

2. SUBMITTED EVIDENCE / SUSPICIOUS CONTENT:
-----------------------------------------------------
${result.target_text}
-----------------------------------------------------

3. DETECTED WARNING FLAGS & FRAUD SIGNATURES:
${result.detected_signals.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}

4. SUSPICIOUS WORDS / PHRASES IDENTIFIED:
${result.suspicious_phrases.length > 0 ? result.suspicious_phrases.join(', ') : 'None extracted explicitly'}

5. TECHNICAL EXPLANATION:
${result.explanation}

6. RECOMMENDED PROTECTIVE ACTIONS:
${result.recommendations.map((r, i) => `  ${i + 1}. ${r}`).join('\n')}

7. WHAT TO AVOID:
${result.things_to_avoid.map((a, i) => `  - ${a}`).join('\n')}

8. OFFICIAL INDIAN CYBERCRIME ESCALATION:
- National Cybercrime Helpline: 1930 (Immediate 24x7 reporting)
- National Cyber Crime Reporting Portal: https://cybercrime.gov.in
- Sanchar Saathi / Chakshu Portal (for reporting SMS/calling numbers): https://sancharsaathi.gov.in
=====================================================`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedReport);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-2xl bg-cyber-darker border border-cyber-border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-border bg-cyber-card/60">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyber-cyan" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Official Cyber Threat Incident Report
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-cyber-card"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-cyber-card border border-cyber-border text-slate-300 flex items-center justify-between">
            <div>
              <span className="text-slate-400">Incident Reference: </span>
              <strong className="text-cyber-cyan font-bold">{incidentId}</strong>
            </div>
            <div className="text-[11px] text-slate-400">
              {new Date(result.timestamp).toLocaleDateString()} {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-cyber-darkest border border-cyber-border text-slate-300 whitespace-pre-wrap leading-relaxed select-text font-mono text-[11px] max-h-96 overflow-y-auto">
            {formattedReport}
          </pre>

          <div className="p-3.5 rounded-xl bg-cyber-card/40 border border-cyber-border text-slate-400 space-y-1 text-xs">
            <h4 className="text-white font-bold flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4 text-cyber-cyan" />
              How to use this report:
            </h4>
            <p>
              1. Copy the formatted report above.
            </p>
            <p>
              2. If money was deducted, immediately dial <strong>1930</strong> (National Cybercrime Helpline) and quote transaction details.
            </p>
            <p>
              3. File an official complaint on <strong className="text-cyber-cyan">cybercrime.gov.in</strong> under Financial Fraud or Social Media Crime, pasting this evidence summary.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-cyber-border bg-cyber-card/80">
          <span className="text-[11px] text-slate-400">
            Export for legal verification or police complaint
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyber-card border border-cyber-border text-slate-200 hover:text-white hover:border-slate-500 text-xs font-medium transition-all"
            >
              <Printer className="w-4 h-4" />
              Print Report
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-bold text-xs hover:opacity-95 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Full Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
