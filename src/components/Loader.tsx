export default function Loader({
  isExiting,
  progress,
}: {
  isExiting: boolean;
  progress: number;
}) {
  return (
    <div
      aria-hidden={!isExiting ? "false" : "true"}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink-950 transition-opacity duration-700 ease-out ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* ambient background - same as App */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -top-32 right-[-10%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(230,59,86,0.14)_0%,transparent_65%)] animate-drift" />
        <div className="absolute bottom-[-15%] left-[-12%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(246,178,94,0.08)_0%,transparent_65%)] animate-drift-late" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
      </div>
      <div aria-hidden className="noise pointer-events-none absolute inset-0" />

      {/* subtle top progress line */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-ink-800">
        <div
          className="h-full bg-gradient-to-r from-crimson-600 via-crimson-500 to-amber-400 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* main content */}
      <div
        className={`relative flex w-full max-w-6xl flex-col items-center px-4 py-8 text-center transition-all duration-700 ease-out sm:px-6 md:px-8 ${
          isExiting ? "scale-[0.98] opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ containerType: "inline-size" } as React.CSSProperties}
      >
        {/* top badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-850/70 px-3 py-1.5 font-mono text-[10px] tracking-widest text-mist backdrop-blur-sm sm:mb-8 sm:px-4 sm:text-[11px]">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-jade-400 animate-ping-dot" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-jade-400 sm:h-2 sm:w-2" />
          </span>
          <span className="hidden sm:inline">initializing portfolio • loading resources</span>
          <span className="sm:hidden">loading resources</span>
          <span className="ml-1 font-mono text-[10px] text-faint tabular-nums">{progress}%</span>
        </div>

        {/* logo */}
        <div className="mb-4 font-mono text-xs font-semibold tracking-tight text-paper sm:mb-6 sm:text-sm">
          <span className="text-crimson-500">hp</span>
          <span className="text-faint">://</span>
          <span>puranik</span>
          <span className="ml-1 inline-block h-3 w-[6px] translate-y-0.5 bg-crimson-500 animate-blink sm:h-3.5 sm:w-[7px]" />
        </div>

        {/* name - responsive via cqi to prevent Harshva/rdhan split */}
        <div className="w-full max-w-full font-display font-extrabold leading-[0.9] tracking-tight">
          <div className="whitespace-nowrap text-[clamp(1.15rem,7cqi,2.6rem)] text-paper sm:text-[clamp(1.5rem,7cqi,3.2rem)] md:text-[clamp(2rem,6.5cqi,3.8rem)]">
            HARSHVARDHAN
          </div>
          <div className="whitespace-nowrap text-outline text-[clamp(1.15rem,7cqi,2.6rem)] sm:text-[clamp(1.5rem,7cqi,3.2rem)] md:text-[clamp(2rem,6.5cqi,3.8rem)]">
            PURANIK
          </div>
        </div>

        {/* tagline */}
        <p className="mt-4 max-w-[320px] font-mono text-[11px] leading-relaxed text-mist sm:mt-6 sm:max-w-xl sm:text-xs md:text-sm">
          <span className="text-faint">01 —</span> Software Development Engineer{" "}
          <span className="text-faint">•</span> React &amp; FastAPI{" "}
          <span className="hidden sm:inline">
            <span className="text-faint">•</span> crafting interactive experiences
          </span>
        </p>

        {/* progress bar - centered, responsive */}
        <div className="mt-8 w-full max-w-[280px] sm:mt-10 sm:max-w-[420px] md:max-w-[520px]">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-faint">
            <span>loading</span>
            <span className="tabular-nums">{String(progress).padStart(3, "0")}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-800 p-0.5 sm:h-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-crimson-600 via-crimson-500 to-amber-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-faint/70 sm:text-[10px]">
            <span className="hidden sm:inline">preloading images • fonts • assets</span>
            <span className="sm:hidden">preloading assets</span>
            <span className="tabular-nums">
              {progress < 30
                ? "fetching"
                : progress < 60
                  ? "rendering"
                  : progress < 90
                    ? "optimizing"
                    : "ready"}
            </span>
          </div>
        </div>

        {/* bottom hint */}
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-4 md:flex">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint/60">
            {progress < 100 ? "please wait" : "entering"}
          </span>
          <div className="h-6 w-px bg-gradient-to-b from-ink-600 to-transparent" />
        </div>

        {/* decorative spinning rings - hidden on small mobile to avoid overflow, scaled */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 opacity-20 sm:h-[380px] sm:w-[380px] md:h-[520px] md:w-[520px]"
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-crimson-600/30 animate-spin-slow" />
          <div className="absolute inset-[8%] rounded-full border border-ink-700/40 animate-spin-slower" />
        </div>
      </div>

      {/* bottom bar with percent large - responsive, subtle */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-16 items-end justify-between px-6 py-4 md:flex md:px-8">
        <span className="font-mono text-[10px] tracking-widest text-faint/40">
          REVA University • Bengaluru • 2026
        </span>
        <span className="font-display text-5xl font-bold leading-none text-paper/[0.04] tabular-nums">
          {String(progress).padStart(3, "0")}%
        </span>
      </div>
    </div>
  );
}
