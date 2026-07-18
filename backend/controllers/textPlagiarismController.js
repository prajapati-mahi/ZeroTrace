const searchWeb = require("../services/searchService");
const scrapeWebsite = require("../services/scraperService");

const Report = require("../models/Report");

const calculateSimilarity = require("../utils/similarity");
const detectAIContent = require("../utils/aiDetector");

const generateQueries = require("../utils/queryGenerator");

const {
    extractSentences,
} = require("../utils/sentenceUtils");

const checkTextPlagiarism = async (req, res) => {

    try {

        const { text } = req.body;

        if (!text || text.trim().length === 0) {

            return res.status(400).json({
                message: "Text is required",
            });

        }

        const aiResult =
            detectAIContent(text);

        /*
        ---------------------------------
        Generate Multiple Search Queries
        ---------------------------------
        */

        const queries =
            generateQueries(text);

        let allSearchResults = [];

        for (const query of queries) {

            try {

                const results =
                    await searchWeb(query);

                allSearchResults.push(...results);

            }

            catch (err) {

                console.log(
                    "Search Error:",
                    err.message
                );

            }

        }

        /*
        ---------------------------------
        Remove Duplicate URLs
        ---------------------------------
        */

        const uniqueResults = [

            ...new Map(

                allSearchResults.map(
                    item => [

                        item.link,

                        item

                    ]
                )

            ).values()

        ];

        console.log(
            "Unique Search Results:",
            uniqueResults.length
        );

        /*
        ---------------------------------
        Prepare User Sentences
        ---------------------------------
        */

        const inputSentences =
            extractSentences(text);

        const matchedSentences = [];

        const sourceMap = {};

        let copiedSentenceCount = 0;

                /*
        ---------------------------------
        Compare Against Every Website
        ---------------------------------
        */

        for (const result of uniqueResults) {

            if (!result.link) continue;

            console.log("Scanning:", result.link);

            const websiteText =
                await scrapeWebsite(result.link);

            if (!websiteText) continue;

            const websiteSentences =
                extractSentences(websiteText);

            let sourceMatchedCount = 0;

            /*
            ---------------------------------
            Compare Sentence ↔ Sentence
            ---------------------------------
            */

            for (const inputSentence of inputSentences) {

                let bestScore = 0;

                for (const websiteSentence of websiteSentences) {

                    const score =
                        calculateSimilarity(
                            inputSentence,
                            websiteSentence
                        );

                    if (score > bestScore) {
                        bestScore = score;
                    }

                }

                /*
                ---------------------------------
                Sentence Considered Copied
                ---------------------------------
                */

                if (bestScore >= 75) {

                    copiedSentenceCount++;

                    sourceMatchedCount++;

                    matchedSentences.push({

                        sentence: inputSentence,

                        source: result.link,

                        score: Math.round(bestScore)

                    });

                }

            }

            /*
            ---------------------------------
            Store Source Contribution
            ---------------------------------
            */

            if (sourceMatchedCount > 0) {

                sourceMap[result.link] = {

                    title:
                        result.title || result.link,

                    link:
                        result.link,

                    score:
                        Math.round(
                            sourceMatchedCount /
                            inputSentences.length *
                            100
                        ),

                    matched:
                        sourceMatchedCount

                };

            }

        }

        /*
        ---------------------------------
        Remove Duplicate Sentences
        ---------------------------------
        */

        const uniqueMatchedSentences = [

            ...new Map(

                matchedSentences.map(
                    item => [

                        item.sentence,

                        item

                    ]
                )

            ).values()

        ];

        /*
        ---------------------------------
        Prepare Sources
        ---------------------------------
        */

        const matchedSources =
            Object.values(sourceMap)
            .sort(
                (a, b) =>
                    b.matched -
                    a.matched
            );

        /*
        ---------------------------------
        Calculate Final Plagiarism %
        ---------------------------------
        */

        const plagiarismScore =

            inputSentences.length === 0

            ? 0

            : Math.round(

                uniqueMatchedSentences.length

                /

                inputSentences.length

                *

                100

            );

        console.log(
            "Copied Sentences:",
            uniqueMatchedSentences.length
        );

        console.log(
            "Plagiarism:",
            plagiarismScore + "%"
        );

                /*
        ---------------------------------
        Save Report
        ---------------------------------
        */

        const report = await Report.create({

            user: req.user.id,

            title:

                text.length > 40

                    ? text.substring(0, 40) + "..."

                    : text,

            text,

            plagiarismScore,

            aiScore: aiResult.aiScore,

            risk: aiResult.aiRisk,

            matches: matchedSources.map(source => ({

                title: source.title,

                link: source.link,

                score: source.score

            }))

        });

        /*
        ---------------------------------
        Return Response
        ---------------------------------
        */

        return res.status(200).json({

            plagiarismScore,

            aiScore: aiResult.aiScore,

            aiRisk: aiResult.aiRisk,

            sources: matchedSources,

            matchedSentences: uniqueMatchedSentences,

            reportId: report._id

        });

    }

    catch (error) {

        console.error("Plagiarism Error:", error);

        return res.status(500).json({

            message: "Internal Server Error",

            error: error.message

        });

    }

};

module.exports = {
    checkTextPlagiarism
};