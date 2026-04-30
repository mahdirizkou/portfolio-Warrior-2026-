"use client";

import { motion } from "framer-motion";
import { Milestone, Flag, Star, Zap } from "lucide-react";

const milestones = [
    {
        year: "2025 — 2026",
        title: "AI, Systems & Scalable Thinking",
        description:
            "Shifted from building applications to understanding intelligence itself. Studied Django, RESTful architectures, and AWS fundamentals while diving into Machine Learning, Dynamic Programming, and Feature Engineering. Focused on how systems learn, scale, and evolve.",
        icon: <Zap className="w-5 h-5" />,
    },
    {
        year: "2024",
        title: "Backend Obsession & Modern Architectures",
        description:
            "Developed a strong backend mindset using Node.js and Express while integrating React to build modern, scalable web applications. Transitioned from simple projects to architecting structured systems with real-world logic.",
        icon: <Star className="w-5 h-5" />,
    },
    {
        year: "2023",
        title: "Understanding Servers & Logic Design",
        description:
            "Explored backend development through PHP and Object-Oriented Programming. Built multiple CRUD systems, learning how data flows, persists, and interacts with user interfaces.",
        icon: <Flag className="w-5 h-5" />,
    },
    {
        year: "2022",
        title: "The Beginning — Thinking Like a Machine",
        description:
            "Started with algorithms and low-level logic using C and JavaScript. Built simple front-end interfaces with HTML, CSS, and JS, forming the foundation of problem-solving and computational thinking.",
        icon: <Milestone className="w-5 h-5" />,
    },
];

export default function Journey() {
    return (
        <section id="journey" className="py-32 px-4 md:px-10 bg-zinc-950/20">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white tracking-tighter">
                        Built on Curiosity. <span className="text-zinc-600">Refined by Systems.</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl text-base md:text-lg">
                        A continuous evolution from code to intelligence.
                    </p>
                </motion.div>

                <div className="relative space-y-8 md:space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
                    {milestones.map((item, index) => (
                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            {/* Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-900 text-white shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-primary group-hover:text-black transition-colors duration-500 shrink-0">
                                {item.icon}
                            </div>

                            {/* Content */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="w-[calc(100%-4rem)] md:w-[45%] p-6 md:p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-900 transition-colors"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 card-header">
                                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">{item.title}</h3>
                                    <time className="font-mono text-[10px] md:text-sm text-zinc-500 uppercase tracking-widest">{item.year}</time>
                                </div>
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{item.description}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
