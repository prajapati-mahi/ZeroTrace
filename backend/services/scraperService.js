const axios = require("axios");
const cheerio = require("cheerio");

const scrapeWebsite = async (url) => {
  try {
    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const $ = cheerio.load(data);

    $("script, style, noscript, nav, footer, header, aside").remove();

    return $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim();
  } catch (err) {
    return "";
  }
};

module.exports = scrapeWebsite;