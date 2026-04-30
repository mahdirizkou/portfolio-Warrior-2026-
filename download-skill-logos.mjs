// Run from your project root: node download-skill-logos.mjs

import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

const LOGOS = {
    // Frontend
    "react.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "nextjs.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "tailwind.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/tailwindcss/tailwindcss-plain.svg",
    "framer.svg": "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/framer.svg",
    // Mobile
    "flutter.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    "android.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    // Backend
    "nodejs.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "express.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    "postgres.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "supabase.svg": "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/supabase.svg",
    "firebase.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    "aws.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/amazonwebservices/amazonwebservices-original.svg",
    // AI & Data
    "python.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "pandas.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    "sklearn.svg": "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/scikitlearn.svg",
    "openai.svg": "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/openai.svg",
    // Agentic AI
    "anthropic.svg": "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/anthropic.svg",
    "github.svg": "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/github.svg",
    "googlegemini.svg": "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/googlegemini.svg",
    "huggingface.svg": "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/huggingface.svg",
};

const OUT = join(process.cwd(), "public", "skills");
await mkdir(OUT, { recursive: true });

for (const [filename, url] of Object.entries(LOGOS)) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        await writeFile(join(OUT, filename), text, "utf-8");
        console.log("✓", filename);
    } catch (e) {
        console.error("✗", filename, "-", e.message);
    }
}

console.log("\n✅ Done! Logos saved to public/skills/");
