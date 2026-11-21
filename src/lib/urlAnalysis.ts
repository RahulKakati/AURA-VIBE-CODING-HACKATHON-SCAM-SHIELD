import { UrlDetails } from './types';

// High-risk TLDs commonly used by phishing and scam operations
const SUSPICIOUS_TLDS = new Set([
  'xyz', 'top', 'tk', 'ml', 'ga', 'cf', 'gq', 'work', 'click', 'buzz',
  'club', 'surf', 'monster', 'link', 'live', 'support', 'cam', 'vip',
  'icu', 'fit', 'rest', 'stream', 'kim', 'loan', 'racing', 'win', 'download',
  'accountant', 'date', 'faith', 'party', 'trade', 'bid'
]);

// Known URL shorteners that obscure real destinations
const SHORTENER_DOMAINS = new Set([
  'bit.ly', 'tinyurl.com', 't.co', 'is.gd', 'cutt.ly', 'rb.gy',
  'shorturl.at', 'goo.gl', 'ow.ly', 'buff.ly', 'tiny.cc', 'bl.ink'
]);

// Legitimate official domains for major Indian and global brands
const PROTECTED_BRANDS: Record<string, { officialDomain: string; keywords: string[] }> = {
  sbi: { officialDomain: 'onlinesbi.sbi', keywords: ['sbi', 'onlinesbi', 'statebank'] },
  hdfc: { officialDomain: 'hdfcbank.com', keywords: ['hdfc', 'hdfcbank'] },
  icici: { officialDomain: 'icicibank.com', keywords: ['icici', 'icicibank'] },
  axis: { officialDomain: 'axisbank.com', keywords: ['axisbank', 'axisb'] },
  pnb: { officialDomain: 'pnbindia.in', keywords: ['pnb', 'pnbindia'] },
  paytm: { officialDomain: 'paytm.com', keywords: ['paytm', 'paytmbank'] },
  phonepe: { officialDomain: 'phonepe.com', keywords: ['phonepe'] },
  googlepay: { officialDomain: 'pay.google.com', keywords: ['gpay', 'googlepay'] },
  indiapost: { officialDomain: 'indiapost.gov.in', keywords: ['indiapost', 'postoffice'] },
  incometax: { officialDomain: 'incometax.gov.in', keywords: ['incometax', 'efiling'] },
  uidai: { officialDomain: 'uidai.gov.in', keywords: ['uidai', 'myaadhaar', 'aadhaar'] },
  amazon: { officialDomain: 'amazon.in', keywords: ['amazon', 'amazonpay'] },
  flipkart: { officialDomain: 'flipkart.com', keywords: ['flipkart'] },
  netflix: { officialDomain: 'netflix.com', keywords: ['netflix'] },
};

export function analyzeUrlSafety(rawInput: string): UrlDetails {
  let cleaned = rawInput.trim();
  // Ensure protocol for proper parsing
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = 'http://' + cleaned;
  }

  const flags: string[] = [];
  let isIp = false;
  let suspiciousTld = false;
  let typosquattingTarget: string | null = null;
  let brandImpersonated: string | null = null;
  let hasExcessiveSubdomains = false;
  let hostname = '';
  let protocol = 'http';

  try {
    const parsed = new URL(cleaned);
    protocol = parsed.protocol.replace(':', '').toLowerCase();
    hostname = parsed.hostname.toLowerCase();
    const pathname = parsed.pathname.toLowerCase();

    // 1. Insecure protocol check
    if (protocol === 'http') {
      flags.push('Unencrypted HTTP protocol used; legitimate banks and financial portals mandate HTTPS.');
    }

    // 2. IP address check (e.g. http://192.168.1.1 or http://45.33.32.156)
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipv4Regex.test(hostname)) {
      isIp = true;
      flags.push(`Direct IP address host detected (${hostname}). Legitimate organizations never route customers to raw IP addresses.`);
    }

    // 3. Suspicious TLD check
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      const tld = parts[parts.length - 1];
      if (SUSPICIOUS_TLDS.has(tld)) {
        suspiciousTld = true;
        flags.push(`High-risk Top-Level Domain (.${tld}) frequently associated with phishing and disposable scam websites.`);
      }
    }

    // 4. URL shortener check
    if (SHORTENER_DOMAINS.has(hostname) || SHORTENER_DOMAINS.has(hostname.replace(/^www\./, ''))) {
      flags.push('URL shortener detected. The actual destination is intentionally concealed.');
    }

    // 5. Excessive subdomains check (Subdomain Spoofing)
    if (parts.length > 3 && !isIp) {
      hasExcessiveSubdomains = true;
      flags.push(`Excessive subdomain levels (${parts.length - 2} subdomains). Phishers often prefix trusted names like 'sbi.bank.login-portal' on rogue domains.`);
    }

    // 6. Brand Impersonation / Typosquatting Analysis
    const baseHostWithoutWww = hostname.replace(/^www\./, '');
    for (const [brandKey, brandInfo] of Object.entries(PROTECTED_BRANDS)) {
      const matchedKeyword = brandInfo.keywords.find(k => baseHostWithoutWww.includes(k));
      if (matchedKeyword) {
        // If it includes the keyword but the real registered domain is not the official one
        const isOfficial = baseHostWithoutWww === brandInfo.officialDomain ||
          baseHostWithoutWww.endsWith('.' + brandInfo.officialDomain);

        if (!isOfficial) {
          brandImpersonated = brandKey.toUpperCase();
          typosquattingTarget = brandInfo.officialDomain;
          flags.push(`Deceptive Brand Impersonation: Domain contains '${matchedKeyword}' but is NOT the verified official site (${brandInfo.officialDomain}).`);
          break;
        }
      }
    }

    // 7. Suspicious Path & Keyword Triggers
    const scamPathKeywords = [
      'kyc', 'update', 'verify', 'pan', 'aadhaar', 'claim', 'bonus',
      'reward', 'cashback', 'apk', 'download', 'otp', 'login', 'blocked'
    ];
    for (const kw of scamPathKeywords) {
      if (pathname.includes(kw)) {
        flags.push(`Suspicious URL path contains sensitive credential/trigger keyword: '/${kw}'`);
        break;
      }
    }

    // 8. Look for deceptive @ symbol in URL (HTTP Basic Auth trick)
    if (cleaned.includes('@')) {
      flags.push('Suspicious "@" symbol in URL. This is a classic browser trick to mislead users regarding the actual host.');
    }

    // 9. APK / executable download attempt
    if (pathname.endsWith('.apk') || pathname.endsWith('.exe') || pathname.endsWith('.scr')) {
      flags.push('URL directly links to an executable Android package (.apk) or binary installer. High threat of trojan/spyware.');
    }

  } catch {
    flags.push('Malformed or invalid URL structure provided.');
  }

  return {
    original_url: rawInput,
    protocol,
    domain: hostname,
    is_ip: isIp,
    suspicious_tld: suspiciousTld,
    typosquatting_target: typosquattingTarget,
    brand_impersonated: brandImpersonated,
    has_excessive_subdomains: hasExcessiveSubdomains,
    warning_flags: flags,
  };
}
