# 🛡️ SCAMSHIELD AI
### AI-Powered Suspicious Message & Phishing Detection Platform
> **"Don't Trust. Verify. Stay Protected."**

[![Built for Hackathon](https://img.shields.io/badge/PromptWars%20X%20Code1-PS01%3A%20ScamShield-00F0FF?style=for-the-badge&logo=shield)](https://github.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)

---

## 📌 1. Project Overview

**SCAMSHIELD AI** is a production-grade cybersecurity intelligence web application developed for the **"PromptWars X Code1 Innovators" AI Vibe Coding Hackathon** under challenge:

> **PS01: ScamShield – Suspicious Message Detection**

In an era of rampant smishing, UPI payment scams, KYC suspension intimidation, and deceptive links targeting millions of digital citizens (particularly across India), ScamShield AI serves as an intuitive personal cybersecurity companion. 

It empowers users to inspect **suspicious text messages**, **screenshot captures of payment/chat apps**, and **questionable URLs** through a **multi-tier analysis engine** combining cutting-edge **Google Gemini AI** models with a deterministic **Heuristic Rule-Based Security Engine**.

---

## ✨ 2. Key Features

### 🔍 A. Triple Scanning Modalities
1. **Mode 1: Text Message Scanner**
   - Ingests SMS, WhatsApp forwards, Telegram recruiting text, and email bodies.
   - Native support for **English**, **Hindi**, and colloquial **Hinglish** (e.g., *"Aapka SBI account block ho gaya hai, turant KYC update karein"*).
   - Integrated clipboard paste, character counter, and clear controls.

2. **Mode 2: Screenshot OCR Analyzer**
   - Drag-and-drop or upload JPG, PNG, or WEBP image captures.
   - In-browser Optical Character Recognition (OCR) powered by **Tesseract.js** — extracts text locally without requiring any paid cloud OCR API.
   - Real-time OCR progress tracking and editable text verification box.

3. **Mode 3: Zero-Execution URL Inspector**
   - Inspects web addresses for typosquatting, high-risk disposable TLDs (`.top`, `.xyz`, `.click`, `.buzz`), direct IP hosts, and deceptive subdomain structures.
   - **Zero-Execution Guarantee**: The target URL is analyzed via passive offline heuristics and is **never executed, downloaded, or visited** by the browser.

---

### 🧠 B. Dual-Engine Threat Intelligence Architecture
- **Primary AI Engine (Google Gemini 1.5 Flash)**:
  - Invoked through a secure Next.js server-side API route (`/api/scan`).
  - Leverages advanced cybersecurity system prompts to analyze psychological coercion, urgency vectors, and credential harvesting patterns.
- **Deterministic Heuristic Rule Engine (Automatic Fallback)**:
  - Engineered with 250+ regex patterns and weighted risk scoring calibrated for Indian financial scams (UPI PIN traps, KYC panic alerts, KBC lotteries, fake PM schemes, electricity disconnection extortion).
  - Activates seamlessly whenever the Gemini API key is not configured or during API outages — ensuring **zero downtime** and **complete transparency**.

---

### 📊 C. Comprehensive Threat Report & Scoring
Every scan delivers an interactive threat breakdown:
- **0–100 Animated Risk Gauge** with dynamic color grading (Safe, Low, Medium, High, Critical).
- **Engine Badge**: Explicitly discloses whether Google Gemini AI or the Heuristic Rule Engine was utilized.
- **Identified Threat Category** (e.g. *Banking / KYC Fraud*, *UPI / Payment Scam*, *Fake Job / Task Scam*).
- **Confidence Rating** (e.g. 92%).
- **Highlighted Suspicious Phrases** and **Detected Warning Signs**.
- **Actionable Safety Recommendations** & **Strict "Things to Avoid" Checklist**.
- **1-Click Cyber Incident Report Generator**: Formats a formal cybercrime report pre-structured for filing with the National Cyber Crime Reporting Portal (`cybercrime.gov.in`) or dialing helpline `1930`.

---

### 📈 D. Live Security Dashboard
- Real-time session analytics computed from actual scans (no fabricated statistics).
- Visual distribution of Risk Severity (Safe, Low, Medium, High, Critical).
- Threat Category breakdown chart.
- Complete session audit log with 1-click modal re-inspection.
- Export audit log as formatted JSON.

---

### 🎓 E. Cyber Awareness Center & Interactive Quiz
- Deep-dive guides explaining:
  - The **Golden Rule of UPI**: *"Receiving money NEVER requires entering your UPI PIN."*
  - Bank KYC suspension smishing mechanisms.
  - Part-time Telegram task & YouTube like scams.
  - Remote screen-sharing app dangers (AnyDesk / TeamViewer).
- **Interactive 8-Question Cyber Awareness Quiz**:
  - Real-world scenario-based questions with instant feedback.
  - Actionable red-flag breakdowns and celebration confetti for high scores.
- **Indian Cybercrime Playbook**: Step-by-step guidance for dialing **1930** and utilizing the DoT **Chakshu Portal** (`sancharsaathi.gov.in`).

---

### 🧪 F. 8 Interactive Demonstration Scenarios
Pre-loaded with 6 realistic scam scenarios and 2 legitimate messages for immediate 1-click testing:
1. **Fake SBI YONO KYC Suspension** (Critical Risk • Hinglish)
2. **Deceptive UPI Cashback Reward Trap** (Critical Risk • Hinglish)
3. **Part-Time YouTube/Telegram Job Offer** (High Risk • English)
4. **KBC ₹25 Lakh WhatsApp Lottery Jackpot** (Critical Risk • Hindi)
5. **India Post Address Update Smishing** (High Risk • English)
6. **Fake PM Yojana 3-Month Free Recharge** (High Risk • Hinglish)
7. **Legitimate HDFC Bank Transaction OTP** (Safe Baseline • English)
8. **Legitimate Amazon Order Delivery Notification** (Safe Baseline • English)

---

## 🛠️ 3. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | High-performance server/client hybrid architecture |
| **Language** | TypeScript | Strict type safety and robust software design |
| **Styling** | Tailwind CSS | Custom dark cybersecurity theme with glassmorphism |
| **Icons** | Lucide React | Professional cybersecurity & status iconography |
| **Animations** | Framer Motion & CSS keyframes | Smooth cyber glow transitions & animated gauge rings |
| **AI Model** | Google Gemini 1.5 Flash (`@google/generative-ai`) | Deep neural message threat reasoning |
| **OCR Engine** | Tesseract.js | Client-side Optical Character Recognition |
| **Celebration** | Canvas-Confetti | Interactive gamified quiz completion |
| **Persistence** | Browser Session / LocalStorage | Zero-cost, zero-leak privacy-compliant local telemetry |

---

## 🚀 4. Installation & Local Development

### Prerequisites
- **Node.js**: v18.17+ or v20+ or v24+
- **npm** or **pnpm** or **yarn**

### Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/scamshield-ai.git
cd scamshield-ai

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
```

### Environment Configuration (`.env.local`)
Open `.env.local` in your editor:

```env
# Optional: Add your Google Gemini API key from https://aistudio.google.com/
# If left blank, ScamShield AI automatically uses its robust Heuristic Rule Engine
GEMINI_API_KEY=your_gemini_api_key_here

NEXT_PUBLIC_APP_NAME="ScamShield AI"
```

### Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
Verify production compilation:
```bash
npm run build
npm run start
```

---

## ☁️ 5. Vercel Deployment Instructions

ScamShield AI is optimized for 1-click deployment on **Vercel**.

### Deploy via Vercel Web Dashboard:
1. Push your repository to **GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete ScamShield AI cybersecurity platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/scamshield-ai.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `scamshield-ai` repository.
4. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: *(Your Google AI Studio Gemini API key)*
5. Click **"Deploy"**. Vercel will build and deploy the Next.js application within ~60 seconds.

---

## 🔒 6. Security, Privacy & Safety Architecture

Because ScamShield AI is a cybersecurity tool, the platform is engineered to follow security best practices:
- **No Data Retention**: User-submitted messages and screenshots are analyzed ephemerally in-memory. No raw text is ever stored in remote databases.
- **Server-Side Secret Isolation**: The `GEMINI_API_KEY` is accessed strictly in server-side API routes (`/api/scan`) and is never leaked to client bundles.
- **Zero URL Execution**: URLs submitted for inspection are never pinged, visited, or executed.
- **Safe Payload Constraints**: Input length is strictly capped (15,000 characters) and image uploads restricted to standard formats under 10MB to prevent denial-of-service abuse.
- **Honest Disclosures**: Clearly differentiates between AI neural analysis and heuristic fallback analysis.

---

## 📞 7. Indian Cybercrime Resources

| Authority / Portal | Helpline / URL | Purpose |
|---|---|---|
| **National Cybercrime Helpline** | **1930** (24x7 Toll-Free) | Rapid financial fraud reporting to freeze stolen funds within the golden hour |
| **National Cyber Crime Reporting Portal** | [cybercrime.gov.in](https://cybercrime.gov.in) | Formal online police FIR registration |
| **Chakshu (Sanchar Saathi)** | [sancharsaathi.gov.in/sfc/](https://sancharsaathi.gov.in/sfc/) | Reporting fraudulent SMS, calling numbers & WhatsApp fraud |
| **RBI Integrated Ombudsman** | [cms.rbi.org.in](https://cms.rbi.org.in) | Escalating unauthorized banking & UPI transactions |

---

## ⚖️ 8. Disclaimer & Known Limitations

1. **Automated Risk Assessment**: ScamShield AI provides risk scoring based on known fraud heuristics and neural threat analysis. While highly effective, it cannot guarantee detection of every novel, zero-day, or sophisticated targeted attack.
2. **Not Legal or Financial Advice**: Users should always independently verify transactions directly with their official banking institutions before taking financial action.

---

## 🏆 Hackathon Submission Details

- **Event**: PromptWars X Code1 Innovators AI Vibe Coding Hackathon
- **Problem Statement**: **PS01: ScamShield – Suspicious Message Detection**
- **Brand Name**: **SCAMSHIELD AI**
- **Tagline**: *"Don't Trust. Verify. Stay Protected."*
- **License**: MIT
