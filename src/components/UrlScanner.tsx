'use client';

import React, { useState } from 'react';
import { Globe, Lock, AlertCircle, ScanLine, ArrowRight } from 'lucide-react';

interface UrlScannerProps {
  onAnalyze: (url: string, type: 'url') => void;
  isLoading: boolean;
  initialUrl?: string;
}

export default function UrlScanner({ onAnalyze, isLoading, initialUrl = '' }: UrlScannerProps) {
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl);
      setError(null);
    }
  }, [initialUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = url.trim();
    if (!t) {
      setError('Please enter a target URL to inspect.');
      return;
    }
    if (!t.includes('.') || t.length < 4) {
      setError('Please enter a valid domain format (e.g. sbi-kyc-verify.xyz/login or http://192.168.1.1/login).');
      return;
    }
    setError(null);
    onAnalyze(t, 'url');
  };

  const samples = [
    'http://sbi-kyc-verify.update-portal.xyz/login',
    'https://phonepe-rewards.claim-bonus.click/pay',
    'http://192.168.10.45/indiapost/address-update',
    'https://onlinesbi.sbi',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl bg-[#070A12] border border-white/[0.08] focus-within:border-blue-500/40 transition-colors p-4 space-y-3">
        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
          Target URL for Passive Security Inspection
        </label>
        
        <div className="flex items-center gap-3 bg-[#0A0E18] rounded-lg border border-white/[0.08] px-3.5 py-2.5 focus-within:border-blue-500/40 transition-colors">
          <Globe className="w-4 h-4 text-blue-400 shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError(null);
            }}
            disabled={isLoading}
            placeholder="e.g. sbi-kyc-verify.xyz/login or claim-cashback.top"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none mono-text"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[11px] font-semibold text-slate-400">Quick Test URLs:</span>
          {samples.map((s) => (
            <button
              key={s}
              type="button"
              disabled={isLoading}
              onClick={() => {
                setUrl(s);
                setError(null);
              }}
              className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.18] text-slate-400 hover:text-white mono-text text-[10px] transition-colors"
            >
              {s.replace(/^https?:\/\//, '').substring(0, 26)}…
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400">
        <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="text-white">Zero-Execution Guarantee:</strong>
          <p className="text-[11px] leading-relaxed">
            The target link is evaluated via offline structural heuristics and known threat lists. It is <strong className="text-slate-200">never visited, queried, or executed</strong> by your browser.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-300 p-3 rounded-lg bg-red-950/20 border border-red-500/30">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="btn-primary text-xs font-bold px-6 py-2.5 shadow-brand disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner" />
              <span>Inspecting URL Threat Vectors...</span>
            </>
          ) : (
            <>
              <ScanLine className="w-4 h-4" />
              <span>Inspect URL</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
