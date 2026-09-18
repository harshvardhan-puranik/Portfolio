import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Loader from "./components/Loader";
import { CursorGlow, ScrollProgress } from "./lib/fx";
import portrait from "./assets/harshvardhan.png";

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    if (img.complete) resolve();
  });
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const minDuration = 2000;

    // lock scroll while loading
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // progress simulation: increment to 90% over ~1.7s, then wait for resources
    let raf = 0;
    let current = 0;
    const tick = () => {
      // ease towards 88 while loading
      const target = 88;
      current += (target - current) * 0.035;
      if (current > 88) current = 88;
      setProgress(Math.round(current));
      if (current < 88) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const resources: Promise<void>[] = [];

    // fonts
    if (document.fonts?.ready) {
      resources.push(
        document.fonts.ready.then(() => undefined).catch(() => undefined)
      );
    }

    // images
    resources.push(preloadImage(portrait));

    // preload any other <img> in DOM after mount (hero portrait already covered)
    // wait a tick for DOM to be ready
    resources.push(
      new Promise<void>((res) => {
        // also wait for window load
        if (document.readyState === "complete") res();
        else window.addEventListener("load", () => res(), { once: true });
        // fallback timeout 4s
        setTimeout(() => res(), 4000);
      })
    );

    // also preload all images found in document (if any)
    const preloadAllImgs = new Promise<void>((res) => {
      setTimeout(() => {
        const imgs = Array.from(document.images) as HTMLImageElement[];
        if (imgs.length === 0) return res();
        let loaded = 0;
        const done = () => {
          loaded++;
          if (loaded >= imgs.length) res();
        };
        imgs.forEach((img) => {
          if (img.complete) done();
          else {
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
          }
        });
        setTimeout(() => res(), 3000);
      }, 100);
    });
    resources.push(preloadAllImgs);

    Promise.all(resources).then(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minDuration - elapsed);
      // finish progress to 100
      const finish = () => {
        cancelAnimationFrame(raf);
        let p = Math.round(current);
        const step = () => {
          p += 4;
          if (p >= 100) {
            p = 100;
            setProgress(100);
            setIsExiting(true);
            setTimeout(() => {
              setIsLoading(false);
              document.body.style.overflow = originalOverflow;
              document.documentElement.style.overflow = originalHtmlOverflow;
              // refresh ScrollTrigger after content visible
              window.dispatchEvent(new Event("resize"));
            }, 700);
            return;
          }
          setProgress(p);
          setTimeout(step, 35);
        };
        step();
      };
      setTimeout(finish, remaining);
    });

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  return (
    <div className="relative min-h-screen max-w-full overflow-x-hidden bg-ink-950 text-paper antialiased">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-32 right-[-10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(230,59,86,0.16)_0%,transparent_65%)] animate-drift sm:h-[480px] sm:w-[480px] md:h-[560px] md:w-[560px]" />
        <div className="absolute bottom-[-15%] left-[-12%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(246,178,94,0.09)_0%,transparent_65%)] animate-drift-late sm:h-[520px] sm:w-[520px] md:h-[620px] md:w-[620px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950" />
      </div>
      <div aria-hidden className="noise pointer-events-none fixed inset-0 z-[1] overflow-hidden" />

      {isLoading && <Loader isExiting={isExiting} progress={progress} />}

      <ScrollProgress />
      <CursorGlow />

      <div
        className={`relative z-10 transition-opacity duration-700 ease-out ${
          isLoading && !isExiting ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={isLoading ? "true" : "false"}
      >
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Contact />
        </main>
      </div>
    </div>
  );
}
