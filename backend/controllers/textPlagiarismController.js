const searchWeb = require(
  "../services/searchService"
);

const scrapeWebsite = require(
  "../services/scraperService"
);

const calculateSimilarity = require(
  "../utils/similarity"
);

const checkTextPlagiarism = async (
  req,
  res
) => {
  try {
    const { text } = req.body;

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

      for (const sentence of websiteSentences) {

        const cleanSentence =
          sentence.trim();

        if (
          cleanSentence.length < 20
        ) {
          continue;
        }

        const currentScore =
          calculateSimilarity(
            text,
            cleanSentence
          );

        if (
          currentScore >
          bestMatch
        ) {
          bestMatch =
            currentScore;
        }
      }

      const score =
        bestMatch;

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
    }

    res.status(200).json({
      plagiarismScore:
        highestScore,
      sources:
        matchedSources,
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