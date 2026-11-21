'use client';

import React, { useState } from 'react';
import { Clipboard, Trash2, ArrowRight, AlertCircle, ScanLine } from 'lucide-react';

interface MessageScannerProps {
  onAnalyze: (text: string, type: 'message') => void;
  isLoading: boolean;
  initialText?: string;
}

export default function MessageScanner({ onAnalyze, isLoading, initialText = '' }: MessageScannerProps) {
  const [text, setText] = useState(initialText);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialText) {
      setText(initialText);
      setError(null);
    }
  }, [initialText]);

  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) {
        setText(clip);
        setError(null);
      }
    } catch {
      setError('Clipboard not accessible directly. Use Ctrl+V to paste.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter or paste a suspicious communication to analyze.');
      return;
    }
    setError(null);
    onAnalyze(text.trim(), 'message');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl bg-[#070A12] border border-white/[0.08] focus-within:border-blue-500/40 transition-colors p-4">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          disabled={isLoading}
          rows={6}
          placeholder={`Paste suspicious SMS, WhatsApp message, Telegram recruitment text, or email body here...\n\nRealistic examples:\n• "Dear customer, your SBI YONO account will be blocked today due to pending KYC..."\n• "Congratulations! PhonePe reward Rs. 4,999 cashback, enter UPI PIN to receive funds..."\n• "Earn Rs 3,000 daily liking YouTube videos, contact HR on Telegram..."`}
          className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
        />
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/[0.06] mt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              disabled={isLoading}
              className="btn-secondary text-xs px-3 py-1.5"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>Paste</span>
            </button>
            {text && (
              <button
                type="button"
                onClick={() => {
                  setText('');
                  setError(null);
                }}
                disabled={isLoading}
                className="btn-secondary text-xs px-3 py-1.5 text-slate-400 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {text.length} / 15,000 chars
          </span>
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
          disabled={isLoading || !text.trim()}
          className="btn-primary text-xs font-bold px-6 py-2.5 shadow-brand disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner" />
              <span>Analyzing Threat Signals...</span>
            </>
          ) : (
            <>
              <ScanLine className="w-4 h-4" />
              <span>Analyze Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
