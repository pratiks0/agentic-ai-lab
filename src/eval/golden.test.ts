import { describe, it, expect } from "vitest";
import { loadDocs } from "../rag/ingest";
import { runAgent } from "../graph/graph";

describe("golden", () => {
  it("finds 2 dinners with citations", async () => {
    loadDocs();
    const q = "high-protein vegetarian quick dinner plan";
    const res = await runAgent(q);
    expect(res.report.items.length).toBeGreaterThanOrEqual(2);
    expect(res.report.citations.length).toBeGreaterThan(0);
    expect(res.report.confidence).toBeGreaterThan(0);
  });
});
