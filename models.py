from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class ScanRequest(BaseModel):
    url: str = Field(..., description="The URL to be scanned for security threats")
    user_id: Optional[str] = Field(None, description="Optional user ID requesting scan")

class BatchScanRequest(BaseModel):
    urls: List[str] = Field(..., description="List of URLs to scan")
    user_id: Optional[str] = Field(None, description="Optional user ID requesting batch scan")

class ThreatIndicators(BaseModel):
    is_ip_address: bool = False
    has_at_symbol: bool = False
    url_length: int = 0
    excessive_subdomains: bool = False
    suspicious_tld: bool = False
    suspicious_keywords_found: List[str] = []
    shannon_entropy: float = 0.0
    homoglyph_attack_detected: bool = False
    punycode_detected: bool = False
    redirect_risk: bool = False
    double_slash_redirect: bool = False
    shortener_service: bool = False
    uncommon_ports: bool = False

class ScanResult(BaseModel):
    id: str
    url: str
    normalized_url: str
    domain: str
    status: str  # "Safe", "Suspicious", "Malware", "Phishing"
    risk_score: int  # 0 to 100
    confidence: float  # 0.0 to 1.0
    scan_time: str
    threat_type: str
    indicators: ThreatIndicators
    summary: str
    recommendations: List[str]
    ml_probabilities: Dict[str, float]

class StatsResponse(BaseModel):
    total_scans: int
    safe_count: int
    suspicious_count: int
    malware_count: int
    phishing_count: int
    blocked_count: int
    system_status: str

class ReportRequest(BaseModel):
    scans: List[Dict[str, Any]]
    format: str = "json"  # "json" or "csv"
    title: Optional[str] = "Malicious URL Threat Report"
