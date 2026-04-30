import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Journey from "@/components/sections/Journey";
import GitHub from "@/components/sections/GitHub";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Home() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-between">
            <Header />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Journey />
            <GitHub />
            <Contact />
            <Footer />
        </main>
    );
}
