import * as THREE from "three";
import type { ProductConfig } from "@/types/product";

const TEXTURE_WIDTH = 2048;
const TEXTURE_HEIGHT = 1280;
const FRONT_CENTER = TEXTURE_WIDTH / 2;

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

function canvasFont(fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const font = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-archivo-black")
    .trim();

  return font ? `${font}, ${fallback}` : fallback;
}

function bodyFont(fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const font = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-archivo")
    .trim();

  return font ? `${font}, ${fallback}` : fallback;
}

function drawSpacedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number,
) {
  const characters = [...text];
  const widths = characters.map(
    (character) => context.measureText(character).width,
  );
  const total = widths.reduce((sum, width) => sum + width, 0);
  const totalWithSpacing = total + spacing * (characters.length - 1);

  let cursor = x - totalWithSpacing / 2;

  characters.forEach((character, index) => {
    context.fillText(character, cursor, y);
    cursor += widths[index] + spacing;
  });
}

function drawArc(
  context: CanvasRenderingContext2D,
  random: () => number,
  startX: number,
  startY: number,
  color: string,
  width: number,
  opacity: number,
) {
  const segments = 4 + Math.floor(random() * 4);
  const angle = random() * Math.PI * 2;
  const reach = 160 + random() * 300;

  context.save();
  context.strokeStyle = color;
  context.globalAlpha = opacity;
  context.lineWidth = width;
  context.shadowColor = color;
  context.shadowBlur = 16;
  context.beginPath();
  context.moveTo(startX, startY);

  let x = startX;
  let y = startY;

  for (let index = 1; index <= segments; index += 1) {
    const progress = index / segments;
    const spread = (random() - 0.5) * 100;
    const targetX = startX + Math.cos(angle) * reach * progress + spread;
    const targetY = startY + Math.sin(angle) * reach * progress + spread;
    const midX = (x + targetX) / 2 + (random() - 0.5) * 30;
    const midY = (y + targetY) / 2 + (random() - 0.5) * 30;

    context.lineTo(midX, midY);
    context.lineTo(targetX, targetY);
    x = targetX;
    y = targetY;
  }

  context.stroke();
  context.restore();
}

function drawEmblem(
  context: CanvasRenderingContext2D,
  product: ProductConfig,
  x: number,
  y: number,
  options: { scaleX?: number; scaleY?: number; glow?: number } = {},
) {
  const { accentBright, glow } = product.palette;
  const scaleX = options.scaleX ?? 1;
  const scaleY = options.scaleY ?? 1;
  const glowStrength = options.glow ?? 1;

  const aura = context.createRadialGradient(x, y, 20, x, y, 330);
  aura.addColorStop(0, `rgba(170, 235, 20, ${0.19 * glowStrength})`);
  aura.addColorStop(0.42, `rgba(100, 190, 0, ${0.07 * glowStrength})`);
  aura.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = aura;
  context.fillRect(x - 380, y - 380, 760, 760);

  const random = mulberry32(81023);
  for (let index = 0; index < 12; index += 1) {
    drawArc(
      context,
      random,
      x + (random() - 0.5) * 160,
      y + (random() - 0.5) * 220,
      index % 3 === 0 ? "#f4ffd2" : glow,
      1 + random() * 2,
      (0.12 + random() * 0.22) * glowStrength,
    );
  }

  context.save();
  context.translate(x, y);
  context.scale(scaleX, scaleY);
  context.transform(1, 0, -0.1, 1, 0, 0);

  const blade = () => {
    context.beginPath();
    context.moveTo(-195, -265);
    context.lineTo(-25, -265);
    context.lineTo(76, -22);
    context.lineTo(76, -265);
    context.lineTo(205, -265);
    context.lineTo(205, 265);
    context.lineTo(32, 265);
    context.lineTo(-70, 22);
    context.lineTo(-70, 265);
    context.lineTo(-195, 265);
    context.closePath();
  };

  const shell = context.createLinearGradient(-220, -260, 230, 270);
  shell.addColorStop(0, "#244400");
  shell.addColorStop(0.22, "#0c1d00");
  shell.addColorStop(0.48, "#183800");
  shell.addColorStop(0.74, "#071100");
  shell.addColorStop(1, "#020600");

  context.save();
  context.shadowColor = glow;
  context.shadowBlur = 46;
  blade();
  context.fillStyle = shell;
  context.fill();
  context.restore();

  blade();
  context.strokeStyle = accentBright;
  context.globalAlpha = 0.9;
  context.lineWidth = 5;
  context.shadowColor = glow;
  context.shadowBlur = 24;
  context.stroke();
  context.globalAlpha = 1;
  context.shadowBlur = 0;

  context.save();
  blade();
  context.clip();

  const energy = context.createLinearGradient(-180, 220, 160, -240);
  energy.addColorStop(0, "rgba(4, 14, 0, 0.82)");
  energy.addColorStop(0.32, "rgba(70, 150, 0, 0.24)");
  energy.addColorStop(0.55, "rgba(225, 255, 150, 0.2)");
  energy.addColorStop(0.72, "rgba(120, 235, 0, 0.1)");
  energy.addColorStop(1, "rgba(1, 5, 0, 0.9)");
  context.fillStyle = energy;
  context.fillRect(-260, -300, 520, 600);

  context.globalCompositeOperation = "screen";

  context.fillStyle = "rgba(226, 255, 150, 0.44)";
  context.beginPath();
  context.moveTo(-178, -252);
  context.lineTo(-128, -252);
  context.lineTo(-44, -4);
  context.lineTo(-92, -4);
  context.closePath();
  context.fill();

  context.beginPath();
  context.moveTo(68, -248);
  context.lineTo(112, -248);
  context.lineTo(188, 244);
  context.lineTo(148, 244);
  context.closePath();
  context.fill();

  context.strokeStyle = "rgba(255, 255, 255, 0.62)";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(-150, 238);
  context.lineTo(-36, -55);
  context.lineTo(30, 12);
  context.lineTo(148, -235);
  context.stroke();

  context.strokeStyle = "rgba(205, 255, 90, 0.4)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(-185, 112);
  context.lineTo(-62, -132);
  context.lineTo(12, -32);
  context.lineTo(108, -222);
  context.stroke();
  context.restore();

  context.save();
  context.beginPath();
  context.moveTo(56, -265);
  context.lineTo(6, -30);
  context.lineTo(84, 44);
  context.lineTo(34, 265);
  context.lineTo(16, 265);
  context.lineTo(62, 42);
  context.lineTo(-18, -32);
  context.lineTo(32, -265);
  context.closePath();
  context.fillStyle = "rgba(2, 8, 0, 0.72)";
  context.fill();

  context.strokeStyle = "rgba(236, 255, 170, 0.62)";
  context.lineWidth = 2.5;
  context.stroke();
  context.restore();

  context.restore();
}

function drawWordmark(
  context: CanvasRenderingContext2D,
  product: ProductConfig,
  x: number,
  y: number,
  size: number,
  allLime = false,
) {
  const displayFont = canvasFont('"Arial Black", sans-serif');
  const { accent, accentBright } = product.palette;

  context.save();
  context.translate(x, y);
  context.transform(1, 0, -0.08, 1, 0, 0);
  context.font = `900 ${size}px ${displayFont}`;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";

  const first = "NIT";
  const last = "RO";
  const firstWidth = context.measureText(first).width;
  const lastWidth = context.measureText(last).width;
  const totalWidth = firstWidth + lastWidth;
  const startX = -totalWidth / 2;

  const silver = context.createLinearGradient(startX, -size, startX, size * 0.2);
  silver.addColorStop(0, "#ffffff");
  silver.addColorStop(0.32, "#ebebe7");
  silver.addColorStop(0.54, "#9d9d97");
  silver.addColorStop(0.72, "#f5f5f2");
  silver.addColorStop(1, "#777770");

  const lime = context.createLinearGradient(
    startX + firstWidth,
    -size,
    startX + totalWidth,
    size * 0.2,
  );
  lime.addColorStop(0, accentBright);
  lime.addColorStop(0.44, accent);
  lime.addColorStop(0.7, "#79a800");
  lime.addColorStop(1, "#3d6600");

  context.shadowColor = "rgba(0, 0, 0, 0.9)";
  context.shadowBlur = 12;
  context.shadowOffsetY = 7;
  context.fillStyle = allLime ? lime : silver;
  context.fillText(first, startX, 0);
  context.fillStyle = lime;
  context.fillText(last, startX + firstWidth, 0);
  context.shadowColor = "transparent";

  context.strokeStyle = "rgba(255, 255, 255, 0.14)";
  context.lineWidth = 2;
  context.strokeText(first, startX, 0);
  context.strokeStyle = "rgba(220, 255, 90, 0.18)";
  context.strokeText(last, startX + firstWidth, 0);

  context.restore();
}

function drawFrontPanel(
  context: CanvasRenderingContext2D,
  product: ProductConfig,
  random: () => number,
) {
  const font = bodyFont('"Arial", sans-serif');

  drawWordmark(context, product, FRONT_CENTER, 388, 164);

  context.fillStyle = "rgba(236, 236, 228, 0.72)";
  context.font = `600 25px ${font}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  drawSpacedText(context, "ENERGY DRINK", FRONT_CENTER, 490, 16);

  drawEmblem(context, product, FRONT_CENTER, 820, {
    scaleX: 0.94,
    scaleY: 0.88,
    glow: 0.9,
  });

  context.fillStyle = "rgba(255, 255, 255, 0.8)";
  context.font = `500 24px ${font}`;
  drawSpacedText(context, "ZERO SUGAR - FLAVOUR", FRONT_CENTER, 1106, 7);

  context.fillStyle = "rgba(255, 255, 255, 0.32)";
  context.font = `500 18px ${font}`;
  drawSpacedText(context, "500 ML", FRONT_CENTER, 1160, 9);

  context.save();
  context.fillStyle = "rgba(255, 255, 255, 0.32)";
  for (let index = 0; index < 20; index += 1) {
    const width = 3 + Math.floor(random() * 5);
    const height = 18 + Math.floor(random() * 44);
    context.fillRect(580 + index * 10, 266, width, height);
  }
  context.restore();

  context.save();
  context.strokeStyle = "rgba(230, 255, 150, 0.35)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(FRONT_CENTER - 250, 990);
  context.lineTo(FRONT_CENTER - 100, 990);
  context.moveTo(FRONT_CENTER + 100, 990);
  context.lineTo(FRONT_CENTER + 250, 990);
  context.stroke();
  context.restore();
}

function drawBackPanel(
  context: CanvasRenderingContext2D,
  product: ProductConfig,
  centerX: number,
) {
  const font = bodyFont('"Arial", sans-serif');

  context.save();
  context.translate(centerX, 0);
  context.scale(-1, 1);

  drawWordmark(context, product, 0, 548, 176, true);

  context.fillStyle = "rgba(236, 236, 228, 0.7)";
  context.font = `600 27px ${font}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  drawSpacedText(context, "FULL VOLTAGE", 0, 646, 18);

  drawEmblem(context, product, 0, 890, {
    scaleX: 0.92,
    scaleY: 0.86,
    glow: 0.7,
  });

  context.fillStyle = "rgba(255, 255, 255, 0.78)";
  context.font = `500 24px ${font}`;
  drawSpacedText(context, "ZERO SUGAR - FLAVOUR", 0, 1120, 7);

  context.restore();
}

export function createLabelTexture(product: ProductConfig) {
  if (typeof document === "undefined") {
    throw new Error("Can label textures can only be generated in the browser.");
  }

  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_WIDTH;
  canvas.height = TEXTURE_HEIGHT;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D is unavailable.");
  }

  const random = mulberry32(product.id.length * 91871 + 37);

  const base = context.createLinearGradient(0, 0, 0, TEXTURE_HEIGHT);
  base.addColorStop(0, "#030303");
  base.addColorStop(0.42, "#080808");
  base.addColorStop(0.7, "#020202");
  base.addColorStop(1, "#050505");
  context.fillStyle = base;
  context.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);

  const energyWash = context.createRadialGradient(
    FRONT_CENTER,
    840,
    120,
    FRONT_CENTER,
    840,
    760,
  );
  energyWash.addColorStop(0, "rgba(120, 220, 0, 0.1)");
  energyWash.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = energyWash;
  context.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);

  const backWash = context.createRadialGradient(
    0,
    880,
    80,
    0,
    880,
    620,
  );
  backWash.addColorStop(0, "rgba(120, 220, 0, 0.08)");
  backWash.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = backWash;
  context.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);

  context.save();
  context.strokeStyle = "rgba(196, 255, 0, 0.16)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(0, 138);
  context.lineTo(TEXTURE_WIDTH, 138);
  context.moveTo(0, 1218);
  context.lineTo(TEXTURE_WIDTH, 1218);
  context.stroke();
  context.restore();

  drawBackPanel(context, product, 0);
  drawBackPanel(context, product, TEXTURE_WIDTH);
  drawFrontPanel(context, product, random);

  for (let index = 0; index < 520; index += 1) {
    const x = random() * TEXTURE_WIDTH;
    const y = 100 + random() * (TEXTURE_HEIGHT - 200);
    const radius = 0.6 + random() * 4.6;
    const alpha = 0.04 + random() * 0.18;

    context.beginPath();
    context.fillStyle =
      index % 13 === 0
        ? `rgba(255, 255, 255, ${alpha + 0.14})`
        : `rgba(205, 255, 205, ${alpha})`;
    context.ellipse(x, y, radius, radius * (1 + random()), 0, 0, Math.PI * 2);
    context.fill();
  }

  for (let index = 0; index < 160; index += 1) {
    const x = random() * TEXTURE_WIDTH;
    const y = 100 + random() * (TEXTURE_HEIGHT - 200);
    context.fillStyle = `rgba(255, 255, 255, ${0.035 + random() * 0.1})`;
    context.fillRect(x, y, 1 + random() * 2, 1 + random() * 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
}
