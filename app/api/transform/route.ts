// app/api/transform/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { STYLES, FEW_SHOT_EXAMPLES, type StyleKey, type VibeStyle, type FewShotExample } from "@/lib/styles";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { text, styleKey, returnPromptOnly } = await req.json();
    
    if (!text) return new Response("Missing text", { status: 400 });

    const style = STYLES.find((s) => s.key === styleKey);
    if (!style) return new Response("Invalid style", { status: 400 });

    const examples = FEW_SHOT_EXAMPLES[styleKey as StyleKey] || [];
    const prompt = buildPrompt(text, style, examples);

    // If the user just wants to see the prompt engineering
    if (returnPromptOnly) {
      return new Response(JSON.stringify({ prompt }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Normal streaming transformation
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
    const result = await model.generateContentStream(prompt);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            controller.enqueue(encoder.encode(chunk.text()));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    return new Response("Transformation failed", { status: 500 });
  }
}

function buildPrompt(text: string, style: VibeStyle, examples: FewShotExample[]): string {
  let prompt = style.prompt + "\n\n";
  if (examples.length > 0) {
    prompt += "Here are some examples of this style:\n\n";
    examples.forEach((ex, i) => {
      prompt += `Example ${i + 1}:\nInput: "${ex.input}"\nOutput: "${ex.output}"\n\n`;
    });
  }
  prompt += `Now rewrite the following text in the ${style.name} style:\n\n`;
  prompt += `Input: "${text}"\n\n`;
  prompt += "Output:";
  return prompt;
}