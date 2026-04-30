"use client";

import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="opacity-0">{children}</div>;
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ReactLenis root options={{
                duration: 1.2,
                lerp: 0.1,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                smoothWheel: true
            }}>
                {children}
            </ReactLenis>
        </ThemeProvider>
    );
}
