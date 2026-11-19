"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CanModel } from "@/components/three/CanModel";
import { experienceState } from "@/lib/animation/experienceState";
import type { ProductConfig } from "@/types/product";

export function ProductCan({
  product,
  dewCount = 56,
}: {
  product: ProductConfig;
  dewCount?: number;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const orientationRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!rootRef.current || !orientationRef.current || !spinRef.current) {
      return;
    }

    rootRef.current.position.set(
      experienceState.positionX,
      experienceState.positionY,
      experienceState.positionZ,
    );
    rootRef.current.scale.setScalar(experienceState.scale);
    orientationRef.current.rotation.z = experienceState.orientationZ;
    spinRef.current.rotation.y = experienceState.spin;
  });

  return (
    <group ref={rootRef}>
      <group ref={orientationRef}>
        <group ref={spinRef}>
          <CanModel product={product} dewCount={dewCount} />
        </group>
      </group>
    </group>
  );
}
