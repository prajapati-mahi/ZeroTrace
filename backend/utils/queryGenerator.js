const {
  createSearchChunks,
} = require("./sentenceUtils");

/**
 * Generate multiple Google search queries
 * from the user's text.
 */

const generateQueries = (text) => {

  const chunks =
    createSearchChunks(text);

  const queries = [];

  for (const chunk of chunks) {

    if (chunk.length > 80) {

      queries.push(
        chunk.substring(0, 250)
      );

    }

    if (queries.length >= 5) break;
  }

  return queries;
};

module.exports = generateQueries;