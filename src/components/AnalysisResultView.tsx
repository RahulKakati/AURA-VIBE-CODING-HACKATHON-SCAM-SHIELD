'use client';

import React, { useState } from 'react';
import { ScanResult } from '@/lib/types';
import RiskGauge from './RiskGauge';
import ReportModal from './ReportModal';
import {
  AlertTriangle, CheckCircle, XCircle, FileText, Sparkles,
  Cpu, Share2, ExternalLink, Info, RotateCcw, Tag,
} from 'lucide-react';

interface AnalysisResultViewProps {
  result: ScanResult;
  onReset: () => void;
}

export default function AnalysisResultView({ result, onReset }: AnalysisResultViewProps) {
  const [showModal, setShowModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isThreat = result.risk_level === 'CRITICAL' || result.risk_level === 'HIGH';

  const riskBorderClass = {
    CRITICAL: 'border-status-criticalBorder',
    HIGH: 'border-status-highBorder',
    MEDIUM: 'border-status-mediumBorder',
    LOW: 'border-surface-border',
    SAFE: 'border-surface-border',
  }[result.risk_level] ?? 'border-surface-border';

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`ScamShield AI — Risk Score: ${result.risk_score}/100 (${result.risk_level}) | ${result.threat_category} | ${result.summary}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
  };

  return (
    <div className="space-y-5 fade-up">

      {/* Top Summary Card */}
      <div className={`card-elevated p-6 border ${riskBorderClass}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Gauge column */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-surface-border pb-5 lg:pb-0 lg:pr-6">
            <RiskGauge score={result.risk_score} level={result.risk_level} confidence={result.confidence} />
          </div>

          {/* Summary column */}
          <div className="lg:col-span-9 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {/* Category */}
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-3 border border-surface-border text-xs font-medium text-text-secondary">
                <Tag className="w-3 h-3" />
                {result.threat_category}
              </span>

              {/* Engine badge */}
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                result.engine_used === 'gemini-ai'
                  ? 'bg-brand-blue/10 text-brand-accent border-brand-blue/25'
                  : 'bg-surface-3 text-text-muted border-surface-border'
              }`}>
                {result.engine_used === 'gemini-ai' ? (
                  <><Sparkles className="w-3 h-3" />Google Gemini AI</>
                ) : (
                  <><Cpu className="w-3 h-3" />Heuristic Rule Engine</>
                )}
              </span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-text-primary">{result.summary}</h2>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{result.explanation}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-2 border border-surface-border hover:border-surface-borderLight text-text-secondary hover:text-text-primary text-xs font-semibold transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Full Incident Report
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-2 border border-surface-border hover:border-surface-borderLight text-text-secondary hover:text-text-primary text-xs font-medium transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copiedLink ? 'Copied!' : 'Share Result'}
              </button>
              <button
                onClick={onReset}
                className="ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-2 border border-surface-border hover:border-surface-borderLight text-text-muted hover:text-text-secondary text-xs font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Scan Again
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Content */}
      <div className="card p-5 space-y-2">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span className="font-semibold text-text-secondary uppercase tracking-wider text-2xs">Analyzed Content</span>
          <span>{result.target_text.length} chars</span>
        </div>
        <div className="p-3 rounded-lg bg-surface-1 border border-surface-border text-xs text-text-secondary mono-text break-words leading-relaxed select-text">
          {result.target_text}
        </div>
      </div>

      {/* URL Details */}
      {result.url_details && result.url_details.warning_flags.length > 0 && (
        <div className="card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-text-primary uppercase tracking-wider">
            <ExternalLink className="w-3.5 h-3.5 text-brand-blueLight" />
            URL Security Inspection
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-surface-1 border border-surface-border">
              <span className="text-text-muted block text-2xs mb-0.5">Domain</span>
              <span className="font-mono text-text-primary font-medium truncate block">{result.url_details.domain || '—'}</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-1 border border-surface-border">
              <span className="text-text-muted block text-2xs mb-0.5">Direct IP?</span>
              <span className={`font-semibold ${result.url_details.is_ip ? 'text-red-400' : 'text-status-safe'}`}>
                {result.url_details.is_ip ? 'Yes — High Risk' : 'No'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-surface-1 border border-surface-border">
              <span className="text-text-muted block text-2xs mb-0.5">Risky TLD?</span>
              <span className={`font-semibold ${result.url_details.suspicious_tld ? 'text-red-400' : 'text-text-secondary'}`}>
                {result.url_details.suspicious_tld ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-surface-1 border border-surface-border">
              <span className="text-text-muted block text-2xs mb-0.5">Impersonates</span>
              <span className={`font-semibold ${result.url_details.brand_impersonated ? 'text-red-400' : 'text-text-muted'}`}>
                {result.url_details.brand_impersonated || 'None'}
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            {result.url_details.warning_flags.map((flag, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-red-300/90 p-2 rounded-lg bg-status-criticalBg border border-status-criticalBorder">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">!</span>
                <span>{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two column: warning signs + suspicious phrases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Warning Signs */}
        <div className="card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-text-primary uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-status-medium" />
            Warning Signs ({result.detected_signals.length})
          </div>
          <ul className="space-y-2">
            {result.detected_signals.map((signal, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-text-secondary p-2.5 rounded-lg bg-surface-1 border border-surface-border leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-status-medium shrink-0 mt-1.5" />
                {signal}
              </li>
            ))}
          </ul>
        </div>

        {/* Suspicious Phrases */}
        <div className="card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-text-primary uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-red-400" />
            Suspicious Phrases
          </div>
          {result.suspicious_phrases.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {result.suspicious_phrases.map((phrase, i) => (
                <span key={i} className="badge risk-critical mono-text">&ldquo;{phrase}&rdquo;</span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-muted italic p-3 rounded-lg bg-surface-1 border border-surface-border">
              No specific trigger keywords matched the high-risk dictionary.
            </p>
          )}
          <div className="pt-2 border-t border-surface-border flex items-start gap-2 text-2xs text-text-muted">
            <Info className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
            Criminals modify spellings or use Hinglish to evade naive filters. ScamShield uses semantic context to decode evasive language.
          </div>
        </div>
      </div>

      {/* Recommendations + Things to Avoid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="card p-5 space-y-3 border-status-safeBorder/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-status-safe uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" />
            Recommended Actions
          </div>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-text-secondary p-2.5 rounded-lg bg-status-safeBg border border-status-safeBorder/40 leading-relaxed">
                <span className="text-status-safe font-bold mono-text shrink-0">{i + 1}.</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5 space-y-3 border-status-criticalBorder/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider">
            <XCircle className="w-3.5 h-3.5" />
            What to Avoid
          </div>
          <ul className="space-y-2">
            {result.things_to_avoid.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-red-200/80 p-2.5 rounded-lg bg-status-criticalBg border border-status-criticalBorder/40 leading-relaxed">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ReportModal isOpen={showModal} onClose={() => setShowModal(false)} result={result} />
    </div>
  );
}
