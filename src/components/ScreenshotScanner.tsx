'use client';

import React, { useState, useRef } from 'react';
import { Upload, Trash2, AlertCircle, FileImage, ScanLine, Eye } from 'lucide-react';
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
      setError('Please upload a valid JPG, PNG, or WEBP image.');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB.');
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setExtractedText('');
    setOcrStatus(null);
    setOcrProgress(0);
    runOcr(f);
  };

  const runOcr = async (img: File) => {
    setIsExtracting(true);
    setOcrStatus('Initializing local OCR engine...');
    setOcrProgress(10);
    try {
      const result = await Tesseract.recognize(img, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const p = Math.round((m.progress || 0) * 100);
            setOcrProgress(p);
            setOcrStatus(`Extracting text from image: ${p}%`);
          }
        },
      });
      const text = result.data.text.trim();
      setIsExtracting(false);
      if (!text) {
        setError('No legible characters found. Ensure the screenshot is clear.');
        setOcrStatus(null);
      } else {
        setExtractedText(text);
        setOcrStatus('Text extracted successfully. Review and click Analyze below.');
        setOcrProgress(100);
      }
    } catch {
      setIsExtracting(false);
      setError('OCR extraction failed. You can paste the text manually in the Message Scanner tab.');
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
    if (!extractedText.trim()) {
      setError('No extracted text to analyze.');
      return;
    }
    onAnalyze(extractedText.trim(), 'screenshot');
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="border border-dashed border-white/[0.12] hover:border-blue-500/40 rounded-xl p-10 text-center cursor-pointer bg-[#070A12] hover:bg-[#0A0E18] transition-all group"
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Upload className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Drop screenshot here or <span className="text-blue-400 underline">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports PNG, JPG, JPEG, WEBP · Max 10MB · In-browser OCR, no cloud upload
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <FileImage className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white truncate max-w-xs">{file?.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">
                ({file ? (file.size / 1024).toFixed(0) : 0} KB)
              </span>
            </div>
            <button
              onClick={handleReset}
              disabled={isLoading || isExtracting}
              className="btn-secondary text-xs px-2.5 py-1 text-slate-400 hover:text-white"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Change Image</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Preview */}
            <div className="rounded-lg bg-[#05070D] border border-white/[0.08] overflow-hidden max-h-56 flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Screenshot" className="max-h-52 w-auto object-contain rounded" />
            </div>

            {/* Extracted Text Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                  OCR Extracted Text
                </span>
                <span className="text-slate-500 text-[10px]">Editable</span>
              </div>
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                disabled={isExtracting || isLoading}
                rows={5}
                placeholder={isExtracting ? 'Performing local OCR character recognition...' : 'Extracted text appears here...'}
                className="w-full rounded-lg bg-[#05070D] border border-white/[0.08] p-3 text-xs text-slate-200 mono-text focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
              />
              {ocrStatus && (
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 font-mono">{ocrStatus}</p>
                  {isExtracting && (
                    <div className="w-full bg-white/[0.06] rounded-full h-1 overflow-hidden">
                      <div
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${ocrProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-300 p-3 rounded-lg bg-red-950/20 border border-red-500/30">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {preview && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isLoading || isExtracting || !extractedText.trim()}
            className="btn-primary text-xs font-bold px-6 py-2.5 shadow-brand disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner" />
                <span>Analyzing Extracted Text...</span>
              </>
            ) : (
              <>
                <ScanLine className="w-4 h-4" />
                <span>Analyze Extracted Content</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
