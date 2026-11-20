import * as THREE from "three";
import type { ProductConfig } from "@/types/product";

export const LABEL_ARTWORK_URL = "/images/nitro-label.jpg";

const ARTWORK_WIDTH = 1705;
const ARTWORK_HEIGHT = 1017;
const PANEL_WIDTH = Math.round(ARTWORK_WIDTH / 3);
const PANEL_OFFSET_X = PANEL_WIDTH;

// Hue overlays taken from the source SVGs:
// orange_can.svg -> gold, pink.svg -> red, ice.svg -> sky, blue.svg -> blue.
const LABEL_HUES: Record<ProductConfig["id"], string | null> = {
  gold: "#ff8000",
  red: "#ff0000",
  green: null,
  sky: "#00b3ff",
  blue: "#0004ff",
};

export function createLabelTexture(
  artwork: CanvasImageSource,
  product: ProductConfig,
  resolutionScale = 1,
) {
  if (typeof document === "undefined") {
    throw new Error("Can label textures can only be generated in the browser.");
  }

  const scale = Math.min(1, Math.max(0.5, resolutionScale));
  const width = Math.round(PANEL_WIDTH * scale);
  const height = Math.round(ARTWORK_HEIGHT * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D is unavailable.");
  }

  context.filter = "contrast(1.24) brightness(1.08) saturate(1.08)";
  context.drawImage(
    artwork,
    PANEL_OFFSET_X,
    0,
    PANEL_WIDTH,
    ARTWORK_HEIGHT,
    0,
    0,
    width,
    height,
  );
  context.filter = "none";

  const hue = LABEL_HUES[product.id];

  if (hue) {
    context.globalCompositeOperation = "hue";
    context.fillStyle = hue;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = "source-over";
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(2, 1);
  texture.offset.set(-0.5, 0);
  texture.needsUpdate = true;

  return texture;
}
