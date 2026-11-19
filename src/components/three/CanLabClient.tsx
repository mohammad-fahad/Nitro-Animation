"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CanStage } from "@/components/three/CanStage";
import {
  experienceState,
  HORIZONTAL_ORIENTATION,
  resetExperienceState,
  VERTICAL_ORIENTATION,
} from "@/lib/animation/experienceState";
import type { CanOrientation } from "@/types/product";

const DEG_TO_RAD = Math.PI / 180;

type Preset = {
  label: string;
  orientation: CanOrientation;
  spin: number;
  scale: number;
  offset: number;
};

const presets: Preset[] = [
  {
    label: "Hero horizontal",
    orientation: "horizontal",
    spin: 0,
    scale: 0.9,
    offset: 0,
  },
  {
    label: "Axial reveal",
    orientation: "horizontal",
    spin: 75,
    scale: 0.96,
    offset: 0,
  },
  {
    label: "Vertical product",
    orientation: "vertical",
    spin: 0,
    scale: 1.06,
    offset: 0,
  },
];

export function CanLabClient() {
  const [orientation, setOrientation] = useState<CanOrientation>("horizontal");
  const [spin, setSpin] = useState(0);
  const [scale, setScale] = useState(0.9);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    resetExperienceState();
    return () => resetExperienceState();
  }, []);

  useEffect(() => {
    experienceState.orientationZ =
      orientation === "horizontal"
        ? HORIZONTAL_ORIENTATION
        : VERTICAL_ORIENTATION;
    experienceState.spin = spin * DEG_TO_RAD;
    experienceState.scale = scale;
    experienceState.positionX = offset;
    experienceState.cameraZ = orientation === "vertical" ? 10.2 : 7.6;
  }, [orientation, spin, scale, offset]);

  const applyPreset = (preset: Preset) => {
    setOrientation(preset.orientation);
    setSpin(preset.spin);
    setScale(preset.scale);
    setOffset(preset.offset);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-nitro-black">
      <header className="relative z-30 flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-10 lg:px-16">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-nitro-yellow">
            Review checkpoint / Batch 2
          </p>
          <h1 className="mt-1 font-display text-xl tracking-tight text-white">
            Single-can laboratory
          </h1>
        </div>
        <Link
          href="/"
          className="border border-white/20 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-nitro-yellow hover:text-nitro-yellow"
        >
          Back to hero
        </Link>
      </header>

      <div className="relative mx-auto grid max-w-[1800px] gap-0 px-6 pb-12 pt-6 sm:px-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-16">
        <section
          aria-label="Interactive can viewport"
          className="relative min-h-[62vh] overflow-hidden border border-white/10 bg-[#070707]"
        >
          <div className="hero-glow pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.32) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <CanStage />

          <div className="pointer-events-none absolute left-5 top-5 z-10 flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-nitro-yellow shadow-[0_0_14px_#e3ea00]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
              NITRO Green / provisional label
            </span>
          </div>

          <div className="pointer-events-none absolute bottom-5 left-5 z-10 text-[10px] uppercase tracking-[0.18em] text-white/35">
            {orientation} · {spin}° axial · {scale.toFixed(2)}× scale ·{" "}
            {offset.toFixed(2)} offset
          </div>
        </section>

        <aside className="border border-t-0 border-white/10 bg-[#0a0a0a] p-6 lg:border-l-0 lg:border-t">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Quick presets
          </p>
          <div className="mt-3 grid gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className="border border-white/12 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-nitro-yellow/70 hover:text-nitro-yellow"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-7">
            <fieldset>
              <legend className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Orientation
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(["horizontal", "vertical"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setOrientation(value)}
                    aria-pressed={orientation === value}
                    className={`border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                      orientation === value
                        ? "border-nitro-yellow bg-nitro-yellow text-black"
                        : "border-white/12 text-white/60 hover:text-white"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Axial spin
                <span className="text-nitro-yellow">{spin}°</span>
              </span>
              <input
                type="range"
                min={0}
                max={360}
                step={5}
                value={spin}
                onChange={(event) => setSpin(Number(event.target.value))}
                className="mt-3 h-1.5 w-full accent-[#e3ea00]"
              />
            </label>

            <label className="block">
              <span className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Scale
                <span className="text-nitro-yellow">{scale.toFixed(2)}×</span>
              </span>
              <input
                type="range"
                min={0.72}
                max={1.4}
                step={0.01}
                value={scale}
                onChange={(event) => setScale(Number(event.target.value))}
                className="mt-3 h-1.5 w-full accent-[#e3ea00]"
              />
            </label>

            <label className="block">
              <span className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Horizontal offset
                <span className="text-nitro-yellow">{offset.toFixed(2)}</span>
              </span>
              <input
                type="range"
                min={-1.4}
                max={1.4}
                step={0.05}
                value={offset}
                onChange={(event) => setOffset(Number(event.target.value))}
                className="mt-3 h-1.5 w-full accent-[#e3ea00]"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={() => applyPreset(presets[0])}
            className="mt-8 w-full border border-white/15 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55 transition-colors hover:border-white/40 hover:text-white"
          >
            Reset to hero state
          </button>

          <p className="mt-6 border-t border-white/10 pt-5 text-[10px] leading-5 text-white/32">
            Artwork is a procedural provisional label built from recovered
            reference crops. A verified original label texture slot remains
            available in the product configuration.
          </p>
        </aside>
      </div>
    </main>
  );
}
