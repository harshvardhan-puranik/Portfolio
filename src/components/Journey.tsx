import {
  Award,
  CircleDot,
  Crown,
  Gamepad2,
  Globe2,
  GraduationCap,
  Trophy,
} from "lucide-react";
import { Reveal, SectionHeading } from "../lib/fx";

const TIMELINE = [
  {
    years: "2023 — 2027",
    title: "B.E. Information Science & Engineering",
    place: "REVA University, Bengaluru",
    score: "CGPA 9.2 / 10",
    current: true,
  },
  {
    years: "2023",
    title: "PUC — Pre-University Education",
    place: "Malnad PU College, Shivamogga",
    score: "90%",
  },
  {
    years: "2021",
    title: "10th — KSEAB",
    place: "Ramakrishna Vidyanikethana, Shivamogga",
    score: "97.44%",
  },
];

const CERTS = [
  "Copado AI for DevOps",
  "Meta — Programming with JavaScript",
];

const HACKS = [
  "FOSS FEST WINTER 2025 · International Hackathon, Os-Sci",
  "Adobe University Hackathon",
];

const LANGUAGES: [string, string][] = [
  ["English", "Fluent"],
  ["Kannada", "Native"],
  ["Hindi", "Conversational"],
];

export default function Journey() {
  return (
    <section id="journey" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <SectionHeading index="04" label="trajectory" title="The path" accent="so far." />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ---------------- timeline ---------------- */}
        <div className="relative pl-8">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-crimson-500 via-ink-600 to-transparent" />
          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.1}>
                <div className="group relative">
                  <span
                    className={`absolute -left-8 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                      t.current
                        ? "border-crimson-500 bg-crimson-500/30"
                        : "border-ink-600 bg-ink-900 transition-colors duration-300 group-hover:border-crimson-500"
                    }`}
                  >
                    {t.current && (
                      <span className="absolute inset-0 rounded-full bg-crimson-500 animate-ping-dot" />
                    )}
                  </span>
                  <p className="font-mono text-xs tracking-widest text-crimson-400">{t.years}</p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-paper">{t.title}</h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-mist">
                    <GraduationCap size={14} className="text-faint" />
                    {t.place}
                  </p>
                  <span className="mt-3 inline-block rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-300">
                    {t.score}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------------- certs + hackathons ---------------- */}
        <div className="space-y-6">
          <Reveal>
            <div className="rounded-lg border border-ink-700 bg-ink-850/70 p-6 transition-colors duration-300 hover:border-crimson-600/50 md:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-md border border-crimson-600/50 bg-crimson-600/10 p-2 text-crimson-400">
                  <Award size={18} />
                </span>
                <h3 className="font-display text-xl font-bold text-paper">Certifications</h3>
              </div>
              <ul className="space-y-3">
                {CERTS.map((c) => (
                  <li key={c} className="group flex items-center gap-3 text-sm text-mist">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 transition-transform duration-300 group-hover:scale-150" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-lg border border-ink-700 bg-ink-850/70 p-6 transition-colors duration-300 hover:border-crimson-600/50 md:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-md border border-crimson-600/50 bg-crimson-600/10 p-2 text-crimson-400">
                  <Trophy size={18} />
                </span>
                <h3 className="font-display text-xl font-bold text-paper">Hackathons</h3>
              </div>
              <ul className="space-y-3">
                {HACKS.map((c) => (
                  <li key={c} className="group flex items-center gap-3 text-sm text-mist">
                    <span className="h-1.5 w-1.5 rounded-full bg-crimson-500 transition-transform duration-300 group-hover:scale-150" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-lg border border-ink-700 bg-ink-850/70 p-6 md:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-md border border-crimson-600/50 bg-crimson-600/10 p-2 text-crimson-400">
                  <Globe2 size={18} />
                </span>
                <h3 className="font-display text-xl font-bold text-paper">Languages &amp; Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(([lang, level]) => (
                  <span key={lang} className="rounded-md border border-ink-600 px-3 py-1.5 font-mono text-[11.5px] text-mist transition-colors hover:border-crimson-600/60 hover:text-crimson-300">
                    {lang} <span className="text-faint">· {level}</span>
                  </span>
                ))}
                <span className="mx-1 w-px bg-ink-600" />
                <span className="flex items-center gap-1.5 rounded-md border border-ink-600 px-3 py-1.5 font-mono text-[11.5px] text-mist transition-colors hover:border-crimson-600/60 hover:text-crimson-300">
                  <Gamepad2 size={12} className="text-crimson-400" /> Game Dev
                </span>
                <span className="flex items-center gap-1.5 rounded-md border border-ink-600 px-3 py-1.5 font-mono text-[11.5px] text-mist transition-colors hover:border-crimson-600/60 hover:text-crimson-300">
                  <Crown size={12} className="text-amber-400" /> Chess
                </span>
                <span className="flex items-center gap-1.5 rounded-md border border-ink-600 px-3 py-1.5 font-mono text-[11.5px] text-mist transition-colors hover:border-crimson-600/60 hover:text-crimson-300">
                  <CircleDot size={12} className="text-jade-400" /> Carrom
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
