'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, CheckCircle2, AlertCircle, FileSearch, Trash2 } from 'lucide-react';
import Tesseract from 'tesseract.js';

interface ScreenshotScannerProps {
  onAnalyze: (text: string, type: 'screenshot') => void;
  isLoading: boolean;
}

export default function ScreenshotScanner({ onAnalyze, isLoading }: ScreenshotScannerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [ocrStatus, setOcrStatus] = useState<string | null>(null);
  const [ocrProgress, setOcrProgress] = useState<number>(0);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelection = (selectedFile: File) => {
    setError(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a valid image file (JPG, JPEG, PNG, or WEBP).');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('Image file size must be less than 10MB.');
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);
    setExtractedText('');
    setOcrStatus(null);
    setOcrProgress(0);

    // Auto-trigger OCR extraction on file load
    extractTextFromImage(selectedFile);
  };

  const extractTextFromImage = async (imgFile: File) => {
    setIsExtracting(true);
    setOcrStatus('Initializing OCR engine...');
    setOcrProgress(10);

    try {
      const result = await Tesseract.recognize(imgFile, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const prog = Math.round((m.progress || 0) * 100);
            setOcrProgress(prog);
            setOcrStatus(`Extracting text from screenshot: ${prog}%`);
          } else if (m.status) {
            setOcrStatus(`${m.status.charAt(0).toUpperCase() + m.status.slice(1)}...`);
          }
        },
      });

      const extracted = result.data.text.trim();
      setIsExtracting(false);

      if (!extracted) {
        setError('No readable text could be extracted from this image. Please ensure the screenshot is clear.');
        setOcrStatus('Text extraction completed with zero readable characters.');
      } else {
        setExtractedText(extracted);
        setOcrStatus('Text extracted successfully. Review and click Analyze below.');
        setOcrProgress(100);
      }
    } catch (err) {
      console.error('OCR Extraction error:', err);
      setIsExtracting(false);
      setError('Failed to extract text from the image. You may manually type or paste the message text.');
      setOcrStatus(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setExtractedText('');
    setOcrStatus(null);
    setOcrProgress(0);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!extractedText.trim()) {
      setError('No extracted text available to analyze. Please upload a screenshot or type text manually.');
      return;
    }
    onAnalyze(extractedText.trim(), 'screenshot');
  };

  return (
    <div className="space-y-5">
      {/* Upload Zone */}
      {!imagePreview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-cyber-border hover:border-cyber-cyan/50 rounded-2xl p-8 sm:p-12 text-center cursor-pointer bg-cyber-darker/60 hover:bg-cyber-darker transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelection(e.target.files[0]);
              }
            }}
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-cyber-card border border-cyber-border flex items-center justify-center group-hover:scale-110 group-hover:border-cyber-cyan/40 transition-all">
              <Upload className="w-7 h-7 text-cyber-cyan" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Drag & drop suspicious screenshot or <span className="text-cyber-cyan underline">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports PNG, JPG, JPEG, WEBP (Max 10MB) • WhatsApp, SMS & Payment screen captures
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400">
              <FileSearch className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Includes automatic client-side Optical Character Recognition (OCR)</span>
            </div>
          </div>
        </div>
      ) : (
        /* Image Preview & OCR Workflow */
        <div className="rounded-2xl bg-cyber-darker border border-cyber-border p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cyber-border/70">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-cyber-cyan" />
              <span className="text-xs font-bold text-white truncate max-w-xs">
                {file?.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                ({file ? (file.size / 1024).toFixed(1) : 0} KB)
              </span>
            </div>
            <button
              onClick={handleReset}
              disabled={isLoading || isExtracting}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyber-card border border-cyber-border text-slate-300 hover:text-red-400 text-xs transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Change Image</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Image display */}
            <div className="md:col-span-5 flex items-center justify-center bg-cyber-darkest rounded-xl p-2 border border-cyber-border/50 max-h-64 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Uploaded Screenshot"
                className="max-h-60 w-auto object-contain rounded-lg"
              />
            </div>

            {/* Extracted text review box */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    OCR Extracted Text
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Editable before scan
                  </span>
                </div>
                <textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  disabled={isExtracting || isLoading}
                  rows={6}
                  placeholder={
                    isExtracting
                      ? 'Performing neural OCR character recognition on screenshot...'
                      : 'Extracted text will appear here. You can edit or clarify any ambiguous characters.'
                  }
                  className="w-full rounded-xl bg-cyber-darkest border border-cyber-border/70 p-3 text-xs text-slate-200 focus:outline-none focus:border-cyber-cyan/50 resize-none font-mono leading-relaxed"
                />
              </div>

              {/* OCR Progress Status */}
              {ocrStatus && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{ocrStatus}</span>
                    <span>{ocrProgress}%</span>
                  </div>
                  {isExtracting && (
                    <div className="w-full bg-cyber-card rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-cyber-cyan h-1.5 rounded-full transition-all duration-300"
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
        <div className="flex items-center gap-2 text-xs text-red-400 p-3 rounded-xl bg-red-950/20 border border-red-500/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Submit Button */}
      {imagePreview && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isLoading || isExtracting || !extractedText.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-extrabold text-sm shadow-lg shadow-cyber-cyan/20 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-cyber-darkest border-t-transparent rounded-full animate-spin" />
                <span>Running Threat Analysis on Screenshot...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-cyber-darkest" />
                <span>Analyze Extracted Screenshot Content</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
