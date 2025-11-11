import { z } from "zod";

export const RouterOutput = z.object({
  taskType: z.enum(["research","action"]),
  profile: z.enum(["default","food"]),
});
export type TRouterOutput = z.infer<typeof RouterOutput>;

export const Plan = z.object({
  goal: z.string(),
  steps: z.array(z.object({
    id: z.string(),
    type: z.enum(["retrieve","tool","analyze"]),
    detail: z.string()
  }))
});
export type TPlan = z.infer<typeof Plan>;

export const RetrievalItem = z.object({
  source: z.string(),  // file name
  snippet: z.string()  // small excerpt
});
export type TRetrievalItem = z.infer<typeof RetrievalItem>;

export const Report = z.object({
  summary: z.string(),
  items: z.array(z.object({
    title: z.string(),
    ingredients: z.array(z.string()).optional(),
    timeMinutes: z.number().optional(),
    citations: z.array(z.string()).default([])
  })),
  citations: z.array(z.string()),
  nextSteps: z.array(z.string()),
  confidence: z.number().min(0).max(1)
});
export type TReport = z.infer<typeof Report>;
