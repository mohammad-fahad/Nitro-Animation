"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createLabelTexture } from "@/lib/products/createLabelTexture";
import { experienceState } from "@/lib/animation/experienceState";
import type { ProductConfig } from "@/types/product";

const BODY_RADIUS = 0.72;
const BODY_TOP = 1.516;
const BODY_BOTTOM = -1.738;

function createBodyProfile() {
  const profile = [
    [0, -2.157],
    [0.324, -2.157],
    [0.477, -2.136],
    [0.594, -2.083],
    [0.675, -2.003],
    [0.711, -1.897],
    [BODY_RADIUS, BODY_BOTTOM],
    [BODY_RADIUS, BODY_TOP],
    [0.7155, 1.632],
    [0.6975, 1.738],
    [0.6615, 1.866],
    [0.5985, 1.993],
    [0.5355, 2.072],
    [0.5175, 2.125],
  ];

  return profile.map(([x, y]) => new THREE.Vector2(x, y));
}

export function ProductCan({ product }: { product: ProductConfig }) {
  const rootRef = useRef<THREE.Group>(null);
  const orientationRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  const bodyGeometry = useMemo(() => {
    const geometry = new THREE.LatheGeometry(createBodyProfile(), 96);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const labelGeometry = useMemo(
    () =>
      new THREE.CylinderGeometry(
        0.726,
        0.726,
        3.14,
        128,
        1,
        true,
        Math.PI,
        Math.PI * 2,
      ),
    [],
  );

  const labelTexture = useMemo(() => createLabelTexture(product), [product]);

  const labelMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: labelTexture,
        color: "#ffffff",
        metalness: 0.24,
        roughness: 0.42,
        clearcoat: 0.42,
        clearcoatRoughness: 0.28,
        envMapIntensity: 1.05,
      }),
    [labelTexture],
  );

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#101010",
        metalness: 0.9,
        roughness: 0.38,
        clearcoat: 0.3,
        clearcoatRoughness: 0.28,
        envMapIntensity: 0.92,
      }),
    [],
  );

  const aluminumMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#c6c8c4",
        metalness: 1,
        roughness: 0.26,
        envMapIntensity: 1.1,
      }),
    [],
  );

  const lidMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#a8aba5",
        metalness: 0.96,
        roughness: 0.34,
        envMapIntensity: 0.95,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      bodyGeometry.dispose();
      labelGeometry.dispose();
      labelTexture.dispose();
      labelMaterial.dispose();
      bodyMaterial.dispose();
      aluminumMaterial.dispose();
      lidMaterial.dispose();
    };
  }, [
    bodyGeometry,
    labelGeometry,
    labelTexture,
    labelMaterial,
    bodyMaterial,
    aluminumMaterial,
    lidMaterial,
  ]);

  useFrame(() => {
    if (!rootRef.current || !orientationRef.current || !spinRef.current) {
      return;
    }

    rootRef.current.position.set(
      experienceState.positionX,
      experienceState.positionY,
      0,
    );
    rootRef.current.scale.setScalar(experienceState.scale);
    orientationRef.current.rotation.z = experienceState.orientationZ;
    spinRef.current.rotation.y = experienceState.spin;
  });

  return (
    <group ref={rootRef}>
      <group ref={orientationRef}>
        <group ref={spinRef}>
          <mesh geometry={bodyGeometry} material={bodyMaterial} />

          <mesh
            geometry={labelGeometry}
            material={labelMaterial}
            position={[0, -0.09, 0]}
          />

          <mesh
            position={[0, 2.128, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            material={aluminumMaterial}
          >
            <torusGeometry args={[0.512, 0.032, 20, 96]} />
          </mesh>

          <mesh
            position={[0, -2.104, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            material={aluminumMaterial}
          >
            <torusGeometry args={[0.592, 0.035, 20, 96]} />
          </mesh>

          <mesh
            position={[0, 2.116, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={lidMaterial}
          >
            <circleGeometry args={[0.504, 72]} />
          </mesh>

          <mesh
            position={[0, 2.123, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={aluminumMaterial}
          >
            <ringGeometry args={[0.388, 0.46, 64]} />
          </mesh>

          <mesh
            position={[0, 2.136, 0.018]}
            rotation={[-Math.PI / 2, 0, 0.24]}
            material={aluminumMaterial}
          >
            <torusGeometry args={[0.104, 0.022, 12, 40, Math.PI * 1.5]} />
          </mesh>

          <mesh
            position={[0, 2.139, -0.09]}
            rotation={[-Math.PI / 2, 0, 0.1]}
            material={lidMaterial}
          >
            <boxGeometry args={[0.11, 0.2, 0.02]} />
          </mesh>

          <mesh
            position={[0, -2.152, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            material={bodyMaterial}
          >
            <circleGeometry args={[0.324, 48]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
