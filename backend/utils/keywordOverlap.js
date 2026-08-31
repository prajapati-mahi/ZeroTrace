const preprocessText = require("./textPreprocessor");

function keywordOverlap(sentence1, sentence2) {

    const words1 = new Set(preprocessText(sentence1));
    const words2 = new Set(preprocessText(sentence2));

    let common = 0;

    for (const word of words1) {

        if (words2.has(word)) {

            common++;

        }

    }

    return common;
}

module.exports = keywordOverlap;