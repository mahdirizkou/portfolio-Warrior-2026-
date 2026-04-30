"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Contact() {
    return (
        <section id="contact" className="py-40 px-4 md:px-10 overflow-hidden relative">
            {/* Top gradient line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Subtitle */}
                    <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 md:mb-8 block">
                        Have an idea worth building?
                    </span>

                    {/* Title */}
                    <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-bold text-white mb-8 md:mb-12 tracking-tighter leading-[0.8] text-glow px-4 md:px-0">
                        Let’s engineer <br className="hidden md:block" />
                        <span className="text-zinc-700">your vision</span><br className="hidden md:block" />
                        into reality.
                    </h2>

                    {/* CTA Button */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 md:mt-16 px-4 md:px-0">
                        <Link
                            href="mailto:rizkoumahdi73@gmail.com"
                            className="group relative inline-flex items-center justify-center gap-4 bg-white text-black w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full text-xl md:text-2xl font-bold transition-all hover:scale-105 active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10 font-bold">Start Building</span>
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-2 relative z-10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>

                    {/* Bottom Info */}
                    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/5 backdrop-blur-sm">

                        {/* Email */}
                        <div className="space-y-2 hover:opacity-80 transition-opacity">
                            <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest block">
                                Email
                            </span>
                            <Link
                                href="mailto:rizkoumahdi73@gmail.com"
                                className="text-lg text-white hover:text-primary transition-colors"
                            >
                                rizkoumahdi73@gmail.com
                            </Link>
                        </div>

                        {/* Socials */}
                        <div className="space-y-2 hover:opacity-80 transition-opacity">
                            <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest block">
                                Socials
                            </span>
                            <div className="flex justify-center gap-6">
                                <Link href="https://www.linkedin.com/in/mahdirizkou/" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                                    LinkedIn
                                </Link>
                                <Link href="https://github.com/mahdirizkou" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                                    GitHub
                                </Link>
                                <Link href="https://instagram.com/ri70.dev" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                                    Instagram
                                </Link>
                            </div>
                        </div>

                        {/* Identity بدل location */}
                        <div className="space-y-2 hover:opacity-80 transition-opacity">
                            <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest block">
                                Focus
                            </span>
                            <span className="text-lg text-white">
                                Systems, AI & Scalable Products
                            </span>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}