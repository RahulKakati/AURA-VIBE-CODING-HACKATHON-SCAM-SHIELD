'use client';

import React, { useState } from 'react';
import { ScanResult } from '@/lib/types';
import { X, Copy, Check, Printer, ShieldCheck, ExternalLink } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-xl bg-surface-1 border border-surface-border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-blueLight" />
            <h3 className="text-sm font-bold text-text-primary">
              Formal Cyber Threat Incident Report
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-3 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-surface-2 border border-surface-border text-text-secondary flex items-center justify-between">
            <div>
              <span className="text-text-muted">Incident Reference: </span>
              <strong className="text-text-primary font-bold font-mono">{incidentId}</strong>
            </div>
            <div className="text-2xs text-text-muted font-mono">
              {new Date(result.timestamp).toLocaleDateString()} {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          </div>

          <pre className="p-4 rounded-lg bg-surface-0 border border-surface-border text-text-secondary whitespace-pre-wrap leading-relaxed select-text font-mono text-2xs max-h-96 overflow-y-auto">
            {formattedReport}
          </pre>

          <div className="p-3.5 rounded-lg bg-surface-2 border border-surface-border text-text-muted space-y-1 text-xs font-sans">
            <h4 className="text-text-primary font-semibold flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-brand-blueLight" />
              How to use this report:
            </h4>
            <p>1. Copy the formatted report above for your records.</p>
            <p>2. If funds were debited, immediately dial <strong className="text-status-safe">1930</strong> (National Cybercrime Helpline).</p>
            <p>3. File an official complaint on <strong className="text-brand-blueLight">cybercrime.gov.in</strong> quoting this evidence summary.</p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-surface-border bg-surface-2">
          <span className="text-2xs text-text-muted">
            Export for documentation or official cyber complaint
          </span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-3 border border-surface-border text-text-secondary hover:text-text-primary text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-blue hover:bg-brand-blueSubtle text-white font-semibold text-xs transition-colors shadow-brand"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
