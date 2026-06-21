const axios = require("axios");

const searchWeb = async (query) => {
  try {
    const response = await axios.get(
      "https://serpapi.com/search.json",
      {
        params: {
          engine: "google",
          q: query,
          api_key: process.env.SERP_API_KEY,
        },
      }
    );

    return response.data.organic_results || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = searchWeb;