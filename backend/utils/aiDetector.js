const detectAIContent = (text) => {

  const words = text.split(/\s+/);

  const totalWords = words.length;

  const uniqueWords =
    new Set(words).size;

  const lexicalDiversity =
    uniqueWords / totalWords;

  const sentences =
    text.split(/[.!?]/)
      .filter(
        sentence =>
          sentence.trim().length > 0
      );

  let avgSentenceLength = 0;

  if (sentences.length > 0) {

    avgSentenceLength =
      totalWords /
      sentences.length;

  }

  let aiScore = 0;

  if (lexicalDiversity > 0.75) {
    aiScore += 30;
  }

  if (avgSentenceLength > 18) {
    aiScore += 30;
  }

  if (
    text.toLowerCase()
      .includes("furthermore")
  ) {
    aiScore += 10;
  }

  if (
    text.toLowerCase()
      .includes("moreover")
  ) {
    aiScore += 10;
  }

  if (
    text.toLowerCase()
      .includes("therefore")
  ) {
    aiScore += 10;
  }

  if (aiScore > 100) {
    aiScore = 100;
  }

  let aiRisk = "LOW";

  if (aiScore >= 70) {
    aiRisk = "HIGH";
  }
  else if (aiScore >= 40) {
    aiRisk = "MEDIUM";
  }

  return {
    aiScore,
    aiRisk,
  };

};

module.exports = detectAIContent;