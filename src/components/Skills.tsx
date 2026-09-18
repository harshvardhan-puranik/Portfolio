import { useEffect, useRef, useState } from "react";
import { Brain, Code2, Sparkles } from "lucide-react";
import { Chart, registerables } from "chart.js";
import { Reveal, SectionHeading, Tilt } from "../lib/fx";

Chart.register(...registerables);

/* ---------------- radar chart ---------------- */
function RadarCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const isMobile = window.innerWidth < 640;
    const chart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Frontend", "Backend", "DSA", "Languages", "Tools", "3D & Games"],
        datasets: [
          {
            label: "proficiency",
            data: [84, 62, 78, 86, 80, 58],
            backgroundColor: "rgba(230, 59, 86, 0.16)",
            borderColor: "#e63b56",
            borderWidth: 2,
            pointBackgroundColor: "#f6b25e",
            pointBorderColor: "#0b0d14",
            pointBorderWidth: 2,
            pointRadius: isMobile ? 3 : 4,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "#f6b25e",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1400, easing: "easeOutQuart" },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { display: false, stepSize: 20 },
            grid: { color: "rgba(151, 160, 180, 0.12)" },
            angleLines: { color: "rgba(151, 160, 180, 0.12)" },
            pointLabels: {
              color: "#97a0b4",
              font: { family: "JetBrains Mono", size: isMobile ? 8 : 11 },
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#141826",
            borderColor: "#e63b56",
            borderWidth: 1,
            titleFont: { family: "JetBrains Mono" },
            bodyFont: { family: "JetBrains Mono" },
            callbacks: {
              label: (c) => ` ${c.parsed.r} / 100`,
            },
          },
        },
      },
    });
    const onResize = () => {
      const mobile = window.innerWidth < 640;
      const newSize = mobile ? 8 : 11;
      const current = (chart.options.scales as unknown as { r: { pointLabels: { font: { size: number } } } }).r.pointLabels.font.size;
      if (current !== newSize) {
        (chart.options.scales as unknown as { r: { pointLabels: { font: { size: number } } } }).r.pointLabels.font.size = newSize;
        chart.update();
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      chart.destroy();
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[340px] rounded-lg border border-ink-700 bg-ink-850/70 p-4 sm:max-w-none sm:p-6">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-crimson-400">
        // skill radar
      </p>
      <div className="mx-auto h-56 w-full max-w-[280px] sm:h-64 sm:max-w-[320px] md:h-72">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

/* ---------------- animated bars ---------------- */
const BARS = [
  { name: "Java", pct: 88 },
  { name: "JavaScript", pct: 84 },
  { name: "SQL", pct: 80 },
  { name: "TypeScript", pct: 76 },
  { name: "Python", pct: 64 },
];

function Bars() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[340px] rounded-lg border border-ink-700 bg-ink-850/70 p-4 sm:max-w-none sm:p-6">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-crimson-400 sm:mb-5">
        // core languages
      </p>
      <div className="space-y-4">
        {BARS.map((b, i) => (
          <div key={b.name}>
            <div className="mb-1.5 flex items-baseline justify-between font-mono text-xs">
              <span className="text-paper">{b.name}</span>
              <span className="text-faint">{b.pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-ink-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-crimson-600 to-amber-400 transition-all duration-[1200ms] ease-out"
                style={{
                  width: on ? `${b.pct}%` : "0%",
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- category tilt cards ---------------- */
function Chip({ label, learning }: { label: string; learning?: boolean }) {
  return (
    <span
      className={`cursor-default rounded-md border px-2.5 py-1 font-mono text-[10px] transition-all duration-200 sm:px-3 sm:py-1.5 sm:text-[11.5px] ${
        learning
          ? "border-dashed border-amber-500/50 text-amber-300 hover:border-amber-400 hover:bg-amber-500/10"
          : "border-ink-600 text-mist hover:-translate-y-0.5 hover:border-crimson-600/70 hover:text-crimson-300"
      }`}
    >
      {label}
      {learning && <span className="ml-1 sm:ml-1.5 text-[8px] uppercase tracking-wider sm:text-[9px]">learning</span>}
    </span>
  );
}

const CATEGORIES = [
  {
    icon: Code2,
    title: "Development",
    desc: "Front to back — building responsive, animated, production-minded apps.",
    chips: [
      ["Java"], ["JavaScript"], ["TypeScript"], ["SQL"], ["C++"], ["Python"],
      ["React.js"], ["Tailwind CSS"], ["GSAP"], ["FastAPI"], ["HTML5"], ["CSS3"],
      ["Axios"], ["REST APIs"], ["PostgreSQL"], ["Git & GitHub"], ["VS Code"],
      ["Redux", true],
    ] as [string, boolean?][],
  },
  {
    icon: Brain,
    title: "Problem Solving & DSA",
    desc: "Not just solving — understanding why it works, its complexity, and the pattern behind it.",
    chips: [
      ["Arrays"], ["Strings"], ["Hashing"], ["Two Pointers"], ["Sliding Window"],
      ["Prefix Sum"], ["Binary Search"], ["Dynamic Programming"], ["Bit Manipulation"],
      ["Stacks"], ["Queues"], ["Linked Lists"],
    ] as [string, boolean?][],
  },
  {
    icon: Sparkles,
    title: "AI · Game Dev · 3D",
    desc: "Where software engineering meets interactive, intelligent experiences.",
    chips: [
      ["Unity"], ["Blender"], ["Computer Graphics"], ["AI / ML"],
      ["Gameplay Systems"], ["3D Modeling"], ["Game Assets"],
    ] as [string, boolean?][],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-5 sm:py-24 md:px-8 md:py-32">
      <SectionHeading index="02" label="the arsenal" title="Tools I think" accent="in." />

      <div className="mx-auto grid w-full max-w-[340px] grid-cols-1 gap-5 sm:max-w-[500px] sm:gap-6 md:max-w-2xl lg:mx-0 lg:max-w-none lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div className="mx-auto w-full max-w-full space-y-6 sm:mx-0">
          <Reveal>
            <RadarCard />
          </Reveal>
          <Reveal delay={0.1}>
            <Bars />
          </Reveal>
        </div>

        <div className="mx-auto w-full max-w-full space-y-5 sm:mx-0 sm:space-y-6">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.08} className="mx-auto w-full max-w-[340px] sm:max-w-none">
              <Tilt className="mx-auto w-full rounded-lg border border-ink-700 bg-ink-850/70 p-4 hover:border-crimson-600/50 sm:p-6 md:p-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-md border border-crimson-600/50 bg-crimson-600/10 p-2 text-crimson-400">
                    <cat.icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-paper">{cat.title}</h3>
                  </div>
                </div>
                <p className="mb-5 text-sm text-mist">{cat.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.chips.map(([label, learning]) => (
                    <Chip key={label} label={label} learning={learning} />
                  ))}
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
