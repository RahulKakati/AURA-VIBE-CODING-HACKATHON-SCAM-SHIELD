'use client';

import React, { useState } from 'react';
import { ScanResult } from '@/lib/types';
import RiskGauge from './RiskGauge';
import ReportModal from './ReportModal';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Sparkles,
  Cpu,
  Share2,
  ExternalLink,
  Info,
  RotateCcw,
  Tag,
  ShieldCheck,
  ShieldAlert,
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
    CRITICAL: 'border-red-500/40 bg-gradient-to-b from-[#140A0F] to-[#0A0D18]',
    HIGH: 'border-orange-500/40 bg-gradient-to-b from-[#140E0A] to-[#0A0D18]',
    MEDIUM: 'border-amber-500/40 bg-gradient-to-b from-[#14120A] to-[#0A0D18]',
    LOW: 'border-white/[0.08] bg-[#0A0E18]',
    SAFE: 'border-emerald-500/30 bg-gradient-to-b from-[#0A140F] to-[#0A0D18]',
  }[result.risk_level] ?? 'border-white/[0.08] bg-[#0A0E18]';

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `ScamShield AI Assessment:\nThreat Category: ${result.threat_category}\nRisk Score: ${result.risk_score}/100 (${result.risk_level})\nSummary: ${result.summary}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
  };

  return (
    <div className="space-y-5 fade-up">
      {/* Top Threat Scorecard Header */}
      <div className={`card-elevated p-6 sm:p-8 border ${riskBorderClass}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Radial Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-8">
            <RiskGauge
              score={result.risk_score}
              level={result.risk_level}
              confidence={result.confidence}
            />
          </div>

          {/* Assessment Summary */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-slate-300">
                <Tag className="w-3 h-3 text-blue-400" />
                <span>{result.threat_category}</span>
              </span>

              <span
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${
                  result.engine_used === 'gemini-ai'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    : 'bg-white/[0.03] text-slate-400 border-white/[0.08]'
                }`}
              >
                {result.engine_used === 'gemini-ai' ? (
                  <>
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span>Analyzed with Google Gemini AI</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-3 h-3 text-slate-400" />
                    <span>Heuristic Rule Engine (Deterministic)</span>
                  </>
                )}
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {result.summary}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {result.explanation}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => setShowModal(true)}
                className="btn-secondary text-xs font-semibold"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Official Incident Report</span>
              </button>
              <button
                onClick={handleShare}
                className="btn-secondary text-xs font-semibold"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{copiedLink ? 'Copied to Clipboard!' : 'Share Result'}</span>
              </button>
              <button
                onClick={onReset}
                className="btn-secondary text-xs font-semibold ml-auto text-slate-400 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Scan Another</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Target Analyzed Payload */}
      <div className="card p-5 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
            Target Analyzed Content
          </span>
          <span className="font-mono text-[11px]">{result.target_text.length} characters</span>
        </div>
        <div className="p-3.5 rounded-lg bg-[#06090F] border border-white/[0.06] text-xs text-slate-300 mono-text break-words leading-relaxed select-text">
          {result.target_text}
        </div>
      </div>

      {/* URL Deep Inspection (if available) */}
      {result.url_details && (
        <div className="card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            Passive URL Inspection Breakdown
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#06090F] border border-white/[0.06]">
              <span className="text-slate-500 block text-[10px] mb-0.5">Target Host</span>
              <span className="font-mono text-white font-semibold truncate block">
                {result.url_details.domain || 'N/A'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#06090F] border border-white/[0.06]">
              <span className="text-slate-500 block text-[10px] mb-0.5">Direct IP Host?</span>
              <span
                className={`font-semibold ${
                  result.url_details.is_ip ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {result.url_details.is_ip ? 'Yes (High Threat)' : 'No (Standard DNS)'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#06090F] border border-white/[0.06]">
              <span className="text-slate-500 block text-[10px] mb-0.5">Suspicious TLD?</span>
              <span
                className={`font-semibold ${
                  result.url_details.suspicious_tld ? 'text-red-400' : 'text-slate-300'
                }`}
              >
                {result.url_details.suspicious_tld ? 'Yes' : 'Standard TLD'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#06090F] border border-white/[0.06]">
              <span className="text-slate-500 block text-[10px] mb-0.5">Target Brand</span>
              <span
                className={`font-semibold ${
                  result.url_details.brand_impersonated ? 'text-red-400' : 'text-slate-400'
                }`}
              >
                {result.url_details.brand_impersonated || 'None'}
              </span>
            </div>
          </div>
          {result.url_details.warning_flags.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {result.url_details.warning_flags.map((flag, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs text-red-300/90 p-2 rounded-lg bg-red-950/20 border border-red-500/25"
                >
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">!</span>
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Two Column: Warning Signs vs Suspicious Phrases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Warning Signs */}
        <div className="card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Detected Warning Signs ({result.detected_signals.length})
          </div>
          <ul className="space-y-2">
            {result.detected_signals.map((signal, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-[#06090F] border border-white/[0.06] leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Suspicious Phrases */}
        <div className="card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-red-400" />
            Extracted Threat Phrases
          </div>
          {result.suspicious_phrases.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {result.suspicious_phrases.map((phrase, i) => (
                <span key={i} className="badge risk-critical mono-text">
                  &ldquo;{phrase}&rdquo;
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic p-3 rounded-lg bg-[#06090F] border border-white/[0.06]">
              No high-risk dictionary keywords matched explicitly.
            </p>
          )}
          <div className="pt-2 border-t border-white/[0.06] flex items-start gap-2 text-[11px] text-slate-500">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <span>
              Cybercriminals often alter spellings or use Romanized Hindi (Hinglish) to bypass simple spam filters.
            </span>
          </div>
        </div>
      </div>

      {/* Two Column: Recommended Actions vs What to Avoid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Recommended Actions */}
        <div className="card p-5 space-y-3 border-emerald-500/25">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" />
            Recommended Safety Actions
          </div>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-slate-200 p-2.5 rounded-lg bg-emerald-950/15 border border-emerald-500/20 leading-relaxed"
              >
                <span className="text-emerald-400 font-bold font-mono text-[11px] shrink-0">
                  {i + 1}.
                </span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What to Avoid */}
        <div className="card p-5 space-y-3 border-red-500/25">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
            <XCircle className="w-3.5 h-3.5" />
            What You Must Strictly Avoid
          </div>
          <ul className="space-y-2">
            {result.things_to_avoid.map((avoid, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-red-200/90 p-2.5 rounded-lg bg-red-950/15 border border-red-500/20 leading-relaxed"
              >
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>{avoid}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ReportModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        result={result}
      />
    </div>
  );
}
