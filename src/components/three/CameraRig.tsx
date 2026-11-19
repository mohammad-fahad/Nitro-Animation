"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { experienceState } from "@/lib/animation/experienceState";

export function CameraRig() {
  useFrame(({ camera, size }, delta) => {
    const aspect = size.width / Math.max(size.height, 1);
    const tieredOffset = aspect < 0.85 ? 1.7 : aspect < 1.25 ? 1.24 : 1;
    const widthFitOffset = Math.min(2.8, 1.05 / Math.max(aspect, 0.15));
    const responsiveOffset = Math.max(tieredOffset, widthFitOffset);
    const targetZ = experienceState.cameraZ * responsiveOffset;

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      7,
      Math.min(delta, 0.1),
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}
