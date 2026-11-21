'use client';

import React, { useState } from 'react';
import { Globe, Shield, Sparkles, AlertCircle, Lock, ExternalLink } from 'lucide-react';

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
    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please enter a URL to inspect.');
      return;
    }

    // Basic URL format validation
    if (!trimmed.includes('.') || trimmed.length < 4) {
      setError('Please enter a valid URL domain format (e.g. sbi-kyc-verify.top or http://192.168.1.1/login).');
      return;
    }

    setError(null);
    onAnalyze(trimmed, 'url');
  };

  const sampleUrls = [
    'http://sbi-kyc-verify.update-portal.xyz/login',
    'https://phonepe-rewards.claim-bonus.click/pay',
    'http://192.168.10.45/indiapost/address-update',
    'https://onlinesbi.sbi' // Legitimate official bank domain
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* URL Input Box */}
      <div className="rounded-2xl bg-cyber-darker border border-cyber-border focus-within:border-cyber-cyan/60 focus-within:ring-2 focus-within:ring-cyber-cyan/20 transition-all p-4 space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          Target Link / Web Address for Passive Security Inspection
        </label>

        <div className="flex items-center gap-3 bg-cyber-darkest rounded-xl border border-cyber-border/70 px-3.5 py-2.5">
          <Globe className="w-5 h-5 text-cyber-cyan shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError(null);
            }}
            disabled={isLoading}
            placeholder="e.g. sbi-kyc-update.xyz/login or http://claim-cashback.top"
            className="w-full bg-transparent text-white text-sm placeholder-slate-500 focus:outline-none font-mono"
          />
        </div>

        {/* Quick Sample Links */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">Quick Test URLs:</span>
          {sampleUrls.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => {
                setUrl(sample);
                setError(null);
              }}
              className="px-2 py-0.5 rounded bg-cyber-card border border-cyber-border hover:border-cyber-cyan/40 text-slate-300 hover:text-white font-mono text-[10px] transition-all"
            >
              {sample.replace(/^https?:\/\//, '').substring(0, 24)}...
            </button>
          ))}
        </div>
      </div>

      {/* Safety Notice Guarantee */}
      <div className="p-3.5 rounded-xl bg-cyber-card/60 border border-cyber-border/80 flex items-start gap-2.5 text-xs text-slate-400">
        <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="text-white">Zero-Execution Passive Analysis Guarantee:</strong>
          <p className="text-[11px] leading-relaxed">
            ScamShield AI inspects domain structures, typosquatting, high-risk TLDs, and IP masking using offline heuristics. The target URL is <strong className="text-slate-200">never visited, queried, or executed</strong> by your browser, preventing malicious payload execution or drive-by downloads.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-400 p-3 rounded-xl bg-red-950/20 border border-red-500/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-extrabold text-sm shadow-lg shadow-cyber-cyan/20 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-cyber-darkest border-t-transparent rounded-full animate-spin" />
              <span>Inspecting URL Threat Vectors...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 fill-cyber-darkest" />
              <span>Inspect URL Security</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
