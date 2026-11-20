"use client";

import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { DewDrops } from "@/components/three/DewDrops";
import {
  createLabelTexture,
  LABEL_ARTWORK_URL,
} from "@/lib/products/createLabelTexture";
import type { ProductConfig } from "@/types/product";

const CAN_RADIUS = 0.715;
const CAN_TOP = 1.81;
const CAN_BOTTOM = -1.826;
const BODY_TOP = 1.5;
const LABEL_TOP = 1.49;
const LABEL_BOTTOM = -1.6;
const LABEL_HEIGHT = LABEL_TOP - LABEL_BOTTOM;
const LABEL_CENTER_Y = (LABEL_TOP + LABEL_BOTTOM) / 2;
const LABEL_RADIUS = CAN_RADIUS + 0.0015;
const NECK_RADIUS = 0.542;

function createBodyProfile() {
  const profile: Array<[number, number]> = [
    [0, -1.838],
    [0.3, -1.834],
    [0.42, -1.830],
    [0.52, -1.818],
    [0.59, -1.796],
    [0.645, -1.730],
    [0.685, -1.690],
    [0.709, -1.662],
    [0.719, -1.634],
    [CAN_RADIUS, -1.606],
    [CAN_RADIUS, BODY_TOP],
    [0.695, BODY_TOP + 0.025],
    [0.67, BODY_TOP + 0.065],
    [0.64, BODY_TOP + 0.105],
    [0.605, BODY_TOP + 0.145],
    [0.58, BODY_TOP + 0.18],
    [0.558, BODY_TOP + 0.216],
  ];

  return profile.map(([x, y]) => new THREE.Vector2(x, y));
}

export function CanModel({
  product,
  textureScale = 1,
}: {
  product: ProductConfig;
  textureScale?: number;
}) {
  const bodyGeometry = useMemo(() => {
    const geometry = new THREE.LatheGeometry(createBodyProfile(), 128);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const labelGeometry = useMemo(
    () =>
      new THREE.CylinderGeometry(
        LABEL_RADIUS,
        LABEL_RADIUS,
        LABEL_HEIGHT,
        160,
        1,
        true,
        Math.PI,
        Math.PI * 2,
      ),
    [],
  );

  const artwork = useLoader(
    THREE.TextureLoader,
    product.labelTexture ?? LABEL_ARTWORK_URL,
  );

  const labelTextures = useMemo(
    () => createLabelTexture(artwork.image, product, textureScale),
    [artwork, product, textureScale],
  );

  const labelMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: labelTextures.map,
        emissiveMap: labelTextures.emissiveMap,
        emissive: "#ffffff",
        emissiveIntensity: 1.15,
        color: "#ffffff",
        metalness: 0,
        roughness: 0.62,
        clearcoat: 0.1,
        clearcoatRoughness: 0.56,
        envMapIntensity: 0.28,
        side: THREE.FrontSide,
      }),
    [labelTextures],
  );

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#000000",
        metalness: 0.58,
        roughness: 0.42,
        clearcoat: 0.12,
        clearcoatRoughness: 0.55,
        envMapIntensity: 0.36,
      }),
    [],
  );

  const aluminumMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#cfd1cc",
        metalness: 1,
        roughness: 0.22,
        envMapIntensity: 1.25,
      }),
    [],
  );

  const lidMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#b4b7b0",
        metalness: 0.97,
        roughness: 0.28,
        envMapIntensity: 1.2,
      }),
    [],
  );

  const darkMetalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#3a3b38",
        metalness: 0.95,
        roughness: 0.36,
        envMapIntensity: 0.9,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      bodyGeometry.dispose();
      labelGeometry.dispose();
      labelTextures.map.dispose();
      labelTextures.emissiveMap.dispose();
      labelMaterial.dispose();
      bodyMaterial.dispose();
      aluminumMaterial.dispose();
      lidMaterial.dispose();
      darkMetalMaterial.dispose();
    };
  }, [
    bodyGeometry,
    labelGeometry,
    labelTextures,
    labelMaterial,
    bodyMaterial,
    aluminumMaterial,
    lidMaterial,
    darkMetalMaterial,
  ]);

  return (
    <group>
      <mesh geometry={bodyGeometry} material={bodyMaterial} />

      <mesh
        geometry={labelGeometry}
        material={labelMaterial}
        position={[0, LABEL_CENTER_Y, 0]}
      />

      <DewDrops />

      <mesh
        position={[0, 1.724, 0]}
        material={aluminumMaterial}
      >
        <cylinderGeometry args={[NECK_RADIUS, NECK_RADIUS + 0.003, 0.162, 128, 1, true]} />
      </mesh>

      <mesh
        position={[0, CAN_TOP - 0.012, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={aluminumMaterial}
      >
        <torusGeometry args={[NECK_RADIUS + 0.003, 0.018, 16, 128]} />
      </mesh>

      <mesh
        position={[0, CAN_TOP - 0.028, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={lidMaterial}
      >
        <circleGeometry args={[NECK_RADIUS - 0.004, 96]} />
      </mesh>

      <mesh
        position={[0, CAN_TOP - 0.026, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={darkMetalMaterial}
      >
        <ringGeometry args={[0.372, 0.412, 96]} />
      </mesh>

      <mesh
        position={[0, CAN_TOP - 0.027, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={lidMaterial}
      >
        <circleGeometry args={[0.372, 96]} />
      </mesh>

      <mesh
        position={[0, CAN_TOP - 0.022, 0.088]}
        material={darkMetalMaterial}
      >
        <boxGeometry args={[0.095, 0.014, 0.198]} />
      </mesh>

      <mesh
        position={[0, CAN_TOP - 0.021, 0.172]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={aluminumMaterial}
      >
        <torusGeometry args={[0.038, 0.006, 10, 32]} />
      </mesh>

      <mesh
        position={[0, -1.806, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={darkMetalMaterial}
      >
        <torusGeometry args={[NECK_RADIUS + 0.003, 0.018, 16, 128]} />
      </mesh>

      <mesh
        position={[0, CAN_BOTTOM + 0.004, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={bodyMaterial}
      >
        <circleGeometry args={[0.345, 64]} />
      </mesh>
    </group>
  );
}
