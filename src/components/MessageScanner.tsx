'use client';

import React, { useState } from 'react';
import { Clipboard, Trash2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface MessageScannerProps {
  onAnalyze: (text: string, type: 'message') => void;
  isLoading: boolean;
  initialText?: string;
}

export default function MessageScanner({ onAnalyze, isLoading, initialText = '' }: MessageScannerProps) {
  const [text, setText] = useState(initialText);
  const [error, setError] = useState<string | null>(null);

  // Sync initialText when updated (e.g. from sample scenarios)
  React.useEffect(() => {
    if (initialText) {
      setText(initialText);
      setError(null);
    }
  }, [initialText]);

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        setText(clipText);
        setError(null);
      }
    } catch {
      setError('Unable to read clipboard directly. Please press Ctrl+V to paste.');
    }
  };

  const handleClear = () => {
    setText('');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please paste or type a suspicious message to analyze.');
      return;
    }
    setError(null);
    onAnalyze(text.trim(), 'message');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Textarea container */}
      <div className="relative rounded-2xl bg-cyber-darker border border-cyber-border focus-within:border-cyber-cyan/60 focus-within:ring-2 focus-within:ring-cyber-cyan/20 transition-all p-4">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          disabled={isLoading}
          rows={6}
          placeholder="Paste suspicious SMS, WhatsApp message, Telegram recruitment text, email body, or Hinglish notification here... (e.g. 'Aapka SBI YONO account block ho gaya hai, link par click karke turant KYC update karein')"
          className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none resize-none leading-relaxed"
        />

        {/* Action bar inside textarea card */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-cyber-border/60 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-border hover:border-slate-500 text-slate-300 hover:text-white transition-all disabled:opacity-50"
            >
              <Clipboard className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Paste Clipboard</span>
            </button>

            {text && (
              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-border hover:border-red-500/50 text-slate-300 hover:text-red-300 transition-all disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span>
              <strong className="text-slate-200">{text.length}</strong> / 15,000 chars
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-400 p-3 rounded-xl bg-red-950/20 border border-red-500/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-extrabold text-sm shadow-lg shadow-cyber-cyan/20 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-cyber-darkest border-t-transparent rounded-full animate-spin" />
              <span>Running Deep Threat Intelligence...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 fill-cyber-darkest" />
              <span>Analyze Message with AI</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
