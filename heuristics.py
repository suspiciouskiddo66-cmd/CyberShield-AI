import re
import math
from urllib.parse import urlparse
from typing import Dict, Any, List, Tuple

SUSPICIOUS_TLDS = {
    ".xyz", ".top", ".work", ".click", ".loan", ".zip", ".mov", ".gq",
    ".cf", ".tk", ".ml", ".ga", ".buzz", ".cc", ".su", ".fit", ".rest",
    ".party", ".men", ".kim", ".country", ".stream", ".trade", ".science",
    ".icu", ".monster", ".cam", ".bar", ".rest", ".live", ".space", ".link"
}

POPULAR_BRANDS = {
    "google": ["google.com", "google.co", "goo.gl"],
    "paypal": ["paypal.com", "paypal.me"],
    "apple": ["apple.com", "icloud.com"],
    "microsoft": ["microsoft.com", "live.com", "office.com", "outlook.com"],
    "amazon": ["amazon.com", "amazon.co.uk", "aws.amazon.com"],
    "netflix": ["netflix.com"],
    "facebook": ["facebook.com", "fb.com"],
    "instagram": ["instagram.com"],
    "twitter": ["twitter.com", "x.com"],
    "linkedin": ["linkedin.com"],
    "github": ["github.com", "github.io"],
    "chase": ["chase.com"],
    "bankofamerica": ["bankofamerica.com", "bofa.com"],
    "wellsfargo": ["wellsfargo.com"],
    "binance": ["binance.com"],
    "coinbase": ["coinbase.com"],
    "metamask": ["metamask.io"],
    "whatsapp": ["whatsapp.com"],
    "telegram": ["telegram.org", "t.me"],
    "dropbox": ["dropbox.com"],
    "steam": ["steampowered.com", "steamcommunity.com"],
    "spotify": ["spotify.com"]
}

SUSPICIOUS_KEYWORDS = [
    "login", "signin", "verify", "verification", "secure", "security", "update",
    "account", "banking", "authenticate", "confirm", "wallet", "invoice", "billing",
    "support", "recover", "password", "credential", "appleid", "chase", "wellsfargo",
    "bofa", "metamask", "binance", "coinbase", "telegram-gift", "airdrop", "free-crypto",
    "suspicious-activity", "unlock", "kyc", "claim-reward", "validate", "passcode",
    "giftcard", "urgent", "blocked-account", "action-required", "auth-token"
]

URL_SHORTENERS = {
    "bit.ly", "tinyurl.com", "t.co", "is.gd", "buff.ly", "ow.ly", "rebrand.ly",
    "cutt.ly", "shorte.st", "adf.ly", "v.gd", "trib.al", "s.id", "tiny.cc"
}

def calculate_shannon_entropy(text: str) -> float:
    if not text:
        return 0.0
    entropy = 0.0
    length = len(text)
    char_counts = {}
    for char in text:
        char_counts[char] = char_counts.get(char, 0) + 1
    for count in char_counts.values():
        p = count / length
        entropy -= p * math.log2(p)
    return round(entropy, 3)

def is_ip_address(netloc: str) -> Tuple[bool, str]:
    host = netloc.split(':')[0].strip('[]')
    
    # IPv4 regex
    ipv4_pattern = r"^([0-9]{1,3}\.){3}[0-9]{1,3}$"
    if re.match(ipv4_pattern, host):
        parts = host.split('.')
        if all(0 <= int(p) <= 255 for p in parts):
            return True, f"IPv4 Address ({host})"
            
    # Hex or Octal IPv4 format (e.g. 0x7f000001 or 0177.0.0.1)
    if re.match(r"^0x[0-9a-fA-F]+$", host) or re.match(r"^(0[0-7]+\.){3}0[0-7]+$", host):
        return True, f"Obfuscated Hex/Octal IP ({host})"
        
    # IPv6 format
    if ":" in host and not host.endswith(tuple(SUSPICIOUS_TLDS)):
        return True, f"IPv6 Address ({host})"
        
    return False, ""

def levenshtein_distance(s1: str, s2: str) -> int:
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)
    if len(s2) == 0:
        return len(s1)
    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
    return previous_row[-1]

def detect_typosquatting(domain: str) -> Tuple[bool, str, str]:
    """
    Accurately detects lookalike domains, punycode attacks, and brand typosquatting.
    """
    domain_clean = domain.lower().split(':')[0]
    
    # Check Punycode IDN homograph attack
    if "xn--" in domain_clean:
        return True, "Punycode (IDN homograph lookalike domain)", "Homograph Attack"
        
    # Common character substitutions (e.g., '0' for 'o', '1' for 'l', 'rn' for 'm')
    substitutions = {
        '0': 'o', '1': 'l', '3': 'e', '5': 's', '8': 'b',
        'vv': 'w', 'rn': 'm', 'cl': 'd'
    }
    
    normalized_domain = domain_clean
    for sub, orig in substitutions.items():
        normalized_domain = normalized_domain.replace(sub, orig)

    parts = domain_clean.split('.')
    main_domain_label = parts[-2] if len(parts) >= 2 else parts[0]
    
    for brand, legit_domains in POPULAR_BRANDS.items():
        # Exact match of legitimate domain -> Safe
        if domain_clean in legit_domains or any(domain_clean.endswith("." + ld) for ld in legit_domains):
            return False, "", ""
            
        # Check if brand name is embedded with extra words (e.g. paypal-security-login)
        if brand in domain_clean and not any(domain_clean == ld or domain_clean.endswith("." + ld) for ld in legit_domains):
            return True, f"Brand impersonation of '{brand.capitalize()}' in untrusted domain", f"Phishing Impersonation ({brand})"

        # Check edit distance (Levenshtein distance 1 or 2 from brand name)
        dist = levenshtein_distance(main_domain_label, brand)
        if dist == 1 and len(brand) >= 4:
            return True, f"Typosquatting of '{brand.capitalize()}' detected (Distance: {dist})", f"Typosquatting ({brand})"

    return False, "", ""

def analyze_url_heuristics(raw_url: str) -> Dict[str, Any]:
    """
    Deep, accurate heuristic URL analysis.
    """
    url = raw_url.strip()
    if not url.startswith(("http://", "https://", "ftp://")):
        url = "http://" + url

    try:
        parsed = urlparse(url)
    except Exception:
        parsed = urlparse("http://" + raw_url.strip())

    scheme = parsed.scheme.lower()
    netloc = parsed.netloc.lower()
    path = parsed.path
    query = parsed.query
    full_url = url.lower()

    # Hostname clean
    host_only = netloc.split(':')[0]
    subdomains = host_only.split('.')
    subdomain_count = max(0, len(subdomains) - 2)

    # 1. IP Check
    is_ip, ip_detail = is_ip_address(netloc)
    
    # 2. TLD Check
    matched_tld = next((tld for tld in SUSPICIOUS_TLDS if host_only.endswith(tld)), None)
    
    # 3. Typosquatting / Homoglyph
    has_typo, typo_msg, typo_type = detect_typosquatting(host_only)
    
    # 4. Suspicious Keywords
    found_keywords = [kw for kw in SUSPICIOUS_KEYWORDS if kw in full_url]
    
    # 5. Shannon Entropy
    domain_entropy = calculate_shannon_entropy(host_only)
    full_entropy = calculate_shannon_entropy(url)

    # 6. Shortener
    is_shortener = any(shortener == host_only or host_only.endswith("." + shortener) for shortener in URL_SHORTENERS)

    # 7. Redirection risk
    has_redirect = any(p in query.lower() for p in ["redirect=", "url=", "next=", "target=", "dest=", "return="])
    has_double_slash = "//" in path

    # 8. Uncommon port
    has_uncommon_port = bool(parsed.port and parsed.port not in [80, 443, 8080, 8443])

    indicators = {
        "is_ip_address": is_ip,
        "ip_detail": ip_detail,
        "has_at_symbol": "@" in raw_url,
        "url_length": len(raw_url),
        "domain_length": len(host_only),
        "subdomain_count": subdomain_count,
        "excessive_subdomains": subdomain_count >= 3,
        "suspicious_tld": bool(matched_tld),
        "matched_tld": matched_tld or "",
        "suspicious_keywords_found": found_keywords,
        "shannon_entropy": domain_entropy,
        "full_entropy": full_entropy,
        "homoglyph_attack_detected": has_typo,
        "typosquatting_detail": typo_msg,
        "punycode_detected": "xn--" in host_only,
        "redirect_risk": has_redirect,
        "double_slash_redirect": has_double_slash,
        "shortener_service": is_shortener,
        "uncommon_ports": has_uncommon_port,
        "port": parsed.port or (443 if scheme == "https" else 80),
        "scheme": scheme
    }

    # Precise Heuristic Risk Calculation
    reasons = []
    risk_score = 0

    # Whitelist check for known clean domains
    is_clean_brand = any(host_only == ld or host_only.endswith("." + ld) for b in POPULAR_BRANDS.values() for ld in b)
    
    if is_clean_brand and not indicators["has_at_symbol"] and not has_double_slash:
        risk_score = 0
        reasons.append("Verified legitimate top-tier enterprise domain")
    else:
        if indicators["is_ip_address"]:
            risk_score += 45
            reasons.append(f"Direct raw IP hosting: {ip_detail}")
            
        if indicators["homoglyph_attack_detected"]:
            risk_score += 50
            reasons.append(typo_msg)
            
        if indicators["has_at_symbol"]:
            risk_score += 35
            reasons.append("URL contains '@' credential spoofing delimiter")
            
        if indicators["suspicious_tld"]:
            risk_score += 30
            reasons.append(f"High-abuse Top-Level Domain ({matched_tld})")
            
        if indicators["shortener_service"]:
            risk_score += 15
            reasons.append("URL shortener conceals final destination")
            
        if indicators["excessive_subdomains"]:
            risk_score += 20
            reasons.append(f"Excessive subdomain layering ({subdomain_count} subdomains)")
            
        if len(found_keywords) > 0:
            kw_score = min(35, len(found_keywords) * 12)
            risk_score += kw_score
            reasons.append(f"Targeted credential/security keywords: {', '.join(found_keywords[:4])}")
            
        if domain_entropy > 4.3:
            risk_score += 25
            reasons.append(f"High domain randomness / entropy ({domain_entropy}) indicative of DGA")
            
        if has_double_slash:
            risk_score += 25
            reasons.append("Embedded '//' path traversal / redirection anomaly")
            
        if has_uncommon_port:
            risk_score += 25
            reasons.append(f"Non-standard HTTP port :{parsed.port}")
            
        if len(raw_url) > 110:
            risk_score += 10
            reasons.append(f"Abnormal URL length ({len(raw_url)} characters)")

    risk_score = min(100, max(0, risk_score))

    return {
        "url": raw_url,
        "normalized_url": url,
        "domain": host_only,
        "indicators": indicators,
        "heuristic_score": risk_score,
        "reasons": reasons,
        "is_clean_brand": is_clean_brand
    }
