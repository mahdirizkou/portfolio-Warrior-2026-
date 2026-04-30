"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ── Typing effect hook ──────────────────────────────────────────────
function useTypingEffect(words: string[], speed = 80, pause = 2000) {
    const [display, setDisplay] = useState("");
    const [wordIdx, setWordIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIdx];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && charIdx < current.length) {
            timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
        } else if (!deleting && charIdx === current.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIdx > 0) {
            timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
        } else {
            setDeleting(false);
            setWordIdx((i) => (i + 1) % words.length);
        }

        setDisplay(current.slice(0, charIdx));
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, wordIdx, words, speed, pause]);

    return display;
}

// ── Particle canvas ─────────────────────────────────────────────────
function Particles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const DOTS = 55;
        const dots = Array.from({ length: DOTS }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.3,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            alpha: Math.random() * 0.4 + 0.1,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const d of dots) {
                d.x += d.vx;
                d.y += d.vy;
                if (d.x < 0) d.x = canvas.width;
                if (d.x > canvas.width) d.x = 0;
                if (d.y < 0) d.y = canvas.height;
                if (d.y > canvas.height) d.y = 0;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(52,211,153,${d.alpha})`;
                ctx.fill();
            }
            // faint connection lines
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dx = dots[i].x - dots[j].x;
                    const dy = dots[i].y - dots[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(52,211,153,${0.06 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(dots[i].x, dots[i].y);
                        ctx.lineTo(dots[j].x, dots[j].y);
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
}

// ── Custom cursor ────────────────────────────────────────────────────
function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const pos = useRef({ x: -100, y: -100 });
    const smooth = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const move = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };
        const over = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            setHovered(!!t.closest("a, button, [data-cursor]"));
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", over);

        let raf: number;
        const animate = () => {
            smooth.current.x += (pos.current.x - smooth.current.x) * 0.12;
            smooth.current.y += (pos.current.y - smooth.current.y) * 0.12;
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${smooth.current.x - 20}px,${smooth.current.y - 20}px)`;
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${pos.current.x - 3}px,${pos.current.y - 3}px)`;
            }
            raf = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
                style={{ willChange: "transform" }}
            >
                <div
                    className="transition-all duration-200"
                    style={{
                        width: hovered ? 48 : 40,
                        height: hovered ? 48 : 40,
                        borderRadius: "50%",
                        border: `1.5px solid ${hovered ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.25)"}`,
                        background: hovered ? "rgba(52,211,153,0.08)" : "transparent",
                    }}
                />
            </div>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
                style={{ willChange: "transform" }}
            >
                <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: hovered ? "#34d399" : "rgba(255,255,255,0.7)" }}
                />
            </div>
        </>
    );
}

// ── 3D tilt image ────────────────────────────────────────────────────
function TiltImage() {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ rx: -y * 12, ry: x * 12 });
    };
    const onLeave = () => setTilt({ rx: 0, ry: 0 });

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ perspective: "800px" }}
            className="relative"
        >
            <motion.div
                animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative"
            >
                {/* Spotlight glow behind image */}
                <div
                    className="absolute -inset-6 rounded-3xl pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at center, rgba(52,211,153,0.15) 0%, transparent 70%)",
                        filter: "blur(20px)",
                    }}
                />

                {/* Offset decorative frame */}
                <div className="absolute top-6 left-6 right-[-24px] bottom-[-24px] rounded-2xl border border-zinc-800/70" />

                {/* Image */}
                <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] md:w-[370px] md:h-[460px] rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl"
                    style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)" }}
                >
                    <Image
                        src="/pfp.jpeg"
                        alt="El Mahdi Rizkou"
                        fill
                        className="object-cover object-top transition-transform duration-700 hover:scale-105"
                        priority
                    />
                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                    {/* Name label */}
                    <div className="absolute bottom-5 left-5 right-5">
                        <p className="text-white font-semibold text-sm leading-tight">El Mahdi Rizkou</p>
                        <p className="text-zinc-500 text-[10px] tracking-widest uppercase mt-1">
                            Full-Stack · Mobile Engineer
                        </p>
                    </div>

                    {/* Inner shine */}
                    <div
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
                        }}
                    />
                </div>

                {/* Floating badge */}
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-5 -right-5 flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/90 px-3 py-2 backdrop-blur-sm"
                    style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    <span className="text-[10px] text-zinc-400 tracking-widest uppercase">Morocco 🇲🇦</span>
                </motion.div>

                {/* Floating stats pill */}
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/90 px-3 py-2 backdrop-blur-sm"
                    style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}
                >
                    <span className="text-[10px] text-zinc-400 tracking-wider">⚡ Open to opportunities</span>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ── Main Hero ────────────────────────────────────────────────────────
const ROLES = ["Full-Stack Engineer", "Mobile Developer", "UI/UX Enthusiast", "Problem Solver"];

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const [intro, setIntro] = useState(true);
    const role = useTypingEffect(ROLES, 75, 2200);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
    const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const springY = useSpring(yText, { stiffness: 80, damping: 20 });

    // Cinematic intro: fade from black
    useEffect(() => {
        const t = setTimeout(() => setIntro(false), 900);
        return () => clearTimeout(t);
    }, []);

    const SOCIALS = [
        { href: "https://github.com/mahdirizkou", icon: Github, label: "GitHub" },
        { href: "https://www.linkedin.com/in/mahdirizkou/", icon: Linkedin, label: "LinkedIn" },
        { href: "mailto:rizkoumahdi73@gmail.com", icon: Mail, label: "Email" },
    ];

    return (
        <>
            <CustomCursor />

            {/* Cinematic black intro overlay */}
            <AnimatePresence>
                {intro && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[999] bg-black pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <section
                ref={containerRef}
                className="relative flex min-h-screen w-full items-center px-6 md:px-14 lg:px-24 overflow-hidden bg-[#060606]"
            >
                {/* Particles */}
                <Particles />

                {/* Ambient blobs */}
                <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] bg-emerald-500/[0.04] blur-[160px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/3 h-[500px] w-[500px] bg-sky-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

                {/* Subtle grid */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Main grid */}
                <motion.div
                    style={{ opacity }}
                    className="z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center py-24 md:py-0"
                >
                    {/* ── LEFT ── */}
                    <motion.div style={{ y: springY }} className="flex flex-col gap-7 order-2 md:order-1">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            className="flex items-center gap-2 w-fit rounded-full border border-white/8 bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                                Available for work
                            </span>
                        </motion.div>

                        {/* Name */}
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                                className="font-black tracking-tighter text-white leading-[0.88]"
                                style={{
                                    fontSize: "clamp(3.2rem, 6.5vw, 5.8rem)",
                                    fontFamily: "'Syne', 'DM Sans', sans-serif",
                                    textShadow: "0 0 80px rgba(52,211,153,0.08)",
                                }}
                            >
                                EL MAHDI
                                <span
                                    className="block"
                                    style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                                >
                                    RIZKOU.
                                </span>
                            </motion.h1>
                        </div>

                        {/* Typing role */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="flex items-center gap-3"
                        >
                            <span className="w-6 h-px bg-emerald-500/60" />
                            <span className="text-sm text-emerald-400/80 tracking-widest uppercase font-medium min-w-[220px]">
                                {role}
                                <span className="animate-pulse">|</span>
                            </span>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                            className="text-base md:text-lg text-zinc-500 font-light leading-[1.8] border-l border-zinc-800 pl-5 max-w-md"
                        >
                            Full-Stack Developer specializing in{" "}
                            <span className="text-zinc-300">scalable architectures</span>,{" "}
                            <span className="text-zinc-300">performance optimization</span>, and{" "}
                            <span className="text-zinc-300">modern user interfaces</span>.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-wrap gap-3 pt-1"
                        >
                            <Link
                                href="#projects"
                                data-cursor
                                className="group flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-all duration-200 hover:bg-emerald-400 hover:scale-105 active:scale-95"
                            >
                                View Projects
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="#contact"
                                data-cursor
                                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
                            >
                                Let's Talk
                            </Link>
                        </motion.div>

                        {/* Socials */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.9 }}
                            className="flex gap-6 pt-5 border-t border-white/[0.04]"
                        >
                            {SOCIALS.map(({ href, icon: Icon, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target={label !== "Email" ? "_blank" : undefined}
                                    data-cursor
                                    className="flex items-center gap-2 text-zinc-600 hover:text-emerald-400 transition-colors duration-200 group"
                                >
                                    <Icon size={15} className="transition-transform group-hover:-translate-y-0.5" />
                                    <span className="text-[9px] uppercase tracking-[0.18em] font-medium">{label}</span>
                                </Link>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT — Image ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ y: yImg }}
                        className="flex justify-center md:justify-end order-1 md:order-2"
                    >
                        <TiltImage />
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        className="w-px h-10 bg-gradient-to-b from-emerald-500/40 to-transparent"
                    />
                    <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-700">Scroll</span>
                </motion.div>
            </section>
        </>
    );
}