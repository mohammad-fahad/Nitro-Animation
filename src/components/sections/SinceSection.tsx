import Image from "next/image";

export function SinceSection() {
  return (
    <>
      <div
        data-since-backdrop
        className="pointer-events-none invisible absolute inset-0 z-0 opacity-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_58%_52%,rgba(184,240,0,0.1),transparent_72%)]" />

        <div
          data-since-image
          className="absolute inset-x-0 top-0 h-[58%] overflow-hidden md:inset-x-auto md:left-[4.5vw] md:top-[11%] md:h-[78%] md:w-[56vw] md:rounded-[26px] md:border md:border-white/10"
        >
          <Image
            src="/images/footballer-final.png"
            alt=""
            fill
            sizes="(min-width: 768px) 56vw, 100vw"
            className="object-cover object-[center_68%] grayscale contrast-125 brightness-[0.82]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent md:bg-gradient-to-r md:from-black/5 md:via-black/25 md:to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.65)_100%)]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/75 to-transparent md:hidden" />
      </div>

      <section
        data-since-scene
        aria-label="NITRO brand story"
        className="pointer-events-none invisible absolute inset-0 z-30 opacity-0"
      >
        <div className="absolute inset-x-0 top-24 z-10 flex items-center justify-between px-6 sm:px-10 md:top-28 lg:px-16">
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
            <span className="size-1.5 rounded-full bg-nitro-yellow shadow-[0_0_12px_#e3ea00]" />
            Brand story
          </p>
          <p className="hidden text-[10px] uppercase tracking-[0.2em] text-white/30 md:block">
            Est. 2002 — Worldwide
          </p>
        </div>

        <div
          aria-hidden
          data-since-meta
          className="absolute left-6 top-1/2 hidden -translate-y-1/2 items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-white/35 md:flex lg:left-10"
        >
          <span className="h-16 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
          <span className="[writing-mode:vertical-rl] rotate-180">
            NITRO — Energy drink
          </span>
        </div>

        <div className="absolute inset-x-5 bottom-[15%] z-10 sm:inset-x-10 md:inset-x-auto md:bottom-auto md:right-[3vw] md:top-1/2 md:w-[35vw] md:-translate-y-1/2">
          <h2 className="sr-only">Since 2002 producing</h2>
          <div
            aria-hidden
            className="since-headline text-right text-[clamp(3.5rem,15.5vw,6.5rem)] md:text-[clamp(4rem,10.6vw,12.6rem)]"
          >
            <span data-since-line className="block">
              SINCE
            </span>
            <span data-since-line className="block">
              2002
            </span>
            <span data-since-line className="block">
              PROD
            </span>
            <span data-since-line className="block">
              UCING
            </span>
          </div>
        </div>

        <div
          data-since-meta
          className="absolute bottom-[7vh] left-6 z-10 max-w-[240px] sm:left-10 md:bottom-10 md:max-w-[260px] lg:left-16"
        >
          <div className="mb-3 h-px w-16 bg-nitro-yellow/70" />
          <p className="text-[10px] font-semibold uppercase leading-5 tracking-[0.18em] text-white/55">
            Two decades of controlled chaos. One voltage that never drops.
          </p>
        </div>

        <div
          data-since-meta
          className="absolute bottom-[5vh] right-6 z-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/30 sm:right-10 md:flex lg:right-16"
        >
          <span>Scroll to explore</span>
          <span className="h-px w-10 bg-white/30" />
        </div>
      </section>
    </>
  );
}
