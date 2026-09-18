import { useEffect, useState } from "react";
import { Menu, X, Send, Download } from "lucide-react";

const LINKS = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#journey", label: "journey" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-ink-700/70 bg-ink-950/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#top"
          className="group font-mono text-sm font-semibold tracking-tight text-paper"
        >
          <span className="text-crimson-500 transition-colors group-hover:text-crimson-400">
            hp
          </span>
          <span className="text-faint">://</span>
          <span>puranik</span>
          <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-crimson-500 animate-blink" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative font-mono text-[13px] text-mist transition-colors hover:text-paper"
              >
                <span className="mr-1 text-crimson-500">0{i + 1}.</span>
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-crimson-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="/Harshvardhan_Puranik_Resume.pdf"
            download="Harshvardhan_Puranik_Resume.pdf"
            className="hidden items-center gap-2 rounded-md border border-ink-600 bg-ink-850/80 px-4 py-2 font-mono text-xs font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson-500 hover:text-crimson-300 sm:flex"
          >
            <Download size={13} />
            resume
          </a>
          <a
            href="mailto:hvp0926@gmail.com"
            className="hidden items-center gap-2 rounded-md border border-crimson-600/60 bg-crimson-600/10 px-4 py-2 font-mono text-xs font-medium text-crimson-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson-600 hover:text-paper hover:shadow-[0_10px_30px_-10px_rgba(230,59,86,0.7)] sm:flex"
          >
            <Send size={13} />
            hire me
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="rounded-md border border-ink-700 p-2 text-mist transition-colors hover:text-paper md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <div
        className={`overflow-hidden border-b border-ink-700/70 bg-ink-950/95 backdrop-blur-md transition-all duration-500 md:hidden ${
          open ? "max-h-96" : "max-h-0 border-b-0"
        }`}
      >
        <ul className="space-y-1 px-6 py-4">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 font-mono text-sm text-mist transition-colors hover:text-crimson-400"
              >
                <span className="mr-2 text-crimson-500">0{i + 1}.</span>
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a
              href="/Harshvardhan_Puranik_Resume.pdf"
              download="Harshvardhan_Puranik_Resume.pdf"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-md bg-crimson-600 px-4 py-3 font-mono text-sm font-semibold text-paper"
            >
              <Download size={14} />
              download resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
