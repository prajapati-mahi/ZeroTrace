# ZeroTrace — AI-Powered Plagiarism & Content Authenticity Platform

ZeroTrace is a modern, high-performance plagiarism and content authenticity detection platform built with React, Node.js, Express, MongoDB, and NLP.

---

## Key Features

- **Multi-Signal Plagiarism Detection Pipeline**:
  - Exact normalized matching (Unicode NFC, quotes, formatting, case normalization)
  - Token-level lexical similarity (Jaccard, Dice, LCS)
  - Word $N$-gram Shingling (3, 4, 5-grams)
  - Winnowing Document Fingerprinting
  - TF-IDF Cosine Similarity
  - Dense Semantic Vector Embeddings
  - Structural Code Plagiarism Detection (Python, JavaScript, C++, Java)
- **Separate AI-Generated Content Detection**: AI generation probability is evaluated independently from plagiarism scores.
- **Adaptive Multi-Strategy Web Search**: Quoted phrases, distinctive windows, technical keywords, and relaxed queries via Serper API.
- **Internal Corpus & Direct Comparison**: Compare Document A vs Document B or test against local corpora without web dependencies.
- **PDF & DOCX Support**: Direct text extraction from `.pdf` and `.docx` documents.
- **Detailed Passage Alignment**: Identifies source links, titles, match types, confidence ratings, and highlighted passage evidence.
- **Professional PDF & JSON Reports**: Download comprehensive analysis reports with score breakdowns and interpretations.

---

## Project Structure

```
ZeroTrace/
├── backend/
│   ├── config/            # Database and environment configurations
│   ├── controllers/       # Plagiarism, PDF, Report, Auth controllers
│   ├── engine/
│   │   ├── plagiarismEngine.js  # Main detection orchestrator
│   │   └── rankingEngine.js     # Passage alignment & candidate ranking
│   ├── models/            # Mongoose schemas (Report, User)
│   ├── routes/            # Express REST API routes
│   ├── services/
│   │   ├── searchService.js     # Serper search retrieval
│   │   ├── scraperService.js    # Multi-layer HTML parser
│   │   └── documentParser.js    # PDF & DOCX text extraction
│   ├── utils/             # Normalizer, Tokenizer, Shingles, Semantic, Code utilities
│   └── tests/
│       └── plagiarism/    # 70-case automated test suite and benchmark
├── frontend/              # React + Vite + Tailwind CSS web dashboard
├── ai-engine/             # Optional FastAPI Python sentence-transformers service
└── docs/
    └── PLAGIARISM_ENGINE.md # Complete technical architecture
```

---

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/zerotrace
JWT_SECRET=your_jwt_secret_key
SERPER_API_KEY=your_serper_dev_api_key
AI_ENGINE_URL=http://127.0.0.1:8000
```

---

## Quick Start

### 1. Start Backend
```bash
cd backend
npm install
npm run start
```

### 2. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Run Plagiarism Evaluation Test Suite
```bash
node backend/tests/plagiarism/testRunner.js
```

### 4. Run Performance Benchmark
```bash
node backend/tests/plagiarism/benchmark.js
```

---

## License
ISC
