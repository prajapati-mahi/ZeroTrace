# ZeroTrace — AI-Powered Plagiarism & Content Authenticity Platform

<div align="center">

![ZeroTrace Checker Analysis](docs/screenshots/06_plagiarism_50pct_detection.png)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_ZeroTrace-00DF8F?style=for-the-badge&logo=vercel&logoColor=white)](https://zero-trace-frontend-three.vercel.app)
[![API Status](https://img.shields.io/badge/Backend_API-Render_Live-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://zerotrace-backend-ger4.onrender.com)

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/Frontend-React_18_%2B_Vite-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_%2B_Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**ZeroTrace** is a production-grade, multi-signal plagiarism detection and AI content authenticity engine. It combines lexical, structural, and semantic NLP techniques to detect verbatim copying, paraphrasing, code plagiarism, and AI-generated text with high accuracy and zero arbitrary cutoffs.

🚀 **Live Web App:** [https://zero-trace-frontend-three.vercel.app](https://zero-trace-frontend-three.vercel.app)  
⚡ **Production Backend API:** [https://zerotrace-backend-ger4.onrender.com](https://zerotrace-backend-ger4.onrender.com)

</div>

---

## 📸 Complete Application Walkthrough & Screenshots

Below is a step-by-step visual tour of ZeroTrace, from user onboarding and the personal dashboard to individual plagiarism detection, AI likelihood scoring, passage alignment, and PDF report generation.

---

### 1. User Authentication & Onboarding

#### Secure Login Portal
Registered users access their personalized dashboard, previous scan history, and saved reports via JWT authentication:
![ZeroTrace Login Portal](docs/screenshots/01_login_portal.png)

#### New Account Registration
Fast signup with client and server-side validation, password hashing via bcrypt, and automatic session initialization:
![ZeroTrace Sign Up](docs/screenshots/02_signup_registration.png)

---

### 2. User Dashboard & Recent Scans

#### Centralized Monitoring Dashboard
View all previously conducted text and PDF scans, track submission timestamps, similarity scores, and severity risk levels:
![Dashboard & Recent Reports](docs/screenshots/03_dashboard_recent_reports.png)

---

### 3. Multi-Signal Content & Plagiarism Checker

#### Input & Analysis Interface
Paste code snippets, technical interview questions, or essays. Features real-time word and character counters, quick sample loaders, and one-click analysis:
![Checker Input Interface](docs/screenshots/05_checker_input_interface.png)

#### Live Detection Results & Multi-Signal Gauge
Dual circular score gauges distinguish independent AI likelihood from direct web & document plagiarism:
![Plagiarism & AI Scores](docs/screenshots/06_plagiarism_50pct_detection.png)

---

### 4. Overlapping Passages & Source Evidence

#### Sentence-by-Sentence Passage Alignment
Identifies each overlapping sentence, assigns similarity percentages and match categories (*Paraphrased / Semantic*, *Near-Exact*, or *Exact*), and cites the origin:
![Matched Passages & Evidence](docs/screenshots/07_matched_passages_evidence.png)

#### Detected Web Sources & Reference Links
Real-time crawler results displaying live source URLs, domains, confidence ratings, and similarity scores:
![Detected Sources](docs/screenshots/08_detected_sources_links.png)

---

### 5. Independent AI-Generated Content Detection

#### LLM Pattern, Burstiness & Uniformity Analysis
Evaluates linguistic predictability, sentence length variance, and transition markers independently from plagiarism scores:
![AI Content Detection](docs/screenshots/04_ai_content_detection_analysis.png)

---

## ✨ Key Technical Capabilities

- **Multi-Signal Plagiarism Detection Pipeline**:
  - **Layer 1: Exact Normalized Matching** — Unicode NFC normalization, whitespace, quotes, punctuation, and case folding.
  - **Layer 2: Token Lexical Similarity** — Jaccard index, Sørensen-Dice coefficient, and Longest Common Subsequence (LCS).
  - **Layer 3: Word $N$-gram Shingling** — Multi-scale shingles ($n = 3, 4, 5$) for detecting localized passage copying.
  - **Layer 4: Document Fingerprinting** — Winnowing algorithm for resilient near-duplicate detection.
  - **Layer 5: TF-IDF Cosine Similarity** — Salient keyword weighting to prioritize distinctive domain terms.
  - **Layer 6: Semantic Vector Embeddings** — Dense representation for paraphrased concept alignment.
  - **Layer 7: Structural Code AST Comparison** — Normalized token stream analysis for Python, JavaScript, C++, and Java.
- **Independent AI Content Detection**:
  - Analyzes LLM template signatures, transition marker density, relative clause distribution, and sentence burstiness.
  - Evaluated separately from plagiarism so human-written and AI-generated texts are never conflated.
- **Adaptive Multi-Strategy Web Search**:
  - Quoted exact phrases, distinctive text windows, technical keyword queries, and relaxed searches via Serper API.
  - Eliminates arbitrary character thresholds so even short LeetCode or interview questions trigger comprehensive search.
- **Document & PDF Comparison**:
  - Side-by-side offline comparison of two PDF, DOCX, or TXT documents with passage-by-passage alignment.
- **Actionable Evidence & Reports**:
  - Per-passage match tags, source links, confidence ratings, one-click report copying, and exportable JSON/PDF reports.

---

## 🏛️ Architecture & Project Structure

```
ZeroTrace/
├── backend/
│   ├── config/            # Database and environment configurations
│   ├── controllers/       # Plagiarism, PDF, Report, Auth controllers
│   ├── engine/
│   │   ├── plagiarismEngine.js  # Main multi-signal detection orchestrator
│   │   └── rankingEngine.js     # Passage alignment & candidate ranking
│   ├── models/            # Mongoose schemas (Report, User)
│   ├── routes/            # Express REST API routes
│   ├── services/
│   │   ├── searchService.js     # Serper search retrieval
│   │   ├── scraperService.js    # Multi-layer HTML parser
│   │   └── documentParser.js    # PDF & DOCX text extraction
│   ├── utils/             # Normalizer, Tokenizer, Shingles, Semantic, Code, AI utilities
│   └── tests/
│       └── plagiarism/    # 70-case automated test suite and benchmark
├── frontend/              # React + Vite + Tailwind CSS web dashboard
│   ├── src/
│   │   ├── components/    # Navigation, Stats, QuickActions, UI widgets
│   │   ├── pages/         # Checker, PDFChecker, Dashboard, History, Profile
│   │   └── services/      # Axios API client with dynamic base URL
├── ai-engine/             # Optional FastAPI Python sentence-transformers service
└── docs/
    ├── PLAGIARISM_ENGINE.md  # Detailed algorithm specification & weights
    └── screenshots/          # Production interface preview images
```

---

## 🧪 Comprehensive Evaluation & Benchmarks

The detection engine is evaluated against a 70-case benchmark covering exact matches, minor modifications, format changes, paraphrased text, structural code, and technical questions:

```text
==========================================================================
                            CATEGORY BREAKDOWN                            
==========================================================================
• Exact Copy               : 10/10 Passed (100%) | Avg Score: 100.0%
• Formatting Variations    : 10/10 Passed (100%) | Avg Score: 99.5%
• Minor Modification       : 10/10 Passed (100%) | Avg Score: 78.0%
• Paraphrase               : 10/10 Passed (100%) | Avg Score: 61.3%
• Unrelated                : 10/10 Passed (100%) | Avg Score: 0.0%
• Technical Questions      : 10/10 Passed (100%) | Avg Score: 100.0%
• Code Similarity          : 10/10 Passed (100%) | Avg Score: 91.2%
==========================================================================
FINAL RESULT: 70/70 PASSED (100%)
Average Latency per Test: 2.6ms | Total Time: 185ms
==========================================================================
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB Atlas** or a local MongoDB instance

### 2. Environment Setup

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SERPER_API_KEY=your_serper_dev_api_key
```

Create a `.env` file in the `frontend/` directory (optional for local development):

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run the Backend
```bash
cd backend
npm install
npm run start
```
*Backend runs on `http://localhost:5000`.*

### 4. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

### 5. Run Automated Tests
```bash
# Run full 70-case plagiarism and code detection suite
node backend/tests/plagiarism/testRunner.js

# Run latency and accuracy benchmark
node backend/tests/plagiarism/benchmark.js
```

---

## 🌐 Live Production Deployments

| Component | Platform | Live URL |
|---|---|---|
| **Frontend Web App** | Vercel | [https://zero-trace-frontend-three.vercel.app](https://zero-trace-frontend-three.vercel.app) |
| **Backend API** | Render | [https://zerotrace-backend-ger4.onrender.com](https://zerotrace-backend-ger4.onrender.com) |

---

## 📄 License
This project is open-source and available under the [ISC License](LICENSE).
