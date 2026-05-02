"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant";

interface Message {
    role: ChatRole;
    content: string;
}

interface ChatResponse {
    reply?: string;
    error?: string;
}

const QUICK_QUESTIONS = [
    "Who are you?",
    "What's your tech stack?",
    "Are you open to work?",
    "How can I contact you?",
    "What projects have you built?",
] as const;

const INITIAL_MESSAGE: Message = {
    role: "assistant",
    content:
        "Ask about El Mahdi Rizkou's background, stack, projects, or availability.",
};

const syneStyle = {
    fontFamily: "'Syne', 'DM Sans', sans-serif",
} as const;

function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.04] px-4 py-3">
                <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((dot) => (
                        <motion.span
                            key={dot}
                            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                            animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
                            transition={{
                                duration: 0.9,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: dot * 0.12,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function PortfolioChatbot() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [showQuickQuestions, setShowQuickQuestions] = useState(false);
    const hasOpenedOnce = useRef(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const canSend = input.trim().length > 0 && !loading;
    const visibleMessages = useMemo(
        () => messages.filter((message) => message.content.trim().length > 0),
        [messages]
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [visibleMessages, loading, open]);

    const handleToggle = () => {
        setOpen((current) => {
            const next = !current;

            if (next && !hasOpenedOnce.current) {
                hasOpenedOnce.current = true;
                setShowQuickQuestions(true);
            }

            if (!next && showQuickQuestions) {
                setShowQuickQuestions(false);
            }

            return next;
        });
    };

    const sendMessage = async (content: string) => {
        const trimmed = content.trim();

        if (!trimmed || loading) {
            return;
        }

        const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
        setMessages(nextMessages);
        setInput("");
        setLoading(true);
        setShowQuickQuestions(false);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages: nextMessages }),
            });

            const data: ChatResponse = await response.json();

            if (!response.ok || typeof data.reply !== "string") {
                throw new Error(data.error || "Failed to send message.");
            }

            const assistantReply = data.reply;

            setMessages((current) => [
                ...current,
                { role: "assistant", content: assistantReply },
            ]);
        } catch {
            setMessages((current) => [
                ...current,
                {
                    role: "assistant",
                    content:
                        "I couldn't reach the portfolio assistant right now. Please try again in a moment.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await sendMessage(input);
    };

    const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            await sendMessage(input);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-[130] sm:bottom-6 sm:right-6">
            <AnimatePresence>
                {open ? (
                    <motion.div
                        key="chat-panel"
                        initial={{ opacity: 0, y: 18, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 14, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="mb-4 h-[560px] w-[min(380px,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#060606]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
                    >
                        <div className="flex h-full flex-col">
                            <div className="border-b border-white/[0.06] bg-white/[0.02] px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/20 bg-gradient-to-br from-emerald-400/25 to-emerald-500/10 text-sm font-black text-emerald-300 shadow-[0_0_24px_rgba(52,211,153,0.14)]">
                                        <span style={syneStyle}>M</span>
                                        <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[#060606] bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p
                                            className="truncate text-base font-black tracking-tight text-white"
                                            style={syneStyle}
                                        >
                                            El Mahdi Rizkou
                                        </p>
                                        <p className="text-xs tracking-[0.18em] text-emerald-300/85 uppercase">
                                            AI Portfolio Assistant · Online
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-4 py-4">
                                {visibleMessages.map((message, index) => (
                                    <div
                                        key={`${message.role}-${index}-${message.content}`}
                                        className={`flex ${
                                            message.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                                                message.role === "user"
                                                    ? "rounded-br-md bg-gradient-to-br from-[#34d399] to-[#10b981] text-[#032016] shadow-[0_10px_30px_rgba(52,211,153,0.18)]"
                                                    : "rounded-bl-md border border-white/[0.06] bg-white/[0.04] text-zinc-100"
                                            }`}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                ))}

                                {showQuickQuestions && (
                                    <div className="flex flex-wrap gap-2">
                                        {QUICK_QUESTIONS.map((question) => (
                                            <button
                                                key={question}
                                                type="button"
                                                onClick={() => void sendMessage(question)}
                                                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-left text-[11px] font-medium tracking-tight text-zinc-200 transition-colors hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-white"
                                            >
                                                {question}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {loading && <TypingIndicator />}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="border-t border-white/[0.06] p-4">
                                <form
                                    onSubmit={(event) => void handleSubmit(event)}
                                    className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-2"
                                >
                                    <input
                                        value={input}
                                        onChange={(event) => setInput(event.target.value)}
                                        onKeyDown={(event) => void handleKeyDown(event)}
                                        placeholder="Ask about work, stack, or projects..."
                                        className="h-11 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!canSend}
                                        className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                                            canSend
                                                ? "bg-[#34d399] text-[#032016] shadow-[0_10px_24px_rgba(52,211,153,0.2)] hover:bg-emerald-300"
                                                : "bg-white/[0.05] text-zinc-600"
                                        }`}
                                        aria-label="Send message"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <motion.button
                type="button"
                onClick={handleToggle}
                whileTap={{ scale: 0.96 }}
                className={`flex h-15 w-15 items-center justify-center rounded-full border transition-colors ${
                    open
                        ? "border-white/[0.06] bg-[#060606] text-white"
                        : "border-emerald-300/20 bg-gradient-to-br from-[#34d399] via-emerald-400 to-[#059669] text-[#032016] shadow-[0_18px_36px_rgba(52,211,153,0.24)]"
                }`}
                aria-label={open ? "Close portfolio chatbot" : "Open portfolio chatbot"}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={open ? "close" : "chat"}
                        initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 12, scale: 0.8 }}
                        transition={{ duration: 0.16 }}
                    >
                        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
