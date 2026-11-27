/**
 * ZeroTrace AI Content Detector Utility
 * Evaluates LLM template signatures, transition markers, relative clause density,
 * sentence length predictability, and burstiness across general essays and formal correspondence.
 */

const { extractSentences } = require("./sentenceUtils");

const AI_PATTERNS = [
  /\bcore strengths are\b/i,
  /\bstrong foundation in\b/i,
  /\bworked extensively with\b/i,
  /\bbroader understanding of\b/i,
  /\bbroad understanding of\b/i,
  /\blooking for an opportunity where\b/i,
  /\bapply these skills\b/i,
  /\blearn from experienced\b/i,
  /\bgrow into a strong\b/i,
  /\bsolving real-world problems\b/i,
  /\bsolve real-world problems\b/i,
  /\bin conclusion\b/i,
  /\bit is important to note\b/i,
  /\bit is crucial to\b/i,
  /\bit is essential to\b/i,
  /\bfurthermore\b/i,
  /\bmoreover\b/i,
  /\btherefore\b/i,
  /\bconsequently\b/i,
  /\bmultifaceted\b/i,
  /\bparamount\b/i,
  /\btestament\b/i,
  /\bdelves into\b/i,
  /\btapestry\b/i,
  /\bcrucial\b/i,
  /\bholistic\b/i,
  /\bseamlessly\b/i,
  /\bleverage\b/i,
  /\bfoster\b/i,
  /\btransformative\b/i,
  /\belucidate\b/i,
  /\bpivotal\b/i,
  /\bin summary\b/i,
  /\bunderscores\b/i,
  /\bexemplifies\b/i,
  /\befficacious\b/i,
  /\bindispensable\b/i,
  /\bin today's\b/i,
  /\bplays a crucial role\b/i,
  /\bserves as a\b/i,
  /\ba wide range of\b/i,
  /\bcutting-edge\b/i,
  /\bstreamline\b/i,
  /\brobust\b/i,
  /\bscalable\b/i,
  /\bvaluable insights\b/i,
  /\bdrive meaningful\b/i,
  /\bfast-paced environment\b/i,
  /\bpassion for\b/i,
  /\bdemonstrated ability to\b/i,
  /\bproven track record\b/i,
  /\bwell-versed in\b/i,
  /\badept at\b/i,
  /\bhands-on experience in\b/i,
  /\bprofoundly enhances\b/i,
  /\bcomprehensive treatise\b/i,

  // ChatGPT institutional correspondence patterns
  /\bkindly request your permission\b/i,
  /\bgrant us permission\b/i,
  /\bwe assure you that we will\b/i,
  /\bwe would be grateful if\b/i,
  /\bmaintain discipline\b/i,
  /\brules and regulations\b/i,
  /\bfor this purpose\b/i,
  /\bthank you for your consideration\b/i,
  /\byours sincerely\b/i,
  /\bwithout any technical difficulties\b/i,
  /\bnecessary infrastructure\b/i,
  /\bsuitable and professional environment\b/i,
  /\bimportant for our career\b/i,
  /\bwe kindly request\b/i,
  /\bhope this email finds you well\b/i,
  /\bi am writing to request\b/i,
  /\bi am writing this email to\b/i,
  /\bprompt attention to this matter\b/i,
  /\blook forward to your positive response\b/i
];

function detectAIContent(text) {
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return { aiScore: 0, aiRisk: "LOW" };
  }

  const clean = text.trim();
  const rawSentences = extractSentences(clean);
  const words = clean.toLowerCase().split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  if (totalWords === 0) return { aiScore: 0, aiRisk: "LOW" };

  // Filter out short salutation/sign-off fragments (<= 4 words like "Yours sincerely", "VIT Bhopal University")
  const sentences = rawSentences.filter((s) => s.split(/\s+/).filter(Boolean).length > 4);
  const totalSentences = Math.max(1, sentences.length);

  // 1. LLM Pattern & Template Matches
  let matchedPatterns = 0;
  for (const pattern of AI_PATTERNS) {
    if (pattern.test(clean)) {
      matchedPatterns++;
    }
  }

  // 2. Sentence Length Uniformity (Burstiness) on body sentences
  const sentenceLengths = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
  const bodyTotalWords = sentenceLengths.reduce((a, b) => a + b, 0);
  const avgLen = bodyTotalWords / totalSentences;
  let variance = 0;
  sentenceLengths.forEach((len) => (variance += Math.pow(len - avgLen, 2)));
  const stdDev = Math.sqrt(variance / totalSentences);
  const burstiness = avgLen > 0 ? stdDev / avgLen : 0;

  // 3. Connective & Relative Clause Density
  const relativeClauses = (clean.match(/,\s*(which|where|allowing|enabling|ensuring|helping|while|built|including|along with|as these)\b/gi) || []).length;
  const listCoordinators = (clean.match(/,\s*and\s+/gi) || []).length;

  // 4. Uniform sentence length bracket (16-40 words)
  const uniformLengthCount = sentenceLengths.filter((len) => len >= 16 && len <= 40).length;
  const uniformityRatio = uniformLengthCount / totalSentences;

  // 5. Calculate Composite AI Score
  let score = 0;

  // Pattern matches (up to 55 pts)
  score += Math.min(55, matchedPatterns * 10);

  // Subordinate / connective clauses (up to 20 pts)
  if (relativeClauses >= 1) score += 10;
  if (relativeClauses >= 3) score += 10;
  if (listCoordinators >= 2) score += 10;

  // Syntactic uniformity (up to 20 pts)
  if (totalSentences >= 2 && uniformityRatio >= 0.5) {
    score += 15;
  }
  if (totalSentences >= 2 && burstiness < 0.55) {
    score += 10;
  }

  // Sentence length structure (15-40 words average)
  if (avgLen >= 15 && avgLen <= 40) {
    score += 10;
  }

  const aiScore = Math.max(0, Math.min(100, Math.round(score)));

  let aiRisk = "LOW";
  if (aiScore >= 60) aiRisk = "HIGH";
  else if (aiScore >= 30) aiRisk = "MEDIUM";

  return {
    aiScore,
    aiRisk,
  };
}

module.exports = detectAIContent;
