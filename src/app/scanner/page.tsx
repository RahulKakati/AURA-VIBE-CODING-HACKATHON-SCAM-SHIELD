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
      {/* Page Title & Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-surface-border">
        <div className="space-y-1">
          <p className="text-2xs font-semibold text-brand-accent uppercase tracking-widest">
            Security Threat Detection
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Threat Scanner
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Analyze messages, screenshots, or URLs with dual-engine AI and heuristic intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2 text-2xs text-text-muted bg-surface-2 px-3 py-1.5 rounded-md border border-surface-border">
          <span className="w-1.5 h-1.5 rounded-full bg-status-safe animate-pulse" />
          <span>Gemini AI + Rule Engine Active</span>
        </div>
      </div>

      {/* Main Scanner Card or Results */}
      {scanResult ? (
        <AnalysisResultView result={scanResult} onReset={handleReset} />
      ) : (
        <div className="card-elevated p-6 sm:p-8 space-y-6">
          {/* Segmented Tab Control */}
          <div className="flex p-1 rounded-lg bg-surface-1 border border-surface-border gap-1">
            <button
              onClick={() => {
                setActiveTab('message');
                setPrefilledText('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'message'
                  ? 'bg-surface-3 text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-secondary hover:bg-surface-2'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Message Text</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('screenshot');
                setPrefilledText('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'screenshot'
                  ? 'bg-surface-3 text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-secondary hover:bg-surface-2'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Screenshot (OCR)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('url');
                setPrefilledText('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'url'
                  ? 'bg-surface-3 text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-secondary hover:bg-surface-2'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>URL Inspector</span>
            </button>
          </div>

          {/* Active Tab Panel */}
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
            <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-status-criticalBg border border-status-criticalBorder text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <strong className="text-red-200">Analysis Error:</strong>
                <p>{apiError}</p>
              </div>
            </div>
          )}

          {/* Minimalist Loading State */}
          {isLoading && (
            <div className="p-6 rounded-lg bg-surface-1 border border-surface-border text-center space-y-3">
              <div className="flex items-center justify-center gap-2.5">
                <div className="w-4 h-4 border-2 border-brand-blueLight border-t-transparent rounded-full spinner" />
                <span className="text-xs font-semibold text-text-primary">
                  Synthesizing threat vectors &amp; evaluating risk score...
                </span>
              </div>
              <p className="text-2xs text-text-muted">
                Running 250+ security heuristics and neural reasoning models
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
    <Suspense fallback={<div className="p-12 text-center text-text-muted text-sm">Loading Scanner...</div>}>
      <ScannerContent />
    </Suspense>
  );
}
