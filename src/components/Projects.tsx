import { useState } from "react";
import { Sparkles, ExternalLink, Globe } from "lucide-react";
import { GithubIcon } from "./brands";
import { Reveal, SectionHeading, Tilt } from "../lib/fx";

/* ---------------- mini browser frame with live preview ---------------- */
function Browser({
  url,
  href,
  children,
}: {
  url: string;
  href?: string;
  children: React.ReactNode;
}) {
  const isGithub = href?.includes("github.com");
  const canPreview = !!href && !isGithub;
  const [mode, setMode] = useState<"mock" | "live">("mock");

  return (
    <div className="overflow-hidden rounded-lg border border-ink-600 bg-ink-900 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-850 px-3 py-2.5 sm:gap-3 sm:px-4">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-crimson-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-jade-400" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md bg-ink-800 px-2 py-1 font-mono text-[10px] text-faint sm:px-3">
          {url}
        </div>

        {/* mode toggle — only for previewable http links */}
        {canPreview && (
          <div className="hidden shrink-0 items-center gap-1 rounded-md bg-ink-900 p-1 sm:flex">
            <button
              onClick={() => setMode("mock")}
              className={`rounded px-2.5 py-1 font-mono text-[10px] font-medium transition-colors ${
                mode === "mock"
                  ? "bg-ink-700 text-paper"
                  : "text-faint hover:text-mist"
              }`}
            >
              Mock
            </button>
            <button
              onClick={() => setMode("live")}
              className={`rounded px-2.5 py-1 font-mono text-[10px] font-medium transition-colors ${
                mode === "live"
                  ? "bg-crimson-600 text-white"
                  : "text-faint hover:text-mist"
              }`}
            >
              Live
            </button>
          </div>
        )}

        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Open live site"
            className="shrink-0 rounded-md bg-crimson-600 p-1.5 text-white transition-colors hover:bg-crimson-500"
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      {/* content area */}
      <div className="relative">
        {mode === "live" && canPreview && href ? (
          <div className="relative h-[300px] overflow-hidden bg-white">
            <iframe
              src={href}
              title={url}
              loading="lazy"
              className="absolute left-0 top-0 h-[820px] w-[1200px] origin-top-left scale-[0.32] border-0 bg-white sm:scale-[0.36] md:h-[800px] md:w-[1200px] md:scale-[0.33]"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              referrerPolicy="no-referrer"
            />
            {/* invisible click overlay to open in new tab - keeps iframe interactive but also provides fallback click */}
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 z-10"
              aria-label="Open live site in new tab"
            />
            <div className="pointer-events-none absolute bottom-2 left-2 z-20 rounded-md bg-ink-900/85 px-2.5 py-1 font-mono text-[10px] text-paper backdrop-blur-sm">
              live preview · click to open full site
            </div>
          </div>
        ) : (
          <div className="p-4">{children}</div>
        )}

        {/* mobile live toggle + hint */}
        {canPreview && mode === "mock" && (
          <div className="flex items-center justify-between border-t border-ink-700 bg-ink-850/50 px-3 py-2 sm:hidden">
            <span className="font-mono text-[10px] text-faint">tap to preview live site</span>
            <button
              onClick={() => setMode("live")}
              className="inline-flex items-center gap-1 rounded-md bg-crimson-600 px-2.5 py-1 font-mono text-[11px] font-medium text-white"
            >
              <Globe size={11} /> Live
            </button>
          </div>
        )}
        {canPreview && mode === "live" && (
          <div className="flex items-center justify-between border-t border-ink-700 bg-ink-850/50 px-3 py-2 sm:hidden">
            <span className="font-mono text-[10px] text-amber-300">if preview is blank, site blocks embedding</span>
            <button
              onClick={() => setMode("mock")}
              className="rounded-md border border-ink-600 px-2.5 py-1 font-mono text-[11px] text-mist"
            >
              Mock
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const Line = ({ w, c = "bg-ink-600" }: { w: string; c?: string }) => (
  <div className={`h-2 rounded-full ${c}`} style={{ width: w }} />
);

/* ---------------- retailAI mock ---------------- */
function RetailMock() {
  return (
    <Browser url="ai-retail-project.vercel.app" href="https://ai-retail-project.vercel.app/">
      <div className="flex gap-3">
        <div className="hidden w-9 flex-col items-center gap-3 rounded-md bg-ink-850 py-3 sm:flex">
          <span className="h-5 w-5 rounded-md bg-crimson-600" />
          <span className="h-1.5 w-5 rounded bg-ink-600" />
          <span className="h-1.5 w-5 rounded bg-ink-600" />
          <span className="h-1.5 w-5 rounded bg-ink-600" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Stock", "1,284", "text-paper"],
              ["Forecast", "+12%", "text-jade-400"],
              ["Alerts", "3", "text-amber-400"],
            ].map(([l, v, c]) => (
              <div key={l} className="rounded-md border border-ink-700 bg-ink-850 p-2.5">
                <p className="font-mono text-[9px] uppercase tracking-wider text-faint">{l}</p>
                <p className={`font-display text-lg font-bold ${c}`}>{v}</p>
              </div>
            ))}
          </div>
          <div className="flex h-24 items-end gap-1.5 rounded-md border border-ink-700 bg-ink-850 p-3">
            {[42, 66, 50, 82, 58, 92, 70, 62].map((h, i) => (
              <div
                key={i}
                className="flex-1 origin-bottom rounded-t-sm bg-gradient-to-t from-crimson-700 to-crimson-400 transition-transform duration-500 group-hover:scale-y-110"
                style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2">
            <Sparkles size={12} className="shrink-0 text-amber-400" />
            <p className="font-mono text-[10px] text-amber-300">
              AI: restock 40 units of SKU-118 before Friday?
            </p>
          </div>
        </div>
      </div>
    </Browser>
  );
}

/* ---------------- K72 mock ---------------- */
function K72Mock() {
  return (
    <Browser url="k72-ufvo.onrender.com" href="https://k72-ufvo.onrender.com/">
      <div className="relative space-y-3 overflow-hidden rounded-md bg-ink-850 p-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-xs font-bold text-crimson-400">K72</span>
          <div className="flex gap-2">
            <span className="h-1.5 w-6 rounded bg-ink-600" />
            <span className="h-1.5 w-6 rounded bg-ink-600" />
            <span className="h-1.5 w-6 rounded bg-crimson-600" />
          </div>
        </div>
        <div className="space-y-2 py-2">
          <Line w="82%" c="bg-paper/70" />
          <Line w="64%" c="bg-paper/40" />
          <div className="flex gap-2 pt-1">
            <span className="h-5 w-16 rounded bg-crimson-600" />
            <span className="h-5 w-16 rounded border border-ink-600" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-1.5 rounded-md border border-ink-700 bg-ink-900 p-2 transition-transform duration-500 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="block h-6 rounded bg-gradient-to-br from-crimson-700/60 to-ink-700" />
              <Line w="90%" />
              <Line w="60%" />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-paper/5 to-transparent animate-shimmer" />
      </div>
    </Browser>
  );
}

/* ---------------- skill sync mock ---------------- */
function SyncMock() {
  return (
    <Browser url="github.com/harshvardhan-puranik/SkillSync" href="https://github.com/harshvardhan-puranik/SkillSync">
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Open", [["Aarav K.", "React Dev"], ["Meera S.", "ML Eng"]], "bg-ink-600"],
          ["Matched", [["Rohan P.", "Full-Stack"]], "bg-amber-400"],
          ["Hired", [["Isha T.", "UI/UX"]], "bg-jade-400"],
        ].map(([col, people, dot]) => (
          <div key={col as string} className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
              <span className="font-mono text-[9px] uppercase tracking-wider text-faint">{col}</span>
            </div>
            {(people as string[][]).map(([name]) => (
              <div key={name} className="space-y-1.5 rounded-md border border-ink-700 bg-ink-850 p-2 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="h-4 w-4 rounded-full bg-gradient-to-br from-crimson-500 to-amber-400" />
                  <span className="truncate font-mono text-[9px] text-paper">{name}</span>
                </div>
                <Line w="75%" />
                <span className="inline-block rounded bg-crimson-600/20 px-1.5 py-0.5 font-mono text-[8px] text-crimson-300">
                  92% match
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Browser>
  );
}

/* ---------------- data ---------------- */
const PROJECTS = [
  {
    year: "2026",
    tag: "Full-Stack · Machine Learning",
    title: "RetailAI",
    desc: "An AI-powered retail inventory management platform unifying frontend, backend and machine learning into one application.",
    points: [
      "Demand forecasting with automated stock alerts",
      "Integrated AI assistant for inventory decisions",
      "Single cohesive full-stack + ML architecture",
    ],
    tech: ["React.js", "FastAPI", "Python", "ML", "PostgreSQL"],
    liveUrl: "https://ai-retail-project.vercel.app/",
    githubUrl: null as string | null,
    mock: <RetailMock />,
  },
  {
    year: "2026",
    tag: "Frontend · Animation",
    title: "K72 Web Project",
    desc: "A responsive web application built around modular, reusable components and interactive, GSAP-driven motion.",
    points: [
      "Modular & reusable React component system",
      "Interactive animations implemented with GSAP",
      "Optimized responsive layouts & user interactions",
    ],
    tech: ["React.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "GSAP"],
    liveUrl: "https://k72-ufvo.onrender.com/",
    githubUrl: null as string | null,
    mock: <K72Mock />,
  },
  {
    year: "2025",
    tag: "Hackathon · AI Platform",
    title: "Skill Sync",
    desc: "An AI-powered freelance project management platform connecting businesses with specialized freelancers — built in a team during a vibe-coding hackathon.",
    points: [
      "AI matching between businesses & freelancers",
      "Team collaboration via GitHub throughout",
      "Rapid hackathon build-to-ship cycle",
    ],
    tech: ["React", "AI", "Git & GitHub", "Team Collab"],
    liveUrl: null as string | null,
    githubUrl: "https://github.com/harshvardhan-puranik/SkillSync",
    mock: <SyncMock />,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <SectionHeading index="03" label="selected builds" title="Things I've" accent="shipped." />

      <div className="space-y-20 md:space-y-28">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title}>
            <article className="group grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <Tilt max={7}>{p.mock}</Tilt>
              </div>

              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <div className="mb-3 flex items-center gap-3 font-mono text-xs">
                  <span className="rounded border border-crimson-600/50 bg-crimson-600/10 px-2 py-0.5 text-crimson-300">
                    {p.year}
                  </span>
                  <span className="text-faint">{p.tag}</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-paper transition-colors duration-300 group-hover:text-crimson-400 md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-mist">{p.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-mist">
                      <span className="mt-[7px] h-1 w-3 shrink-0 bg-crimson-500" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-md border border-ink-600 bg-ink-850/70 px-3 py-1 font-mono text-[11px] text-mist transition-colors duration-200 hover:border-crimson-600/60 hover:text-crimson-300">
                      {t}
                    </span>
                  ))}
                </div>

                {/* action buttons — live + github */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn inline-flex items-center gap-2 rounded-md bg-crimson-600 px-5 py-2.5 font-mono text-sm font-semibold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson-500 hover:shadow-[0_12px_30px_-10px_rgba(230,59,86,0.6)]"
                    >
                      <ExternalLink size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      Live Demo
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn inline-flex items-center gap-2 rounded-md border border-ink-600 bg-ink-850 px-5 py-2.5 font-mono text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson-500 hover:text-crimson-300"
                    >
                      <GithubIcon size={14} />
                      View Code
                    </a>
                  )}
                  {/* fallback: if only live available, also show subtle GitHub search hint? */}
                  {!p.githubUrl && p.liveUrl && p.title === "RetailAI" && (
                    <span className="inline-flex items-center gap-2 px-2 py-2 font-mono text-xs text-faint">
                      <Globe size={12} className="text-faint" />
                      ai-retail-project.vercel.app
                    </span>
                  )}
                  {!p.githubUrl && p.liveUrl && p.title === "K72 Web Project" && (
                    <span className="inline-flex items-center gap-2 px-2 py-2 font-mono text-xs text-faint">
                      <Globe size={12} className="text-faint" />
                      k72-ufvo.onrender.com
                    </span>
                  )}
                </div>
                <p className="mt-3 font-mono text-[11px] text-faint">
                  {/* helper text for iframe blocking */}
                  {p.liveUrl && !p.githubUrl && (
                    <span>Tip: use <span className="text-mist">Live</span> toggle inside the browser mock to preview live site inline · if blank, the host blocks embedding — use Live Demo button.</span>
                  )}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
