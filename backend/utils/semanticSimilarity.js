/**
 * ZeroTrace Semantic Similarity Engine
 * Hybrid dense signed vector embedding generator with semantic domain mappings & FastAPI bridge.
 */

const axios = require("axios");
const { tokenizeWords, generateWordNgrams } = require("./tokenizer");

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || "http://127.0.0.1:8000";
let aiEngineAvailable = null;
let lastCheckTime = 0;

// Semantic synonym clusters for technical, algorithmic, and general academic language
const SYNONYM_CLUSTERS = [
  ["algorithm", "method", "technique", "approach", "procedure", "paradigm", "routine", "methodology", "blueprint"],
  ["divide", "divides", "split", "splits", "partition", "partitions", "partitioning", "halve", "halves", "cut", "cuts", "separate", "reduce", "reduces", "rearranges"],
  ["sorted", "ordered", "arranged", "sequenced", "monotonic"],
  ["search", "lookup", "query", "find", "locate", "scan", "retrieve", "lookups", "retrieval", "retrieving"],
  ["array", "list", "vector", "sequence", "collection", "elements", "buffer", "subsets", "sub-arrays", "item", "items", "numbers", "integers"],
  ["pivot", "central", "anchor", "partition-point"],
  ["target", "goal", "desired", "requested", "key"],
  ["sum", "total", "add", "aggregate", "addition", "equals", "matches", "combined"],
  ["indices", "positions", "locations", "indexes", "pointers", "coordinates", "pairs"],
  ["tree", "graph", "nodes", "vertices", "edges", "branches", "vertex", "depth", "structure", "neighboring"],
  ["traversal", "traverse", "traverses", "visit", "visiting", "visits", "iterate", "walk", "scanning", "bfs", "dfs", "level-order", "breadth-first", "level", "queue", "fifo"],
  ["minimum", "smallest", "lowest", "least", "min", "smaller"],
  ["maximum", "largest", "highest", "greatest", "max", "larger"],
  ["cache", "storage", "memory", "buffer", "store", "space", "lru", "capacity", "fills", "limit"],
  ["evict", "evicts", "discard", "discards", "remove", "delete", "clear", "purge", "unused"],
  ["fast", "efficient", "optimal", "rapid", "quick", "speed", "accelerate", "accelerates", "faster"],
  ["database", "table", "schema", "record", "tables", "records"],
  ["overhead", "cost", "penalty", "sluggish", "slower", "tradeoff", "trade-off"],
  ["protocol", "standard", "blueprint", "architecture", "rules", "specification", "framework", "style", "rest", "http", "api", "web"],
  ["consecutive", "adjacent", "continuous", "contiguous", "neighboring", "successive"],
  ["swap", "exchange", "reverse", "invert", "flip", "reverses", "inverted"],
  ["dynamic", "programming", "memoization", "memoizing", "caching", "overlapping", "subproblems", "recurring"],
  ["complex", "complicated", "challenges", "hard", "difficulty"],
  ["solves", "resolves", "solutions", "answers", "resolving", "solving"]
];

const SYNONYM_LOOKUP = new Map();
SYNONYM_CLUSTERS.forEach((cluster, clusterId) => {
  cluster.forEach((word) => {
    SYNONYM_LOOKUP.set(word, `SEM_CLUSTER_${clusterId}`);
  });
});

async function checkAiEngineHealth() {
  const now = Date.now();
  if (aiEngineAvailable !== null && now - lastCheckTime < 30000) {
    return aiEngineAvailable;
  }
  try {
    const res = await axios.get(`${AI_ENGINE_URL}/health`, { timeout: 800 });
    aiEngineAvailable = res.status === 200;
  } catch (err) {
    aiEngineAvailable = false;
  }
  lastCheckTime = now;
  return aiEngineAvailable;
}

/**
 * 256-dimensional zero-centered signed random projection embedding vector.
 */
function computeSemanticVector(text, dim = 256) {
  const tokens = tokenizeWords(text, true);
  const ngrams = generateWordNgrams(tokens, 2);
  const vec = new Float32Array(dim);

  if (tokens.length === 0) return Array.from(vec);

  function hash(str, seed = 0) {
    let h = (0x811c9dc5 ^ seed) >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h >>> 0;
  }

  for (const token of tokens) {
    const cluster = SYNONYM_LOOKUP.get(token);
    const effectiveToken = cluster || token;

    const idx1 = hash(effectiveToken, 1) % dim;
    const sign1 = (hash(effectiveToken, 2) % 2 === 0) ? 1.0 : -1.0;
    vec[idx1] += sign1 * 2.0;

    const idx2 = hash(effectiveToken, 3) % dim;
    const sign2 = (hash(effectiveToken, 4) % 2 === 0) ? 1.0 : -1.0;
    vec[idx2] += sign2 * 1.5;

    // Sub-word morphological root
    if (token.length >= 4 && !cluster) {
      const root = token.substring(0, 4);
      const rootIdx = hash(root, 5) % dim;
      const rootSign = (hash(root, 6) % 2 === 0) ? 1.0 : -1.0;
      vec[rootIdx] += rootSign * 0.5;
    }
  }

  // Bigrams for contextual semantics
  for (const ng of ngrams) {
    const ngWords = ng.split(" ");
    const c1 = SYNONYM_LOOKUP.get(ngWords[0]) || ngWords[0];
    const c2 = SYNONYM_LOOKUP.get(ngWords[1]) || ngWords[1];
    const canonNg = `${c1}_${c2}`;

    const ngIdx = hash(canonNg, 7) % dim;
    const ngSign = (hash(canonNg, 8) % 2 === 0) ? 1.0 : -1.0;
    vec[ngIdx] += ngSign * 2.2;
  }

  // L2 Normalize
  let norm = 0;
  for (let i = 0; i < dim; i++) {
    norm += vec[i] * vec[i];
  }
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < dim; i++) {
      vec[i] /= norm;
    }
  }

  return Array.from(vec);
}

function cosineSimilarityVectors(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length || vecA.length === 0) return 0;
  let dot = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
  }
  return Math.max(0, Math.min(1, dot));
}

async function computeSemanticSimilarity(text1, text2) {
  if (!text1 || !text2) return 0;

  const isAiEngineUp = await checkAiEngineHealth();
  if (isAiEngineUp) {
    try {
      const res1 = await axios.post(`${AI_ENGINE_URL}/embed`, { text: text1 }, { timeout: 1500 });
      const res2 = await axios.post(`${AI_ENGINE_URL}/embed`, { text: text2 }, { timeout: 1500 });
      const emb1 = res1.data.embeddings?.[0]?.vector;
      const emb2 = res2.data.embeddings?.[0]?.vector;
      if (emb1 && emb2) {
        return cosineSimilarityVectors(emb1, emb2);
      }
    } catch (e) {}
  }

  const vec1 = computeSemanticVector(text1);
  const vec2 = computeSemanticVector(text2);
  return cosineSimilarityVectors(vec1, vec2);
}

module.exports = {
  checkAiEngineHealth,
  computeSemanticVector,
  cosineSimilarityVectors,
  computeSemanticSimilarity,
};
