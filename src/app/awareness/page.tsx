'use client';

import React, { useState } from 'react';
import CyberQuiz from '@/components/CyberQuiz';
import {
  ShieldCheck,
  ExternalLink,
  PhoneCall,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function AwarenessPage() {
  const [activeTab, setActiveTab] = useState<'guides' | 'quiz' | 'reporting'>('guides');
  const [openGuide, setOpenGuide] = useState<number | null>(0);

  const toggleGuide = (idx: number) => {
    setOpenGuide(openGuide === idx ? null : idx);
  };

  const threatGuides = [
    {
      title: '1. Anatomy of UPI & QR Code Scams: The "Golden Rule"',
      summary: 'Why you NEVER need to enter a UPI PIN to receive money.',
      content: `The single most common digital payment scam in India exploits confusion surrounding UPI PIN authorization.
      
Key Mechanism:
- Attackers send a "Collect Request" or a customized QR code over WhatsApp/OLX.
- They claim: "Enter your PIN to verify your account and claim ₹5,000 cashback."
- Reality: Entering a UPI PIN ALWAYS debits (deducts) funds from your bank account. Receiving funds requires ZERO PIN interaction.

Rules of Protection:
1. NEVER enter your 4-digit or 6-digit UPI PIN when someone promises to send you money.
2. Never scan a QR code sent to you to receive payment. Scanning a QR code authorizes a payment OUT of your account.
3. Check the SMS notification: A credit SMS begins with "Credited by INR...", while a debit notification contains "Debited by INR...".`,
    },
    {
      title: '2. Bank Impersonation & Panic-Driven KYC Smishing',
      summary: 'How attackers simulate bank alerts and coerce urgent clicks.',
      content: `Victims receive an alarming SMS: "Dear Customer, Your SBI/HDFC/ICICI Account will be suspended in 2 hours due to pending KYC. Update PAN at http://..."

Key Mechanism:
- Attackers weaponize psychological panic ("Account blocked today", "Electricity cut at 9:30 PM").
- The URL leads to a spoofed web form copying the bank net-banking interface.
- Entering credentials leaks your username, password, and triggers an OTP prompt intercepted in real-time.

Rules of Protection:
1. Banks in India NEVER send account deactivation threats via SMS containing third-party links (.top, .xyz, .click).
2. Official bank SMS always arrives from registered alpha-headers (e.g., VK-SBIIN, CP-HDFCBK, VM-ICICIB), never personal 10-digit mobile numbers (+91-9876543210).
3. If in doubt, open your official mobile banking app directly. Never click the link in the SMS.`,
    },
    {
      title: '3. Part-Time Telegram Task & "YouTube Like" Scams',
      summary: 'The modern Ponzi trap targeting students and remote job seekers.',
      content: `Organized cyber syndicates contact targets via WhatsApp or Telegram offering "Part-Time Work-From-Home" jobs paying ₹2,000–₹5,000 per day.

Key Mechanism:
- Phase 1 (The Sweetener): You are asked to subscribe to 3 YouTube channels. You are immediately paid ₹150–₹300 via UPI to build trust.
- Phase 2 (The Hook): You are added to a Telegram "VIP Group" with fake users celebrating huge earnings.
- Phase 3 (The Trap): You are told to deposit ₹3,000 to "unlock high-commission crypto tasks". Once you deposit large amounts (₹50,000+), your withdrawal is blocked under pretext of "system freeze" or "tax penalty".

Rules of Protection:
1. No legitimate enterprise pays thousands of rupees for simply liking social media posts.
2. Any job requiring YOU to deposit money or pay "security fees" is 100% a fraudulent scheme.`,
    },
    {
      title: '4. Remote Access Screen Sharing Apps (AnyDesk / QuickSupport)',
      summary: 'How cybercriminals bypass Two-Factor Authentication (OTP).',
      content: `Attackers posing as bank executives, customer service agents, or electricity officers convince the victim to install remote support tools like AnyDesk, TeamViewer, RustDesk, or QuickSupport.

Key Mechanism:
- Once installed, the attacker requests the 9-digit remote access code.
- They gain full real-time visibility of the victim's phone screen.
- As the victim opens their banking app, the scammer records the MPIN and reads incoming OTP SMS messages directly off the screen.

Rules of Protection:
1. NEVER install AnyDesk, TeamViewer, or QuickSupport at the request of any caller, regardless of who they claim to be.
2. No bank or government entity will ever ask for remote access to your personal mobile device.`,
    },
    {
      title: '5. India Post & Courier "Nominal ₹5 Fee" Phishing',
      summary: 'Exploiting tiny fees to steal full credit/debit card numbers.',
      content: `An SMS claims: "IndiaPost: Your package could not be delivered due to wrong address. Click here to update address and pay ₹5 re-delivery fee."

Key Mechanism:
- The ₹5 fee seems harmless, lowering user vigilance.
- The phishing gateway records the card number, expiry date, and CVV.
- The attacker's server automatically initiates a high-value purchase (e.g. ₹50,000) and displays a fake "₹5 OTP" screen, stealing your transaction OTP.

Rules of Protection:
1. Never enter financial details on unverified URLs. India Post official website is strictly indiapost.gov.in.
2. Always inspect transaction amounts inside the official bank SMS before entering an OTP.`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-surface-border">
        <div className="space-y-1">
          <p className="text-2xs font-semibold text-brand-accent uppercase tracking-widest">
            Cyber Hygiene &amp; Prevention
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Awareness Center
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Interactive scam guides, Indian cybercrime reporting procedures, and awareness quiz.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-lg bg-surface-1 border border-surface-border">
          <button
            onClick={() => setActiveTab('guides')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'guides'
                ? 'bg-surface-3 text-text-primary shadow-sm'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            Scam Guides
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'quiz'
                ? 'bg-surface-3 text-text-primary shadow-sm'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            Awareness Quiz
          </button>
          <button
            onClick={() => setActiveTab('reporting')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'reporting'
                ? 'bg-surface-3 text-text-primary shadow-sm'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            Helpline 1930
          </button>
        </div>
      </div>

      {/* TAB 1: GUIDES */}
      {activeTab === 'guides' && (
        <div className="space-y-4 fade-up">
          <div className="p-4 rounded-xl bg-surface-1 border border-surface-border flex items-start gap-3 text-xs text-text-secondary">
            <ShieldCheck className="w-4 h-4 text-status-safe shrink-0 mt-0.5" />
            <div>
              <strong className="text-text-primary">Zero-Trust Principle:</strong>
              <p className="text-text-muted mt-0.5 leading-relaxed">
                Cybercriminals prey on emotion: fear of account loss, greed for unearned returns, or panic over disconnected utilities. Pausing and verifying through official independent channels prevents fraud.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {threatGuides.map((guide, idx) => {
              const isOpen = openGuide === idx;
              return (
                <div
                  key={idx}
                  className="card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleGuide(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-surface-2 transition-colors"
                  >
                    <div className="space-y-0.5 pr-4">
                      <h3 className="text-sm font-semibold text-text-primary">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-text-muted">
                        {guide.summary}
                      </p>
                    </div>
                    <div className="p-1 rounded bg-surface-2 border border-surface-border text-text-muted shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-3 border-t border-surface-border text-xs text-text-secondary leading-relaxed whitespace-pre-line font-sans space-y-2 bg-surface-0">
                      {guide.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <CyberQuiz />
        </div>
      )}

      {/* TAB 3: REPORTING PROCEDURES */}
      {activeTab === 'reporting' && (
        <div className="space-y-6 fade-up">
          <div className="card p-5 space-y-2">
            <div className="flex items-center gap-2 text-text-primary font-semibold text-sm">
              <PhoneCall className="w-4 h-4 text-status-safe" />
              <span>Official Indian Cyber Incident Response Protocol</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              If financial fraud or credential leakage occurs, act swiftly within the <strong className="text-status-safe">&ldquo;Golden Hour&rdquo;</strong> to freeze recipient accounts and maximize recovery probability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-5 space-y-2">
              <span className="text-lg font-black text-status-safe font-mono">01</span>
              <h4 className="text-sm font-semibold text-text-primary">Freeze Account &amp; Card</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Contact your bank&apos;s 24x7 emergency card blocking number or use the mobile app to immediately disable UPI and net-banking access.
              </p>
            </div>

            <div className="card p-5 space-y-2">
              <span className="text-lg font-black text-brand-blueLight font-mono">02</span>
              <h4 className="text-sm font-semibold text-text-primary">Call 1930 Helpline</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Dial <strong className="text-text-primary font-mono">1930</strong> (Citizen Financial Cyber Fraud Reporting System). Provide transaction UTR and recipient UPI IDs to trigger police fund freeze.
              </p>
            </div>

            <div className="card p-5 space-y-2">
              <span className="text-lg font-black text-brand-blueLight font-mono">03</span>
              <h4 className="text-sm font-semibold text-text-primary">Lodge Official FIR</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Visit <strong className="text-brand-blueLight">cybercrime.gov.in</strong> and submit a formal complaint with transaction screenshots, SMS text, and account statements.
              </p>
            </div>
          </div>

          <div className="card p-5 space-y-2">
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-brand-blueLight" />
              Reporting Fraudulent Calls &amp; SMS on Chakshu (DoT)
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              The Department of Telecommunications provides the <strong className="text-text-primary">Chakshu Facility</strong> on the Sanchar Saathi portal (sancharsaathi.gov.in) to report suspected fraudulent SMS, calls, or WhatsApp fraud numbers before financial loss occurs.
            </p>
            <div className="pt-1">
              <a
                href="https://sancharsaathi.gov.in/sfc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blueLight hover:underline"
              >
                <span>Visit Sanchar Saathi Chakshu Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
