"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CanStage } from "@/components/three/CanStage";
import { HeroSection } from "@/components/sections/HeroSection";
import { SinceSection } from "@/components/sections/SinceSection";
import { LineupSection } from "@/components/sections/LineupSection";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  experienceState,
  lineupState,
  resetExperienceState,
  VERTICAL_ORIENTATION,
} from "@/lib/animation/experienceState";
import {
  LINEUP_GREEN_SCALE,
  lineupGreenY,
} from "@/lib/animation/lineup";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrollExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      resetExperienceState();

      const scope = rootRef.current;

      if (!scope) {
        return;
      }

      const heroBackground = scope.querySelector<HTMLElement>(
        "[data-hero-background]",
      );
      const heroWordmark =
        scope.querySelector<HTMLElement>("[data-hero-wordmark]");
      const heroFooter =
        scope.querySelector<HTMLElement>("[data-hero-footer]");
      const sinceBackdrop =
        scope.querySelector<HTMLElement>("[data-since-backdrop]");
      const sinceScene =
        scope.querySelector<HTMLElement>("[data-since-scene]");
      const sinceImage =
        scope.querySelector<HTMLElement>("[data-since-image]");
      const sinceLines = gsap.utils.toArray<HTMLElement>(
        "[data-since-line]",
        scope,
      );
      const sinceMeta = gsap.utils.toArray<HTMLElement>(
        "[data-since-meta]",
        scope,
      );
      const lineupBackdrop =
        scope.querySelector<HTMLElement>("[data-lineup-backdrop]");
      const lineupScene =
        scope.querySelector<HTMLElement>("[data-lineup-scene]");
      const lineupKicker =
        scope.querySelector<HTMLElement>("[data-lineup-kicker]");
      const lineupHeading =
        scope.querySelector<HTMLElement>("[data-lineup-heading]");
      const lineupLabels = gsap.utils.toArray<HTMLElement>(
        "[data-lineup-label]",
        scope,
      );

      gsap.set([sinceBackdrop, sinceScene], { autoAlpha: 0 });
      gsap.set(sinceImage, { scale: 1.08 });
      gsap.set(sinceLines, { autoAlpha: 0, y: 92 });
      gsap.set(sinceMeta, { autoAlpha: 0, y: 22 });
      gsap.set([lineupBackdrop, lineupScene], { autoAlpha: 0 });
      gsap.set(lineupKicker, { autoAlpha: 0, y: 16 });
      gsap.set(lineupHeading, { autoAlpha: 0, y: 24 });
      gsap.set(lineupLabels, { autoAlpha: 0, y: 30 });

      if (prefersReducedMotion) {
        return () => resetExperienceState();
      }

      const isMobile = () => window.innerWidth < 768;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          experienceState,
          {
            spin: Math.PI * 0.9,
            duration: 2.2,
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
            duration: 2.2,
            ease: "power1.inOut",
          },
          0,
        )
        .to(
          heroWordmark,
          {
            opacity: 0.28,
            scale: 1.05,
            duration: 1.5,
            ease: "none",
          },
          0.12,
        )
        .to(
          heroFooter,
          {
            autoAlpha: 0,
            y: 30,
            duration: 0.7,
            ease: "none",
          },
          0.1,
        )
        .to(
          heroBackground,
          {
            autoAlpha: 0,
            duration: 0.9,
            ease: "none",
          },
          1.55,
        )
        .to(
          heroWordmark,
          {
            autoAlpha: 0,
            scale: 1.18,
            duration: 0.8,
            ease: "none",
          },
          1.55,
        )
        .to(
          experienceState,
          {
            positionX: () => (isMobile() ? 0 : -1.1),
            positionY: () => (isMobile() ? 0.55 : 0.05),
            scale: () => (isMobile() ? 0.92 : 1.04),
            spin: Math.PI * 2,
            cameraZ: () => (isMobile() ? 7.9 : 7),
            duration: 1.8,
            ease: "power2.inOut",
          },
          2.2,
        )
        .to(
          sinceBackdrop,
          {
            autoAlpha: 1,
            duration: 0.9,
            ease: "none",
          },
          2.15,
        )
        .to(
          sinceImage,
          {
            scale: 1,
            duration: 1.9,
            ease: "power3.out",
          },
          2.15,
        )
        .to(
          sinceScene,
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "none",
          },
          2.35,
        )
        .to(
          sinceLines,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.17,
            ease: "power3.out",
          },
          2.55,
        )
        .to(
          sinceMeta,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          3.35,
        )
        .to(
          sinceScene,
          {
            autoAlpha: 0,
            y: -34,
            duration: 0.6,
            ease: "none",
          },
          5.55,
        )
        .to(
          sinceBackdrop,
          {
            autoAlpha: 0,
            duration: 0.9,
            ease: "none",
          },
          5.7,
        )
        .to(
          experienceState,
          {
            positionX: 0,
            positionY: () =>
              lineupGreenY(window.innerWidth / window.innerHeight),
            scale: LINEUP_GREEN_SCALE,
            orientationZ: VERTICAL_ORIENTATION,
            spin: Math.PI * 2,
            cameraZ: 13,
            duration: 1.8,
            ease: "power2.inOut",
          },
          5.6,
        )
        .to(
          lineupState,
          {
            progress: 1,
            duration: 1.25,
            ease: "none",
          },
          6.1,
        )
        .to(
          lineupBackdrop,
          {
            autoAlpha: 1,
            duration: 0.9,
            ease: "none",
          },
          5.95,
        )
        .to(
          lineupScene,
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "none",
          },
          6.1,
        )
        .to(
          lineupKicker,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          6.2,
        )
        .to(
          lineupHeading,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          6.25,
        )
        .to(
          lineupLabels,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          },
          6.55,
        )
        .to({}, { duration: 1.9 }, 7.7);

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        resetExperienceState();
      };
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      ref={rootRef}
      id="home"
      aria-label="NITRO animated product experience"
      className="relative h-[560vh] bg-nitro-black md:h-[640vh]"
    >
      <div
        id="about"
        aria-hidden
        className="pointer-events-none absolute left-0 top-[27%] h-px w-px"
      />
      <div
        id="shop"
        aria-hidden
        className="pointer-events-none absolute left-0 top-[62%] h-px w-px"
      />

      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroSection />
        <SinceSection />
        <LineupSection />

        <CanStage lineup className="z-20" />
      </div>
    </section>
  );
}
