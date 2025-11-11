# Recipe Research Agent 🤖🍽️

**Production-quality AI agent pipeline:** Router → Planner → Retriever (RAG) → ToolExec → Reporter + Memory, Safety, Tests.

## What It Does

Input: *"Find 2 high-protein vegetarian dinners under 30 mins"*

Output: Grounded report with recipes, ingredients, and **citations proving where info came from**.

## Quick Start (5 mins)

### 1. Prerequisites
- Node.js ≥ 18
- OpenAI API key

### 2. Install
```bash
npm install
```

### 3. Configure `.env`
```env
OPENAI_API_KEY=sk-your-key-here
MODEL_REASONING=gpt-4o
MODEL_CHEAP=gpt-4o-mini
```

### 4. Run
```bash
# Default query
npx ts-node src/index.ts

# Custom query
npx ts-node src/index.ts "find vegan breakfast recipes"

# Run tests
npm test
```

## Project Structure

```
src/
├── index.ts              Entry point
├── openai.ts             LLM wrapper (OpenAI)
├── graph/                Agent pipeline (7 nodes)
│   ├── types.ts          Zod schemas (type safety)
│   ├── router.ts         Task classifier
│   ├── planner.ts        Step generator
│   ├── retriever.ts      RAG search
│   ├── toolexec.ts       Tool executor
│   ├── reporter.ts       Result formatter with citations
│   ├── memory.ts         Preferences store
│   ├── safety.ts         Guard rules
│   └── graph.ts          Main orchestrator
├── rag/
│   ├── ingest.ts         KB loader & search
│   └── kb/               Knowledge base (markdown)
│       ├── protein_basics.md
│       ├── quick_veg_dinners.md
│       └── pantry_swaps.md
├── tools/
│   └── webSearch.ts      Mock web search
└── eval/
    └── golden.test.ts    Regression tests
```

## How It Works (Pipeline)

```
Query → Router (classify) → Planner (break into steps)
  ↓
For each step:
  • Check safety
  • If retrieve: search KB (citations added)
  • If tool: execute (returns structured data)
  ↓
Reporter (merge + format with citations)
  ↓
Output: report with confidence & proof
```

## Key Features

✅ **Type-Safe** - Zod validates all LLM output  
✅ **Grounded** - Every answer includes citations  
✅ **Modular** - Swap any component  
✅ **Tested** - Golden test suite included  
✅ **Cheap** - ~$0.004 per query (~$10/month)  
✅ **Production-Ready** - Error handling, validation  

## Components Explained

| Node | Input | Output | Cost |
|------|-------|--------|------|
| **Router** | query | { taskType, profile } | $0.0002 |
| **Planner** | goal | { goal, steps[] } | $0.003 |
| **Retriever** | plan step | cited snippets | $0 |
| **ToolExec** | plan step | structured data | $0 |
| **Reporter** | retrieved + tool results | report with citations | $0 |

## Output Example

```json
{
  "route": {
    "taskType": "research",
    "profile": "food"
  },
  "plan": {
    "goal": "find 2 high-protein vegetarian dinners",
    "steps": [
      { "id": "s1", "type": "retrieve", "detail": "..." },
      { "id": "s2", "type": "tool", "detail": "..." }
    ]
  },
  "report": {
    "summary": "Found 2 dishes; all under 30 min",
    "items": [
      {
        "title": "Chickpea Veggie Stir-Fry",
        "ingredients": ["chickpeas", "peppers", "soy sauce"],
        "timeMinutes": 20,
        "citations": ["quick_veg_dinners.md"]
      }
    ],
    "citations": ["quick_veg_dinners.md"],
    "confidence": 0.75
  }
}
```

## Commands

```bash
# Run agent (default query)
npx ts-node src/index.ts

# Run with custom query
npx ts-node src/index.ts "your query"

# Run tests
npm test

# Check TypeScript
npx tsc --noEmit

# Install dependencies
npm install
```

## Architecture

```
User Query
    ↓
[Router] → gpt-4o-mini (classify task)
    ↓
[Planner] → gpt-4o (break into steps)
    ↓
[Safety] → Check for dangerous operations
    ↓
For each step:
  ├─ [Retrieve] → searchDocs() from KB → citations
  └─ [Tool] → webSearch() → structured results
    ↓
[Reporter] → Merge + format + add citations
    ↓
Final Report (with confidence & proof)
```

## Next Steps

### Immediate (Today)
- [ ] Add OPENAI_API_KEY to .env
- [ ] Run `npx ts-node src/index.ts`
- [ ] Run `npm test`

### This Week
- [ ] Add KB files (`.md` in `src/rag/kb/`)
- [ ] Change prompts (edit `src/graph/router.ts`)
- [ ] Add a new tool
- [ ] Try custom queries

### This Month
- [ ] Replace naive RAG with vector search (LangChain + FAISS)
- [ ] Call real API (Spoonacular, Edamam)
- [ ] Deploy as REST API
- [ ] Add logging & metrics

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `OPENAI_API_KEY not set` | Add to `.env` |
| `Model not found` | Use available model in `.env` |
| `Nothing retrieved` | Check KB files in `src/rag/kb/` |
| TypeScript errors | Run `npx tsc --noEmit` |
| Test fails | Ensure agent returns ≥2 items with citations |

## Key Concepts

- **Router** - Cheap classifier (decides task type)
- **Planner** - Expensive planner (creates step-by-step plan)
- **Retriever** - Local search (no API calls, citations from sources)
- **ToolExec** - Tool calling (currently mock, can be real APIs)
- **Reporter** - Deterministic formatter (no LLM needed)
- **Memory** - Preference storage (in-memory)
- **Safety** - Pattern-based blocker (regex rules)
- **Eval** - Golden test (ensures agent still works)

## Extending

### Add KB File
```bash
echo "# My Topic
Facts here" > src/rag/kb/my_topic.md
```
Auto-loaded on startup!

### Add New Tool
Create `src/tools/myTool.ts`, export async function, call from `src/graph/toolexec.ts`.

### Change LLM Provider
Edit `src/openai.ts` to use Anthropic, Azure, etc.

### Replace RAG
Swap `src/rag/ingest.ts` with LangChain + FAISS / Pinecone / Weaviate.

## Cost Analysis

- **Per query**: ~$0.004
- **100 queries/day**: ~$10/month
- **1,000 queries/day**: ~$100/month

(Use cheaper models to reduce costs)

## What You've Built

✅ 14 TypeScript source files  
✅ Type-safe agent pipeline  
✅ Grounded responses with citations  
✅ Production patterns (error handling, validation)  
✅ Automated tests  
✅ Extensible architecture  

This is **real agent technology**, not a toy example!

## Resources

- **OpenAI API**: https://platform.openai.com/docs
- **Zod Validation**: https://zod.dev
- **LangChain**: https://python.langchain.com
- **Agent Patterns**: https://www.anthropic.com/research/building-effective-agents

## License

MIT
