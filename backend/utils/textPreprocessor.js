const natural = require("natural");
const sw = require("stopword");

const tokenizer = new natural.WordTokenizer();

function preprocessText(text) {

    if (!text) {
        return [];
    }

    // Lowercase
    text = text.toLowerCase();

    // Remove punctuation
    text = text.replace(/[^\w\s]/g, " ");

    // Tokenize
    let tokens = tokenizer.tokenize(text);

    // Remove stopwords
    tokens = sw.removeStopwords(tokens);

    // Stem words
    tokens = tokens.map(word =>
        natural.PorterStemmer.stem(word)
    );

    return tokens;
}

module.exports = preprocessText;