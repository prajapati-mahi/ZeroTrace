const fs = require("fs");
const path = require("path");

const part1 = require("./dataset_part1");
const part2 = require("./dataset_part2");
const part3 = require("./dataset_part3");
const part4 = require("./dataset_part4");

const fullDataset = [...part1, ...part2, ...part3, ...part4];

const jsonPath = path.join(__dirname, "dataset.json");
fs.writeFileSync(jsonPath, JSON.stringify(fullDataset, null, 2), "utf8");
console.log(`Successfully compiled dataset.json with ${fullDataset.length} test cases!`);

module.exports = fullDataset;
