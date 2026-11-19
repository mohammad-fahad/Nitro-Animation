"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function mulberry32(seed: number) {
  let value = seed;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

type Drop = {
  angle: number;
  y: number;
  radius: number;
  stretch: number;
};

function createDrops(count: number, seed: number): Drop[] {
  const random = mulberry32(seed);
  const drops: Drop[] = [];

  for (let index = 0; index < count; index += 1) {
    const frontal = index % 5 !== 0;
    const angle = frontal
      ? (random() - 0.5) * 1.45
      : random() * Math.PI * 2;
    const focus = random() < 0.55;
    const y = focus
      ? -0.5 + (random() - 0.5) * 1.9
      : -1.85 + random() * 3.7;

    drops.push({
      angle,
      y,
      radius: 0.0055 + Math.pow(random(), 1.7) * 0.019,
      stretch: 1.05 + random() * 0.5,
    });
  }

  return drops;
}

export function DewDrops({ count = 46, seed = 11 }: { count?: number; seed?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const geometry = useMemo(() => new THREE.SphereGeometry(1, 10, 8), []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#e8fff2",
        metalness: 0.04,
        roughness: 0.03,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        envMapIntensity: 2.1,
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
        ior: 1.33,
        sheen: 0.4,
        sheenColor: new THREE.Color("#ffffff"),
        sheenRoughness: 0.12,
      }),
    [],
  );

  const drops = useMemo(() => createDrops(count, seed), [count, seed]);

  useEffect(() => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    const dummy = new THREE.Object3D();
    const surfaceRadius = 0.729;

    drops.forEach((drop, index) => {
      dummy.position.set(
        Math.sin(drop.angle) * surfaceRadius,
        drop.y,
        Math.cos(drop.angle) * surfaceRadius,
      );
      dummy.rotation.set(0, drop.angle, 0);
      dummy.scale.set(
        drop.radius,
        drop.radius * drop.stretch,
        drop.radius * 0.52,
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [drops]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, drops.length]}
      frustumCulled={false}
      renderOrder={2}
    />
  );
}
