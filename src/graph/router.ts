import { chatJSON } from "../openai";
import { RouterOutput } from "./types";

export async function routerNode(userQuery: string) {
  const sys = `You are a router. Classify the task.
Output JSON: {"taskType":"research|action","profile":"default|food"}.`;
  const res = await chatJSON(sys, `Query: ${userQuery}`, process.env.MODEL_CHEAP!);
  const parsed = RouterOutput.safeParse(JSON.parse(res));
  if (!parsed.success) return { taskType: "research", profile: "food" } as const;
  return parsed.data;
}
