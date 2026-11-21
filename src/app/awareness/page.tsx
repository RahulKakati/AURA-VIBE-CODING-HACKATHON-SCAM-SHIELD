'use client';

import React, { useState } from 'react';
import CyberQuiz from '@/components/CyberQuiz';
import {
  BookOpen,
  HelpCircle,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-cyber-border/70">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyber-cyan uppercase tracking-wider">
              Cyber Hygiene & Prevention
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Cyber Threat Awareness Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Interactive scam guides, official Indian cybercrime reporting procedures, and awareness quiz.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-xl bg-cyber-darker border border-cyber-border">
          <button
            onClick={() => setActiveTab('guides')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'guides'
                ? 'bg-cyber-card text-cyber-cyan border border-cyber-cyan/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Scam Guides
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-cyber-card text-cyber-cyan border border-cyber-cyan/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Awareness Quiz
          </button>
          <button
            onClick={() => setActiveTab('reporting')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'reporting'
                ? 'bg-cyber-card text-cyber-cyan border border-cyber-cyan/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Reporting Helplines
          </button>
        </div>
      </div>

      {/* TAB 1: GUIDES */}
      {activeTab === 'guides' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-cyber-card/60 border border-cyber-border flex items-start gap-3 text-xs text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Zero-Trust Mental Model:</strong>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                Cybercriminals prey on emotion: fear of account loss, greed for unearned money, or panic over disconnected utilities. Developing a reflex of pausing and verifying through independent channels stops 99% of fraud attempts.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {threatGuides.map((guide, idx) => {
              const isOpen = openGuide === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-cyber-darker border border-cyber-border overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleGuide(idx)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-cyber-card/50 transition-colors"
                  >
                    <div className="space-y-1 pr-4">
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {guide.summary}
                      </p>
                    </div>
                    <div className="p-1 rounded-lg bg-cyber-card border border-cyber-border text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-2 border-t border-cyber-border/70 text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans space-y-3 bg-cyber-darkest/60">
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
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-cyber-card/70 border border-cyber-border space-y-4">
            <div className="flex items-center gap-2 text-cyber-cyan font-bold text-base">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <span>Step-by-Step Cyber Incident Response Protocol (India)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              If you or someone you know has suffered financial fraud or credential leakage, act swiftly within the <strong className="text-emerald-400">&ldquo;Golden Hour&rdquo;</strong> to maximize the likelihood of fund recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-cyber-darker border border-cyber-border space-y-3">
              <span className="text-2xl font-black text-emerald-400 font-mono">STEP 01</span>
              <h4 className="text-base font-bold text-white">Freeze Account &amp; Card</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Call your bank’s 24x7 emergency card blocking number or use mobile app toggles to immediately disable UPI, international transactions, and net-banking access.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-cyber-darker border border-cyber-border space-y-3">
              <span className="text-2xl font-black text-cyber-cyan font-mono">STEP 02</span>
              <h4 className="text-base font-bold text-white">Call 1930 Helpline</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dial <strong className="text-white font-mono">1930</strong> (Citizen Financial Cyber Fraud Reporting System). Provide transaction UTR numbers and beneficiary UPI IDs so nodal police officers can trigger temporary fund freezes in recipient bank accounts.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-cyber-darker border border-cyber-border space-y-3">
              <span className="text-2xl font-black text-cyber-cyan font-mono">STEP 03</span>
              <h4 className="text-base font-bold text-white">Lodge Official FIR Online</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visit <strong className="text-cyber-cyan">cybercrime.gov.in</strong> and submit a formal complaint with transaction screenshots, SMS text, sender numbers, and bank account statements as evidence.
              </p>
            </div>
          </div>

          {/* Chakshu Portal details */}
          <div className="p-6 rounded-2xl bg-cyber-darker border border-cyber-border space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyber-cyan" />
              Reporting Fraudulent Calls &amp; SMS on Chakshu (DoT)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The Department of Telecommunications (DoT) provides the <strong className="text-cyber-cyan">Chakshu Facility</strong> on the Sanchar Saathi portal (sancharsaathi.gov.in) to report suspected fraudulent communications, fake lottery calls, or impersonation SMS before any financial loss occurs. Reporting blacklists the offender&apos;s mobile handset IMEI and SIM connection nationwide.
            </p>
            <div className="pt-2">
              <a
                href="https://sancharsaathi.gov.in/sfc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyber-cyan hover:underline"
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
