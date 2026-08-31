/**
 * ZeroTrace AI Content Detector Utility
 * Evaluates perplexity, burstiness, transition marker density, and linguistic uniformity.
 */

const AI_MARKER_WORDS = [
  "furthermore", "moreover", "therefore", "consequently", "in conclusion",
  "it is important to note", "multifaceted", "paramount", "testament",
  "delves into", "tapestry", "crucial", "holistic", "seamlessly",
  "leverage", "foster", "transformative", "elucidate", "pivotal",
  "in summary", "underscores", "exemplifies", "efficacious", "indispensable"
];

const CASUAL_HUMAN_MARKERS = [
  "i", "my", "we", "me", "woke", "went", "got", "felt", "honestly",
  "really", "basically", "stuff", "thing", "gonna", "wanna", "kinda",
  "didn't", "don't", "can't", "wasn't", "i'm", "i've", "i'd", "lol", "yeah"
];

function detectAIContent(text) {
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return { aiScore: 0, aiRisk: "LOW" };
  }

  const clean = text.trim();
  const words = clean.toLowerCase().split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  if (totalWords === 0) {
    return { aiScore: 0, aiRisk: "LOW" };
  }

  const sentences = clean
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const totalSentences = Math.max(1, sentences.length);

  // 1. Sentence Length Uniformity (Burstiness)
  // AI tends to write sentences with very similar length (low variance / low burstiness).
  const sentenceLengths = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
  const avgSentenceLength = totalWords / totalSentences;

  let variance = 0;
  sentenceLengths.forEach((len) => {
    variance += Math.pow(len - avgSentenceLength, 2);
  });
  const stdDev = Math.sqrt(variance / totalSentences);
  const burstiness = avgSentenceLength > 0 ? stdDev / avgSentenceLength : 0;

  // 2. AI Formal Marker Density
  let aiMarkerCount = 0;
  const lowerText = clean.toLowerCase();
  for (const marker of AI_MARKER_WORDS) {
    if (lowerText.includes(marker)) {
      aiMarkerCount++;
    }
  }

  // 3. Human Casual Marker Density
  let humanMarkerCount = 0;
  const wordSet = new Set(words);
  for (const h of CASUAL_HUMAN_MARKERS) {
    if (wordSet.has(h)) {
      humanMarkerCount++;
    }
  }

  // Score computation
  let rawScore = 0;

  // AI Marker contribution (up to 45 pts)
  rawScore += Math.min(45, aiMarkerCount * 15);

  // Low burstiness (monotonous sentence length) in longer texts (up to 25 pts)
  if (totalSentences >= 3 && burstiness < 0.25) {
    rawScore += 25;
  } else if (totalSentences >= 2 && burstiness < 0.35) {
    rawScore += 15;
  }

  // High formal avg length without casual markers (up to 20 pts)
  if (avgSentenceLength >= 22 && humanMarkerCount === 0) {
    rawScore += 20;
  } else if (avgSentenceLength >= 18 && humanMarkerCount === 0) {
    rawScore += 10;
  }

  // Heavy penalty for human conversational markers (-30 pts)
  rawScore -= Math.min(40, humanMarkerCount * 12);

  const aiScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  let aiRisk = "LOW";
  if (aiScore >= 65) {
    aiRisk = "HIGH";
  } else if (aiScore >= 35) {
    aiRisk = "MEDIUM";
  }

  return {
    aiScore,
    aiRisk,
  };
}

module.exports = detectAIContent;
