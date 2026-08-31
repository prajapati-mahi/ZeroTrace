/**
 * ZeroTrace Code Similarity & Plagiarism Utility
 * Robust detector for source code vs natural language, structural tokenizer, and code AST comparison.
 */

const { stripCodeComments, normalizeWhitespace } = require("./normalizer");

const CODE_KEYWORDS = new Set([
  "function", "def", "class", "public", "private", "protected", "static",
  "void", "int", "double", "float", "char", "bool", "boolean", "string",
  "var", "let", "const", "return", "if", "else", "for", "while", "do",
  "switch", "case", "break", "continue", "try", "catch", "finally", "throw",
  "import", "export", "from", "require", "package", "namespace", "using",
  "include", "struct", "typedef", "auto", "nullptr", "null", "true", "false",
  "vector", "map", "set", "list", "array", "dict", "tuple", "self", "this",
  "len", "length", "push", "pop", "get", "has", "size", "swap"
]);

function isCodeSnippet(text) {
  if (!text || typeof text !== "string") return false;
  const clean = text.trim();

  const hasFunctionDef = /(\bdef\s+[a-zA-Z_]\w*\s*\(|\bfunction\s+[a-zA-Z_]\w*\s*\(|\bclass\s+[a-zA-Z_]\w*|\bvoid\s+[a-zA-Z_]\w*\s*\(|\bint\s+[a-zA-Z_]\w*\s*\()/.test(clean);
  const hasIncludeImport = /^(#include\s*<|import\s+\w+|from\s+\w+\s+import)/m.test(clean);
  const hasBracesSemicolons = /\{\s*[\r\n]+|;\s*[\r\n]+/.test(clean);

  if (hasFunctionDef || hasIncludeImport) return true;
  if (hasBracesSemicolons && /(=|\+\+|--|\+=|-=|\bfor\b|\bwhile\b|\bif\b)/.test(clean)) return true;

  return false;
}

function tokenizeCodeStructure(code) {
  const clean = stripCodeComments(code);
  const tokenRegex = /\b[a-zA-Z_]\w*\b|\d+\.?\d*|==|!=|<=|>=|&&|\|\||\+\+|--|\+=|-=|\*=|\/=|->|::|[{}()\[\];,.<>+\-*/%=!&|^~?:#]/g;
  const matches = clean.match(tokenRegex) || [];

  const structuralTokens = [];

  for (const t of matches) {
    const lower = t.toLowerCase();
    if (CODE_KEYWORDS.has(lower)) {
      structuralTokens.push(`KW_${lower.toUpperCase()}`);
    } else if (/^\d/.test(t)) {
      structuralTokens.push("NUM");
    } else if (/^[a-zA-Z_]\w*$/.test(t)) {
      structuralTokens.push("ID");
    } else {
      structuralTokens.push(t);
    }
  }

  return structuralTokens;
}

function compareCodeSimilarity(code1, code2) {
  const tokens1 = tokenizeCodeStructure(code1);
  const tokens2 = tokenizeCodeStructure(code2);

  if (tokens1.length === 0 || tokens2.length === 0) return { score: 0, isCode: false };

  // Token Sorensen-Dice over structural multiset
  const freq1 = {};
  const freq2 = {};
  tokens1.forEach((t) => (freq1[t] = (freq1[t] || 0) + 1));
  tokens2.forEach((t) => (freq2[t] = (freq2[t] || 0) + 1));

  let common = 0;
  for (const t in freq1) {
    if (freq2[t]) {
      common += Math.min(freq1[t], freq2[t]);
    }
  }
  const tokenDice = (2 * common) / (tokens1.length + tokens2.length);

  // 2-gram and 3-gram structural sequence overlap
  const n = 3;
  const ngrams1 = [];
  for (let i = 0; i <= tokens1.length - n; i++) {
    ngrams1.push(tokens1.slice(i, i + n).join(" "));
  }
  const ngrams2 = [];
  for (let i = 0; i <= tokens2.length - n; i++) {
    ngrams2.push(tokens2.slice(i, i + n).join(" "));
  }

  let ngramScore = 0;
  if (ngrams1.length > 0 && ngrams2.length > 0) {
    const ngSet1 = new Set(ngrams1);
    const ngSet2 = new Set(ngrams2);
    let commonNg = 0;
    for (const ng of ngSet1) {
      if (ngSet2.has(ng)) commonNg++;
    }
    ngramScore = (2 * commonNg) / (ngSet1.size + ngSet2.size);
  }

  const structuralScore = tokenDice * 0.4 + ngramScore * 0.6;

  return {
    score: Math.min(1.0, Math.max(0, structuralScore)),
    isCode: true,
    tokens1Count: tokens1.length,
    tokens2Count: tokens2.length,
  };
}

module.exports = {
  isCodeSnippet,
  tokenizeCodeStructure,
  compareCodeSimilarity,
};
