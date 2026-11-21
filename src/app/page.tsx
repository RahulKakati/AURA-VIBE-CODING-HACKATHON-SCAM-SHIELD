'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  ScanLine,
  ArrowRight,
  Eye,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle,
  Cpu,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">

      {/* HERO */}
      <section className="relative pt-16 pb-20 dot-bg overflow-hidden">
        {/* Subtle radial gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Top badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-3 border border-surface-border text-xs font-medium text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-status-safe" />
              PromptWars × Code1 Innovators &nbsp;·&nbsp; PS01: ScamShield
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-tight">
              Your Digital Safety <br />
              <span className="text-brand-blueLight">Starts Here.</span>
            </h1>

            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Detect scams, identify phishing attempts and protect yourself from digital fraud with AI-powered security intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/scanner"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-blue hover:bg-brand-blueSubtle text-white font-semibold text-sm transition-all shadow-brand hover:shadow-lg"
              >
                <ScanLine className="w-4 h-4" />
                Scan a Message
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface-2 border border-surface-border text-text-secondary hover:text-text-primary hover:bg-surface-3 font-medium text-sm transition-colors"
              >
                Explore Protection
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Preview Card */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="card-elevated overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border bg-surface-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-surface-4" />
                  <div className="w-2.5 h-2.5 rounded-full bg-surface-4" />
                  <div className="w-2.5 h-2.5 rounded-full bg-surface-4" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-surface-1 border border-surface-border text-xs text-text-muted font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-safe" />
                  scamshield-ai · threat-analysis · live
                </div>
                <div className="w-14" />
              </div>

              {/* Content */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input side */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Submitted Message</p>
                  <div className="p-4 rounded-lg bg-surface-1 border border-surface-border text-sm font-mono text-text-secondary leading-relaxed">
                    "Dear SBI User, Your YONO Account will be{' '}
                    <span className="bg-status-criticalBg text-red-300 px-0.5 rounded">blocked today</span>{' '}
                    due to pending{' '}
                    <span className="bg-status-criticalBg text-red-300 px-0.5 rounded">KYC update</span>.
                    Click link immediately:{' '}
                    <span className="bg-status-criticalBg text-red-300 px-0.5 rounded">sbi-kyc-verify.xyz/login</span>"
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge risk-critical">KYC Urgency Trigger</span>
                    <span className="badge risk-critical">Rogue .xyz Domain</span>
                    <span className="badge risk-critical">Brand Spoofing</span>
                  </div>
                </div>

                {/* Result side */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Analysis Result</p>
                  <div className="p-4 rounded-lg bg-surface-1 border border-status-criticalBorder space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border-2 border-status-critical flex items-center justify-center">
                          <span className="text-xs font-bold text-red-400">96</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-red-400">CRITICAL RISK</p>
                          <p className="text-2xs text-text-muted">Banking / KYC Fraud</p>
                        </div>
                      </div>
                      <span className="badge risk-critical text-2xs">Confidence: 97%</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      High-probability banking credential harvester impersonating SBI YONO. Employs account-blocking urgency and rogue external domain.
                    </p>
                    <Link href="/scanner" className="flex items-center gap-1.5 text-xs font-semibold text-brand-blueLight hover:underline">
                      Try scanning your own messages <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCANNING MODES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold text-brand-accent uppercase tracking-widest mb-2">Scanning Modalities</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Three Purpose-Built Detection Modes
          </h2>
          <p className="mt-3 text-text-secondary text-sm leading-relaxed">
            Threats arrive through different channels. ScamShield covers all of them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: MessageSquare,
              title: 'Message Scanner',
              description: 'Paste SMS, WhatsApp forwards, or Telegram recruitment messages. Supports English, Hindi, and Hinglish with 250+ fraud pattern signatures.',
              href: '/scanner',
              label: 'Scan Messages',
            },
            {
              icon: Eye,
              title: 'Screenshot Analyzer',
              description: 'Upload screenshots from payment apps or chats. Browser-side OCR (Tesseract.js) extracts text and runs full threat analysis without any cloud upload.',
              href: '/scanner?tab=screenshot',
              label: 'Upload Screenshot',
            },
            {
              icon: Globe,
              title: 'URL Inspector',
              description: 'Inspect suspicious links for typosquatting, deceptive TLDs, IP-based hosts, and brand impersonation — without ever visiting or executing the URL.',
              href: '/scanner?tab=url',
              label: 'Inspect a Link',
            },
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <div key={mode.title} className="card p-6 hover:border-surface-borderLight transition-colors group space-y-4">
                <div className="w-9 h-9 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-brand-blueLight" size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1.5">{mode.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{mode.description}</p>
                </div>
                <Link
                  href={mode.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blueLight group-hover:gap-2 transition-all"
                >
                  {mode.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold text-brand-accent uppercase tracking-widest mb-2">Analysis Pipeline</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            How ScamShield Analyzes Threats
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { step: '01', title: 'Input & Validation', body: 'Content is sanitized, length-validated, and classified by input type (message, screenshot, URL) before processing.' },
            { step: '02', title: 'Dual-Layer Analysis', body: 'Evaluated simultaneously against 250+ deterministic heuristic rules and Google Gemini AI deep reasoning.' },
            { step: '03', title: 'Risk Scoring', body: 'Mathematically grounded 0–100 risk score, threat classification, exact suspicious phrase extraction, and confidence rating.' },
            { step: '04', title: 'Actionable Guidance', body: 'Step-by-step safety instructions, things to avoid, and a formal incident report formatted for cybercrime.gov.in.' },
          ].map((s) => (
            <div key={s.step} className="card p-5 space-y-3">
              <span className="text-2xl font-black text-brand-blue/30 font-mono">{s.step}</span>
              <h3 className="text-sm font-semibold text-text-primary">{s.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THREAT TAXONOMY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold text-brand-accent uppercase tracking-widest mb-2">Threat Coverage</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Scam Categories Detected
          </h2>
          <p className="mt-3 text-text-secondary text-sm leading-relaxed">
            Heuristics calibrated for the Indian digital payments and communications ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'UPI PIN & Payment Traps', detail: 'Fake "receive money by entering PIN" requests targeting PhonePe, GPay, Paytm users.' },
            { label: 'Bank KYC Account Freezes', detail: 'SBI, HDFC, ICICI, YONO impersonation threatening account suspension via rogue links.' },
            { label: 'Telegram Part-Time Job Scams', detail: 'YouTube like/subscribe task Ponzi schemes luring victims with ₹150 bait payments.' },
            { label: 'Electricity Disconnection Threats', detail: 'Extortion SMS threatening power cut at 9:30 PM with personal mobile "officer" contact.' },
            { label: 'Courier & Parcel Delivery Traps', detail: 'India Post smishing demanding nominal ₹5 "address update" fees to steal card details.' },
            { label: 'Fake Government Schemes', detail: 'Spurious PM Yojana free recharge, laptop grants, and MUDRA loan subsidy lures.' },
          ].map((t) => (
            <div key={t.label} className="card p-4 flex gap-3">
              <AlertTriangle className="w-4 h-4 text-status-medium shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-text-primary mb-1">{t.label}</p>
                <p className="text-xs text-text-muted leading-relaxed">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY SCAMSHIELD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-elevated p-8 sm:p-10">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold text-brand-accent uppercase tracking-widest mb-2">Architecture</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Built for Reliability
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: 'No Data Stored', body: 'Messages are analyzed ephemerally in-memory. Nothing is logged or persisted in remote databases.' },
              { icon: Cpu, title: 'Offline Fallback', body: 'If Gemini AI is unavailable, the deterministic Heuristic Rule Engine ensures uninterrupted analysis.' },
              { icon: Globe, title: 'Hinglish Support', body: 'Calibrated for Romanized Hindi, regional loan-words, and colloquial fraud vernacular across Indian SMS networks.' },
              { icon: CheckCircle, title: '1930 Integration', body: 'Pre-structures formal incident reports optimized for National Cyber Crime Reporting Portal submission.' },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="space-y-2">
                  <Icon className="w-5 h-5 text-brand-blueLight" />
                  <h4 className="text-sm font-semibold text-text-primary">{f.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8 sm:p-10 text-center space-y-5 border-brand-blue/20 bg-gradient-to-b from-surface-2 to-surface-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/25 mx-auto">
            <Shield className="w-6 h-6 text-brand-blueLight" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
              Received a suspicious message?
            </h2>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              Run an instant security scan and get a detailed threat analysis in seconds.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/scanner"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue hover:bg-brand-blueSubtle text-white font-semibold text-sm transition-colors shadow-brand"
            >
              <ScanLine className="w-4 h-4" />
              Launch Scanner
            </Link>
            <Link
              href="/awareness"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-2 border border-surface-border text-text-secondary hover:text-text-primary hover:bg-surface-3 font-medium text-sm transition-colors"
            >
              Test Your Awareness
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
