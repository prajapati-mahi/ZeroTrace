/**
 * Jaccard Similarity
 */

const jaccardSimilarity = (a, b) => {

  const setA = new Set(
    a.toLowerCase().split(/\s+/)
  );

  const setB = new Set(
    b.toLowerCase().split(/\s+/)
  );

  const intersection =
    [...setA].filter((word) =>
      setB.has(word)
    );

  const union =
    new Set([...setA, ...setB]);

  return (
    (intersection.length /
      union.size) *
    100
  );
};

/**
 * Dice Coefficient
 */

const diceCoefficient = (a, b) => {

  const wordsA =
    a.toLowerCase().split(/\s+/);

  const wordsB =
    b.toLowerCase().split(/\s+/);

  let common = 0;

  wordsA.forEach((word) => {

    if (wordsB.includes(word)) {

      common++;

    }

  });

  return (
    (2 * common /
      (wordsA.length +
        wordsB.length)) *
    100
  );
};

/**
 * Final Similarity Score
 */

const calculateSimilarity = (
  sentenceA,
  sentenceB
) => {

  const jaccard =
    jaccardSimilarity(
      sentenceA,
      sentenceB
    );

  const dice =
    diceCoefficient(
      sentenceA,
      sentenceB
    );

  return (
    (jaccard + dice) / 2
  );
};

module.exports =
  calculateSimilarity;