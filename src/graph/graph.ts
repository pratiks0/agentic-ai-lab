import { routerNode } from "./router";
import { plannerNode } from "./planner";
import { retrieverNode } from "./retriever";
import { toolExecNode } from "./toolexec";
import { reporterNode } from "./reporter";
import { safetyCheck } from "./safety";

export async function runAgent(userQuery: string) {
  // Router
  const route = await routerNode(userQuery);

  // Planner
  const plan = await plannerNode(userQuery);

  // Execute plan sequentially (simple flow)
  let retrieved: Array<{ source: string; snippet: string }> = [];
  let toolResults: any[] = [];

  for (const step of plan.steps) {
    const safe = safetyCheck(step.detail);
    if (!safe.allowed) throw new Error(`Blocked by safety: ${safe.reason}`);

    if (step.type === "retrieve") {
      const r = await retrieverNode(step.detail);
      retrieved = retrieved.concat(r);
    }
    if (step.type === "tool") {
      const t = await toolExecNode(step.detail);
      toolResults = toolResults.concat(t);
    }
    // analyze step is implicit in reporter for this simple build
  }

  // Reporter
  const report = await reporterNode({ goal: plan.goal, retrieved, toolResults });
  return { route, plan, report };
}
