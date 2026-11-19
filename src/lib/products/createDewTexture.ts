import * as THREE from "three";

type DewTextures = {
  alpha: THREE.CanvasTexture;
  normal: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
};

const SIZE = 512;

let cache: DewTextures | null = null;

function mulberry32(seed: number) {
  let state = seed;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createDewTextures(): DewTextures {
  const alphaCanvas = document.createElement("canvas");
  alphaCanvas.width = SIZE;
  alphaCanvas.height = SIZE;
  const alphaContext = alphaCanvas.getContext("2d");

  const normalCanvas = document.createElement("canvas");
  normalCanvas.width = SIZE;
  normalCanvas.height = SIZE;
  const normalContext = normalCanvas.getContext("2d");

  const roughnessCanvas = document.createElement("canvas");
  roughnessCanvas.width = SIZE;
  roughnessCanvas.height = SIZE;
  const roughnessContext = roughnessCanvas.getContext("2d");

  if (!alphaContext || !normalContext || !roughnessContext) {
    throw new Error("Canvas 2D is unavailable for dew textures.");
  }

  alphaContext.fillStyle = "#000000";
  alphaContext.fillRect(0, 0, SIZE, SIZE);

  roughnessContext.fillStyle = "#c4c4c4";
  roughnessContext.fillRect(0, 0, SIZE, SIZE);

  const normalImage = normalContext.createImageData(SIZE, SIZE);
  const normalData = normalImage.data;

  for (let index = 0; index < normalData.length; index += 4) {
    normalData[index] = 128;
    normalData[index + 1] = 128;
    normalData[index + 2] = 255;
    normalData[index + 3] = 255;
  }

  const random = mulberry32(3917);
  const drops: Array<{ x: number; y: number; rx: number; ry: number }> = [];

  for (let index = 0; index < 190; index += 1) {
    const rx = 1 + random() * 4.2;
    drops.push({
      x: 16 + random() * (SIZE - 32),
      y: 16 + random() * (SIZE - 32),
      rx,
      ry: rx * (1.05 + random() * 0.7),
    });
  }

  for (let index = 0; index < 26; index += 1) {
    const rx = 6 + random() * 8;
    drops.push({
      x: 24 + random() * (SIZE - 48),
      y: 24 + random() * (SIZE - 48),
      rx,
      ry: rx * (1.02 + random() * 0.45),
    });
  }

  drops.forEach((drop) => {
    const gradient = alphaContext.createRadialGradient(0, 0, 0, 0, 0, drop.rx);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.98)");
    gradient.addColorStop(0.72, "rgba(255, 255, 255, 0.9)");
    gradient.addColorStop(0.94, "rgba(255, 255, 255, 0.4)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    alphaContext.save();
    alphaContext.translate(drop.x, drop.y);
    alphaContext.scale(1, drop.ry / drop.rx);
    alphaContext.fillStyle = gradient;
    alphaContext.beginPath();
    alphaContext.arc(0, 0, drop.rx, 0, Math.PI * 2);
    alphaContext.fill();
    alphaContext.restore();

    roughnessContext.save();
    roughnessContext.translate(drop.x, drop.y);
    roughnessContext.scale(1, drop.ry / drop.rx);
    roughnessContext.fillStyle = "#0c0c0c";
    roughnessContext.beginPath();
    roughnessContext.arc(0, 0, drop.rx * 0.92, 0, Math.PI * 2);
    roughnessContext.fill();
    roughnessContext.restore();

    const minX = Math.max(0, Math.floor(drop.x - drop.rx));
    const maxX = Math.min(SIZE - 1, Math.ceil(drop.x + drop.rx));
    const minY = Math.max(0, Math.floor(drop.y - drop.ry));
    const maxY = Math.min(SIZE - 1, Math.ceil(drop.y + drop.ry));

    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        const dx = (x - drop.x) / drop.rx;
        const dy = (y - drop.y) / drop.ry;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq > 1 || distanceSq < 0.0001) {
          continue;
        }

        const nx = dx * 0.82;
        const ny = dy * 0.82;
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
        const offset = (y * SIZE + x) * 4;

        normalData[offset] = Math.round(128 + nx * 127);
        normalData[offset + 1] = Math.round(128 + ny * 127);
        normalData[offset + 2] = Math.round(128 + nz * 127);
        normalData[offset + 3] = 255;
      }
    }
  });

  normalContext.putImageData(normalImage, 0, 0);

  const alpha = new THREE.CanvasTexture(alphaCanvas);
  alpha.wrapS = THREE.RepeatWrapping;
  alpha.wrapT = THREE.RepeatWrapping;
  alpha.anisotropy = 4;

  const normal = new THREE.CanvasTexture(normalCanvas);
  normal.wrapS = THREE.RepeatWrapping;
  normal.wrapT = THREE.RepeatWrapping;
  normal.colorSpace = THREE.NoColorSpace;
  normal.anisotropy = 4;

  const roughness = new THREE.CanvasTexture(roughnessCanvas);
  roughness.wrapS = THREE.RepeatWrapping;
  roughness.wrapT = THREE.RepeatWrapping;
  roughness.anisotropy = 4;

  return { alpha, normal, roughness };
}

export function getDewTextures(): DewTextures {
  if (typeof document === "undefined") {
    throw new Error("Dew textures can only be generated in the browser.");
  }

  if (!cache) {
    cache = createDewTextures();
  }

  return cache;
}
