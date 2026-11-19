"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { DewDrops } from "@/components/three/DewDrops";
import { getDewTextures } from "@/lib/products/createDewTexture";
import { createLabelTexture } from "@/lib/products/createLabelTexture";
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

export function CanModel({
  product,
  textureScale = 1,
  dewCount = 40,
  dewSeed = 11,
}: {
  product: ProductConfig;
  textureScale?: number;
  dewCount?: number;
  dewSeed?: number;
}) {
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

  const labelTexture = useMemo(
    () => createLabelTexture(product, textureScale),
    [product, textureScale],
  );

  const dewTextures = useMemo(() => getDewTextures(), []);

  const labelMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: labelTexture,
        color: "#ffffff",
        metalness: 0.32,
        roughness: 0.26,
        clearcoat: 0.8,
        clearcoatRoughness: 0.18,
        envMapIntensity: 0.85,
      }),
    [labelTexture],
  );

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#050505",
        metalness: 0.9,
        roughness: 0.22,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2,
        envMapIntensity: 0.9,
      }),
    [],
  );

  const dewShellGeometry = useMemo(
    () =>
      new THREE.CylinderGeometry(
        0.7305,
        0.7305,
        3.14,
        128,
        1,
        true,
        Math.PI,
        Math.PI * 2,
      ),
    [],
  );

  const dewShellMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f4fbff",
        metalness: 0.02,
        roughness: 1,
        transparent: true,
        opacity: 1,
        alphaMap: dewTextures.alpha,
        normalMap: dewTextures.normal,
        normalScale: new THREE.Vector2(0.72, 0.72),
        roughnessMap: dewTextures.roughness,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        ior: 1.333,
        envMapIntensity: 2.4,
        depthWrite: false,
      }),
    [dewTextures],
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
      dewShellGeometry.dispose();
      dewShellMaterial.dispose();
      aluminumMaterial.dispose();
      lidMaterial.dispose();
    };
  }, [
    bodyGeometry,
    labelGeometry,
    labelTexture,
    labelMaterial,
    bodyMaterial,
    dewShellGeometry,
    dewShellMaterial,
    aluminumMaterial,
    lidMaterial,
  ]);

  return (
    <group>
      <mesh geometry={bodyGeometry} material={bodyMaterial} />

      <mesh
        geometry={labelGeometry}
        material={labelMaterial}
        position={[0, -0.09, 0]}
      />

      <mesh
        geometry={dewShellGeometry}
        material={dewShellMaterial}
        position={[0, -0.09, 0]}
        renderOrder={2}
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

      <DewDrops count={dewCount} seed={dewSeed} />
    </group>
  );
}
