import csv
import io
from typing import List, Dict, Any

def generate_csv_report(scans: List[Dict[str, Any]]) -> str:
    """
    Generates a RFC 4180 compliant CSV string representing scan history.
    """
    output = io.StringIO()
    writer = csv.writer(output)
    
    headers = [
        "Scan ID",
        "Target URL",
        "Domain",
        "Verdict Status",
        "Threat Risk Score (0-100)",
        "Confidence",
        "Threat Type",
        "Scan Timestamp (UTC)",
        "Suspicious Keywords",
        "IP Address Flag",
        "Homoglyph Flag",
        "Suspicious TLD Flag",
        "Summary"
    ]
    writer.writerow(headers)
    
    for item in scans:
        indicators = item.get("indicators", {})
        kw_list = ", ".join(indicators.get("suspicious_keywords_found", []))
        
        writer.writerow([
            item.get("id", ""),
            item.get("url", ""),
            item.get("domain", ""),
            item.get("status", ""),
            item.get("risk_score", 0),
            item.get("confidence", 0),
            item.get("threat_type", ""),
            item.get("scan_time", ""),
            kw_list,
            indicators.get("is_ip_address", False),
            indicators.get("homoglyph_attack_detected", False),
            indicators.get("suspicious_tld", False),
            item.get("summary", "")
        ])
        
    return output.getvalue()
