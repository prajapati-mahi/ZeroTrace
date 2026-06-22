const searchWeb = require(
  "../services/searchService"
);

const Report = require("../models/Report");

const scrapeWebsite = require(
  "../services/scraperService"
);

const calculateSimilarity = require(
  "../utils/similarity"
);

const detectAIContent = require(
  "../utils/aiDetector"
);

console.log(
  "AI Detector:",
  detectAIContent
);

const checkTextPlagiarism = async (
  req,
  res
) => {
  try {

    const { text } = req.body;
    const aiResult = detectAIContent(text);

    if (!text) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const searchResults =
      await searchWeb(
        text.slice(0, 150)
      );

    console.log(
      "Search Results:",
      searchResults
    );

    let highestScore = 0;

    const matchedSources = [];

    const matchedSentences = [];

    const inputSentences =
      text.split(/[.!?]/);

    for (const result of searchResults) {

      const websiteText =
        await scrapeWebsite(
          result.link
        );

      if (!websiteText)
        continue;

      const websiteSentences =
        websiteText.split(/[.!?]/);

      let bestMatch = 0;

      for (const websiteSentence of websiteSentences) {

        const cleanWebsiteSentence =
          websiteSentence.trim();

        if (
          cleanWebsiteSentence.length < 20
        ) {
          continue;
        }

        const currentScore =
          calculateSimilarity(
            text,
            cleanWebsiteSentence
          );

        if (
          currentScore >
          bestMatch
        ) {
          bestMatch =
            currentScore;
        }

      }

      const score = bestMatch;

      if (
        score > highestScore
      ) {
        highestScore =
          score;
      }

      if (score >= 25) {

        matchedSources.push({
          title:
            result.title,
          link:
            result.link,
          score,
        });

      }

      // Sentence Level Matching

      for (const inputSentence of inputSentences) {

        const cleanInputSentence =
          inputSentence.trim();

        if (
          cleanInputSentence.length < 20
        ) {
          continue;
        }

        for (const websiteSentence of websiteSentences) {

          const cleanWebsiteSentence =
            websiteSentence.trim();

          if (
            cleanWebsiteSentence.length < 20
          ) {
            continue;
          }

          const sentenceScore =
            calculateSimilarity(
              cleanInputSentence,
              cleanWebsiteSentence
            );

          if (
            sentenceScore >= 30
          ) {

            matchedSentences.push({
              sentence:
                cleanInputSentence,
              source:
                result.link,
              score:
                sentenceScore,
            });

          }

        }

      }

    }

    const report = await Report.create({
  title:
    text.length > 40
      ? text.substring(0, 40) + "..."
      : text,

  text,

  plagiarismScore:
    highestScore,

  aiScore:
    aiResult.aiScore,

  risk:
    aiResult.aiRisk,

  matches: matchedSources,
});

res.status(200).json({
  plagiarismScore:
    highestScore,

  aiScore:
    aiResult.aiScore,

  aiRisk:
    aiResult.aiRisk,

  sources:
    matchedSources,

  matchedSentences,

  reportId:
    report._id,
});
  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        error.message,
    });

  }
};

module.exports = {
  checkTextPlagiarism,
};