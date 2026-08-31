# ZeroTrace Plagiarism Detection Engine — Technical Architecture & Specification

## 1. Overview
The ZeroTrace Plagiarism Detection Engine is an enterprise-grade, multi-signal content analysis pipeline designed to detect copied, modified, paraphrased, and structurally transposed natural language and programming source code across online indexes and internal corpora.

---

## 2. End-to-End Pipeline Architecture

```
                                 [ USER INPUT ]
                 (Text / Code / PDF / DOCX / Document Comparison)
                                       │
                                       ▼
                   ┌────────────────────────────────────────┐
                   │  1. Input Normalization & Language     │
                   │     Classification (Text vs Code)      │
                   └───────────────────┬────────────────────┘
                                       │
                                       ▼
                   ┌────────────────────────────────────────┐
                   │  2. Segmentation & Adaptive Chunking   │
                   │  (Sentences, Clauses, Code Blocks)     │
                   └───────────────────┬────────────────────┘
                                       │
                                       ▼
                   ┌────────────────────────────────────────┐
                   │  3. Multi-Signal Similarity Layers:    │
                   │  • Layer 1: Exact Normalized Matching  │
                   │  • Layer 2: Lexical (Jaccard/Dice/Cos) │
                   │  • Layer 3: N-gram Shingles (3,4,5-gr) │
                   │  • Layer 4: Winnowing Fingerprinting   │
                   │  • Layer 5: TF-IDF Cosine Similarity   │
                   │  • Layer 6: Semantic Vector Similarity │
                   │  • Code Mode: Structural/Token Stream  │
                   └───────────────────┬────────────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
        ┌───────────────────────┐             ┌───────────────────────┐
        │ Direct / Local Corpus │             │   Adaptive Queries    │
        │ Comparison Pipeline   │             │   & Robust Retrieval  │
        │ (Document A vs B)     │             │ (Multi-Strategy Web)  │
        └───────────┬───────────┘             └───────────┬───────────┘
                    │                                     │
                    │                                     ▼
                    │                         ┌───────────────────────┐
                    │                         │  Robust Multi-Parser  │
                    │                         │  Scraper & Source QA  │
                    │                         └───────────┬───────────┘
                    │                                     │
                    └──────────────────┬──────────────────┘
                                       │
                                       ▼
                   ┌────────────────────────────────────────┐
                   │  4. Passage Alignment & Spans          │
                   │  (Exact, Near-Exact, Semantic, Code)   │
                   └───────────────────┬────────────────────┘
                                       │
                                       ▼
                   ┌────────────────────────────────────────┐
                   │  5. Weighted Multi-Signal Scoring      │
                   │  (Token Coverage + Exact Override)     │
                   └───────────────────┬────────────────────┘
                                       │
                                       ▼
                   ┌────────────────────────────────────────┐
                   │  6. Source Ranking & Deduplication     │
                   │  (Confidence, Domain Authority, URL)   │
                   └───────────────────┬────────────────────┘
                                       │
                                       ▼
                   ┌────────────────────────────────────────┐
                   │  7. Comprehensive Final Report         │
                   │  (API Response, PDF Export, History)   │
                   └────────────────────────────────────────┘
```

---

## 3. Detection Layers Explained

### Layer 1: Exact Normalized Matching
Normalizes Unicode (NFC), collapses redundant whitespace, removes formatting variations, converts curly quotes/dashes, and decodes HTML entities.
- Produces $1.0$ (100%) for identical text or direct substring containment.

### Layer 2: Lexical Token Matching
Computes token-level Jaccard and Sørensen-Dice coefficients:
$$\text{Dice}(A, B) = \frac{2 |A \cap B|}{|A| + |B|}$$

### Layer 3: Word N-gram Shingling
Extracts sliding word $k$-shingles ($k=3, 4, 5$) to detect contiguous and near-contiguous spans of text even when minor filler words are inserted or removed.

### Layer 4: Winnowing Document Fingerprinting
Implements the Winnowing algorithm (Schleimer, Wilkerson, Aiken) with sliding window size $w=4$ and shingle size $k=4$.
- Guarantees detection of all copied passages of length $\ge (w + k - 1)$ tokens with minimal storage overhead.

### Layer 5: TF-IDF Cosine Similarity
Extracts sublinear term frequencies ($1 + \log(\text{tf})$) and computes vector cosine distance:
$$\cos(\vec{u}, \vec{v}) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|}$$

### Layer 6: Semantic Vector Embeddings
Generates zero-centered 256-dimensional signed random projection vectors over content tokens and semantic synonym clusters.
- Captures algorithmic and academic paraphrasing without false positive inflation on unrelated text.
- Supports optional integration with external Python FastAPI `ai-engine` running Sentence-Transformers (`all-MiniLM-L6-v2`).

### Layer 7: Structural Code Plagiarism Engine
Extracts AST-like token streams, stripping comments and abstracting variable names to identify structural plagiarism across JavaScript, Python, C++, and Java.

---

## 4. Exact Match Override & Scoring Formulas

- **Exact Match Override**: If normalized passage overlap $\ge 0.90$, score is overridden to $1.0$ (100%), preventing semantic dilution.
- **Document-Level Score**: Computed from token coverage across matched passages:
$$\text{Score} = \min\left(100, \frac{\text{Covered}_{\text{Exact}} \cdot 1.0 + \text{Covered}_{\text{NearExact}} \cdot 0.85 + \text{Covered}_{\text{Semantic}} \cdot 0.65}{\text{Total Tokens}} \times 100\right)$$

---

## 5. Confidence Levels
- **VERY HIGH**: Exact or near-exact match ($\ge 90\%$).
- **HIGH**: Strong lexical/shingle match ($\ge 75\%$).
- **MEDIUM**: Paraphrased/semantic similarity ($\ge 50\%$).
- **LOW**: Incidental overlap ($< 50\%$).
