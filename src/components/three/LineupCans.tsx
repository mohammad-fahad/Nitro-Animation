"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CanModel } from "@/components/three/CanModel";
import { lineupState } from "@/lib/animation/experienceState";
import {
  LINEUP_SCREEN_FRACTIONS,
  LINEUP_SIDE_SCALE,
  LINEUP_SLOTS,
  lineupBaseY,
  lineupSideY,
  lineupWorldXAtFraction,
} from "@/lib/animation/lineup";
import { products } from "@/lib/products/products";
import type { ProductConfig } from "@/types/product";

const sideProducts = products.filter((product) => product.id !== "green");

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function sideProgress(progress: number, index: number) {
  const start = 0.04 + index * 0.085;
  return THREE.MathUtils.clamp((progress - start) / 0.62, 0, 1);
}

function createGlowTexture() {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(128, 128, 4, 128, 128, 124);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(0.32, "rgba(255, 255, 255, 0.32)");
  gradient.addColorStop(0.68, "rgba(255, 255, 255, 0.07)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function LineupCan({
  product,
  fraction,
  index,
}: {
  product: ProductConfig;
  fraction: number;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ size, camera }) => {
    const root = groupRef.current;

    if (!root) {
      return;
    }

    const aspect = size.width / Math.max(size.height, 1);
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const targetX = lineupWorldXAtFraction(
      camera.position.z,
      perspectiveCamera.fov,
      aspect,
      fraction,
    );
    const local = easeOutCubic(sideProgress(lineupState.progress, index));
    const scale = LINEUP_SIDE_SCALE * THREE.MathUtils.lerp(0.42, 1, local);

    root.visible = local > 0.002;
    root.position.set(
      targetX * THREE.MathUtils.lerp(1.14, 1, local),
      lineupSideY(aspect) - (1 - local) * 1.8,
      -0.12,
    );
    root.scale.setScalar(scale);
    root.rotation.z = (1 - local) * 0.16;
  });

  return (
    <group ref={groupRef} visible={false}>
      <CanModel product={product} textureScale={0.5} />
    </group>
  );
}

export function LineupCans() {
  const glowTexture = useMemo(() => createGlowTexture(), []);
  const glowMaterials = useRef(new Map<string, THREE.MeshBasicMaterial>());
  const shadowRefs = useRef<Array<THREE.Mesh | null>>([]);
  const auraRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const materials = glowMaterials.current;

    return () => {
      materials.clear();
      glowTexture?.dispose();
    };
  }, [glowTexture]);

  useFrame(({ size, camera }) => {
    const progress = THREE.MathUtils.smoothstep(lineupState.progress, 0.08, 0.92);
    const aspect = size.width / Math.max(size.height, 1);
    const baseY = lineupBaseY(aspect);
    const perspectiveCamera = camera as THREE.PerspectiveCamera;

    glowMaterials.current.forEach((material, key) => {
      material.opacity =
        key === "green-aura" ? progress * 0.22 : progress * 0.13;
    });

    shadowRefs.current.forEach((mesh, index) => {
      if (!mesh) {
        return;
      }

      mesh.position.x = lineupWorldXAtFraction(
        camera.position.z,
        perspectiveCamera.fov,
        aspect,
        LINEUP_SCREEN_FRACTIONS[index] ?? 0.5,
        -0.92,
      );
      mesh.position.y = baseY + 0.01;
    });

    if (auraRef.current) {
      auraRef.current.position.y = baseY + 2.6;
    }
  });

  if (!glowTexture) {
    return null;
  }

  return (
    <>
      {sideProducts.map((product, index) => {
        const slotIndex = LINEUP_SLOTS.findIndex(
          (slot) => slot.id === product.id,
        );
        const fraction = LINEUP_SCREEN_FRACTIONS[slotIndex] ?? 0.5;

        return (
          <LineupCan
            key={product.id}
            product={product}
            fraction={fraction}
            index={index}
          />
        );
      })}

      {LINEUP_SLOTS.map((slot, index) => (
        <mesh
          key={`shadow-${slot.id}`}
          ref={(mesh) => {
            shadowRefs.current[index] = mesh;
          }}
          position={[slot.x, -2.49, -0.92]}
          scale={slot.id === "green" ? [2.7, 0.62, 1] : [1.5, 0.4, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            ref={(material) => {
              if (material) {
                glowMaterials.current.set(`${slot.id}-shadow`, material);
              } else {
                glowMaterials.current.delete(`${slot.id}-shadow`);
              }
            }}
            map={glowTexture}
            color={slot.id === "green" ? "#c8ff2e" : "#e8eeff"}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      ))}

      <mesh ref={auraRef} position={[0, 0.15, -1.35]} scale={[4.4, 4.4, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={(material) => {
            if (material) {
              glowMaterials.current.set("green-aura", material);
            } else {
              glowMaterials.current.delete("green-aura");
            }
          }}
          map={glowTexture}
          color="#b8f000"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}
