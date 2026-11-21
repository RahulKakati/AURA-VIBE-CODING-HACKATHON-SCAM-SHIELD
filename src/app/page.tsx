'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Zap,
  ArrowRight,
  Eye,
  FileSearch,
  Lock,
  Globe,
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 bg-cyber-grid">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-cyan/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyber-blue/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Challenge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-card/90 border border-cyber-cyan/30 text-xs font-semibold text-cyber-cyan shadow-lg shadow-cyber-cyan/5">
            <Sparkles className="w-4 h-4 text-cyber-cyan animate-pulse" />
            <span>PromptWars X Code1 Innovators • PS01: ScamShield</span>
          </div>

          {/* Mandatory Exact Hero Heading & Supporting Text */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Your Digital Safety <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-white">
                Starts Here.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Detect scams, identify phishing attempts and protect yourself from digital fraud with AI-powered security intelligence.
            </p>
          </div>

          {/* Mandatory Two Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/scanner"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-black text-base shadow-xl shadow-cyber-cyan/25 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Zap className="w-5 h-5 fill-cyber-darkest" />
              <span>Scan a Message</span>
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyber-card/80 border border-cyber-border hover:border-cyber-cyan/50 text-white font-bold text-base hover:bg-cyber-card transition-all"
            >
              <span>Explore Protection</span>
              <ArrowRight className="w-4 h-4 text-cyber-cyan" />
            </a>
          </div>

          {/* Real Live-Looking Product Demonstration Card */}
          <div className="pt-8 max-w-5xl mx-auto">
            <div className="rounded-2xl bg-cyber-darker/90 border border-cyber-border/80 shadow-2xl p-4 sm:p-6 text-left cyber-glass">
              {/* Fake Chrome / Scanner Header */}
              <div className="flex items-center justify-between border-b border-cyber-border/70 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    scamshield-core-engine://live-threat-feed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Dual-Engine Active
                  </span>
                </div>
              </div>

              {/* Sample Analysis Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Live Detection Preview (Hinglish Bank Smishing)
                  </div>
                  <div className="p-3.5 rounded-xl bg-cyber-darkest border border-red-500/30 text-xs sm:text-sm font-mono text-slate-200">
                    &ldquo;Dear Customer, Aapka SBI YONO account suspended today due to KYC expired. Click link immediately to update PAN: <span className="text-red-400 underline">http://sbi-kyc-verify.xyz/login</span>&rdquo;
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-red-500/15 border border-red-500/30 text-red-300 font-mono">
                      ! Urgent Account Threat
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-500/15 border border-red-500/30 text-red-300 font-mono">
                      ! Rogue .xyz Domain
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-500/15 border border-red-500/30 text-red-300 font-mono">
                      ! Brand Spoofing (SBI)
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-4 rounded-xl bg-cyber-card/70 border border-cyber-border space-y-2 text-center sm:text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-red-400 tracking-wider">
                      Threat Assessment
                    </span>
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40">
                      CRITICAL • 96/100
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    High probability banking credential harvester impersonating SBI YONO.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/scanner"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyber-cyan hover:underline"
                    >
                      <span>Try Scanning Your Own Messages</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE SCANNING MODES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold uppercase text-cyber-cyan tracking-widest">
            Complete Threat Ingestion
          </h2>
          <h3 className="text-2xl sm:text-4xl font-black text-white">
            Three Specialized Scanning Modes
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Cyber threats arrive via diverse channels. ScamShield AI equips you with purpose-built modalities to inspect any suspect communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mode 1 */}
          <div className="p-6 rounded-2xl bg-cyber-card/50 border border-cyber-border hover:border-cyber-cyan/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Smartphone className="w-6 h-6 text-cyber-cyan" />
            </div>
            <h4 className="text-lg font-bold text-white">
              1. Suspicious Message Scanner
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste SMS texts, WhatsApp forwards, Telegram task recruitment, or phishing emails. Deep analysis handles English, Hindi, and colloquial Hinglish.
            </p>
            <Link
              href="/scanner"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyber-cyan hover:underline pt-2"
            >
              <span>Scan Messages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mode 2 */}
          <div className="p-6 rounded-2xl bg-cyber-card/50 border border-cyber-border hover:border-cyber-cyan/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Eye className="w-6 h-6 text-cyber-cyan" />
            </div>
            <h4 className="text-lg font-bold text-white">
              2. Screenshot OCR Analyzer
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload mobile screenshots of payment screens, fake prizes, or chat dialogues. In-browser neural OCR extracts text and evaluates fraud indicators.
            </p>
            <Link
              href="/scanner?tab=screenshot"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyber-cyan hover:underline pt-2"
            >
              <span>Upload Screenshot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mode 3 */}
          <div className="p-6 rounded-2xl bg-cyber-card/50 border border-cyber-border hover:border-cyber-cyan/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="text-lg font-bold text-white">
              3. Zero-Execution URL Inspector
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect suspicious links without visiting them. Evaluates typo-squatting, deceptive subdomains, disposable TLDs, and IP masking without execution risk.
            </p>
            <Link
              href="/scanner?tab=url"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyber-cyan hover:underline pt-2"
            >
              <span>Inspect a Link</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold uppercase text-cyber-cyan tracking-widest">
            Architecture Pipeline
          </h2>
          <h3 className="text-2xl sm:text-4xl font-black text-white">
            How ScamShield AI Analyzes Threats
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            A transparent multi-stage verification pipeline that never exposes your sensitive credentials or relies on opaque guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-cyber-darker border border-cyber-border space-y-3 relative">
            <span className="text-3xl font-black text-cyber-cyan/30 font-mono">01</span>
            <h4 className="text-base font-bold text-white">Input & Parsing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              User supplies raw text, screenshot, or URL. Input is sanitized, character boundaries validated, and OCR applied if image.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cyber-darker border border-cyber-border space-y-3 relative">
            <span className="text-3xl font-black text-cyber-cyan/30 font-mono">02</span>
            <h4 className="text-base font-bold text-white">Dual-Layer Intelligence</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evaluated simultaneously against 250+ deterministic heuristic rules and deep Google Gemini AI reasoning models.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cyber-darker border border-cyber-border space-y-3 relative">
            <span className="text-3xl font-black text-cyber-cyan/30 font-mono">03</span>
            <h4 className="text-base font-bold text-white">Risk Scoring & Vectors</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates a mathematically grounded 0-100 risk score, risk classification, exact threat phrases, and urgency signatures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cyber-darker border border-cyber-border space-y-3 relative">
            <span className="text-3xl font-black text-cyber-cyan/30 font-mono">04</span>
            <h4 className="text-base font-bold text-white">Actionable Defense</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides immediate safety steps, things to avoid, and 1-click incident report generation for Indian cyber helplines (1930).
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMMON THREATS SECTION (INDIAN CONTEXT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold uppercase text-cyber-cyan tracking-widest">
            Threat Taxonomy
          </h2>
          <h3 className="text-2xl sm:text-4xl font-black text-white">
            Common Cyber Threats Detected
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Tailored heuristics specifically calibrated for Indian digital payment and communication ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-cyber-card/40 border border-cyber-border space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>UPI PIN & Cashback Traps</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deceptive claims that entering your 4-digit or 6-digit UPI PIN is required to &ldquo;accept&rdquo; or &ldquo;claim&rdquo; rewards.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cyber-card/40 border border-cyber-border space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Bank KYC & Account Freezes</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smishing messages impersonating SBI, HDFC, ICICI, or YONO threatening account blockages unless PAN/Aadhaar is updated via rogue links.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cyber-card/40 border border-cyber-border space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Telegram Part-Time Job Scams</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prepaid task Ponzi syndicates luring victims with ₹150 for liking YouTube videos, then freezing large deposits.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cyber-card/40 border border-cyber-border space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Electricity Power Cut Threats</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extortion SMS claiming power disconnection at 9:30 PM tonight, directing calls to personal mobile numbers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cyber-card/40 border border-cyber-border space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>India Post Parcel Delivery Traps</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smishing SMS demanding nominal ₹5 address updates to capture debit/credit card CVV and credentials.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cyber-card/40 border border-cyber-border space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Fake Government Schemes</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Spurious PM Yojana free recharge, laptop grants, or subsidy claims with viral WhatsApp forward links.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHY SCAMSHIELD AI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-cyber-darker border border-cyber-border space-y-8 cyber-glass">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-xs font-bold uppercase text-cyber-cyan tracking-widest">
              Core Architectural Pillars
            </h2>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Why ScamShield AI Stands Out
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Engineered with privacy-first principles and production-grade resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Lock className="w-4 h-4 text-cyber-cyan" />
                <span>Zero Server Storage</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your submitted messages are analyzed ephemerally in-memory. We never log or store your personal communications in centralized databases.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Deterministic Fallback</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                If the cloud AI API is unavailable, our robust rule-based engine ensures uninterrupted protection without degraded capabilities.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Globe className="w-4 h-4 text-cyber-cyan" />
                <span>Hinglish & Regional Fluency</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calibrated to parse Romanized Hindi, regional loan words, and colloquial fraud vernacular used across Indian messaging networks.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>1930 Helpline Ready</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pre-formats structured incident summaries formatted for immediate submission to the National Cyber Crime Reporting Portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-cyber-blue/20 via-cyber-card to-cyber-cyan/10 border border-cyber-cyan/30 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-cyber-darkest border border-cyber-cyan/40 flex items-center justify-center mx-auto shadow-lg shadow-cyber-cyan/20">
            <ShieldCheck className="w-8 h-8 text-cyber-cyan" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Received a Suspicious Message Today?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Don&apos;t risk your hard-earned money or sensitive credentials. Run an instant, safe security scan right now.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/scanner"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-black text-sm shadow-xl shadow-cyber-cyan/20 hover:opacity-95 transition-all"
            >
              Launch Scam Scanner
            </Link>
            <Link
              href="/awareness"
              className="px-6 py-3.5 rounded-xl bg-cyber-card border border-cyber-border text-white font-bold text-sm hover:bg-cyber-cardHover transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-cyber-cyan" />
              <span>Test Your Scam Awareness</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
