"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Code2, Monitor, Cpu, Brain } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        title: "Live Virtual Glasses Try-On Experience",
        type: "mobile / Computer Vision",
        description: "Real-time glasses try-on powered by face tracking and computer vision, delivering a smooth and realistic preview directly in the browser.",
        tech: ["flutter", "lensstudio", "Django", "tripoai", "Supabase", "PostgreSQL"],
        github: "https://github.com/mahdirizkou/VTON_3D-Flutter",
        image: "/pr1.png",
        color: "from-purple-500 to-pink-500",
        icon: <Brain className="w-6 h-6" />,
        problem: "Balancing real-time performance with precise face landmark detection on mobile devices.",
        solution: "Integrated lightweight face tracking models with optimized rendering pipelines to ensure smooth, accurate, and responsive virtual try-on.",
    },
    {
        title: "YALAH NTLA9AW",
        type: "backend / Frontend",
        description: "The Club Management Platform is a web application built with Django that allows users to create and manage clubs, join communities, share posts, organize events, and receive notifications. It is designed to connect people with shared interests and make club activities more interactive and organized.",
        tech: ["React", "Tailwind CSS", "Django"],
        github: "https://github.com/mahdirizkou/Yalah-ntla9aw",
        image: "/pr2.png",
        color: "from-sky-400 to-blue-600",
        icon: <Code2 className="w-6 h-6" />,
        problem: "Building a scalable and interactive community platform that handles real-time activity, user-generated content, and dynamic event management without performance degradation.",
        solution: "Designed a modular architecture using Django REST API and React, integrated real-time updates with WebSockets, and optimized performance through caching and efficient state management.",
    },
    {
        title: "React-Admin-Dashboard",
        type: "react",
        description: "Design React Admin Dashboard.",
        tech: ["react", "Material UI"],
        github: "https://github.com/mahdirizkou/React-Admin-Dashboard",
        image: "/pr3.png",
        color: "from-blue-500 to-indigo-500",
        icon: <Monitor className="w-6 h-6" />,
        problem: "Lack of centralized visibility and control over business data, making it difficult for administrators to monitor performance, manage resources, and make data-driven decisions efficiently.",
        solution: "Developed a responsive admin dashboard using React and Material UI, providing real-time data visualization, modular components, and an intuitive interface for efficient system management.",
    },


];

export default function Projects() {
    return (
        <section id="projects" className="py-32 px-4 md:px-10 bg-zinc-950/30">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white tracking-tighter">
                        Selected <span className="text-zinc-600">Works.</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl text-base md:text-lg">
                        A curation of projects that demonstrate technical depth, architectural thinking, and a focus on solving real-world challenges.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                duration: 1.2,
                                delay: index * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="group relative flex flex-col space-y-6"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/5 bg-zinc-900">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} - ${project.type} by Akram Zekri`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                <div className="absolute top-6 left-6">
                                    <div className={`p-3 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 text-white shadow-2xl`}>
                                        {project.icon}
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="flex gap-2">
                                        <Link href={project.github} target="_blank" className="p-3 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors">
                                            <Github size={20} />
                                        </Link>
                                        <Link href={project.github} target="_blank" className="p-3 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors">
                                            <ExternalLink size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest">{project.type}</span>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 3).map((t) => (
                                            <span key={t} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/5 text-zinc-400 uppercase font-bold">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <span className="text-[10px] text-zinc-500 uppercase font-black block mb-1">Challenge</span>
                                        <p className="text-xs text-zinc-300 leading-tight">{project.problem}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <span className="text-[10px] text-zinc-500 uppercase font-black block mb-1">Solution</span>
                                        <p className="text-xs text-zinc-300 leading-tight">{project.solution}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
