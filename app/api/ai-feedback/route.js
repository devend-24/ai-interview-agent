import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req) {

    const {conversation} = await req.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation));

    try {
        
        const groq = new Groq({
          apiKey: process.env.GROQ_API_KEY,
        });
    
        const completion = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: FINAL_PROMPT }],
          temperature: 0.7,
        });
    
        const rawContent = completion.choices[0]?.message?.content;
    
        if (!rawContent) {
          return NextResponse.json(
            { error: "AI did not return output" },
            { status: 500 }
          );
        }
    
        let parsed;
        try {
          parsed = JSON.parse(rawContent);
        } catch {
          return NextResponse.json(
            { error: "AI returned invalid JSON" },
            { status: 500 }
          );
        }
    
        return NextResponse.json(parsed, { status: 200 });
      } catch (e) {
        console.error("GROQ ERROR:", e);
        return NextResponse.json(
          { error: e.message || "Server error" },
          { status: 500 }
        );
      }
}