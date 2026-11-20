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

function configureLabelTexture(texture: THREE.CanvasTexture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(2, 1);
  texture.offset.set(-0.5, 0);
  texture.needsUpdate = true;
}

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

  context.filter = "contrast(1.4) brightness(0.98) saturate(1.02)";
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

  context.fillStyle = "#c9ccc7";
  context.font = `600 ${Math.round(19 * scale)}px Arial, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("500 ML", width / 2, Math.round(height * 0.122));

  const emissiveCanvas = document.createElement("canvas");
  emissiveCanvas.width = width;
  emissiveCanvas.height = height;
  const emissiveContext = emissiveCanvas.getContext("2d");

  if (!emissiveContext) {
    throw new Error("Canvas 2D is unavailable.");
  }

  const labelPixels = context.getImageData(0, 0, width, height);
  const emissivePixels = emissiveContext.createImageData(width, height);

  for (let index = 0; index < labelPixels.data.length; index += 4) {
    const red = labelPixels.data[index];
    const green = labelPixels.data[index + 1];
    const blue = labelPixels.data[index + 2];
    const luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
    const strength =
      Math.min(1, Math.max(0, (luminance - 0.28) / 0.52)) ** 2;

    emissivePixels.data[index] = Math.min(255, red * strength * 1.42);
    emissivePixels.data[index + 1] = Math.min(255, green * strength * 1.42);
    emissivePixels.data[index + 2] = Math.min(255, blue * strength * 1.42);
    emissivePixels.data[index + 3] = 255;
  }

  emissiveContext.putImageData(emissivePixels, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  configureLabelTexture(texture);

  const emissiveTexture = new THREE.CanvasTexture(emissiveCanvas);
  configureLabelTexture(emissiveTexture);

  return { map: texture, emissiveMap: emissiveTexture };
}
