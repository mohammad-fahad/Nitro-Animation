import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/layout/SocialLinks";

export function HeroSection() {
  return (
    <>
      <div
        data-hero-background
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="hero-glow absolute inset-0" />
        <div className="hero-grain absolute inset-0 opacity-80" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      <h1 className="sr-only">NITRO — Full Voltage Energy</h1>

      <div
        data-hero-wordmark
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[34%] z-10 select-none md:top-[43%]"
      >
        <div className="-translate-y-1/2 text-center will-change-transform">
          <Image
            src="/images/hero-text.svg"
            alt=""
            width={1760}
            height={398}
            priority
            unoptimized
            className="mx-auto h-auto w-[96vw] max-w-none md:w-[97.5vw] md:max-w-[1760px]"
          />
        </div>
      </div>

      <div
        data-hero-footer
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-6 pb-8 sm:px-10 lg:px-16 lg:pb-10"
      >
        <div className="pointer-events-auto mx-auto grid max-w-[1800px] grid-cols-1 items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <p className="mx-auto max-w-[330px] text-center text-[10px] font-medium uppercase leading-5 tracking-[0.17em] text-white/42 md:mx-0 md:text-left">
            Zero sugar. Full voltage. Engineered for the nights that refuse to
            slow down.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="#shop"
              className="flex h-11 min-w-[126px] items-center justify-center rounded-[2px] bg-white px-7 text-[11px] font-semibold text-black transition-colors hover:bg-nitro-yellow"
            >
              Buy Now
            </Link>
            <Link
              href="#about"
              className="flex h-11 min-w-[126px] items-center justify-center rounded-[2px] border border-white/25 px-7 text-[11px] font-semibold text-white/80 transition-colors hover:border-white/70 hover:text-white"
            >
              More Info
            </Link>
          </div>

          <SocialLinks className="justify-center md:justify-end" />
        </div>
      </div>
    </>
  );
}
