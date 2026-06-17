const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: true,
    },

    risk: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model(
  "Report",
  reportSchema
);

module.exports = Report;