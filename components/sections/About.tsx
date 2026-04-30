"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Target, Cpu, Rocket, ShieldCheck } from "lucide-react";

const CARDS = [
    {
        icon: Target,
        color: "#3b82f6",
        glow: "rgba(59,130,246,0.15)",
        title: "Product Focus",
        desc: "Building products people actually want to use — balancing UX, performance, and real business value.",
    },
    {
        icon: Cpu,
        color: "#34d399",
        glow: "rgba(52,211,153,0.15)",
        title: "Tech Depth",
        desc: "From system-level thinking to modern web architectures — full-stack, inside and out.",
    },
    {
        icon: Rocket,
        color: "#a78bfa",
        glow: "rgba(167,139,250,0.15)",
        title: "High Efficiency",
        desc: "Consistently shipping quality work, meeting tight deadlines without sacrificing craftsmanship.",
    },
    {
        icon: ShieldCheck,
        color: "#fb923c",
        glow: "rgba(251,146,60,0.15)",
        title: "Reliability",
        desc: "Trusted to deliver robust, scalable solutions that hold up under real-world conditions.",
    },
];

const PARAGRAPHS = [
    <>
        I'm{" "}
        <span className="text-white font-normal"
            style={{ borderBottom: "1px solid rgba(52,211,153,0.4)", paddingBottom: "1px" }}>
            El Mahdi Rizkou
        </span>
        , a Full-Stack Developer from Morocco focused on building scalable systems and high-performance
        digital experiences. I don't just write code — I design solutions that balance{" "}
        <span className="text-zinc-300">performance</span>,{" "}
        <span className="text-zinc-300">simplicity</span>, and{" "}
        <span className="text-zinc-300">real-world impact</span>.
    </>,
    <>
        My journey started with a deep curiosity about how systems work, which pushed me to explore both
        frontend and backend development, data-driven thinking, and modern web architectures.
    </>,
    <>
        I believe great engineering is not only about writing efficient code, but also about understanding
        users and crafting{" "}
        <span className="text-zinc-300">clean, intuitive interfaces</span>.
    </>,
    <>
        My goal is to build products that connect robust backend systems with seamless,{" "}
        <span className="text-zinc-300">human-centered experiences</span>.
    </>,
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const lineH = useTransform(scrollYProgress, [0.05, 0.5], ["0%", "100%"]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full py-32 md:py-44 px-6 md:px-14 lg:px-24 overflow-hidden bg-[#060606]"
        >
            {/* Ambient blobs */}
            <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] bg-emerald-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 h-[400px] w-[400px] bg-blue-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="max-w-6xl mx-auto">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-16"
                >
                    <span className="w-6 h-px bg-emerald-500/60" />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-600">About</span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-start">

                    {/* ── LEFT: Text ── */}
                    <div className="flex gap-8">
                        {/* Animated vertical line */}
                        <div className="hidden md:flex flex-col items-center pt-2 flex-shrink-0">
                            <div className="w-px flex-1 bg-zinc-900 relative overflow-hidden">
                                <motion.div
                                    style={{ height: lineH }}
                                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-emerald-500/60 to-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-10">
                            {/* Headline */}
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="font-black tracking-tighter text-white leading-[0.9]"
                                style={{
                                    fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                                    fontFamily: "'Syne', 'DM Sans', sans-serif",
                                }}
                            >
                                Engineering systems with{" "}
                                <span
                                    style={{
                                        color: "transparent",
                                        WebkitTextStroke: "1px rgba(255,255,255,0.22)",
                                        display: "block",
                                    }}
                                >
                                    purpose &amp; precision.
                                </span>
                            </motion.h2>

                            {/* Body paragraphs */}
                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: {},
                                    show: { transition: { staggerChildren: 0.14 } },
                                }}
                                className="space-y-5"
                            >
                                {PARAGRAPHS.map((p, i) => (
                                    <motion.p
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, y: 16 },
                                            show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                                        }}
                                        className="text-base md:text-[1.05rem] text-zinc-500 font-light leading-[1.85]"
                                    >
                                        {p}
                                    </motion.p>
                                ))}
                            </motion.div>

                            {/* Stats pills */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                                className="flex flex-wrap gap-3 pt-2"
                            >
                                {["3+ Years Experience", "20+ Tech Stack", "Full-Stack · Mobile"].map((s) => (
                                    <span
                                        key={s}
                                        className="px-5 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] text-zinc-400 text-[10px] uppercase tracking-widest font-medium backdrop-blur-sm"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* ── RIGHT: Cards ── */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {CARDS.map(({ icon: Icon, color, glow, title, desc }) => (
                            <motion.div
                                key={title}
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                                }}
                                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                                className="group relative p-7 rounded-2xl border border-white/[0.05] bg-white/[0.02] overflow-hidden cursor-default"
                                style={{ backdropFilter: "blur(8px)" }}
                            >
                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                    style={{
                                        background: `radial-gradient(ellipse at top left, ${glow}, transparent 70%)`,
                                    }}
                                />
                                {/* Top border highlight */}
                                <div
                                    className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
                                />

                                <div className="relative z-10 space-y-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ background: `${glow}`, border: `1px solid ${color}25` }}
                                    >
                                        <Icon size={18} style={{ color }} />
                                    </div>
                                    <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
                                    <p className="text-sm text-zinc-500 font-light leading-relaxed">{desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}