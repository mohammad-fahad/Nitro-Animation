"use client";

import { Component, Suspense, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Experience } from "@/components/three/Experience";
import { greenProduct } from "@/lib/products/products";
import type { ProductConfig } from "@/types/product";

type CanvasErrorBoundaryProps = {
  children: ReactNode;
};

type CanvasErrorBoundaryState = {
  failed: boolean;
};

class CanvasErrorBoundary extends Component<
  CanvasErrorBoundaryProps,
  CanvasErrorBoundaryState
> {
  state: CanvasErrorBoundaryState = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("WebGL scene failed to render.", error, info);
  }

  render() {
    if (this.state.failed) {
      return <WebGLFallback />;
    }

    return this.props.children;
  }
}

function WebGLFallback() {
  return (
    <div
      role="img"
      aria-label="The interactive 3D energy drink can could not be displayed."
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <div className="max-w-sm border border-white/15 bg-black/55 px-6 py-5 text-center backdrop-blur">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-nitro-yellow">
          3D view unavailable
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          Enable WebGL or hardware acceleration to view the NITRO can. All page
          content and links remain available.
        </p>
      </div>
    </div>
  );
}

function hasWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl");

    if (!context) {
      return false;
    }

    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function CanExperience({
  product = greenProduct,
}: {
  product?: ProductConfig;
}) {
  const [status] = useState<"ready" | "unsupported">(() =>
    hasWebGLSupport() ? "ready" : "unsupported",
  );

  if (status === "unsupported") {
    return <WebGLFallback />;
  }

  return (
    <CanvasErrorBoundary>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.6], fov: 30, near: 0.1, far: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.03;
        }}
      >
        <Suspense fallback={null}>
          <Experience product={product} />
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  );
}
