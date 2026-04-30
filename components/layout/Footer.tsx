export default function Footer() {
    const socials = [
        {
            name: "GitHub",
            link: "https://github.com/mahdirizkou",
        },
        {
            name: "LinkedIn",
            link: "https://www.linkedin.com/in/mahdirizkou/",
        },
        {
            name: "Instagram",
            link: "https://www.instagram.com/",
        },
    ];

    return (
        <footer className="py-20 px-6 border-t border-white/5 bg-black">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Left */}
                <div className="space-y-2 text-center md:text-left">
                    <p className="text-white font-bold tracking-tight text-xl">
                        EL MAHDI RIZKOU<span className="text-primary">.</span>
                    </p>
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        Built with Django & Passion
                    </p>
                </div>

                {/* Center */}
                <p className="text-zinc-600 text-xs font-medium">
                    © {new Date().getFullYear()} — Designed & Developed with elite intentions.
                </p>

                {/* Right */}
                <div className="flex gap-8">
                    {socials.map((item) => (
                        <a
                            key={item.name}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    );
}