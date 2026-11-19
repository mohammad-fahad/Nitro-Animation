"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  experienceState,
  lineupState,
} from "@/lib/animation/experienceState";
import { lineupHalfWidth } from "@/lib/animation/lineup";

export function CameraRig() {
  useFrame(({ camera, size }, delta) => {
    const aspect = size.width / Math.max(size.height, 1);
    const tieredOffset = aspect < 0.85 ? 1.7 : aspect < 1.25 ? 1.24 : 1;
    const widthFitOffset = Math.min(2.8, 1.18 / Math.max(aspect, 0.15));
    const responsiveOffset = Math.max(tieredOffset, widthFitOffset);
    const baseTarget = experienceState.cameraZ * responsiveOffset;

    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const halfFov = THREE.MathUtils.degToRad(perspectiveCamera.fov / 2);
    const lineupFitTarget =
      lineupHalfWidth(aspect) /
      (Math.tan(halfFov) * Math.max(aspect, 0.3));
    const lineupTarget = Math.max(
      experienceState.cameraZ,
      lineupFitTarget,
    );
    const lineupBlend = THREE.MathUtils.smoothstep(
      lineupState.progress,
      0.05,
      0.85,
    );
    const targetZ = THREE.MathUtils.lerp(
      baseTarget,
      lineupTarget,
      lineupBlend,
    );

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
