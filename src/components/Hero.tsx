import { useEffect, useRef } from "react";
import {
  ArrowDown,
  Atom,
  Boxes,
  Braces,
  Coffee,
  Database,
  Download,
  Gamepad2,
  Mail,
  Send,
  Server,
  Zap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "./brands";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portrait from "../assets/harshvardhan.png";
import { Cutout, Scramble, useTypewriter } from "../lib/fx";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "Software Development Engineer",
  "Full-Stack Developer",
  "DSA Problem Solver",
  "React + GSAP Animator",
  "Unity & Blender Explorer",
];

const CHIPS = [
  { icon: Coffee, label: "Java", depth: 18, cls: "left-[-4%] top-[16%]", delay: "0s" },
  { icon: Atom, label: "React.js", depth: 26, cls: "right-[-6%] top-[8%]", delay: "0.6s" },
  { icon: Braces, label: "TypeScript", depth: 14, cls: "left-[-8%] top-[52%]", delay: "1.1s" },
  { icon: Zap, label: "GSAP", depth: 30, cls: "right-[-9%] top-[44%]", delay: "0.3s" },
  { icon: Server, label: "FastAPI", depth: 20, cls: "left-[2%] bottom-[10%]", delay: "0.9s" },
  { icon: Gamepad2, label: "Unity", depth: 24, cls: "right-[0%] bottom-[16%]", delay: "1.4s" },
  { icon: Boxes, label: "Blender", depth: 16, cls: "right-[22%] bottom-[-2%]", delay: "0.2s" },
  { icon: Database, label: "SQL", depth: 22, cls: "left-[20%] top-[-2%]", delay: "1.7s" },
];

export default function Hero() {
  const typed = useTypewriter(ROLES);
  const wrapRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Record<number, HTMLDivElement | null>>({});

  /* mouse parallax on floating chips */
  useEffect(() => {
    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      for (const [k, el] of Object.entries(layerRefs.current)) {
        if (!el) continue;
        const d = Number(k);
        el.style.transform = `translate3d(${(cur.x * d).toFixed(1)}px, ${(
          cur.y * d
        ).toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* scroll parallax: photo sinks slower than the page */
  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    const tween = gsap.to(el, {
      yPercent: 14,
      ease: "none",
      scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "bottom top", scrub: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-32">
      <div
        ref={wrapRef}
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-20 md:px-8 lg:grid-cols-2 lg:gap-8 lg:pb-28"
      >
        {/* ------------------------------------------------ left */}
        <div className="relative z-10 min-w-0 w-full max-w-full" style={{ containerType: "inline-size" }}>
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-ink-700 bg-ink-850/80 px-4 py-1.5 font-mono text-[11px] tracking-wide text-mist">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-jade-400 animate-ping-dot" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-jade-400" />
            </span>
            open to SDE roles &amp; internships · Bengaluru
          </div>

          <h1 className="font-display w-full max-w-full text-[clamp(1.15rem,7cqi,2.15rem)] font-extrabold leading-[0.95] tracking-tight sm:text-[clamp(1.6rem,7cqi,3.2rem)] lg:text-[clamp(1.8rem,7cqi,3.4rem)] xl:text-[clamp(2rem,7cqi,3.8rem)]">
            <Scramble text="HARSHVARDHAN" delay={200} className="block whitespace-nowrap text-paper" />
            <Scramble text="PURANIK" delay={650} className="block whitespace-nowrap text-outline" />
          </h1>

          <div className="mt-6 font-mono text-sm text-mist sm:text-base">
            <span className="text-crimson-500">&gt;</span>{" "}
            <span className="text-amber-400">building</span>{" "}
            <span className="text-paper">{typed}</span>
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-crimson-500 animate-blink" />
          </div>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-mist">
            21-year-old B.Tech ISE senior at{" "}
            <span className="text-paper">REVA University</span>, turning ideas
            into working products — from full-stack web apps with{" "}
            <span className="text-paper">React &amp; FastAPI</span> to animated
            interfaces, DSA problem solving, and experiments in{" "}
            <span className="text-paper">Unity &amp; Blender</span>.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 rounded-md bg-crimson-600 px-6 py-3.5 font-mono text-sm font-semibold text-paper transition-all duration-300 hover:-translate-y-1 hover:bg-crimson-500 hover:shadow-[0_18px_44px_-14px_rgba(230,59,86,0.8)]"
            >
              explore my work
              <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="mailto:hvp0926@gmail.com"
              className="group inline-flex items-center gap-2.5 rounded-md border border-ink-600 px-6 py-3.5 font-mono text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-1 hover:border-crimson-500 hover:text-crimson-300"
            >
              <Send size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              get in touch
            </a>
            <a
              href="/Harshvardhan_Puranik_Resume.pdf"
              download="Harshvardhan_Puranik_Resume.pdf"
              className="group inline-flex items-center gap-2.5 rounded-md border border-ink-600 bg-ink-850/80 px-6 py-3.5 font-mono text-sm font-medium text-paper backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-crimson-500 hover:bg-ink-800 hover:text-crimson-300"
            >
              <Download size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              download resume
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3">
            {[
              { icon: GithubIcon, href: "https://github.com/harshvardhan-puranik", label: "GitHub" },
              { icon: LinkedinIcon, href: "https://www.linkedin.com/in/harshvardhan-puranik-7b6627298", label: "LinkedIn" },
              { icon: LeetcodeIcon, href: "https://leetcode.com/u/Harshvardhan_Puranik/", label: "LeetCode" },
              { icon: Mail, href: "mailto:hvp0926@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group rounded-md border border-ink-700 bg-ink-850/70 p-2.5 text-mist transition-all duration-300 hover:-translate-y-1 hover:border-crimson-600/70 hover:text-crimson-400 hover:shadow-[0_10px_26px_-12px_rgba(230,59,86,0.6)]"
              >
                <Icon size={17} />
              </a>
            ))}
            <span className="ml-2 font-mono text-xs text-faint">
              // hvp0926@gmail.com
            </span>
          </div>
        </div>

        {/* ------------------------------------------------ right / portrait */}
        <div
          ref={photoRef}
          className="relative mx-auto flex h-[480px] w-full max-w-[420px] items-end justify-center sm:h-[560px] sm:max-w-[460px] lg:h-[600px] lg:max-w-[520px] xl:h-[640px] xl:max-w-[560px]"
        >
          {/* glows */}
          <div className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(230,59,86,0.22)_0%,rgba(230,59,86,0.07)_45%,transparent_70%)]" />

          {/* rotating rings */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-crimson-600/40 animate-spin-slow" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink-700/70 animate-spin-slower">
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-400" />
          </div>

          {/* portrait — centered via flex, not absolute translate (fixes large-screen right-compression) */}
          <Cutout
            src={portrait}
            alt="Harshvardhan Puranik standing in a crimson shirt"
            className="relative z-10 h-[92%] w-auto max-w-full object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] animate-floaty-sm"
            style={{ maxHeight: "92%" }}
          />

          {/* floating tech chips (parallax layers) */}
          {CHIPS.map(({ icon: Icon, label, depth, cls, delay }) => (
            <div
              key={label}
              ref={(el) => {
                layerRefs.current[depth] = el;
              }}
              className={`absolute ${cls} z-20 will-change-transform`}
            >
              <div
                className="flex items-center gap-2 rounded-md border border-ink-600/90 bg-ink-850/85 px-3 py-1.5 font-mono text-[11px] text-paper shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-sm animate-floaty"
                style={{ animationDelay: delay }}
              >
                <Icon size={13} className="text-crimson-400" />
                {label}
              </div>
            </div>
          ))}

          {/* code card */}
          <div
            ref={(el) => {
              layerRefs.current[12] = el;
            }}
            className="absolute left-[-6%] top-[30%] z-20 hidden w-56 rounded-lg border border-ink-600/90 bg-ink-900/90 p-4 font-mono text-[11px] leading-relaxed shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:block will-change-transform"
          >
            <div className="mb-2 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-crimson-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-jade-400" />
            </div>
            <p>
              <span className="text-crimson-400">const</span>{" "}
              <span className="text-paper">dev</span>{" "}
              <span className="text-faint">=</span>{" "}
              <span className="text-faint">{"{"}</span>
            </p>
            <p className="pl-3">
              <span className="text-amber-300">name</span>
              <span className="text-faint">:</span>{" "}
              <span className="text-jade-400">'Harshvardhan'</span>
              <span className="text-faint">,</span>
            </p>
            <p className="pl-3">
              <span className="text-amber-300">target</span>
              <span className="text-faint">:</span>{" "}
              <span className="text-jade-400">'SDE'</span>
              <span className="text-faint">,</span>
            </p>
            <p className="pl-3">
              <span className="text-amber-300">sem</span>
              <span className="text-faint">:</span>{" "}
              <span className="text-crimson-300">7</span>
              <span className="text-faint">,</span>
            </p>
            <p>
              <span className="text-faint">{"}"};</span>
            </p>
          </div>

          {/* CGPA badge */}
          <div
            ref={(el) => {
              layerRefs.current[28] = el;
            }}
            className="absolute bottom-[6%] right-[-4%] z-20 rounded-lg border border-ink-600/90 bg-ink-900/90 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-sm will-change-transform"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">CGPA</p>
            <p className="font-display text-2xl font-bold text-amber-400">
              9.2<span className="text-sm text-faint">/10</span>
            </p>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">scroll</span>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-ink-600 p-1">
          <span className="h-2 w-1 rounded-full bg-crimson-500 animate-bob" />
        </div>
      </div>
    </section>
  );
}
