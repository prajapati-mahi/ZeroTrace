const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    plagiarismScore: {
      type: Number,
      default: 0,
    },
    aiScore: {
      type: Number,
      default: 0,
    },
    risk: {
      type: String,
      default: "LOW",
    },
    analysis: {
      exactMatch: { type: Number, default: 0 },
      nearExactMatch: { type: Number, default: 0 },
      semanticSimilarity: { type: Number, default: 0 },
    },
    stats: {
      inputWords: { type: Number, default: 0 },
      matchedWords: { type: Number, default: 0 },
      totalSentences: { type: Number, default: 0 },
      matchedSentencesCount: { type: Number, default: 0 },
      coveragePercent: { type: Number, default: 0 },
    },
    matches: [
      {
        title: String,
        link: String,
        domain: String,
        score: Number,
        confidence: String,
        matchedPassages: Number,
      },
    ],
    matchedSentences: [
      {
        sentence: String,
        matchedPassage: String,
        source: String,
        sourceTitle: String,
        score: Number,
        matchType: String,
        confidence: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);
