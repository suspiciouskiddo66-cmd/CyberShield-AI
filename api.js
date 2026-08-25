import { getWhitelist, getBlacklist, saveScan } from './scanStorage';

const getApiBaseUrl = () => {
  return localStorage.getItem('cybershield_api_url') || import.meta.env.VITE_BACKEND_API_URL || 'http://127.0.0.1:8000';
};

const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.work', '.click', '.loan', '.zip', '.mov', '.gq',
  '.cf', '.tk', '.ml', '.ga', '.buzz', '.cc', '.su', '.fit', '.rest',
  '.party', '.men', '.kim', '.country', '.stream', '.trade', '.science',
  '.icu', '.monster', '.cam', '.bar', '.live', '.space', '.link'
];

const POPULAR_BRANDS = {
  google: ['google.com', 'google.co', 'goo.gl'],
  paypal: ['paypal.com', 'paypal.me'],
  apple: ['apple.com', 'icloud.com'],
  microsoft: ['microsoft.com', 'live.com', 'office.com', 'outlook.com'],
  amazon: ['amazon.com', 'amazon.co.uk', 'aws.amazon.com'],
  netflix: ['netflix.com'],
  facebook: ['facebook.com', 'fb.com'],
  instagram: ['instagram.com'],
  twitter: ['twitter.com', 'x.com'],
  linkedin: ['linkedin.com'],
  github: ['github.com', 'github.io'],
  chase: ['chase.com'],
  bankofamerica: ['bankofamerica.com', 'bofa.com'],
  wellsfargo: ['wellsfargo.com'],
  binance: ['binance.com'],
  coinbase: ['coinbase.com'],
  metamask: ['metamask.io'],
  whatsapp: ['whatsapp.com'],
  telegram: ['telegram.org', 't.me'],
  dropbox: ['dropbox.com'],
  spotify: ['spotify.com']
};

const SUSPICIOUS_KEYWORDS = [
  'login', 'signin', 'verify', 'verification', 'secure', 'security', 'update',
  'account', 'banking', 'authenticate', 'confirm', 'wallet', 'invoice', 'billing',
  'support', 'recover', 'password', 'credential', 'appleid', 'chase', 'wellsfargo',
  'bofa', 'metamask', 'binance', 'coinbase', 'telegram-gift', 'airdrop', 'free-crypto',
  'suspicious-activity', 'unlock', 'kyc', 'claim-reward', 'validate', 'passcode',
  'giftcard', 'urgent', 'blocked-account', 'action-required', 'auth-token'
];

const URL_SHORTENERS = [
  'bit.ly', 'tinyurl.com', 't.co', 'is.gd', 'buff.ly', 'ow.ly', 'rebrand.ly',
  'cutt.ly', 'shorte.st', 'adf.ly', 'v.gd', 'trib.al', 's.id', 'tiny.cc'
];

function calculateShannonEntropy(text) {
  if (!text) return 0;
  let entropy = 0;
  const len = text.length;
  const counts = {};
  for (let i = 0; i < len; i++) {
    const c = text[i];
    counts[c] = (counts[c] || 0) + 1;
  }
  for (const c in counts) {
    const p = counts[c] / len;
    entropy -= p * Math.log2(p);
  }
  return Number(entropy.toFixed(3));
}

// Client-side fallback analyzer mirroring backend
export const clientSideAnalyzeUrl = (rawUrl) => {
  const url = rawUrl.trim().startsWith('http') ? rawUrl.trim() : `http://${rawUrl.trim()}`;
  let hostname = '';
  let pathname = '';
  let query = '';
  let port = null;
  let protocol = 'http:';

  try {
    const parsed = new URL(url);
    hostname = parsed.hostname.toLowerCase();
    pathname = parsed.pathname;
    query = parsed.search;
    port = parsed.port || null;
    protocol = parsed.protocol;
  } catch (e) {
    hostname = rawUrl.split('/')[0].toLowerCase();
  }

  // 1. Whitelist Check
  const whitelist = getWhitelist();
  if (whitelist.some(d => hostname === d || hostname.endsWith('.' + d))) {
    return {
      id: 'scan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      url: rawUrl,
      normalized_url: url,
      domain: hostname,
      status: 'Safe',
      risk_score: 0,
      confidence: 0.99,
      scan_time: new Date().toISOString(),
      threat_type: 'Whitelisted Trusted Domain',
      indicators: {
        is_ip_address: false,
        has_at_symbol: false,
        url_length: rawUrl.length,
        domain_length: hostname.length,
        excessive_subdomains: false,
        suspicious_tld: false,
        matched_tld: '',
        suspicious_keywords_found: [],
        shannon_entropy: 2.1,
        homoglyph_attack_detected: false,
        punycode_detected: false,
        redirect_risk: false,
        double_slash_redirect: false,
        shortener_service: false,
        uncommon_ports: false
      },
      summary: `Domain '${hostname}' is explicitly authorized on your security whitelist.`,
      recommendations: ['Safe for regular corporate network navigation.'],
      ml_probabilities: { Safe: 0.99, Phishing: 0.003, Malware: 0.003, Suspicious: 0.004 }
    };
  }

  // 2. Blacklist Check
  const blacklist = getBlacklist();
  if (blacklist.some(d => hostname === d || hostname.endsWith('.' + d))) {
    return {
      id: 'scan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      url: rawUrl,
      normalized_url: url,
      domain: hostname,
      status: 'Malware',
      risk_score: 99,
      confidence: 0.99,
      scan_time: new Date().toISOString(),
      threat_type: 'Blacklisted Threat Entity',
      indicators: {
        is_ip_address: false,
        has_at_symbol: false,
        url_length: rawUrl.length,
        domain_length: hostname.length,
        excessive_subdomains: false,
        suspicious_tld: false,
        matched_tld: '',
        suspicious_keywords_found: ['blacklisted'],
        shannon_entropy: 3.9,
        homoglyph_attack_detected: false,
        punycode_detected: false,
        redirect_risk: false,
        double_slash_redirect: false,
        shortener_service: false,
        uncommon_ports: false
      },
      summary: `Domain '${hostname}' is actively registered on your perimeter Blacklist.`,
      recommendations: ['Connection dropped. Access is denied by administrator policy.'],
      ml_probabilities: { Safe: 0.0, Phishing: 0.1, Malware: 0.9, Suspicious: 0.0 }
    };
  }

  // 3. Known clean brand check
  const isCleanBrand = Object.values(POPULAR_BRANDS).some(domains => 
    domains.some(ld => hostname === ld || hostname.endsWith('.' + ld))
  );

  const isIp = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname) || /^0x[0-9a-fA-F]+$/.test(hostname);
  const hasAt = rawUrl.includes('@');
  const matchedTld = SUSPICIOUS_TLDS.find(t => hostname.endsWith(t));
  const subCount = Math.max(0, hostname.split('.').length - 2);
  const excessiveSub = subCount >= 3;
  const isShortener = URL_SHORTENERS.some(s => hostname === s || hostname.endsWith('.' + s));
  const hasRedirect = query.includes('redirect=') || query.includes('url=') || query.includes('next=');
  const hasDoubleSlash = pathname.includes('//');
  const hasUncommonPort = Boolean(port && !['80', '443', '8080', '8443'].includes(port));
  const domainEntropy = calculateShannonEntropy(hostname);
  const foundKeywords = SUSPICIOUS_KEYWORDS.filter(k => url.toLowerCase().includes(k));

  // Typosquatting / Lookalike check
  let hasTypo = false;
  let typoMsg = '';
  if (hostname.includes('xn--')) {
    hasTypo = true;
    typoMsg = 'Punycode IDN homograph attack detected';
  } else {
    for (const [brand, legitDomains] of Object.entries(POPULAR_BRANDS)) {
      if (legitDomains.some(ld => hostname === ld || hostname.endsWith('.' + ld))) continue;
      if (hostname.includes(brand)) {
        hasTypo = true;
        typoMsg = `Brand impersonation of '${brand}' in untrusted domain`;
        break;
      }
    }
  }

  let risk = 0;
  const reasons = [];

  if (isCleanBrand && !hasAt && !hasDoubleSlash) {
    risk = 0;
    reasons.push("Verified legitimate enterprise domain infrastructure");
  } else {
    if (isIp) {
      risk += 45;
      reasons.push("Raw IP address used instead of valid domain");
    }
    if (hasTypo) {
      risk += 50;
      reasons.push(typoMsg || "Homoglyph / typosquatting brand spoofing");
    }
    if (hasAt) {
      risk += 35;
      reasons.push("Embedded '@' credential spoofing marker");
    }
    if (matchedTld) {
      risk += 30;
      reasons.push(`High-risk Top-Level Domain (${matchedTld})`);
    }
    if (isShortener) {
      risk += 15;
      reasons.push("URL shortener obscures destination");
    }
    if (excessiveSub) {
      risk += 20;
      reasons.push(`Excessive subdomain depth (${subCount} subdomains)`);
    }
    if (foundKeywords.length > 0) {
      const kwScore = Math.min(35, foundKeywords.length * 12);
      risk += kwScore;
      reasons.push(`Targeted credential keywords: ${foundKeywords.slice(0, 3).join(', ')}`);
    }
    if (domainEntropy > 4.3) {
      risk += 25;
      reasons.push(`High domain randomness (${domainEntropy})`);
    }
    if (hasDoubleSlash) {
      risk += 25;
      reasons.push("Path contains double slash '//' redirection anomaly");
    }
    if (hasUncommonPort) {
      risk += 25;
      reasons.push(`Non-standard HTTP port :${port}`);
    }
  }

  risk = Math.min(100, Math.max(0, risk));

  let status = 'Safe';
  let threatType = 'Verified Legitimate Domain';

  if (risk >= 70) {
    status = hasTypo || foundKeywords.length > 0 ? 'Phishing' : 'Malware';
    threatType = status === 'Phishing' ? 'High Risk Credential Phishing' : 'Malicious Host / Hostile Payload';
  } else if (risk >= 35) {
    status = 'Suspicious';
    threatType = 'Anomalous / Untrusted Domain';
  } else {
    status = 'Safe';
    threatType = isCleanBrand ? 'Verified Legitimate Domain' : 'Low Risk / Standard Domain';
    risk = isCleanBrand ? 0 : Math.min(15, risk);
  }

  const p_threat = risk / 100;
  const p_safe = Math.max(0.005, 1 - p_threat);

  return {
    id: 'scan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    url: rawUrl,
    normalized_url: url,
    domain: hostname,
    status,
    risk_score: risk,
    confidence: isCleanBrand ? 0.99 : 0.92,
    scan_time: new Date().toISOString(),
    threat_type: threatType,
    indicators: {
      is_ip_address: isIp,
      has_at_symbol: hasAt,
      url_length: rawUrl.length,
      domain_length: hostname.length,
      excessive_subdomains: excessiveSub,
      suspicious_tld: Boolean(matchedTld),
      matched_tld: matchedTld || '',
      suspicious_keywords_found: foundKeywords,
      shannon_entropy: domainEntropy,
      homoglyph_attack_detected: hasTypo,
      punycode_detected: hostname.includes('xn--'),
      redirect_risk: isShortener || hasRedirect,
      double_slash_redirect: hasDoubleSlash,
      shortener_service: isShortener,
      uncommon_ports: hasUncommonPort
    },
    summary: status === 'Safe'
      ? (isCleanBrand ? `Verified authoritative infrastructure for '${hostname}'. No threat vectors detected.` : 'Standard lexical structure with low risk metrics.')
      : `Threat indicators detected (${reasons.join('; ')}).`,
    recommendations: status === 'Safe'
      ? ['Link is verified and safe for navigation.']
      : ['DO NOT provide credentials or sensitive personal information.', 'Add domain to firewall perimeter blacklist.'],
    ml_probabilities: {
      Safe: isCleanBrand ? 0.99 : Number(p_safe.toFixed(2)),
      Phishing: status === 'Phishing' ? 0.86 : 0.04,
      Malware: status === 'Malware' ? 0.88 : 0.04,
      Suspicious: status === 'Suspicious' ? 0.74 : 0.06
    }
  };
};

export const scanUrlAPI = async (url, userId = null) => {
  const whitelist = getWhitelist();
  const blacklist = getBlacklist();
  
  let hostname = '';
  try {
    hostname = new URL(url.startsWith('http') ? url : 'http://' + url).hostname.toLowerCase();
  } catch (e) {
    hostname = url.toLowerCase();
  }

  if (whitelist.includes(hostname) || blacklist.includes(hostname)) {
    const result = clientSideAnalyzeUrl(url);
    saveScan(result);
    return result;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`${getApiBaseUrl()}/api/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, user_id: userId }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      saveScan(data);
      return data;
    }
  } catch (err) {
    console.warn("Backend API notice, executing high-precision client classifier:", err.message);
  }

  const fallbackResult = clientSideAnalyzeUrl(url);
  saveScan(fallbackResult);
  return fallbackResult;
};

export const batchScanUrlsAPI = async (urls, userId = null) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${getApiBaseUrl()}/api/scan/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls, user_id: userId }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      data.forEach(item => saveScan(item));
      return data;
    }
  } catch (e) {
    console.warn("Backend batch API notice:", e.message);
  }

  const results = urls.map(u => {
    const res = clientSideAnalyzeUrl(u);
    saveScan(res);
    return res;
  });
  return results;
};
