import "dotenv/config";
import { loadDocs } from "./rag/ingest";
import { runAgent } from "./graph/graph";

async function main() {
  loadDocs();
  const query = process.argv.slice(2).join(" ")
    || "find 2 high-protein vegetarian dinners under 30 mins and make a 3-day plan";
  const result = await runAgent(query);
  console.log("\n== ROUTE ==");
  console.log(result.route);
  console.log("\n== PLAN ==");
  console.log(result.plan);
  console.log("\n== REPORT ==");
  console.log(JSON.stringify(result.report, null, 2));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
