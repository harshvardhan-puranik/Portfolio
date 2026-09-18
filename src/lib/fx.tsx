import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Scroll reveal wrapper                                               */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 44,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger: el, start: "top 88%", once },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, once]);

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scramble / decode text                                              */
/* ------------------------------------------------------------------ */
const GLYPHS = "!<>-_\\/[]{}=+*^?#@$%&";

export function Scramble({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const [out, setOut] = useState(text.replace(/\S/g, " "));

  useEffect(() => {
    let frame = 0;
    let raf = 0;
    let started = false;
    const total = 34;
    const tick = () => {
      frame++;
      const progress = frame / total;
      const solved = Math.floor(progress * text.length);
      let next = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") {
          next += " ";
        } else if (i < solved) {
          next += ch;
        } else {
          next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setOut(next);
      if (frame < total) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    const timer = setTimeout(() => {
      started = true;
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      if (started) cancelAnimationFrame(raf);
    };
  }, [text, delay]);

  return <span className={className}>{out}</span>;
}

/* ------------------------------------------------------------------ */
/* Typewriter                                                          */
/* ------------------------------------------------------------------ */
export function useTypewriter(words: string[], speed = 70, pause = 1500) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timer = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

/* ------------------------------------------------------------------ */
/* Count-up number (GSAP driven, triggered on scroll)                  */
/* ------------------------------------------------------------------ */
export function useCountUp(target: number, decimals = 0, duration = 1.8) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const state = { v: 0 };
    const tween = gsap.to(state, {
      v: target,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = state.v.toFixed(decimals);
      },
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target, decimals, duration]);

  return ref;
}

/* ------------------------------------------------------------------ */
/* Canvas white-key cutout — strips the white studio backdrop          */
/* ------------------------------------------------------------------ */
export function Cutout({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const px = data.data;
        for (let i = 0; i < px.length; i += 4) {
          const r = px[i];
          const g = px[i + 1];
          const b = px[i + 2];
          const min = Math.min(r, g, b);
          const max = Math.max(r, g, b);
          const spread = max - min;
          if (min > 243 && spread < 14) {
            px[i + 3] = 0;
          } else if (min > 212 && spread < 22) {
            const t = (min - 212) / (243 - 212);
            px[i + 3] = Math.round(255 * (1 - t * t));
          }
        }
        ctx.putImageData(data, 0, 0);
        if (!cancelled) setDataUrl(canvas.toDataURL("image/png"));
      } catch {
        if (!cancelled) setDataUrl(src);
      }
    };
    img.onerror = () => {
      if (!cancelled) setDataUrl(src);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <img
      src={dataUrl ?? src}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: dataUrl ? 1 : 0,
        transition: "opacity 700ms ease",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 3D tilt card                                                        */
/* ------------------------------------------------------------------ */
export function Tilt({
  children,
  className,
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(
      2
    )}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el)
      el.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 220ms ease", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ambient cursor glow                                                 */
/* ------------------------------------------------------------------ */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const cur = { ...target };
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.style.opacity = "1";
    };
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.09;
      cur.y += (target.y - cur.y) * 0.09;
      el.style.transform = `translate3d(${cur.x - 260}px, ${cur.y - 260}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(circle, rgba(230,59,86,0.13) 0%, rgba(230,59,86,0.05) 40%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Top scroll progress bar                                             */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      el.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-crimson-600 via-crimson-500 to-amber-400"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Shared section heading                                              */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  index,
  label,
  title,
  accent,
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
}) {
  return (
    <Reveal>
      <div className="mb-10 md:mb-16">
        <div className="mb-4 flex items-center gap-3 font-mono text-[11px] tracking-widest text-crimson-400 uppercase sm:text-xs">
          <span className="text-faint">{index}</span>
          <span className="h-px w-10 bg-crimson-600/60" />
          <span>{label}</span>
        </div>
        <h2 className="font-display text-3xl font-bold leading-[1.05] text-paper sm:text-4xl md:text-6xl">
          {title}{" "}
          {accent && <span className="text-crimson-500">{accent}</span>}
        </h2>
      </div>
    </Reveal>
  );
}
