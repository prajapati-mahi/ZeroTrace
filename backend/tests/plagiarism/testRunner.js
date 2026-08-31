/**
 * ZeroTrace Automated Plagiarism Engine Test Suite Runner
 * Evaluates the multi-signal detection engine across 70 test cases.
 */

const dataset = require("./dataset");
const plagiarismEngine = require("../../engine/plagiarismEngine");

async function runTests() {
  console.log("==========================================================================");
  console.log("             ZEROTRACE PLAGIARISM DETECTION ENGINE TEST SUITE             ");
  console.log("==========================================================================");
  console.log(`Total Test Cases: ${dataset.length}\n`);

  let totalPassed = 0;
  let totalFailed = 0;
  const categoryStats = {};
  const results = [];
  const startTime = Date.now();

  for (const test of dataset) {
    if (!categoryStats[test.category]) {
      categoryStats[test.category] = { total: 0, passed: 0, failed: 0, scores: [] };
    }
    categoryStats[test.category].total++;

    const tStart = Date.now();
    const res = await plagiarismEngine(test.input, {
      referenceDocs: [
        {
          title: test.name,
          link: "https://example.com/source",
          domain: "example.com",
          content: test.original,
        },
      ],
      localOnly: true,
    });
    const tDuration = Date.now() - tStart;

    const actual = res.plagiarismScore;
    const passed = actual >= test.expectedMin && actual <= test.expectedMax;

    if (passed) {
      totalPassed++;
      categoryStats[test.category].passed++;
    } else {
      totalFailed++;
      categoryStats[test.category].failed++;
    }

    categoryStats[test.category].scores.push(actual);

    results.push({
      id: test.id,
      category: test.category,
      name: test.name,
      expected: `${test.expectedMin}% - ${test.expectedMax}%`,
      actual: `${actual}%`,
      passed,
      duration: `${tDuration}ms`,
      matchType: res.matchedSentences?.[0]?.matchType || "None",
      confidence: res.matchedSentences?.[0]?.confidence || "LOW",
    });
  }

  const totalDuration = Date.now() - startTime;
  const avgDuration = (totalDuration / dataset.length).toFixed(1);

  // Print results table
  console.log("---------------------------------------------------------------------------------------------------------");
  console.log("| ID           | Category               | Expected Range | Actual | Status | Match Type     | Conf     |");
  console.log("---------------------------------------------------------------------------------------------------------");
  for (const r of results) {
    const pad = (s, len) => (s + " ".repeat(len)).slice(0, len);
    const status = r.passed ? "PASS " : "FAIL*";
    console.log(
      `| ${pad(r.id, 12)} | ${pad(r.category, 22)} | ${pad(r.expected, 14)} | ${pad(r.actual, 6)} | ${status}  | ${pad(r.matchType, 14)} | ${pad(r.confidence, 8)} |`
    );
  }
  console.log("---------------------------------------------------------------------------------------------------------");

  console.log("\n==========================================================================");
  console.log("                            CATEGORY BREAKDOWN                            ");
  console.log("==========================================================================");
  for (const [cat, stat] of Object.entries(categoryStats)) {
    const rate = Math.round((stat.passed / stat.total) * 100);
    const avgScore = (stat.scores.reduce((a, b) => a + b, 0) / stat.total).toFixed(1);
    console.log(
      `• ${cat.padEnd(25)}: ${stat.passed}/${stat.total} Passed (${rate}%) | Avg Score: ${avgScore}%`
    );
  }

  const passRate = Math.round((totalPassed / dataset.length) * 100);
  console.log("\n==========================================================================");
  console.log(`FINAL RESULT: ${totalPassed}/${dataset.length} PASSED (${passRate}%)`);
  console.log(`Average Latency per Test: ${avgDuration}ms | Total Time: ${totalDuration}ms`);
  console.log("==========================================================================\n");

  return { totalPassed, totalFailed, total: dataset.length, passRate, results };
}

if (require.main === module) {
  runTests().then((res) => {
    if (res.totalFailed > 0) {
      console.warn(`Warning: ${res.totalFailed} tests outside expected range.`);
    }
  });
}

module.exports = runTests;
