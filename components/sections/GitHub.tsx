"use client";

import { motion } from "framer-motion";
import { Github, Code, GitPullRequest, Star } from "lucide-react";
import Link from "next/link";

export default function GitHubSection() {
    return (
        <section className="py-32 px-4 md:px-10 bg-zinc-950/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-full rounded-[3rem] bg-zinc-900/50 border border-white/5 p-8 md:p-16 overflow-hidden relative"
                >
                    <div className="absolute -top-24 -right-24 p-4 opacity-[0.03] rotate-12">
                        <Github size={600} strokeWidth={1} />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-3 text-primary mb-6">
                                <Code className="w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-[0.3em] font-mono">Proof of Work</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">Code that <br className="hidden md:block" /><span className="text-zinc-600 font-medium">Ships.</span></h2>
                            <p className="text-zinc-400 max-w-lg text-base md:text-lg mb-8 md:mb-10 leading-relaxed font-light">
                                Consistency is the key to mastery. Over the last year, I've maintained a high-velocity shipping culture, contributing to open-source and private repositories alike.
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
                                <div className="space-y-1">
                                    <span className="block text-3xl md:text-4xl font-bold text-white tracking-tighter">173+</span>
                                    <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest block">Contributions</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="block text-3xl md:text-4xl font-bold text-white tracking-tighter">20+</span>
                                    <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest block">Repositories</span>
                                </div>
                                <div className="space-y-1 col-span-2 sm:col-span-1">
                                    <span className="block text-3xl md:text-4xl font-bold text-white tracking-tighter">100%</span>
                                    <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest block">Consistency</span>
                                </div>
                            </div>

                            <Link
                                href="https://github.com/mahdirizkou"
                                target="_blank"
                                className="mt-10 md:mt-12 inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 text-base md:text-lg shadow-xl shadow-white/5"
                            >
                                <Github size={24} />
                                Explore GitHub
                            </Link>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-1000" />
                            <div className="relative p-6 rounded-[2rem] bg-black/40 border border-white/5 backdrop-blur-xl">
                                <div className="grid grid-cols-12 gap-2">
                                    {Array.from({ length: 144 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.002 }}
                                            viewport={{ once: true }}
                                            className={`aspect-square rounded-sm ${i % 7 === 0 ? 'bg-zinc-800' :
                                                (i % 3 === 0) ? 'bg-emerald-500' : (i % 2 === 0) ? 'bg-emerald-700' : 'bg-zinc-900'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between mt-6 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                                    <span>Less</span>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-sm bg-zinc-900" />
                                        <div className="w-2 h-2 rounded-sm bg-emerald-900" />
                                        <div className="w-2 h-2 rounded-sm bg-emerald-700" />
                                        <div className="w-2 h-2 rounded-sm bg-emerald-500" />
                                    </div>
                                    <span>More</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
