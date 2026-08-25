# CyberShield AI — Enterprise Malicious Link Detector & Threat Intelligence Suite

A full-stack, AI-powered cybersecurity platform engineered to detect malicious URLs, phishing traps, typosquatting domains, homoglyphs, and drive-by malware payloads in real-time.

---

## 🌟 Key Features
- **AI Neural Heuristic Link Detector**: Shannon entropy calculation, Levenshtein brand distance, IDN homoglyph detection, TLD risk scoring, and calibrated machine learning classification.
- **Threat Examples Database (100 Vectors)**: Categorized educational threat links with safe neutralized previews.
- **Tactical Security Suite**:
  - AI File Malware & Hash Scanner (SHA-256 / MD5 / Byte Entropy).
  - Safe Browsing Sandbox (SSL Health & HTTP Defense Headers).
  - Password Entropy & Brute-Force Crack Auditor.
  - Dark Web Breach & Credential Leak Alerts.
  - Real-Time Ingress Packet Interceptor.
- **Interactive Defense Academy & Gamification**:
  - Interactive Security Academy with checkpoint quizzes.
  - Tactical Safety Challenges & Phishing Quizzes.
  - Community Threat Intelligence Hub & Global Hunter Leaderboard.
- **Aegis AI Voice Assistant**: Voice recognition and synthesized audio feedback copilot.
- **Multi-Theme Engine**: 10 selectable cybersecurity and minimalist themes (including Plain Stealth Black and Plain Clean White).
- **Multi-Language (i18n)**: English, Español, Français, Deutsch, 日本語, हिन्दी.

---

## 📁 Repository Structure
```text
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── heuristics.py
│   │   ├── ml_engine.py
│   │   └── dataset.py
│   ├── requirements.txt
│   ├── Procfile
│   └── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json
├── .gitignore
├── render.yaml
└── README.md
```

---

## 🚀 Quick Start (Local)

### 1. Backend (Python FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## 🌐 24/7 Cloud Hosting
- **Backend**: Render.com (Python Web Service)
- **Frontend**: Vercel.com (Vite Framework Preset)
- **Database / Auth**: Google Firebase
