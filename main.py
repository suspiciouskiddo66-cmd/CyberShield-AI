from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import datetime

from .models import ScanRequest, BatchScanRequest, ScanResult, StatsResponse, ReportRequest
from .ml_engine import classify_url
from .report_generator import generate_csv_report

app = FastAPI(
    title="AI Malicious Link Detector API",
    description="Enterprise URL Threat Intelligence & AI Classifier Service",
    version="1.0.0"
)

# Enable CORS for Frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory scan cache / mock history tracker
SCAN_HISTORY: List[ScanResult] = []

@app.get("/")
def read_root():
    return {
        "service": "AI Malicious Link Detector API",
        "status": "online",
        "version": "1.0.0",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "model_loaded": True,
        "engine": "Hybrid Heuristic + Scikit Feature Evaluator"
    }

@app.post("/api/scan", response_model=ScanResult)
def scan_url(request: ScanRequest):
    if not request.url or not request.url.strip():
        raise HTTPException(status_code=400, detail="URL cannot be empty")
    
    result = classify_url(request.url.strip(), request.user_id)
    SCAN_HISTORY.insert(0, result)
    # Keep last 200 scans in memory
    if len(SCAN_HISTORY) > 200:
        SCAN_HISTORY.pop()
    
    return result

@app.post("/api/scan/batch", response_model=List[ScanResult])
def batch_scan_urls(request: BatchScanRequest):
    if not request.urls:
        raise HTTPException(status_code=400, detail="URL list cannot be empty")
    
    results = []
    for raw_url in request.urls[:50]: # Limit to 50 per batch
        if raw_url.strip():
            res = classify_url(raw_url.strip(), request.user_id)
            results.append(res)
            SCAN_HISTORY.insert(0, res)
            
    return results

@app.get("/api/stats", response_model=StatsResponse)
def get_stats():
    total = len(SCAN_HISTORY)
    safe = sum(1 for s in SCAN_HISTORY if s.status == "Safe")
    phishing = sum(1 for s in SCAN_HISTORY if s.status == "Phishing")
    malware = sum(1 for s in SCAN_HISTORY if s.status == "Malware")
    suspicious = sum(1 for s in SCAN_HISTORY if s.status == "Suspicious")
    blocked = phishing + malware + suspicious

    return StatsResponse(
        total_scans=total,
        safe_count=safe,
        suspicious_count=suspicious,
        malware_count=malware,
        phishing_count=phishing,
        blocked_count=blocked,
        system_status="ACTIVE"
    )

@app.post("/api/reports/csv")
def download_csv_report(request: ReportRequest):
    csv_data = generate_csv_report(request.scans)
    filename = f"threat_report_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
