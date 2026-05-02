import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

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

JOURNEY:
- 2022: C, JavaScript, HTML/CSS fundamentals
- 2023: PHP, OOP, CRUD systems
- 2024: Node.js, Express, React, modern architectures
- 2025–2026: AI/ML focus — Django, AWS, Machine Learning, RAG, agentic workflows

GITHUB: 173+ contributions, 20+ repositories, 100% consistency

RULES:
- Keep answers SHORT: 2–4 sentences max unless a list is clearly needed
- Never fabricate details not listed above
- For hiring or collaboration: always redirect to rizkoumahdi73@gmail.com
- Reply in English or French based on the user's language
- Politely refuse questions unrelated to El Mahdi's portfolio`;

interface Message {
    role: "user" | "assistant";
    content: string;
}

export async function POST(req: NextRequest) {
    try {
        const { messages }: { messages: Message[] } = await req.json();

        if (!Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "No messages provided." }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Gemini API key not configured." }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-preview-04-17",
            systemInstruction: SYSTEM_PROMPT,
        });

        // Filter out the initial assistant greeting — Gemini requires history to start with "user"
        // Also filter empty messages and map roles (assistant → model)
        const filtered = messages.filter((m) => m.content.trim().length > 0);

        // Find the index of the first user message
        const firstUserIndex = filtered.findIndex((m) => m.role === "user");

        if (firstUserIndex === -1) {
            return NextResponse.json({ error: "No user message found." }, { status: 400 });
        }

        // Everything before the last message is history
        const allUserMessages = filtered.slice(firstUserIndex);
        const lastMessage = allUserMessages[allUserMessages.length - 1];

        // History = all messages from first user message, excluding the last one
        const history = allUserMessages.slice(0, -1).map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }));

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastMessage.content);
        const reply = result.response.text().trim();

        return NextResponse.json({ reply });
    } catch (error) {
        console.error("Gemini chat route error:", error);
        return NextResponse.json(
            { error: "Failed to get response from Gemini." },
            { status: 500 }
        );
    }
}