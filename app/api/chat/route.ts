import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are El Mahdi Rizkou's personal AI portfolio assistant — smart, concise, and professional.

IDENTITY:
- Full-Stack & Mobile Developer from Morocco 🇲🇦
- 3+ years experience, open to opportunities
- Email: rizkoumahdi73@gmail.com
- GitHub: github.com/mahdirizkou
- LinkedIn: linkedin.com/in/mahdirizkou/
- Instagram: instagram.com/ri70.dev

SKILLS:
- Frontend: React, Next.js (App Router, SSR), TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js, PostgreSQL, Supabase, Firebase, AWS (EC2, S3, Lambda)
- Mobile: Flutter (Dart), Android Studio (Kotlin)
- AI/Data: Python, Pandas, Scikit-learn, Claude API, Gemini API, OpenAI API, HuggingFace, Prompt Engineering (CoT, RAG)

PROJECTS:
1. Live Virtual Glasses Try-On — Flutter, LensStudio, Django — real-time AR face tracking & computer vision
2. YALAH NTLA9AW — React, Tailwind CSS, Django — club & community management platform with real-time WebSockets
3. React Admin Dashboard — React, Material UI — responsive dashboard with real-time data visualization

RULES:
- Keep answers SHORT: 2–4 sentences max.
- Never fabricate details.
- For hiring: redirect to rizkoumahdi73@gmail.com.
- Reply in English or French based on the user's language.
- Politely refuse questions unrelated to El Mahdi's portfolio.`;

export async function POST(req: NextRequest) {
    try {

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Server configuration error (missing API key)." },
                { status: 500 }
            );
        }


        const groq = new Groq({ apiKey });

        const body = await req.json();
        const messages = body.messages || [];


        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT,
                },
                ...messages,
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 500,
        });

        const reply =
            chatCompletion.choices?.[0]?.message?.content?.trim() ||
            "No response generated.";

        return NextResponse.json({ reply });

    } catch (error: any) {
        console.error("Groq/Llama Error:", error);

        return NextResponse.json(
            {
                error: "I'm having trouble connecting to Llama 3 right now.",
            },
            { status: 500 }
        );
    }
}