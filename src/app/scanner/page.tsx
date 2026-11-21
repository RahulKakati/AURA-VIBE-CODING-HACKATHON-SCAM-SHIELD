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
  AlertCircle,
  ShieldCheck,
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

    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleReset = () => {
    setScanResult(null);
    setApiError(null);
    setPrefilledText('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
            Security Intelligence Ingestion
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Threat Scanner
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Submit text messages, payment screenshots, or suspicious links for multi-tier heuristic and AI threat analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/[0.08]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Gemini AI + Rule Engine Active</span>
        </div>
      </div>

      {/* Main Card or Results */}
      {scanResult ? (
        <AnalysisResultView result={scanResult} onReset={handleReset} />
      ) : (
        <div className="card-elevated p-6 sm:p-8 space-y-6">
          {/* Segmented Control Tabs */}
          <div className="flex p-1 rounded-xl bg-[#080C16] border border-white/[0.08] gap-1">
            <button
              onClick={() => {
                setActiveTab('message');
                setPrefilledText('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'message'
                  ? 'bg-white/[0.09] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>1. Message Text</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('screenshot');
                setPrefilledText('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'screenshot'
                  ? 'bg-white/[0.09] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>2. Screenshot (OCR)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('url');
                setPrefilledText('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'url'
                  ? 'bg-white/[0.09] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>3. URL Inspector</span>
            </button>
          </div>

          {/* Active Mode Input */}
          <div>
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
            <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-950/20 border border-red-500/30 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <strong className="text-red-200">Analysis Error:</strong>
                <p>{apiError}</p>
              </div>
            </div>
          )}

          {/* Minimalist Loading State */}
          {isLoading && (
            <div className="p-6 rounded-xl bg-[#080C16] border border-white/[0.08] text-center space-y-2.5">
              <div className="flex items-center justify-center gap-2.5">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full spinner" />
                <span className="text-xs font-bold text-white tracking-tight">
                  Cross-referencing 250+ fraud signatures &amp; calculating risk score...
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Evaluating urgency psychology, typosquatting vectors &amp; credential harvest traps
              </p>
            </div>
          )}
        </div>
      )}

      {/* Demonstration Scenarios Card */}
      <div className="pt-2">
        <SampleScenarios onSelectSample={handleSelectSample} />
      </div>
    </div>
  );
}

export default function ScannerPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 text-xs">Loading Scanner...</div>}>
      <ScannerContent />
    </Suspense>
  );
}
