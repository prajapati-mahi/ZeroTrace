/**
 * ZeroTrace Normalizer Utility
 * Standardizes text and code across various inputs to ensure accurate comparison.
 */

const HTML_ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&mdash;": "-",
  "&ndash;": "-",
  "&hellip;": "...",
  "&trade;": "",
  "&copy;": "",
  "&reg;": "",
};

function decodeHtmlEntities(str) {
  if (!str || typeof str !== "string") return "";
  return str.replace(/&[a-zA-Z0-9#]+;/g, (match) => {
    if (HTML_ENTITIES[match]) return HTML_ENTITIES[match];
    if (match.startsWith("&#x")) {
      const hex = match.slice(3, -1);
      const code = parseInt(hex, 16);
      return !isNaN(code) ? String.fromCharCode(code) : match;
    }
    if (match.startsWith("&#")) {
      const dec = match.slice(2, -1);
      const code = parseInt(dec, 10);
      return !isNaN(code) ? String.fromCharCode(code) : match;
    }
    return match;
  });
}

function normalizeQuotesAndDashes(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035`]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036«»]/g, '"')
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, "-")
    .replace(/[\u2026]/g, "...")
    .replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, " ");
}

function normalizeWhitespace(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[ \f\v]+/g, " ")
    .replace(/\n\s*\n+/g, "\n\n")
    .trim();
}

function normalizeForComparison(str) {
  if (!str || typeof str !== "string") return "";
  let clean = decodeHtmlEntities(str);
  clean = clean.normalize("NFC");
  clean = normalizeQuotesAndDashes(clean);
  clean = clean.toLowerCase();
  clean = clean.replace(/[^\p{L}\p{N}\s]/gu, " ");
  clean = clean.replace(/\s+/g, " ").trim();
  return clean;
}

function cleanText(str) {
  if (!str || typeof str !== "string") return "";
  let clean = decodeHtmlEntities(str);
  clean = clean.normalize("NFC");
  clean = normalizeQuotesAndDashes(clean);
  clean = normalizeWhitespace(clean);
  return clean;
}

function stripCodeComments(code) {
  if (!code || typeof code !== "string") return "";
  let clean = code.replace(/\/\*[\s\S]*?\*\//g, "");
  clean = clean.replace(/\/\/.*$/gm, "");
  clean = clean.replace(/#.*$/gm, "");
  return clean;
}

function normalizeCode(code) {
  if (!code || typeof code !== "string") return "";
  let clean = stripCodeComments(code);
  clean = normalizeQuotesAndDashes(clean);
  clean = clean.replace(/\s+/g, " ").trim();
  return clean;
}

module.exports = {
  decodeHtmlEntities,
  normalizeQuotesAndDashes,
  normalizeWhitespace,
  normalizeForComparison,
  cleanText,
  stripCodeComments,
  normalizeCode,
};
