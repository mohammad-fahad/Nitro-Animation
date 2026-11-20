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
    const frontal = random() < 0.85;
    const angle = frontal
      ? (random() - 0.5) * 2.1
      : random() * Math.PI * 2;
    const size = Math.pow(random(), 1.7);

    drops.push({
      angle,
      y: -1.52 + random() * 2.94,
      radius: 0.006 + size * 0.054,
      stretch: 1 + size * 0.52,
    });
  }

  return drops;
}

export function DewDrops({
  count = 78,
  seed = 29,
}: {
  count?: number;
  seed?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const glintRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 22, 16), []);
  const glintGeometry = useMemo(() => new THREE.SphereGeometry(1, 10, 8), []);
  const drops = useMemo(() => createDrops(count, seed), [count, seed]);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f4ffff",
        metalness: 0,
        roughness: 0.02,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        envMapIntensity: 3.4,
        ior: 1.33,
        transmission: 1,
        thickness: 0.18,
        attenuationColor: "#e4fbff",
        attenuationDistance: 1,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    [],
  );

  const glintMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.82,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );

  useEffect(() => {
    const mesh = meshRef.current;
    const glints = glintRef.current;

    if (!mesh || !glints) {
      return;
    }

    const dummy = new THREE.Object3D();
    const glintDirection = new THREE.Vector3(-0.22, 0.5, 0.84).normalize();
    const surfaceRadius = 0.718;

    drops.forEach((drop, index) => {
      const depth = drop.radius * 0.62;
      const tangentX = Math.sin(drop.angle);
      const tangentZ = Math.cos(drop.angle);
      const radius = surfaceRadius + depth * 0.24;

      dummy.position.set(tangentX * radius, drop.y, tangentZ * radius);
      dummy.rotation.set(0, drop.angle, 0);
      dummy.scale.set(
        drop.radius,
        drop.radius * drop.stretch,
        depth,
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);

      const glintRadius = drop.radius * 0.13;
      const offset = drop.radius * 0.58;
      dummy.position.set(
        tangentX * radius + glintDirection.x * offset,
        drop.y + glintDirection.y * offset,
        tangentZ * radius + glintDirection.z * offset,
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(glintRadius, glintRadius, glintRadius * 0.42);
      dummy.updateMatrix();
      glints.setMatrixAt(index, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
    glints.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    glints.computeBoundingSphere();
  }, [drops]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      glintGeometry.dispose();
      material.dispose();
      glintMaterial.dispose();
    };
  }, [geometry, glintGeometry, material, glintMaterial]);

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[geometry, material, drops.length]}
        frustumCulled={false}
        renderOrder={4}
      />
      <instancedMesh
        ref={glintRef}
        args={[glintGeometry, glintMaterial, drops.length]}
        frustumCulled={false}
        renderOrder={5}
      />
    </>
  );
}
