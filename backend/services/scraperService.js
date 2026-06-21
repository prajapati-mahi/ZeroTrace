const axios = require("axios");
const cheerio = require("cheerio");

const scrapeWebsite = async (url) => {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    return $("body").text();
  } catch (error) {
    return "";
  }
};

module.exports = scrapeWebsite;