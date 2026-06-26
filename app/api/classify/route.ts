// app/api/classify/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { STYLES, StyleKey } from "@/lib/styles";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text || text.length < 5) {
      return new Response(JSON.stringify({ detected: "unknown", confidence: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

    const styleList = STYLES.filter(s => s.key !== "custom")
      .map(s => `${s.key} (${s.name})`)
      .join(", ");

    const prompt = `
      Analyze the following text and classify which writing style it most closely resembles.
      Available styles: ${styleList}.
      
      Return ONLY a JSON object with this exact format:
      {
        "style": "style_key",
        "confidence": 0.0 to 1.0
      }
      
      Text to classify:
      "${text}"
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Parse JSON from response
    const cleaned = response.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    
    return new Response(JSON.stringify({
      detected: parsed.style || "unknown",
      confidence: parsed.confidence || 0
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ detected: "unknown", confidence: 0 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}