'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MessageScanner from '@/components/MessageScanner';
import ScreenshotScanner from '@/components/ScreenshotScanner';
import UrlScanner from '@/components/UrlScanner';
import SampleScenarios from '@/components/SampleScenarios';
import AnalysisResultView from '@/components/AnalysisResultView';
import { ScanResult, ScanInputType, SampleScenario } from '@/lib/types';
import { saveScanToHistory } from '@/lib/storage';
import {
  MessageSquare,
  Image as ImageIcon,
  Globe,
  ShieldCheck,
  AlertCircle,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

function ScannerContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as ScanInputType) || 'message';

  const [activeTab, setActiveTab] = useState<ScanInputType>(
    ['message', 'screenshot', 'url'].includes(initialTab) ? initialTab : 'message'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Pre-filled content when user picks a sample scenario
  const [prefilledText, setPrefilledText] = useState<string>('');

  useEffect(() => {
    const tabParam = searchParams.get('tab') as ScanInputType;
    if (tabParam && ['message', 'screenshot', 'url'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleAnalyze = async (content: string, type: ScanInputType) => {
    setIsLoading(true);
    setApiError(null);
    setScanResult(null);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, inputType: type }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${response.status})`);
      }

      const data: ScanResult = await response.json();
      setScanResult(data);
      // Persist in local session storage for Dashboard
      saveScanToHistory(data, type);
    } catch (err) {
      console.error('Scan request failed:', err);
      setApiError(
        err instanceof Error
          ? err.message
          : 'Failed to complete threat analysis. Please verify your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sample: SampleScenario) => {
    setScanResult(null);
    setApiError(null);

    if (sample.type === 'url') {
      setActiveTab('url');
      setPrefilledText(sample.content);
    } else {
      setActiveTab('message');
      setPrefilledText(sample.content);
    }

    // Smooth scroll up to scanner input box
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleReset = () => {
    setScanResult(null);
    setApiError(null);
    setPrefilledText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title & Status Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-cyber-border/70">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyber-cyan uppercase tracking-wider">
              Real-Time Security Intelligence
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            AI Scam & Phishing Scanner
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Submit text messages, payment screenshots, or suspicious links for multi-tier analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto text-xs text-slate-400 bg-cyber-card px-3 py-1.5 rounded-xl border border-cyber-border">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Google Gemini AI &amp; Heuristic Fallback Engine</span>
        </div>
      </div>

      {/* Main Analysis Card or Results View */}
      {scanResult ? (
        <AnalysisResultView result={scanResult} onReset={handleReset} />
      ) : (
        <div className="rounded-3xl bg-cyber-darker border border-cyber-border shadow-2xl p-6 sm:p-8 space-y-6 cyber-glass">
          {/* Tab Navigation */}
          <div className="flex flex-wrap p-1.5 rounded-2xl bg-cyber-darkest border border-cyber-border gap-1.5">
            <button
              onClick={() => {
                setActiveTab('message');
                setPrefilledText('');
              }}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'message'
                  ? 'bg-cyber-card text-cyber-cyan border border-cyber-cyan/30 shadow-md shadow-cyber-cyan/10'
                  : 'text-slate-400 hover:text-white hover:bg-cyber-card/40'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>1. Message Text</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('screenshot');
                setPrefilledText('');
              }}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'screenshot'
                  ? 'bg-cyber-card text-cyber-cyan border border-cyber-cyan/30 shadow-md shadow-cyber-cyan/10'
                  : 'text-slate-400 hover:text-white hover:bg-cyber-card/40'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>2. Screenshot (OCR)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('url');
                setPrefilledText('');
              }}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'url'
                  ? 'bg-cyber-card text-cyber-cyan border border-cyber-cyan/30 shadow-md shadow-cyber-cyan/10'
                  : 'text-slate-400 hover:text-white hover:bg-cyber-card/40'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>3. URL Inspector</span>
            </button>
          </div>

          {/* Active Tab Component */}
          <div className="pt-2">
            {activeTab === 'message' && (
              <MessageScanner
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                initialText={prefilledText}
              />
            )}

            {activeTab === 'screenshot' && (
              <ScreenshotScanner
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'url' && (
              <UrlScanner
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                initialUrl={prefilledText}
              />
            )}
          </div>

          {/* Error Message */}
          {apiError && (
            <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-950/30 border border-red-500/40 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="text-red-200">Analysis Error:</strong>
                <p>{apiError}</p>
              </div>
            </div>
          )}

          {/* Real-time Loading Animation Card */}
          {isLoading && (
            <div className="p-6 rounded-2xl bg-cyber-darkest border border-cyber-cyan/30 text-center space-y-4 animate-pulse">
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-bold text-white tracking-wide">
                  Processing Threat Signals...
                </span>
              </div>
              <div className="max-w-md mx-auto space-y-1 text-xs text-slate-400">
                <p>1. Ingesting content &amp; cross-referencing Indian cyber threat matrices</p>
                <p>2. Checking typosquatting, credential harvesting &amp; UPI PIN patterns</p>
                <p>3. Synthesizing risk score &amp; protective safety recommendations</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Demonstration Scenarios Card */}
      <div className="pt-6">
        <SampleScenarios onSelectSample={handleSelectSample} />
      </div>
    </div>
  );
}

export default function ScannerPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading ScamShield Scanner...</div>}>
      <ScannerContent />
    </Suspense>
  );
}
