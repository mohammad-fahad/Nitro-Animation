"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CanStage } from "@/components/three/CanStage";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  experienceState,
  resetExperienceState,
} from "@/lib/animation/experienceState";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      resetExperienceState();

      if (prefersReducedMotion) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          experienceState,
          {
            spin: Math.PI * 0.9,
            duration: 1,
            ease: "none",
          },
          0,
        )
        .to(
          experienceState,
          {
            scale: 1.02,
            positionY: 0.3,
            cameraZ: 7.32,
            duration: 1,
            ease: "power1.inOut",
          },
          0,
        )
        .to(
          wordmarkRef.current,
          {
            opacity: 0.28,
            scale: 1.05,
            duration: 0.6,
            ease: "none",
          },
          0.12,
        )
        .to(
          footerRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.3,
            ease: "none",
          },
          0.04,
        );

      return () => {
        resetExperienceState();
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="NITRO hero"
      className="relative h-[235vh] bg-nitro-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-0 z-0" />

        <div className="hero-grain pointer-events-none absolute inset-0 z-[6]" />
        <div className="hero-vignette pointer-events-none absolute inset-0 z-[7]" />

        <h1 className="sr-only">NITRO — Full Voltage Energy</h1>

        <div
          ref={wordmarkRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[47.5%] z-10 hidden -translate-y-1/2 select-none text-center will-change-transform md:block"
        >
          <span className="display-wordmark inline-block whitespace-nowrap">
            NITRO
          </span>
        </div>

        <CanStage className="z-20" />

        <div
          ref={footerRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-6 pb-8 sm:px-10 lg:px-16 lg:pb-10"
        >
          <div className="pointer-events-auto mx-auto grid max-w-[1800px] grid-cols-1 items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <p className="hidden max-w-[330px] text-[10px] font-medium uppercase leading-5 tracking-[0.17em] text-white/42 md:block">
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
      </div>
    </section>
  );
}
