import { chatJSON } from "../openai";
import { Plan } from "./types";

export async function plannerNode(goal: string) {
  const sys = `You are a planner. Break goal into 3-5 steps. Types: retrieve/tool/analyze.
Output Plan JSON {"goal": "...","steps":[{"id":"s1","type":"retrieve","detail":"..."}]}.`;
  const res = await chatJSON(sys, `Goal: ${goal}`, process.env.MODEL_REASONING!);
  const parsed = Plan.safeParse(JSON.parse(res));
  if (!parsed.success) {
    return {
      goal,
      steps: [
        { id: "s1", type: "retrieve", detail: "Get high-protein veg dinners under 30 mins" },
        { id: "s2", type: "retrieve", detail: "Get pantry swaps & protein basics" },
        { id: "s3", type: "tool", detail: "Call webSearch for 2 fresh examples" },
        { id: "s4", type: "analyze", detail: "Merge results; prepare 3-day plan" }
      ]
    };
  }
  return parsed.data;
}
