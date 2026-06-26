// app/api/score/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { saveTransformation } from "@/lib/db";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { input, output, styleName, styleKey } = await req.json();
    if (!input || !output) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

    const prompt = `
      You are an expert LLM evaluator. Rate the quality of this text transformation.
      
      Original text: "${input}"
      Transformed text: "${output}"
      Target style: "${styleName}"
      
      Rate the transformation on three axes (1-10):
      1. Style Accuracy: How well does it match the target style?
      2. Entertainment Value: How engaging/entertaining is the output?
      3. Faithfulness: How well does it preserve the original meaning?
      
      Return ONLY a JSON object with this exact format:
      {
        "styleAccuracy": 0-10,
        "entertainment": 0-10,
        "faithfulness": 0-10,
        "overall": 0-10
      }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    const cleaned = response.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    
    const scores = {
      styleAccuracy: parsed.styleAccuracy || 7,
      entertainment: parsed.entertainment || 7,
      faithfulness: parsed.faithfulness || 7,
      overall: parsed.overall || 7
    };

    // Save to SQLite Database (Permanent storage)
    try {
      saveTransformation({
        id: Date.now().toString(),
        input,
        output,
        style: styleKey || styleName,
        timestamp: Date.now(),
        scores,
      });
    } catch (dbError) {
      console.error("Failed to save to database", dbError);
    }

    return new Response(JSON.stringify(scores), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({
      styleAccuracy: 7,
      entertainment: 7,
      faithfulness: 7,
      overall: 7
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}