'use client';

import React, { useState, useRef } from 'react';
import { Upload, Trash2, AlertCircle, FileImage, ChevronRight } from 'lucide-react';
import Tesseract from 'tesseract.js';

interface ScreenshotScannerProps {
  onAnalyze: (text: string, type: 'screenshot') => void;
  isLoading: boolean;
}

export default function ScreenshotScanner({ onAnalyze, isLoading }: ScreenshotScannerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [ocrStatus, setOcrStatus] = useState<string | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setError(null);
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(f.type)) {
      setError('Please upload a JPG, PNG, or WEBP image.'); return;
    }
    if (f.size > 10 * 1024 * 1024) { setError('Image must be under 10MB.'); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setExtractedText('');
    setOcrStatus(null);
    setOcrProgress(0);
    runOcr(f);
  };

  const runOcr = async (img: File) => {
    setIsExtracting(true);
    setOcrStatus('Initializing OCR...');
    setOcrProgress(5);
    try {
      const result = await Tesseract.recognize(img, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const p = Math.round((m.progress || 0) * 100);
            setOcrProgress(p);
            setOcrStatus(`Extracting text: ${p}%`);
          }
        },
      });
      const text = result.data.text.trim();
      setIsExtracting(false);
      if (!text) {
        setError('No readable text found in this image. Please try a clearer screenshot.');
        setOcrStatus(null);
      } else {
        setExtractedText(text);
        setOcrStatus('Extraction complete. Review text and click Analyze.');
        setOcrProgress(100);
      }
    } catch {
      setIsExtracting(false);
      setError('OCR failed. You can manually type or paste the message text instead.');
      setOcrStatus(null);
    }
  };

  const handleReset = () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setExtractedText('');
    setOcrStatus(null);
    setOcrProgress(0);
    setError(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!extractedText.trim()) { setError('No text to analyze.'); return; }
    onAnalyze(extractedText.trim(), 'screenshot');
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-surface-border hover:border-brand-blue/40 rounded-xl p-10 text-center cursor-pointer bg-surface-1 hover:bg-surface-2 transition-colors"
        >
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-surface-2 border border-surface-border flex items-center justify-center">
              <Upload className="w-5 h-5 text-text-muted" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Drop screenshot here or <span className="text-brand-blueLight">browse</span></p>
              <p className="text-xs text-text-muted mt-1">JPG, PNG, WEBP — max 10MB · OCR runs in-browser, no cloud upload</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileImage className="w-4 h-4 text-brand-blueLight" />
              <span className="text-xs font-medium text-text-primary">{file?.name}</span>
              <span className="text-2xs text-text-muted mono-text">({file ? (file.size / 1024).toFixed(0) : 0} KB)</span>
            </div>
            <button onClick={handleReset} disabled={isLoading || isExtracting}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-2 border border-surface-border text-text-muted hover:text-text-secondary text-xs transition-colors">
              <Trash2 className="w-3.5 h-3.5" />Change
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image preview */}
            <div className="rounded-lg bg-surface-1 border border-surface-border overflow-hidden max-h-56 flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Screenshot" className="max-h-52 w-auto object-contain rounded" />
            </div>

            {/* Extracted text */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-text-secondary">Extracted Text</span>
                <span className="text-text-muted text-2xs">Editable</span>
              </div>
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                disabled={isExtracting || isLoading}
                rows={5}
                placeholder={isExtracting ? 'Running OCR...' : 'Text will appear here...'}
                className="w-full rounded-lg bg-surface-1 border border-surface-border p-3 text-xs text-text-secondary mono-text focus:outline-none focus:border-brand-blue/50 resize-none leading-relaxed"
              />
              {ocrStatus && (
                <div className="space-y-1">
                  <p className="text-2xs text-text-muted">{ocrStatus}</p>
                  {isExtracting && (
                    <div className="w-full bg-surface-3 rounded-full h-1 overflow-hidden">
                      <div className="bg-brand-blue h-1 rounded-full transition-all duration-300" style={{ width: `${ocrProgress}%` }} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-300 p-3 rounded-lg bg-status-criticalBg border border-status-criticalBorder">
          <AlertCircle className="w-4 h-4 shrink-0" />{error}
        </div>
      )}

      {preview && (
        <div className="flex justify-end">
          <button onClick={handleSubmit} disabled={isLoading || isExtracting || !extractedText.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue hover:bg-brand-blueSubtle text-white font-semibold text-sm transition-colors shadow-brand disabled:opacity-50 disabled:pointer-events-none">
            {isLoading ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner" />Analyzing...</>
            ) : (
              <>Analyze Screenshot<ChevronRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
