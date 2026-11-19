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
    // Most droplets sit on the camera-facing half of the can.
    const frontal = random() < 0.75;
    const angle = frontal
      ? Math.PI + (random() - 0.5) * 1.6
      : random() * Math.PI * 2;

    // Cluster around the logo band, sparse elsewhere on the straight body.
    const logoBand = random() < 0.6;
    const y = logoBand
      ? -0.55 + (random() - 0.5) * 1.5
      : -1.7 + random() * 3.15;

    // Bias heavily toward small droplets, with a few large ones.
    const size = Math.pow(random(), 2.2);

    drops.push({
      angle,
      y: Math.min(Math.max(y, -1.68), 1.48),
      radius: 0.0045 + size * 0.021,
      stretch: 1.0 + size * 0.55,
    });
  }

  return drops;
}

export function DewDrops({ count = 46, seed = 11 }: { count?: number; seed?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const geometry = useMemo(() => new THREE.SphereGeometry(1, 24, 16), []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#e8fff2",
        metalness: 0,
        roughness: 0.02,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.6,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        ior: 1.33,
        transmission: 0.92,
        side: THREE.DoubleSide,
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
