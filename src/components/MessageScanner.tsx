'use client';

import React, { useState } from 'react';
import { Clipboard, Trash2, ChevronRight, AlertCircle } from 'lucide-react';

interface MessageScannerProps {
  onAnalyze: (text: string, type: 'message') => void;
  isLoading: boolean;
  initialText?: string;
}

export default function MessageScanner({ onAnalyze, isLoading, initialText = '' }: MessageScannerProps) {
  const [text, setText] = useState(initialText);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialText) { setText(initialText); setError(null); }
  }, [initialText]);

  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) { setText(clip); setError(null); }
    } catch {
      setError('Clipboard not available. Use Ctrl+V to paste.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) { setError('Please enter or paste a message to analyze.'); return; }
    setError(null);
    onAnalyze(text.trim(), 'message');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl bg-surface-1 border border-surface-border focus-within:border-brand-blue/50 transition-colors p-4">
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); if (error) setError(null); }}
          disabled={isLoading}
          rows={6}
          placeholder={`Paste suspicious SMS, WhatsApp message, or Telegram text here...\n\nExamples:\n• "Your SBI YONO account will be blocked today, update KYC at..."\n• "Earn ₹5,000 daily liking YouTube videos, contact HR on Telegram"\n• "KBC Lottery: Congratulations, you won ₹25 Lakh!"`}
          className="w-full bg-transparent text-sm text-text-primary placeholder-text-muted focus:outline-none resize-none leading-relaxed"
        />
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-surface-border mt-2">
          <div className="flex items-center gap-2">
            <button type="button" onClick={handlePaste} disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 border border-surface-border hover:border-surface-borderLight text-text-secondary hover:text-text-primary text-xs font-medium transition-colors disabled:opacity-50">
              <Clipboard className="w-3.5 h-3.5" />Paste
            </button>
            {text && (
              <button type="button" onClick={() => { setText(''); setError(null); }} disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 border border-surface-border hover:border-red-500/30 text-text-muted hover:text-red-400 text-xs transition-colors disabled:opacity-50">
                <Trash2 className="w-3.5 h-3.5" />Clear
              </button>
            )}
          </div>
          <span className="text-2xs text-text-muted mono-text">{text.length} / 15,000</span>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-300 p-3 rounded-lg bg-status-criticalBg border border-status-criticalBorder">
          <AlertCircle className="w-4 h-4 shrink-0" />{error}
        </div>
      )}

      <div className="flex justify-end">
        <button type="submit" disabled={isLoading || !text.trim()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue hover:bg-brand-blueSubtle text-white font-semibold text-sm transition-colors shadow-brand disabled:opacity-50 disabled:pointer-events-none">
          {isLoading ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner" />Analyzing...</>
          ) : (
            <>Analyze Message<ChevronRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </form>
  );
}
