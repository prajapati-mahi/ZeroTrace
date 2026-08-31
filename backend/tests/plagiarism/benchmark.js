/**
 * ZeroTrace Plagiarism Detection Engine Benchmark Script
 * Measures processing latency, throughput (requests/sec), memory footprint, and detection precision/recall.
 */

const dataset = require("./dataset");
const plagiarismEngine = require("../../engine/plagiarismEngine");

async function runBenchmark() {
  console.log("==========================================================================");
  console.log("             ZEROTRACE PERFORMANCE & ACCURACY BENCHMARK                  ");
  console.log("==========================================================================\n");

  const initialMemory = process.memoryUsage().heapUsed / 1024 / 1024;
  const latencies = [];
  let truePositives = 0;
  let falsePositives = 0;
  let trueNegatives = 0;
  let falseNegatives = 0;

  const startBenchmark = Date.now();

  for (const test of dataset) {
    const start = process.hrtime.bigint();
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
    const end = process.hrtime.bigint();
    const latencyMs = Number(end - start) / 1000000;
    latencies.push(latencyMs);

    const isPlagiarizedGroundTruth = test.category !== "Unrelated";
    const isPlagiarizedPredicted = res.plagiarismScore >= 30;

    if (isPlagiarizedGroundTruth && isPlagiarizedPredicted) truePositives++;
    else if (!isPlagiarizedGroundTruth && isPlagiarizedPredicted) falsePositives++;
    else if (!isPlagiarizedGroundTruth && !isPlagiarizedPredicted) trueNegatives++;
    else if (isPlagiarizedGroundTruth && !isPlagiarizedPredicted) falseNegatives++;
  }

  const totalTimeSec = (Date.now() - startBenchmark) / 1000;
  const finalMemory = process.memoryUsage().heapUsed / 1024 / 1024;
  const memoryDelta = (finalMemory - initialMemory).toFixed(2);

  latencies.sort((a, b) => a - b);
  const minLatency = latencies[0].toFixed(2);
  const maxLatency = latencies[latencies.length - 1].toFixed(2);
  const avgLatency = (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2);
  const p50Latency = latencies[Math.floor(latencies.length * 0.5)].toFixed(2);
  const p95Latency = latencies[Math.floor(latencies.length * 0.95)].toFixed(2);
  const p99Latency = latencies[Math.floor(latencies.length * 0.99)].toFixed(2);
  const throughput = (dataset.length / totalTimeSec).toFixed(1);

  const precision = (truePositives / (truePositives + falsePositives || 1)) * 100;
  const recall = (truePositives / (truePositives + falsePositives || 1)) * 100;
  const accuracy = ((truePositives + trueNegatives) / dataset.length) * 100;
  const f1Score = (2 * (precision * recall)) / (precision + recall || 1);

  console.log("--------------------------------------------------------------------------");
  console.log("LATENCY METRICS (Local Comparison Engine):");
  console.log(`• Average Latency : ${avgLatency} ms`);
  console.log(`• 50th Percentile : ${p50Latency} ms`);
  console.log(`• 95th Percentile : ${p95Latency} ms`);
  console.log(`• 99th Percentile : ${p99Latency} ms`);
  console.log(`• Min / Max       : ${minLatency} ms / ${maxLatency} ms`);
  console.log(`• Throughput      : ${throughput} checks / second`);
  console.log(`• Memory Delta    : ${memoryDelta} MB (Peak Heap: ${finalMemory.toFixed(2)} MB)`);
  console.log("--------------------------------------------------------------------------");
  console.log("DETECTION ACCURACY METRICS:");
  console.log(`• Accuracy        : ${accuracy.toFixed(1)}%`);
  console.log(`• Precision       : ${precision.toFixed(1)}%`);
  console.log(`• Recall          : ${recall.toFixed(1)}%`);
  console.log(`• F1-Score        : ${f1Score.toFixed(1)}%`);
  console.log(`• False Positives : ${falsePositives}`);
  console.log(`• False Negatives : ${falseNegatives}`);
  console.log("==========================================================================\n");
}

if (require.main === module) {
  runBenchmark();
}

module.exports = runBenchmark;
