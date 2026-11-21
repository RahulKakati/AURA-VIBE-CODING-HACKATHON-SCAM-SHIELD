'use client';

import React, { useState } from 'react';
import { ScanResult } from '@/lib/types';
import RiskGauge from './RiskGauge';
import ReportModal from './ReportModal';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Sparkles,
  Cpu,
  Share2,
  ExternalLink,
  Info,
  RotateCcw,
} from 'lucide-react';

interface AnalysisResultViewProps {
  result: ScanResult;
  onReset: () => void;
}

export default function AnalysisResultView({ result, onReset }: AnalysisResultViewProps) {
  const [showModal, setShowModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isThreat = result.risk_level === 'CRITICAL' || result.risk_level === 'HIGH';
  const isMedium = result.risk_level === 'MEDIUM';

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `ScamShield AI Analysis:\nRisk Score: ${result.risk_score}/100 (${result.risk_level})\nThreat: ${result.threat_category}\nSummary: ${result.summary}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Top Banner Card */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border transition-all ${
          isThreat
            ? 'cyber-glass-danger'
            : isMedium
            ? 'bg-amber-950/20 border-amber-500/30 shadow-lg shadow-amber-500/5'
            : 'bg-emerald-950/20 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Risk Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-cyber-border/70 pb-6 lg:pb-0 lg:pr-6">
            <RiskGauge
              score={result.risk_score}
              level={result.risk_level}
              confidence={result.confidence}
            />
          </div>

          {/* Right: Summary & Key Metadata */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Category Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-border text-xs font-semibold text-white">
                <span className="text-slate-400">Threat Category:</span>
                <span className="text-cyber-cyan font-bold">{result.threat_category}</span>
              </div>

              {/* Engine Badge */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                  result.engine_used === 'gemini-ai'
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-700/30 text-slate-300 border-slate-600/40'
                }`}
              >
                {result.engine_used === 'gemini-ai' ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>Analyzed by Google Gemini AI</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-3.5 h-3.5 text-slate-400" />
                    <span>Heuristic Rule Engine (Deterministic Fallback)</span>
                  </>
                )}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {result.summary}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {result.explanation}
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-card border border-cyber-border hover:border-cyber-cyan/50 text-white text-xs font-bold transition-all hover:scale-[1.01]"
              >
                <FileText className="w-4 h-4 text-cyber-cyan" />
                View & Export Full Incident Report
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyber-card border border-cyber-border hover:border-slate-500 text-slate-300 hover:text-white text-xs font-medium transition-all"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink ? 'Copied Summary!' : 'Share Result'}
              </button>

              <button
                onClick={onReset}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyber-card border border-cyber-border hover:border-slate-500 text-slate-300 hover:text-white text-xs font-medium transition-all ml-auto"
              >
                <RotateCcw className="w-4 h-4" />
                Scan Another Content
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Target Content Submitted */}
      <div className="p-5 rounded-xl bg-cyber-card/60 border border-cyber-border space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            Submitted Content Analyzed
          </span>
          <span>{result.target_text.length} characters</span>
        </div>
        <div className="p-3.5 rounded-lg bg-cyber-darkest border border-cyber-border/70 text-slate-300 text-xs sm:text-sm font-mono break-words leading-relaxed select-text">
          {result.target_text}
        </div>
      </div>

      {/* URL Deep Inspection (if available) */}
      {result.url_details && (
        <div className="p-5 rounded-xl bg-cyber-card/60 border border-cyber-border space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <ExternalLink className="w-4 h-4 text-cyber-cyan" />
            Passive URL Inspection Breakdown
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-cyber-darker border border-cyber-border">
              <span className="text-slate-400 block text-[11px]">Domain / Host</span>
              <span className="font-mono text-white font-bold truncate block">
                {result.url_details.domain || 'N/A'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-cyber-darker border border-cyber-border">
              <span className="text-slate-400 block text-[11px]">Direct IP Host?</span>
              <span className={`font-bold ${result.url_details.is_ip ? 'text-red-400' : 'text-emerald-400'}`}>
                {result.url_details.is_ip ? 'YES (High Risk)' : 'No (Standard DNS)'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-cyber-darker border border-cyber-border">
              <span className="text-slate-400 block text-[11px]">Suspicious TLD?</span>
              <span className={`font-bold ${result.url_details.suspicious_tld ? 'text-red-400' : 'text-slate-300'}`}>
                {result.url_details.suspicious_tld ? 'YES (High Risk TLD)' : 'Standard TLD'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-cyber-darker border border-cyber-border">
              <span className="text-slate-400 block text-[11px]">Impersonated Brand</span>
              <span className={`font-bold ${result.url_details.brand_impersonated ? 'text-red-400' : 'text-slate-400'}`}>
                {result.url_details.brand_impersonated ? result.url_details.brand_impersonated : 'None detected'}
              </span>
            </div>
          </div>
          {result.url_details.warning_flags.length > 0 && (
            <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 space-y-1">
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wide">
                URL Security Flags:
              </span>
              <ul className="list-disc list-inside text-xs text-red-200/90 space-y-0.5">
                {result.url_details.warning_flags.map((flag, idx) => (
                  <li key={idx}>{flag}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Two-Column Grid: Warning Signs & Suspicious Words */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detected Warning Signs */}
        <div className="p-5 rounded-xl bg-cyber-card/60 border border-cyber-border space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Detected Warning Signs ({result.detected_signals.length})
          </div>
          <ul className="space-y-2.5">
            {result.detected_signals.map((signal, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-300 p-2.5 rounded-lg bg-cyber-darker border border-cyber-border/70"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{signal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Suspicious Phrases & Keywords */}
        <div className="p-5 rounded-xl bg-cyber-card/60 border border-cyber-border space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            Identified Threat Words & Phrases
          </div>
          {result.suspicious_phrases.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {result.suspicious_phrases.map((phrase, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono font-medium shadow-sm shadow-red-500/10"
                >
                  &ldquo;{phrase}&rdquo;
                </span>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-cyber-darker border border-cyber-border text-slate-400 text-xs italic">
              No specific trigger keywords matched high-risk scam dictionaries.
            </div>
          )}

          <div className="pt-3 border-t border-cyber-border/50 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
            <span>
              Cybercriminals intentionally modify words or utilize Romanized Hindi (Hinglish) to evade naive spam filters. ScamShield AI utilizes contextual neural heuristics to decode evasive semantics.
            </span>
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Recommendations vs Things to Avoid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recommended Actions */}
        <div className="p-5 rounded-xl bg-emerald-950/15 border border-emerald-500/25 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            Recommended Safety Actions
          </div>
          <ul className="space-y-2">
            {result.recommendations.map((rec, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed p-2 rounded-lg bg-cyber-darker/60 border border-emerald-500/15"
              >
                <span className="font-bold text-emerald-400 font-mono text-[11px] shrink-0">
                  {idx + 1}.
                </span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What to Avoid */}
        <div className="p-5 rounded-xl bg-red-950/15 border border-red-500/25 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
            <XCircle className="w-4 h-4" />
            What You Must Strictly Avoid Doing
          </div>
          <ul className="space-y-2">
            {result.things_to_avoid.map((avoid, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-red-200/90 leading-relaxed p-2 rounded-lg bg-cyber-darker/60 border border-red-500/15"
              >
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>{avoid}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal for full incident report export */}
      <ReportModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        result={result}
      />
    </div>
  );
}
