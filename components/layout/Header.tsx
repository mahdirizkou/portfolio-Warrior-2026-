"use client";

import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Works", href: "#projects" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
];

export default function Header() {
    const { scrollYProgress } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[60] origin-left"
                style={{ scaleX: scrollYProgress }}
            />
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-4 md:py-6 flex justify-center pointer-events-none`}
            >
                <nav className={cn(
                    "flex items-center gap-1 p-1 rounded-full border border-white/5 bg-black/50 backdrop-blur-xl transition-all duration-500 pointer-events-auto overflow-x-auto no-scrollbar max-w-[95vw]",
                    scrolled ? "translate-y-2 scale-100 md:scale-110 shadow-2xl border-white/10" : ""
                )}>
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-4 md:px-6 py-2.5 md:py-3 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all whitespace-nowrap"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </motion.header>
        </>
    );
}
