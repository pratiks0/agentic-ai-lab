import * as fs from "fs";
import * as path from "path";

declare var __dirname: string;

export type Doc = { id: string; text: string };

let docs: Doc[] = [];

export function loadDocs() {
  const dir = path.join(__dirname, "kb");
  const files = fs.readdirSync(dir);
  docs = files.map((f: string) => ({
    id: f,
    text: fs.readFileSync(path.join(dir, f), "utf-8")
  }));
}

export function searchDocs(query: string, k = 3) {
  // naive search: score by # of query words present (simple for learning)
  const q = query.toLowerCase().split(/\W+/).filter(Boolean);
  const scored = docs.map(d => {
    const t = d.text.toLowerCase();
    const s = q.reduce((acc, w) => acc + (t.includes(w) ? 1 : 0), 0);
    return { doc: d, score: s };
  }).sort((a, b) => b.score - a.score);
  return scored.slice(0, k).map(x => ({ source: x.doc.id, snippet: x.doc.text.slice(0, 200) + "..." }));
}
