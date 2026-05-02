// "use client";

import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import PortfolioChatbot from "@/components/PortfolioChatbot";

/* ================= Fonts ================= */
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

/* ================= Base URL ================= */
const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/* ================= Metadata ================= */
export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),

    title: {
        default: "EL MAHDI RIZKOU | Full-Stack Developer & Product Builder",
        template: "%s | Mahdi Rizkou",
    },

    description:
        "Full-Stack Developer focused on building scalable systems, modern web applications, and exploring AI-driven solutions.",

    keywords: [
        "Mahdi Rizkou",
        "Full Stack Developer Morocco",
        "Django Developer",
        "AI Developer",
        "Flutter Developer",
        "Software Engineer Portfolio",
        "React Developer",
    ],

    authors: [{ name: "Mahdi Rizkou", url: baseUrl }],
    creator: "Mahdi Rizkou",

    openGraph: {
        type: "website",
        locale: "en_US",
        url: baseUrl,
        siteName: "Mahdi Rizkou Portfolio",
        title: "EL MAHDI RIZKOU | Full-Stack Developer & Product Builder",
        description:
            "Full-Stack Developer focused on building scalable systems, modern web applications, and exploring AI-driven solutions.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "EL MAHDI RIZKOU - Full-Stack Developer Portfolio",
            },
        ],
    },

    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },

    manifest: "/site.webmanifest",

    alternates: {
        canonical: "/",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

/* ================= JSON-LD ================= */
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": baseUrl,

    name: "EL MAHDI RIZKOU",
    url: baseUrl,
    image: `${baseUrl}/og-image.png`,

    sameAs: [
        "https://github.com/mahdirizkou",
        "https://www.linkedin.com/in/mahdirizkou/",
        "https://www.instagram.com/",
    ],

    jobTitle: "Full-Stack Developer",

    description:
        "Full-Stack Developer focused on building scalable systems, modern web applications, and exploring AI-driven solutions.",

    knowsAbout: [
        "Full-Stack Development",
        "Backend Engineering",
        "System Design",
        "REST APIs",
        "Next.js",
        "Django",
        "Node.js",
        "React",
        "Machine Learning",
        "Dynamic Programming",
    ],

    alumniOf: {
        "@type": "EducationalOrganization",
        name: "Self-Taught Developer",
    },
};

/* ================= Viewport ================= */
export const viewport: Viewport = {
    themeColor: "#0a0a0a",
    width: "device-width",
    initialScale: 1,
};

/* ================= Layout ================= */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <head>
                <Script
                    id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd),
                    }}
                />
            </head>

            <body
                className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary transition-colors duration-500`}
            >
                {/* subtle noise effect */}
                <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                <Providers>{children}</Providers>
                <PortfolioChatbot />

                <Analytics />
            </body>
        </html>
    );
}
