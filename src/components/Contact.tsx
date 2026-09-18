import { ArrowUp, Download, Mail, MapPin, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "./brands";
import { Reveal } from "../lib/fx";

export default function Contact() {
  return (
    <section id="contact" className="relative max-w-full scroll-mt-24 overflow-hidden px-4 pt-20 sm:px-5 sm:pt-24 md:px-8 md:pt-32">
      {/* ambient glow - responsive to avoid mobile overflow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[360px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(230,59,86,0.14)_0%,transparent_65%)] sm:h-[340px] sm:w-[520px] md:h-[420px] md:w-[640px] lg:h-[480px] lg:w-[720px]" />

      <div className="relative mx-auto w-full max-w-5xl px-0 text-center">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-crimson-400">
            05 // say hello
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[clamp(1.9rem,8vw,2.4rem)] font-extrabold leading-[1.02] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
            Let&rsquo;s build something
            <span className="text-outline block">that matters.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-mist">
            I&rsquo;m looking for SDE roles and internships where I can learn from experienced
            engineers, contribute to real products, and grow into a strong software engineer.
            My inbox is always open.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
            <a
              href="mailto:hvp0926@gmail.com"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-crimson-600 px-5 py-3.5 font-mono text-xs font-semibold text-paper transition-all duration-300 hover:-translate-y-1 hover:bg-crimson-500 hover:shadow-[0_20px_50px_-16px_rgba(230,59,86,0.85)] sm:w-auto sm:px-7 sm:py-4 sm:text-sm"
            >
              <Send size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-[15px] sm:w-[15px]" />
              <span className="truncate">hvp0926@gmail.com</span>
            </a>
            <a
              href="tel:+918075047136"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-md border border-ink-600 px-5 py-3.5 font-mono text-xs font-medium text-paper transition-all duration-300 hover:-translate-y-1 hover:border-crimson-500 hover:text-crimson-300 sm:w-auto sm:px-7 sm:py-4 sm:text-sm"
            >
              <Phone size={14} className="transition-transform duration-300 group-hover:rotate-12 sm:h-[15px] sm:w-[15px]" />
              +91 80750 47136
            </a>
            <a
              href="/Harshvardhan_Puranik_Resume.pdf"
              download="Harshvardhan_Puranik_Resume.pdf"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-md border border-ink-600 bg-ink-850/80 px-5 py-3.5 font-mono text-xs font-semibold text-paper backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-crimson-500 hover:bg-ink-800 hover:text-crimson-300 sm:w-auto sm:px-7 sm:py-4 sm:text-sm"
            >
              <Download size={14} className="transition-transform duration-300 group-hover:translate-y-0.5 sm:h-[15px] sm:w-[15px]" />
              download resume
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mx-auto mt-10 grid w-full max-w-[320px] gap-3 sm:mt-12 sm:max-w-2xl sm:gap-4 sm:grid-cols-3">
            {[
              { icon: MapPin, top: "based in", bottom: "Bengaluru, India" },
              { icon: Mail, top: "email", bottom: "hvp0926@gmail.com" },
              { icon: Send, top: "status", bottom: "Open to work" },
            ].map(({ icon: Icon, top, bottom }) => (
              <div key={top} className="rounded-lg border border-ink-700 bg-ink-850/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-crimson-600/50">
                <Icon size={16} className="mx-auto mb-2 text-crimson-400" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-faint">{top}</p>
                <p className="mt-0.5 text-sm text-paper">{bottom}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-10 flex items-center justify-center gap-3">
            {[
              { icon: GithubIcon, href: "https://github.com/harshvardhan-puranik", label: "GitHub" },
              { icon: LinkedinIcon, href: "https://www.linkedin.com/in/harshvardhan-puranik-7b6627298", label: "LinkedIn" },
              { icon: LeetcodeIcon, href: "https://leetcode.com/u/Harshvardhan_Puranik", label: "LeetCode" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-md border border-ink-700 bg-ink-850/70 p-3 text-mist transition-all duration-300 hover:-translate-y-1 hover:border-crimson-600/70 hover:text-crimson-400"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ---------------- footer ---------------- */}
      <footer className="relative mx-auto mt-16 max-w-7xl border-t border-ink-700/70 px-4 py-6 sm:mt-24 sm:px-5 sm:py-8 md:px-8">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
          <p className="max-w-full break-words font-mono text-[11px] leading-relaxed text-faint sm:text-xs">
            © 2026 Harshvardhan Puranik — designed &amp; built with{" "}
            <span className="text-crimson-400">React</span>,{" "}
            <span className="text-crimson-400">Tailwind</span> &amp;{" "}
            <span className="text-crimson-400">GSAP</span>
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="group flex items-center gap-2 font-mono text-xs text-mist transition-colors hover:text-crimson-400"
          >
            back to top
            <span className="rounded-md border border-ink-600 p-1.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-crimson-600/70">
              <ArrowUp size={13} />
            </span>
          </a>
        </div>
      </footer>
    </section>
  );
}
