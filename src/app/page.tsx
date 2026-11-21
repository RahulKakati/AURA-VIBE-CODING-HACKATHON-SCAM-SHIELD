'use client';

import React from 'react';
import Link from 'next/link';
import {
  ScanLine,
  ArrowRight,
  Eye,
  Globe,
  Lock,
  AlertTriangle,
  Cpu,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  FileCheck2,
  PhoneCall,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 sm:pt-20 pb-16 overflow-hidden">
        {/* Subtle top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/[0.07] blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>PromptWars × Code1 Innovators &nbsp;·&nbsp; Challenge PS01: ScamShield</span>
            </div>

            {/* Mandatory Exact Hero Heading */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Your Digital Safety <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
                Starts Here.
              </span>
            </h1>

            {/* Mandatory Exact Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Detect scams, identify phishing attempts and protect yourself from digital fraud with AI-powered security intelligence.
            </p>

            {/* Mandatory Two Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/scanner"
                className="w-full sm:w-auto btn-primary px-7 py-3 text-sm font-bold shadow-brand"
              >
                <ScanLine className="w-4 h-4" />
                Scan a Message
              </Link>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto btn-secondary px-6 py-3 text-sm font-semibold"
              >
                Explore Protection
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Interactive Threat Intelligence Terminal Preview */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="card-elevated overflow-hidden border border-white/[0.1] shadow-2xl">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#0A0E18]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-slate-500" />
                    scamshield://threat-evaluation-engine
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Dual-Tier Active
                  </span>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#070A12]">
                {/* Left: Input Analysis */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
                      Live Sample Ingestion
                    </span>
                    <span className="font-mono text-[10px]">SMS / WhatsApp Smishing</span>
                  </div>
                  
                  <div className="p-3.5 rounded-lg bg-[#05070D] border border-white/[0.08] font-mono text-xs text-slate-300 leading-relaxed select-text">
                    &ldquo;Dear SBI User, Your YONO Account will be <span className="bg-red-500/20 text-red-300 px-1 py-0.5 rounded border border-red-500/30">blocked today</span> due to pending <span className="bg-red-500/20 text-red-300 px-1 py-0.5 rounded border border-red-500/30">KYC update</span>. Click link: <span className="text-red-400 underline decoration-red-500/50">http://sbi-kyc-verify.xyz/login</span>&rdquo;
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="badge risk-critical text-[10px]">! Impersonates SBI YONO</span>
                    <span className="badge risk-critical text-[10px]">! Suspicious .xyz TLD</span>
                    <span className="badge risk-critical text-[10px]">! Coercive 24h Panic</span>
                  </div>
                </div>

                {/* Right: Security Assessment */}
                <div className="lg:col-span-5 p-4 rounded-xl bg-[#0B0F1A] border border-red-500/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
                        Threat Scorecard
                      </span>
                      <span className="text-xs font-black px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30 font-mono">
                        CRITICAL · 99/100
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-snug">
                      High-probability banking credential harvester. Employs fear of suspension and deceptive domain anatomy.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Recommended Action:</span>
                    <Link
                      href="/scanner"
                      className="inline-flex items-center gap-1 font-bold text-blue-400 hover:text-blue-300 text-[11px]"
                    >
                      <span>Analyze Yours</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ENTERPRISE METRICS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          <div className="pt-4 lg:pt-0 space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">250+</span>
            <p className="text-xs font-semibold text-slate-300">Fraud Pattern Heuristics</p>
            <p className="text-[11px] text-slate-500">Trained on UPI, KYC &amp; task fraud</p>
          </div>

          <div className="pt-4 lg:pt-0 space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">0ms</span>
            <p className="text-xs font-semibold text-slate-300">Cloud Data Retention</p>
            <p className="text-[11px] text-slate-500">In-memory ephemeral analysis</p>
          </div>

          <div className="pt-4 lg:pt-0 space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">100%</span>
            <p className="text-xs font-semibold text-slate-300">Deterministic Fallback</p>
            <p className="text-[11px] text-slate-500">Zero downtime if cloud AI is offline</p>
          </div>

          <div className="pt-4 lg:pt-0 space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">1930</span>
            <p className="text-xs font-semibold text-slate-300">Helpline Integration</p>
            <p className="text-[11px] text-slate-500">1-click formal cybercrime reports</p>
          </div>
        </div>
      </section>

      {/* 3. THREE SCANNING MODES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-1">
            Multi-Modal Ingestion
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Three Specialized Detection Engines
          </h2>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            Attackers leverage multiple communication channels. ScamShield AI provides tailored threat parsers for each.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Message Scanner */}
          <div className="card p-6 flex flex-col justify-between space-y-4 hover:border-white/[0.16] transition-all group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                <MessageSquare className="w-4.5 h-4.5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                1. Suspicious Message Scanner
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste SMS, WhatsApp forwards, or Telegram recruitment messages. Understands English, Hindi, and colloquial Hinglish (e.g. <em>&ldquo;account block ho gaya hai&rdquo;</em>).
              </p>
            </div>
            <Link
              href="/scanner"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 pt-2"
            >
              <span>Scan Messages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Screenshot Scanner */}
          <div className="card p-6 flex flex-col justify-between space-y-4 hover:border-white/[0.16] transition-all group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                <Eye className="w-4.5 h-4.5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                2. Screenshot OCR Analyzer
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload payment screens, fake prize notifications, or chat dialogues. Client-side neural OCR (Tesseract.js) extracts text securely in your browser.
              </p>
            </div>
            <Link
              href="/scanner?tab=screenshot"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 pt-2"
            >
              <span>Upload Screenshot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* URL Inspector */}
          <div className="card p-6 flex flex-col justify-between space-y-4 hover:border-white/[0.16] transition-all group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                <Globe className="w-4.5 h-4.5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                3. Zero-Execution URL Inspector
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspect suspicious links for typosquatting, disposable TLDs, and IP masking without execution risk. Target links are never fetched or visited.
              </p>
            </div>
            <Link
              href="/scanner?tab=url"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 pt-2"
            >
              <span>Inspect a Link</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (PIPELINE) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-1">
            System Architecture
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How ScamShield AI Analyzes Threats
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: '01',
              title: 'Input & Sanitization',
              body: 'Payload is normalized, character boundaries validated, and OCR extraction executed locally if screenshot was submitted.',
            },
            {
              step: '02',
              title: 'Dual-Engine Evaluation',
              body: 'Simultaneously cross-referenced against 250+ deterministic heuristics and Google Gemini AI deep reasoning models.',
            },
            {
              step: '03',
              title: 'Risk Scoring & Vectors',
              body: 'Calculates mathematically grounded 0–100 risk score, extracts exact threat phrases, and isolates urgency signatures.',
            },
            {
              step: '04',
              title: 'Actionable Guidance',
              body: 'Provides step-by-step safety instructions, things to avoid, and 1-click incident report generation for 1930 / cybercrime.gov.in.',
            },
          ].map((item) => (
            <div key={item.step} className="card p-5 space-y-2.5">
              <span className="text-xl font-black text-blue-500/40 font-mono">{item.step}</span>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. COMMON THREAT TAXONOMY (INDIAN CONTEXT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-1">
            Threat Taxonomy
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Calibrated for Indian Cyber Threats
          </h2>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            Specialized threat heuristics designed for Indian banking, UPI, and communication ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'UPI PIN & Cashback Traps',
              detail: 'Deceptive "Enter PIN to receive ₹5,000" claims exploiting OLX and PhonePe/Google Pay users.',
            },
            {
              title: 'Bank KYC Account Freezes',
              detail: 'SBI, HDFC, ICICI, YONO impersonation claiming accounts will be blocked today via rogue links.',
            },
            {
              title: 'Telegram Part-Time Task Scams',
              detail: 'Prepaid Ponzi syndicates offering ₹150 for liking YouTube videos before stealing large deposits.',
            },
            {
              title: 'Electricity Disconnection Threats',
              detail: 'Extortion SMS claiming power cut at 9:30 PM with personal mobile numbers for "settlement".',
            },
            {
              title: 'India Post Courier Scams',
              detail: 'Smishing SMS demanding nominal ₹5 "address updates" to capture credit/debit card numbers.',
            },
            {
              title: 'Fake Government Schemes',
              detail: 'Spurious PM Yojana free recharge, laptop grants, or subsidy claims with viral WhatsApp links.',
            },
          ].map((threat) => (
            <div key={threat.title} className="card p-4 flex gap-3 hover:border-white/[0.12] transition-colors">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white mb-1">{threat.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{threat.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WHY SCAMSHIELD AI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-elevated p-8 sm:p-10 space-y-8">
          <div className="max-w-2xl space-y-1">
            <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
              Core Architecture
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Reliability &amp; Privacy
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>Zero Data Retention</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Messages are evaluated ephemerally in-memory. We never store personal communications in remote databases.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Deterministic Fallback</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                If cloud AI APIs are unavailable, our 250+ heuristic engine ensures continuous uninterrupted analysis.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Hinglish Specialization</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trained on Romanized Hindi and regional fraud vernacular commonly used across Indian SMS networks.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>1930 Helpline Ready</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pre-formats official incident summaries for instant submission to the National Cyber Crime Portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HIGH-CONVICTION CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-elevated p-8 sm:p-12 text-center space-y-6 border-blue-500/20 bg-gradient-to-b from-[#0B101E] to-[#070A12]">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/25 mx-auto">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Received a suspicious communication?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Verify links, screenshots, or messages in seconds with dual-engine cyber intelligence.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/scanner"
              className="btn-primary text-xs font-bold px-6 py-2.5 shadow-brand"
            >
              <ScanLine className="w-4 h-4" />
              Launch Threat Scanner
            </Link>
            <Link
              href="/awareness"
              className="btn-secondary text-xs font-semibold px-5 py-2.5"
            >
              Take Cyber Threat Quiz
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
