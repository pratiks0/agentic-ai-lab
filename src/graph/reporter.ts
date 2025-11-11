import { Report } from "./types";

export async function reporterNode(options: {
  goal: string;
  retrieved: Array<{ source: string; snippet: string }>;
  toolResults: Array<{ title: string; ingredients?: string[]; timeMinutes?: number; url?: string }>;
}) {
  // Simple merge: pick top 2 meals from toolResults, enrich with RAG notes
  const items = (options.toolResults || []).slice(0, 2).map(r => ({
    title: r.title,
    ingredients: r.ingredients ?? [],
    timeMinutes: r.timeMinutes ?? 20,
    citations: options.retrieved.map(x => x.source)
  }));
  const rep = {
    summary: `Plan: ${options.goal}. Found ${items.length} dishes; all under ~30 min.`,
    items,
    citations: options.retrieved.map(x => `${x.source}`),
    nextSteps: ["Pick 3-day schedule", "Create shopping list", "Save preferences"],
    confidence: 0.75
  };
  return Report.parse(rep);
}
