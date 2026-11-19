"use client";

import { Environment, Lightformer } from "@react-three/drei";

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.18} />

      <directionalLight
        position={[4.5, 5.5, 6]}
        intensity={1.85}
        color="#fffdf2"
      />

      <directionalLight
        position={[-5, 2.5, 3]}
        intensity={0.48}
        color="#b8f000"
      />

      <spotLight
        position={[-3.5, 4.5, -4]}
        angle={0.55}
        penumbra={1}
        intensity={11}
        color="#d9ff73"
        distance={20}
      />

      <pointLight
        position={[0, -2.6, 2.5]}
        intensity={1.3}
        color="#9cff00"
        distance={9}
      />

      <directionalLight
        position={[-2, -4, 2]}
        intensity={0.55}
        color="#f6ffcf"
      />

      <Environment resolution={256} frames={1} environmentIntensity={0.62}>
        <Lightformer
          form="rect"
          intensity={3.4}
          position={[0, 5, -4]}
          rotation-x={Math.PI / 2}
          scale={[14, 5, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={2.8}
          position={[-5.5, 1, 2]}
          rotation-y={Math.PI / 2}
          scale={[7, 3, 1]}
          color="#d9ff73"
        />
        <Lightformer
          form="rect"
          intensity={1.9}
          position={[5.5, 0, 2]}
          rotation-y={-Math.PI / 2}
          scale={[7, 3, 1]}
          color="#eef6ff"
        />
        <Lightformer
          form="circle"
          intensity={1.4}
          position={[0, -4, 1]}
          rotation-x={-Math.PI / 2}
          scale={[8, 8, 1]}
          color="#a6ff00"
        />
      </Environment>
    </>
  );
}
