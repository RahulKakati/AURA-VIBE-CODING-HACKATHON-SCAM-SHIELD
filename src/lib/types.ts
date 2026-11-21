export type RiskLevel = 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ThreatCategory =
  | 'Banking / KYC Fraud'
  | 'UPI / Payment Scam'
  | 'OTP / Credential Theft'
  | 'Fake Job / Task Scam'
  | 'Lottery / Prize Scam'
  | 'Phishing Link / Malicious URL'
  | 'Fake Govt Scheme'
  | 'Courier / Delivery Fraud'
  | 'Investment / Ponzi Scam'
  | 'Account Suspension Threat'
  | 'Electricity / Utility Disconnection'
  | 'Social Engineering'
  | 'Legitimate Communication'
  | 'Suspicious Message';

export type ScanInputType = 'message' | 'screenshot' | 'url';

export type AnalysisEngine = 'gemini-ai' | 'heuristic-fallback';

export interface UrlDetails {
  original_url: string;
  protocol?: string;
  domain?: string;
  is_ip?: boolean;
  suspicious_tld?: boolean;
  typosquatting_target?: string | null;
  brand_impersonated?: string | null;
  has_excessive_subdomains?: boolean;
  warning_flags: string[];
}

export interface ScanResult {
  risk_score: number;
  risk_level: RiskLevel;
  threat_category: ThreatCategory;
  summary: string;
  confidence: number;
  detected_signals: string[];
  suspicious_phrases: string[];
  explanation: string;
  recommendations: string[];
  things_to_avoid: string[];
  engine_used: AnalysisEngine;
  engine_model?: string;
  timestamp: string;
  target_text: string;
  input_type?: ScanInputType;
  url_details?: UrlDetails;
}

export interface ScanHistoryItem extends ScanResult {
  id: string;
}

export interface QuizQuestion {
  id: number;
  title: string;
  scenario: string;
  source: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  redFlags: string[];
  category: ThreatCategory;
}

export interface SampleScenario {
  id: string;
  title: string;
  category: ThreatCategory;
  risk_level: RiskLevel;
  type: 'message' | 'url';
  content: string;
  language: 'English' | 'Hindi' | 'Hinglish';
  description: string;
}
