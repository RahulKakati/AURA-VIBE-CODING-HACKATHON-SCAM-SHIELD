import { GoogleGenerativeAI } from '@google/generative-ai';
import { ScanResult, ThreatCategory, RiskLevel, ScanInputType } from './types';
import { runHeuristicAnalysis } from './heuristics';

const SYSTEM_PROMPT = `
You are SCAMSHIELD AI, an expert cybersecurity threat analyst specializing in fraudulent message detection, smishing, phishing URLs, and financial deception.
You possess deep expertise in online fraud prevalent in India and globally, including:
1. Bank Impersonation & KYC Suspension (SBI, HDFC, ICICI, YONO, PAN/Aadhaar threats).
2. UPI & Payment Scams (Deceptive requests to enter UPI PIN to receive money, fake cashback, PhonePe/GPay scratch card scams).
3. OTP / Credential Theft & SIM Swap phishing.
4. Part-Time Job / Telegram Task Scams (YouTube video likes, prepaid tasks, hotel reviews).
5. KBC / Lottery / Lucky Draw jackpots.
6. Electricity / Utility Disconnection extortion ("Power will be cut at 9:30 PM").
7. India Post / Courier delivery smishing (unpaid parcel, address update).
8. Government Scheme exploits (Pradhan Mantri loan, free laptop, free recharge).
9. Malicious APKs & Remote Desktop apps (AnyDesk, QuickSupport).
10. Multi-lingual messages in English, Hindi, and colloquial Hinglish (e.g. "Aapka account block ho gaya hai").

Instructions:
- Analyze the user-submitted message, screenshot text, or URL.
- Evaluate psychological manipulation: artificial urgency, fear tactics, greed bait, authority impersonation, or credential requests.
- Return ONLY a raw valid JSON object without markdown fences or extraneous text.

JSON Schema:
{
  "risk_score": <number between 0 and 100>,
  "risk_level": <"SAFE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL">,
  "threat_category": <"Banking / KYC Fraud" | "UPI / Payment Scam" | "OTP / Credential Theft" | "Fake Job / Task Scam" | "Lottery / Prize Scam" | "Phishing Link / Malicious URL" | "Fake Govt Scheme" | "Courier / Delivery Fraud" | "Investment / Ponzi Scam" | "Account Suspension Threat" | "Electricity / Utility Disconnection" | "Social Engineering" | "Legitimate Communication">,
  "summary": <concise 1-sentence assessment>,
  "confidence": <confidence percentage between 60 and 99>,
  "detected_signals": [<list of specific suspicious signals or red flags identified>],
  "suspicious_phrases": [<list of exact suspicious phrases or words found in the text>],
  "explanation": <detailed, professional cybersecurity explanation of how this threat operates or why it is benign>,
  "recommendations": [<step-by-step actionable safety actions the user should immediately take>],
  "things_to_avoid": [<strict list of actions the user must NEVER do with this message>]
}
`;

export async function analyzeWithGemini(
  content: string,
  inputType: ScanInputType = 'message'
): Promise<ScanResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  // If no API key configured, seamlessly use the robust Heuristic Rule Engine
  if (!apiKey) {
    const heuristicResult = runHeuristicAnalysis(content, inputType);
    heuristicResult.engine_used = 'heuristic-fallback';
    heuristicResult.engine_model = 'ScamShield Heuristic Rule Engine (API Key Not Configured)';
    return heuristicResult;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash for speed and reliability, with fallback capability
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    });

    const userPrompt = `
Input Type: ${inputType.toUpperCase()}
Content to Analyze:
"""
${content}
"""

Perform deep cybersecurity threat analysis. Output only valid JSON.
`;

    // Timeout safety of 12 seconds
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API request timed out')), 12000)
    );

    const apiPromise = model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: userPrompt }
    ]);

    const result = await Promise.race([apiPromise, timeoutPromise]);
    const responseText = result.response.text();

    // Clean JSON if fences slipped through
    const cleanedJson = responseText
      .replace(/^```json\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleanedJson);

    // Validate and normalize fields
    const validLevels: RiskLevel[] = ['SAFE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const riskLevel: RiskLevel = validLevels.includes(parsed.risk_level) ? parsed.risk_level : 'MEDIUM';

    // Also run heuristic to combine URL signals if needed
    const heuristicCheck = runHeuristicAnalysis(content, inputType);

    return {
      risk_score: Math.min(100, Math.max(0, Number(parsed.risk_score) || 50)),
      risk_level: riskLevel,
      threat_category: (parsed.threat_category as ThreatCategory) || 'Suspicious Message',
      summary: parsed.summary || 'Security assessment completed.',
      confidence: Math.min(99, Math.max(50, Number(parsed.confidence) || 85)),
      detected_signals: Array.isArray(parsed.detected_signals) && parsed.detected_signals.length > 0
        ? parsed.detected_signals
        : heuristicCheck.detected_signals,
      suspicious_phrases: Array.isArray(parsed.suspicious_phrases) ? parsed.suspicious_phrases : [],
      explanation: parsed.explanation || heuristicCheck.explanation,
      recommendations: Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0
        ? parsed.recommendations
        : heuristicCheck.recommendations,
      things_to_avoid: Array.isArray(parsed.things_to_avoid) && parsed.things_to_avoid.length > 0
        ? parsed.things_to_avoid
        : heuristicCheck.things_to_avoid,
      engine_used: 'gemini-ai',
      engine_model: 'Google Gemini 1.5 Flash (AI Threat Model)',
      timestamp: new Date().toISOString(),
      target_text: content,
      input_type: inputType,
      url_details: heuristicCheck.url_details,
    };
  } catch (error) {
    // If Gemini fails (rate limit, offline, quota, timeout), safely fall back to the Heuristic Rule Engine
    console.warn('Gemini API call failed or timed out. Falling back to Heuristic Engine:', error instanceof Error ? error.message : error);
    const fallbackResult = runHeuristicAnalysis(content, inputType);
    fallbackResult.engine_used = 'heuristic-fallback';
    fallbackResult.engine_model = 'ScamShield Heuristic Rule Engine (Fallback Active: Gemini Service Unavailable)';
    return fallbackResult;
  }
}
