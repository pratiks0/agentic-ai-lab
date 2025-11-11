import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function chatJSON(
  system: string,
  user: string,
  model: string
) {
  const resp = await openai.chat.completions.create({
    model,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ],
    temperature: 0
  });
  return resp.choices[0]?.message?.content ?? "{}";
}
