import { ScanResult, ThreatCategory, RiskLevel, UrlDetails } from './types';
import { analyzeUrlSafety } from './urlAnalysis';

interface ThreatPattern {
  id: string;
  category: ThreatCategory;
  weight: number;
  regex: RegExp;
  label: string;
  highlightWords: string[];
}

const THREAT_PATTERNS: ThreatPattern[] = [
  // 1. BANKING & KYC IMPERSONATION
  {
    id: 'kyc_pan_urgency',
    category: 'Banking / KYC Fraud',
    weight: 35,
    regex: /(kyc\s*(update|verify|expired|suspended|mandate)|pan\s*(card)?\s*(link|update|blocked)|aadhar\s*(update|link)|yono\s*(account|app)?\s*(blocked|suspended))/i,
    label: 'Demands urgent KYC or PAN/Aadhaar document verification under threat of blockage',
    highlightWords: ['KYC update', 'PAN card', 'Aadhaar link', 'YONO', 'KYC expired', 'account suspended']
  },
  {
    id: 'account_deactivation_threat',
    category: 'Account Suspension Threat',
    weight: 30,
    regex: /(account\s*(will\s*be)?\s*(blocked|deactivated|suspended|closed)\s*(today|within\s*\d+\s*(hours?|mins?))|immediate\s*action\s*required|prevent\s*(blocking|suspension))/i,
    label: 'Artificial urgency coercing action to prevent immediate account suspension',
    highlightWords: ['blocked today', 'account suspended', 'deactivated within', 'immediate action required']
  },
  {
    id: 'hinglish_kyc',
    category: 'Banking / KYC Fraud',
    weight: 35,
    regex: /(aapka\s*(sbi|hdfc|bank|yono)?\s*account\s*(block|band|suspend)\s*ho\s*(gaya|jayega)|turant\s*kyc\s*(karein|update)|niche\s*diye\s*link\s*pe\s*click)/i,
    label: 'Hinglish social engineering demanding immediate bank account unblocking',
    highlightWords: ['account block ho gaya', 'turant kyc', 'link pe click']
  },

  // 2. UPI & PAYMENT SCAMS
  {
    id: 'upi_pin_receive_trap',
    category: 'UPI / Payment Scam',
    weight: 45,
    regex: /(enter\s*(your)?\s*upi\s*pin\s*to\s*(receive|credit|claim|get)|upi\s*pin\s*darj\s*karein|pin\s*daal\s*kar\s*(paise|cashback)\s*payein|send\s*rs\.?\s*\d+\s*to\s*receive)/i,
    label: 'CRITICAL FRAUD SIGNATURE: Deceptive request to enter UPI PIN to receive money',
    highlightWords: ['enter upi pin to receive', 'upi pin darj karein', 'pin daal kar cashback']
  },
  {
    id: 'fake_cashback_reward',
    category: 'UPI / Payment Scam',
    weight: 30,
    regex: /(cashback\s*of\s*rs\.?\s*\d+|won\s*(scratch\s*card|reward|cashback)\s*in\s*(phonepe|paytm|gpay|google\s*pay)|claim\s*your\s*reward\s*now)/i,
    label: 'Unsolicited UPI cashback or scratch card reward bait',
    highlightWords: ['won scratch card', 'cashback of Rs', 'claim your reward']
  },

  // 3. OTP & CREDENTIAL THEFT
  {
    id: 'otp_harvesting',
    category: 'OTP / Credential Theft',
    weight: 40,
    regex: /(share\s*(your)?\s*(one\s*time\s*password|otp)|send\s*the\s*6\s*digit\s*code|forward\s*the\s*sms|tell\s*(me|us)\s*the\s*verification\s*code)/i,
    label: 'Direct solicitation of confidential One-Time Password (OTP) or verification codes',
    highlightWords: ['share your otp', 'send the 6 digit code', 'forward the sms']
  },

  // 4. FAKE WORK FROM HOME / TASK SCAM
  {
    id: 'wfh_telegram_task',
    category: 'Fake Job / Task Scam',
    weight: 35,
    regex: /(work\s*from\s*home|part\s*time\s*job|daily\s*(income|earning)\s*rs\.?\s*\d+[-–]\d+|like\s*(youtube|insta(gram)?)\s*videos?\s*and\s*earn|telegram\s*(task|group|hr|contact)|hotel\s*review\s*job)/i,
    label: 'Predatory Part-Time Telegram Task / YouTube Like scam targeting job seekers',
    highlightWords: ['work from home', 'daily income Rs', 'like youtube videos and earn', 'telegram task']
  },
  {
    id: 'hinglish_job_scam',
    category: 'Fake Job / Task Scam',
    weight: 30,
    regex: /(ghar\s*baithe\s*(paise\s*)?kamayein|roj\s*\d+\s*se\s*\d+\s*rupaye|sirf\s*video\s*like\s*karein)/i,
    label: 'Hinglish work-from-home lure offering unrealistic daily earnings',
    highlightWords: ['ghar baithe kamayein', 'roj rupaye', 'video like karein']
  },

  // 5. LOTTERY & KBC PRIZES
  {
    id: 'kbc_lottery_fraud',
    category: 'Lottery / Prize Scam',
    weight: 40,
    regex: /(kbc\s*(sim\s*card)?\s*lottery|kaun\s*banega\s*crorepati\s*winner|congratulations\s*you\s*have\s*won\s*(rs\.?\s*\d+\s*(lakh|crore)|\$\d+)|lucky\s*draw\s*winner)/i,
    label: 'Fictitious lottery jackpot impersonating popular brands (KBC, MegaDraw)',
    highlightWords: ['KBC lottery', 'won Rs 25 lakh', 'lucky draw winner', 'Kaun Banega Crorepati']
  },

  // 6. ELECTRICITY / UTILITY DISCONNECTION
  {
    id: 'bijli_power_cut_scam',
    category: 'Electricity / Utility Disconnection',
    weight: 40,
    regex: /(electricity\s*(power|bill|connection)\s*(will\s*be)?\s*disconnect(ed)?\s*tonight|bijli\s*(ka\s*)?connection\s*(kat|disconnect)\s*diya\s*jayega|contact\s*electricity\s*officer\s*\d{10})/i,
    label: 'High-threat utility extortion threatening immediate electricity disconnection',
    highlightWords: ['electricity power disconnected', 'bijli connection', 'contact electricity officer']
  },

  // 7. COURIER & DELIVERY TRAPS
  {
    id: 'india_post_delivery_trap',
    category: 'Courier / Delivery Fraud',
    weight: 35,
    regex: /(india\s*post|blue\s*dart|delhivery|fedex|dtdc)\s*(package|parcel|shipment)\s*(cannot\s*be\s*delivered|on\s*hold|wrong\s*address|update\s*address\s*within)/i,
    label: 'Smishing attack impersonating postal/courier services to steal card details',
    highlightWords: ['India Post package', 'parcel on hold', 'wrong address', 'update address within']
  },

  // 8. FAKE GOVERNMENT SCHEMES
  {
    id: 'fake_pm_yojana',
    category: 'Fake Govt Scheme',
    weight: 35,
    regex: /(pradhan\s*mantri|pm\s*(kisan|yojana|mudra|awas|free\s*recharge|laptop|solar)|free\s*recharge\s*offer\s*from\s*government|modi\s*sarkar\s*free)/i,
    label: 'Deceptive exploit leveraging government subsidy or free handout promises',
    highlightWords: ['Pradhan Mantri', 'free recharge offer', 'PM yojana', 'mudra loan']
  },

  // 9. HIGH RISK EXECUTABLE DOWNLOAD / REMOTE ACCESS
  {
    id: 'apk_remote_access',
    category: 'Social Engineering',
    weight: 45,
    regex: /(install|download)\s*(this)?\s*(\.apk|anydesk|teamviewer|rustdesk|quicksupport)|support\s*app\s*download/i,
    label: 'CRITICAL HAZARD: Directing victim to install remote desktop tool or rogue APK',
    highlightWords: ['download .apk', 'install anydesk', 'teamviewer', 'quicksupport']
  },

  // 10. SUSPICIOUS SHORT LINKS IN SMS
  {
    id: 'suspicious_link_shortener',
    category: 'Phishing Link / Malicious URL',
    weight: 20,
    regex: /(https?:\/\/(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|rb\.gy|shorturl\.at|ngrok|duckdns)[\w/-]*)/i,
    label: 'Opaque shortened hyperlink obscuring actual domain host',
    highlightWords: ['bit.ly', 'tinyurl', 't.co', 'cutt.ly', 'is.gd']
  }
];

// Legitimate communication indicators (anti-false positive mitigating factors)
const LEGITIMATE_PATTERNS = [
  {
    regex: /(never\s*share\s*(your)?\s*(otp|password|pin)|bank\s*never\s*asks\s*for\s*otp)/i,
    mitigation: 25,
    label: 'Contains standard bank security advice warning user to never share OTP'
  },
  {
    regex: /(otp\s*for\s*txn\s*of\s*inr|valid\s*for\s*\d+\s*(mins?|minutes?)|do\s*not\s*share\s*with\s*anyone)/i,
    mitigation: 20,
    label: 'Standard RBI compliant transaction OTP template with protective disclaimers'
  },
  {
    regex: /(delivered\s*by\s*our\s*delivery\s*executive|track\s*your\s*order\s*on\s*(amazon|flipkart)\s*app)/i,
    mitigation: 20,
    label: 'Typical genuine e-commerce shipment notification'
  }
];

export function runHeuristicAnalysis(text: string, inputType: 'message' | 'screenshot' | 'url' = 'message'): ScanResult {
  const content = text.trim();
  let baseScore = 5;
  const detectedSignals: string[] = [];
  const suspiciousPhrases: Set<string> = new Set();
  const categoryCounts: Record<string, number> = {};

  // Extract URLs present in the text
  const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s]*)/gi;
  const matchedUrls = content.match(urlRegex) || [];

  let primaryUrlDetails: UrlDetails | undefined = undefined;

  // If input type is URL or contains URLs, evaluate them
  if (inputType === 'url' || matchedUrls.length > 0) {
    const targetUrl = (inputType === 'url' ? content : matchedUrls[0]) || content;
    const urlAnalysis = analyzeUrlSafety(targetUrl);
    primaryUrlDetails = urlAnalysis;

    if (urlAnalysis.warning_flags.length > 0) {
      for (const flag of urlAnalysis.warning_flags) {
        detectedSignals.push(`[URL Warning] ${flag}`);
      }
      baseScore += urlAnalysis.warning_flags.length * 15;
    }

    if (urlAnalysis.is_ip) baseScore += 30;
    if (urlAnalysis.suspicious_tld) baseScore += 25;
    if (urlAnalysis.brand_impersonated) {
      baseScore += 35;
      suspiciousPhrases.add(urlAnalysis.domain || targetUrl);
    }
  }

  // Evaluate Threat Patterns
  for (const pattern of THREAT_PATTERNS) {
    if (pattern.regex.test(content)) {
      baseScore += pattern.weight;
      detectedSignals.push(pattern.label);
      categoryCounts[pattern.category] = (categoryCounts[pattern.category] || 0) + pattern.weight;

      // Extract matching words for UI highlighting
      for (const word of pattern.highlightWords) {
        if (new RegExp(word, 'i').test(content)) {
          suspiciousPhrases.add(word);
        }
      }
    }
  }

  // Mitigating factors for legitimate messages
  for (const legit of LEGITIMATE_PATTERNS) {
    if (legit.regex.test(content)) {
      baseScore -= legit.mitigation;
      detectedSignals.push(`[Protective Signal] ${legit.label}`);
    }
  }

  // Clamp risk score strictly between 0 and 99 (or 100 for verified malicious)
  let riskScore = Math.max(0, Math.min(99, Math.round(baseScore)));

  // If critical signals triggered (UPI PIN receive trap, Remote APK, etc.), lock score to critical 90+
  if (detectedSignals.some(s => s.includes('CRITICAL FRAUD SIGNATURE') || s.includes('CRITICAL HAZARD'))) {
    riskScore = Math.max(92, riskScore);
  }

  // Determine Primary Threat Category
  let primaryCategory: ThreatCategory = 'Suspicious Message';
  let maxWeight = 0;
  for (const [cat, weight] of Object.entries(categoryCounts)) {
    if (weight > maxWeight) {
      maxWeight = weight;
      primaryCategory = cat as ThreatCategory;
    }
  }

  // Determine Risk Level
  let riskLevel: RiskLevel = 'SAFE';
  if (riskScore >= 85) {
    riskLevel = 'CRITICAL';
  } else if (riskScore >= 65) {
    riskLevel = 'HIGH';
  } else if (riskScore >= 35) {
    riskLevel = 'MEDIUM';
  } else if (riskScore >= 18) {
    riskLevel = 'LOW';
  } else {
    riskLevel = 'SAFE';
    if (primaryCategory === 'Suspicious Message') {
      primaryCategory = 'Legitimate Communication';
    }
  }

  // Compile Recommendations & Things to Avoid based on category and severity
  const recommendations: string[] = [];
  const thingsToAvoid: string[] = [];

  if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
    recommendations.push('Do NOT click any hyperlinks or phone numbers in the message.');
    recommendations.push('Block and report the sender on your messaging app or carrier.');

    if (primaryCategory === 'Banking / KYC Fraud' || primaryCategory === 'Account Suspension Threat') {
      recommendations.push('Verify your bank account status only through your official bank mobile app or net-banking portal.');
      recommendations.push('Call the official bank customer care number printed on the back of your debit card.');
      thingsToAvoid.push('Never enter your PAN, Aadhaar, debit card number, or CVV on third-party links.');
      thingsToAvoid.push('Never forward verification SMS or OTPs to any executive.');
    } else if (primaryCategory === 'UPI / Payment Scam') {
      recommendations.push('Remember the Golden Rule of UPI: You NEVER need to enter a UPI PIN to receive or claim money.');
      recommendations.push('Immediately report the UPI ID to NPCI / your payment app (Google Pay, PhonePe, Paytm).');
      thingsToAvoid.push('Never enter your 4-digit or 6-digit UPI PIN when someone claims they are sending you money.');
      thingsToAvoid.push('Never scan QR codes sent over WhatsApp/Telegram to receive payments.');
    } else if (primaryCategory === 'Fake Job / Task Scam') {
      recommendations.push('Disregard offers promising thousands of rupees per day for liking videos or rating hotels.');
      recommendations.push('Report the recruiter Telegram/WhatsApp account immediately.');
      thingsToAvoid.push('Never pay any "security deposit", "registration fee", or "crypto tax" to withdraw earned commissions.');
    } else if (primaryCategory === 'Electricity / Utility Disconnection') {
      recommendations.push('Check your latest power bill statement on your state electricity board official web portal.');
      thingsToAvoid.push('Never call the personal 10-digit mobile number provided in the disconnection SMS.');
      thingsToAvoid.push('Never install remote support software (AnyDesk, TeamViewer) at the caller’s request.');
    } else if (primaryCategory === 'Courier / Delivery Fraud') {
      recommendations.push('Track parcels exclusively on the official courier portal using your original tracking number.');
      thingsToAvoid.push('Never pay nominal ₹5 or ₹10 "address update" fees on unverified external links.');
    }

    recommendations.push('Report the cyber incident immediately on the National Cyber Crime Reporting Portal (cybercrime.gov.in) or call 1930.');
  } else if (riskLevel === 'MEDIUM') {
    recommendations.push('Exercise caution. Validate the sender identity through a verified independent channel before taking action.');
    recommendations.push('Inspect any accompanying links carefully for misleading domain spellings.');
    thingsToAvoid.push('Do not share sensitive identity or financial information.');
    thingsToAvoid.push('Do not act impulsively under claimed time-sensitive threats.');
  } else {
    recommendations.push('The message exhibits normal structural characteristics of legitimate notifications.');
    recommendations.push('Always practice zero-trust: double-check transaction amounts and beneficiary details.');
    thingsToAvoid.push('Even with legitimate messages, never share OTPs with callers claiming to represent the bank.');
  }

  // Construct comprehensive human-readable explanation
  let explanation = '';
  if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
    explanation = `High-probability fraudulent communication detected. The message employs psychological coercion (${detectedSignals.slice(0, 2).join(', ')}) to compromise credentials or illicitly trigger financial debits. Legitimate organizations in India never mandate credential disclosures via unsolicited SMS or unofficial messaging apps.`;
  } else if (riskLevel === 'MEDIUM') {
    explanation = `Potential risk factors identified. The message exhibits patterns such as suspicious link forwarding, non-standard contact details, or emotional urgency. Proceed with heightened scrutiny.`;
  } else {
    explanation = `The analyzed content appears to be benign or standard informational correspondence. No aggressive phishing signatures, credential harvest traps, or predatory financial deception patterns were identified.`;
  }

  const summary = riskLevel === 'CRITICAL'
    ? `CRITICAL RISK: Highly Dangerous ${primaryCategory} Detected`
    : riskLevel === 'HIGH'
    ? `HIGH RISK: Suspected ${primaryCategory}`
    : riskLevel === 'MEDIUM'
    ? `MEDIUM RISK: Potential Warning Signs Found`
    : `LOW RISK: Content Appears Safe`;

  return {
    risk_score: riskScore,
    risk_level: riskLevel,
    threat_category: primaryCategory,
    summary,
    confidence: detectedSignals.length > 0 ? Math.min(95, 70 + detectedSignals.length * 6) : 80,
    detected_signals: detectedSignals.length > 0 ? detectedSignals : ['No active scam signatures found.'],
    suspicious_phrases: Array.from(suspiciousPhrases),
    explanation,
    recommendations,
    things_to_avoid: thingsToAvoid,
    engine_used: 'heuristic-fallback',
    engine_model: 'ScamShield Heuristic Rule Engine v1.0',
    timestamp: new Date().toISOString(),
    target_text: content,
    input_type: inputType,
    url_details: primaryUrlDetails,
  };
}
