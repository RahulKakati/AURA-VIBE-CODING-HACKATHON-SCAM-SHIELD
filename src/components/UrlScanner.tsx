'use client';

import React, { useState } from 'react';
import { Globe, Lock, AlertCircle, ChevronRight } from 'lucide-react';

interface UrlScannerProps {
  onAnalyze: (url: string, type: 'url') => void;
  isLoading: boolean;
  initialUrl?: string;
}

export default function UrlScanner({ onAnalyze, isLoading, initialUrl = '' }: UrlScannerProps) {
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialUrl) { setUrl(initialUrl); setError(null); }
  }, [initialUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = url.trim();
    if (!t) { setError('Please enter a URL to inspect.'); return; }
    if (!t.includes('.') || t.length < 4) { setError('Please enter a valid URL (e.g. sbi-kyc-verify.xyz or http://192.168.1.1/login)'); return; }
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
      <div className="rounded-xl bg-surface-1 border border-surface-border focus-within:border-brand-blue/50 transition-colors p-4 space-y-3">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Paste URL for Passive Security Inspection
        </label>
        <div className="flex items-center gap-3 bg-surface-2 rounded-lg border border-surface-border px-3 py-2.5 focus-within:border-brand-blue/40 transition-colors">
          <Globe className="w-4 h-4 text-text-muted shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => { setUrl(e.target.value); if (error) setError(null); }}
            disabled={isLoading}
            placeholder="e.g. sbi-kyc-update.xyz or http://192.168.1.1/login"
            className="w-full bg-transparent text-sm text-text-primary placeholder-text-muted focus:outline-none mono-text"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-2xs text-text-muted">
          <span className="font-semibold text-text-subtle">Test samples:</span>
          {samples.map((s) => (
            <button key={s} type="button" disabled={isLoading}
              onClick={() => { setUrl(s); setError(null); }}
              className="px-2 py-0.5 rounded bg-surface-2 border border-surface-border hover:border-surface-borderLight text-text-muted hover:text-text-secondary mono-text transition-colors">
              {s.replace(/^https?:\/\//, '').substring(0, 28)}…
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-surface-1 border border-surface-border text-xs text-text-muted">
        <Lock className="w-4 h-4 text-status-safe shrink-0 mt-0.5" />
        <span>
          <strong className="text-text-secondary">Zero-Execution Guarantee:</strong> URLs are analyzed using offline structural heuristics only. The target is never visited, fetched, or executed by your browser.
        </span>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-300 p-3 rounded-lg bg-status-criticalBg border border-status-criticalBorder">
          <AlertCircle className="w-4 h-4 shrink-0" />{error}
        </div>
      )}

      <div className="flex justify-end">
        <button type="submit" disabled={isLoading || !url.trim()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue hover:bg-brand-blueSubtle text-white font-semibold text-sm transition-colors shadow-brand disabled:opacity-50 disabled:pointer-events-none">
          {isLoading ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner" />Inspecting...</>
          ) : (
            <>Inspect URL<ChevronRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </form>
  );
}
