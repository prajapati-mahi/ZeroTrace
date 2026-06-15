const natural = require("natural");
const { removeStopwords } = require("stopword");

const tokenizer = new natural.WordTokenizer();

const calculateSimilarity = (text1, text2) => {
  const tokens1 = removeStopwords(
    tokenizer.tokenize(text1.toLowerCase())
  );

  const tokens2 = removeStopwords(
    tokenizer.tokenize(text2.toLowerCase())
  );

  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);

  const intersection = [...set1].filter(word =>
    set2.has(word)
  );

  const union = new Set([...set1, ...set2]);

  return Math.round(
    (intersection.length / union.size) * 100
  );
};

module.exports = calculateSimilarity;