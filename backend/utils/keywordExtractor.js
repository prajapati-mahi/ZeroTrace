const natural = require("natural");
const sw = require("stopword");

const tokenizer = new natural.WordTokenizer();

const EXTRA_STOPWORDS = [
    "given",
    "where",
    "there",
    "only",
    "that",
    "this",
    "their",
    "would",
    "could",
    "should",
    "using",
    "respectively",
    "respect",
    "note",
    "find",
    "return",
    "returns"
];

function extractKeywords(text, limit = 12) {

    let words = tokenizer.tokenize(text.toLowerCase());

    // Keep only letters and digits
    words = words.map(word =>
        word.replace(/[^a-z0-9]/g, "")
    );

    // Remove empty strings
    words = words.filter(Boolean);

    // Remove common English stopwords
    words = sw.removeStopwords(words);

    // Remove our custom stopwords
    words = words.filter(
        word => !EXTRA_STOPWORDS.includes(word)
    );

    // Keep words of length >= 3
    words = words.filter(
        word => word.length >= 3
    );

    // Stem
    words = words.map(word =>
        natural.PorterStemmer.stem(word)
    );

    const frequency = {};

    words.forEach(word => {

        frequency[word] =
            (frequency[word] || 0) + 1;

    });

    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([word]) => word);

}

module.exports = extractKeywords;