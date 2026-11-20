"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const fluidEase = (time: number) => 1 - Math.pow(1 - time, 4);

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: { duration: 1.6, easing: fluidEase },
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
