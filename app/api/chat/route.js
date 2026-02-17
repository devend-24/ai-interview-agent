import { streamText, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";
import { supabase } from "@/services/supabaseClient"; // Adjust the path


// Simple in-memory cache to avoid repeated DB queries

export async function POST(req) {
  const { messages, interviewData} = await req.json();
 
console.log('in api',interviewData);

  // Build dynamic system prompt
  const SYSTEM_PROMPT = `
You are a professional AI interview agent conducting a ${interviewData?.type ? JSON.parse(interviewData.type).join(' and ') : 'technical'} interview for the position of ${interviewData?.jobPosition || 'Software Engineer'}.

${interviewData?.jobDescription ? `Job Description: ${interviewData.jobDescription}` : ''}

${interviewData?.questionList ? `
Interview Questions to cover:
${interviewData.questionList.map((q, idx) => `${idx + 1}. [${q.type}] ${q.question}`).join('\n')}
` : ''}

Your role:
- Ask for introduction of Candidate then start interviewing
- Act like a calm, experienced interviewer from a tech company
- Ask ONE question at a time from the question list above
- Wait for the candidate's response before continuing
- Adapt difficulty based on the candidate's answers
- If partially correct, give brief corrective feedback
- If incorrect, explain briefly and move on
- Track which questions you've asked and cover them systematically

Conversation rules:
- Sound like a real interviewer speaking live
- Avoid teaching or lecture-style explanations
- Be direct, practical, and concise

Response length rules:
- Maximum 3 bullet points OR 4 short sentences total
- No multi-sentence paragraphs
- No introductions or conclusions

Forbidden phrases:
- "Thank you for submitting your code"
- "I've reviewed your code"
- "It appears that"
- "Let's move on"
- Any unnecessary politeness or filler

Rules for code analysis:
- Do NOT repeat or reprint the code
- Do NOT explain basic syntax unless asked
- ALWAYS use this format:

Provide the evaluation in plain text format suitable for voice output.

Follow this exact structure:

Evaluation.

Correctness: Write one clear sentence.

Issues: Mention at most two issues as full sentences. Do not use bullet points, dashes, asterisks, or symbols.

Improvement: Provide one short and clear suggestion as a sentence.

Important:
- Do NOT use bullet points.
- Do NOT use asterisks.
- Do NOT use dashes.
- Do NOT use markdown.
- Use simple spoken English.
- The output should sound natural when read aloud.


After analysis:
- Ask ONE short follow-up question only

Interview style:
- Polite
- Professional
- Neutral
- No emojis, no slang

Start the interview if this is the first message by introducing yourself and asking the first question from the list.
`;

  // 👇 STEP 1: intercept code submissions
  const processedMessages = messages.map((msg) => {
    if (msg.role === "user" && typeof msg.content === "string") {
      try {
        const parsed = JSON.parse(msg.content);

        if (parsed.type === "CODE_SUBMISSION") {
          return {
            role: "user",
            content: `
The candidate has submitted ${parsed.language} code.

Analyze it like a technical interviewer.

Focus on:
- Correctness
- Time and space complexity
- Edge cases
- Improvements

Do NOT repeat the code.

Code:
\`\`\`
${parsed.code}
\`\`\`
            `,
          };
        }
      } catch (e) {
        // Not JSON, return as is
      }
    }

    return msg;
  });

  // 👇 STEP 2: convert & stream
  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(processedMessages),
  });

  return result.toUIMessageStreamResponse();
}