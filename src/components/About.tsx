import { Compass, GraduationCap, Rocket, Target } from "lucide-react";
import { Reveal, SectionHeading, useCountUp } from "../lib/fx";

const MARQUEE = [
  "Java", "JavaScript", "TypeScript", "React.js", "Tailwind CSS", "GSAP",
  "FastAPI", "SQL", "DSA", "Unity", "Blender", "Redux", "Git", "REST APIs",
  "AI", "Computer Graphics",
];

function Stat({
  value,
  decimals = 0,
  suffix,
  label,
  icon: Icon,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
}) {
  const ref = useCountUp(value, decimals);
  return (
    <div className="group relative overflow-hidden rounded-lg border border-ink-700 bg-ink-850/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-crimson-600/60">
      <div className="absolute -right-4 -top-4 text-ink-700/60 transition-colors duration-300 group-hover:text-crimson-600/25 -z-10">
        <Icon size={64} strokeWidth={1.4} />
      </div>
      <p className="font-display text-4xl font-bold text-paper ">
        <span ref={ref}>0</span>
        {suffix && <span className="ml-0.5 text-xl text-crimson-400 ">{suffix}</span>}
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-faint ">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <>
      {/* ---------------- marquee ---------------- */}
      <div className="marquee-pause relative overflow-hidden border-y border-ink-700/80 bg-ink-900/70 py-4">
        <div className="flex w-max animate-marquee gap-0 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="flex items-center font-mono text-sm text-mist">
              <span className="px-5 transition-colors hover:text-crimson-400">{item}</span>
              <span className="text-crimson-600">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- about ---------------- */}
      <section id="about" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
        <SectionHeading index="01" label="about me" title="Engineering curiosity," accent="shipped." />

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-6 text-[15.5px] leading-relaxed text-mist">
            <Reveal>
              <p>
                <span className="float-left mr-3 font-display text-6xl font-extrabold leading-[0.8] text-crimson-500">I</span>
                &rsquo;m a 21-year-old B.Tech Information Science &amp; Engineering student in my
                7th semester at <span className="text-paper">REVA University, Bengaluru</span> —
                aspiring to start my career as a{" "}
                <span className="text-paper">Software Development Engineer</span>. I care about
                software engineering, full-stack development, problem solving, and building
                interactive digital experiences that feel alive.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                My foundation runs on <span className="text-paper">Java, JavaScript, TypeScript and SQL</span>.
                On the frontend I pair <span className="text-paper">React with Tailwind and GSAP</span> to make
                interfaces feel polished and kinetic; on the backend I&rsquo;m exploring{" "}
                <span className="text-paper">FastAPI</span> — how APIs, databases and auth fit into real
                architectures — while <span className="text-amber-400">Redux</span> sharpens my sense of
                predictable, scalable state.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Beyond the web, I experiment with <span className="text-paper">Unity</span> for gameplay systems
                and <span className="text-paper">Blender</span> for 3D modeling and assets, and I&rsquo;m drawn to
                the intersection of <span className="text-paper">AI, graphics and interactivity</span>. My rule
                is simple: I learn best by building — every project is a chance to solve a real
                problem and level up how I think about software.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex items-center gap-3 border-l-2 border-crimson-600 pl-4 font-mono text-xs text-faint">
                <GraduationCap size={15} className="text-crimson-400" />
                B.Tech ISE · REVA University · Bengaluru, Karnataka, India
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Stat value={21} label="years old" icon={Compass} />
              <Stat value={9.2} decimals={1} suffix="/10" label="CGPA · REVA" icon={GraduationCap} />
              <Stat value={97.44} decimals={2} suffix="%" label="10th KSEAB" icon={Target} />
              <Stat value={7} label="current semester" icon={Rocket} />
            </div>

            <Reveal delay={0.15}>
              <div className="rounded-lg border border-ink-700 bg-ink-850/70 p-6">
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-crimson-400">
                  // current focus
                </p>
                <ul className="space-y-3">
                  {[
                    "Strengthening Java & DSA fundamentals",
                    "Building with React + modern frontend tooling",
                    "Learning FastAPI backends & Redux state",
                    "Shipping projects that prove practical skill",
                  ].map((item) => (
                    <li key={item} className="group flex items-start gap-3 text-sm text-mist">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-500 transition-transform duration-300 group-hover:scale-150" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
