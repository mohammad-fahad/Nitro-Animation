"use client";

import { Environment, Lightformer } from "@react-three/drei";

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />

      <directionalLight
        position={[4.5, 5.5, 6]}
        intensity={2.05}
        color="#fffdf7"
      />

      <directionalLight
        position={[-5, 2.5, 3]}
        intensity={0.55}
        color="#dfe8ff"
      />

      <spotLight
        position={[-3.5, 4.5, -4]}
        angle={0.55}
        penumbra={1}
        intensity={9.5}
        color="#f4f7ff"
        distance={20}
      />

      <pointLight
        position={[0, -2.6, 2.5]}
        intensity={0.9}
        color="#dce8ff"
        distance={9}
      />

      <directionalLight
        position={[-2, -4, 2]}
        intensity={0.38}
        color="#f7ffe0"
      />

      <Environment resolution={256} frames={1} environmentIntensity={0.62}>
        <Lightformer
          form="rect"
          intensity={3.3}
          position={[0, 5, -4]}
          rotation-x={Math.PI / 2}
          scale={[14, 5, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={2.7}
          position={[-5.5, 1, 2]}
          rotation-y={Math.PI / 2}
          scale={[7, 3, 1]}
          color="#eef4ff"
        />
        <Lightformer
          form="rect"
          intensity={2}
          position={[5.5, 0, 2]}
          rotation-y={-Math.PI / 2}
          scale={[7, 3, 1]}
          color="#f0f7ff"
        />
        <Lightformer
          form="circle"
          intensity={1}
          position={[0, -4, 1]}
          rotation-x={-Math.PI / 2}
          scale={[8, 8, 1]}
          color="#dbe4f0"
        />
      </Environment>
    </>
  );
}
