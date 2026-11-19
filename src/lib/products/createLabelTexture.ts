import * as THREE from "three";
import type { ProductConfig } from "@/types/product";

const TEXTURE_WIDTH = 2048;
const TEXTURE_HEIGHT = 1280;
const FRONT_CENTER = TEXTURE_WIDTH / 2;

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function colorWithAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function shadeColor(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);
  const target = amount < 0 ? 0 : 255;
  const mix = Math.abs(amount);
  const channel = (value: number) =>
    Math.round(value + (target - value) * mix);

  return `rgb(${channel(r)}, ${channel(g)}, ${channel(b)})`;
}

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
    .getPropertyValue("--font-orbitron")
    .trim();

  return font ? `${font}, ${fallback}` : fallback;
}

function bodyFont(fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const font = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-poppins")
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
  const { accent, accentBright, glow } = product.palette;
  const scaleX = options.scaleX ?? 1;
  const scaleY = options.scaleY ?? 1;
  const glowStrength = options.glow ?? 1;

  const aura = context.createRadialGradient(x, y, 24, x, y, 520);
  aura.addColorStop(0, colorWithAlpha(glow, 0.26 * glowStrength));
  aura.addColorStop(0.34, colorWithAlpha(accent, 0.12 * glowStrength));
  aura.addColorStop(0.72, colorWithAlpha(accent, 0.03 * glowStrength));
  aura.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = aura;
  context.fillRect(x - 560, y - 620, 1120, 1240);

  const random = mulberry32(81023);

  context.save();
  context.globalCompositeOperation = "screen";
  for (let layer = 0; layer < 3; layer += 1) {
    const points = 26;
    const spread = 250 + layer * 62;

    context.beginPath();
    for (let index = 0; index < points; index += 1) {
      const angle = (index / points) * Math.PI * 2;
      const reach = spread * (0.48 + random() * 0.78);
      const px = x + Math.cos(angle) * reach;
      const py = y + Math.sin(angle) * reach * 1.24;

      if (index === 0) {
        context.moveTo(px, py);
      } else {
        context.lineTo(px, py);
      }
    }
    context.closePath();

    const splash = context.createRadialGradient(x, y, 30, x, y, spread * 1.34);
    splash.addColorStop(0, colorWithAlpha(accent, 0.15 * glowStrength));
    splash.addColorStop(0.55, colorWithAlpha(glow, 0.08 * glowStrength));
    splash.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = splash;
    context.shadowColor = glow;
    context.shadowBlur = 58;
    context.fill();
  }
  context.restore();

  context.save();
  context.globalCompositeOperation = "screen";
  for (let index = 0; index < 16; index += 1) {
    const angle = random() * Math.PI * 2;
    const inner = 80 + random() * 150;
    const outer = 240 + random() * 220;
    const width = 10 + random() * 34;
    const tangentX = Math.cos(angle + Math.PI / 2);
    const tangentY = Math.sin(angle + Math.PI / 2);
    const innerX = x + Math.cos(angle) * inner;
    const innerY = y + Math.sin(angle) * inner * 1.1;
    const outerX = x + Math.cos(angle) * outer;
    const outerY = y + Math.sin(angle) * outer * 1.14;

    const shard = context.createLinearGradient(innerX, innerY, outerX, outerY);
    shard.addColorStop(0, colorWithAlpha(accentBright, 0.4 * glowStrength));
    shard.addColorStop(1, colorWithAlpha(glow, 0));
    context.fillStyle = shard;
    context.beginPath();
    context.moveTo(innerX + tangentX * width, innerY + tangentY * width);
    context.lineTo(outerX, outerY);
    context.lineTo(innerX - tangentX * width, innerY - tangentY * width);
    context.closePath();
    context.fill();
  }
  context.restore();

  for (let index = 0; index < 18; index += 1) {
    drawArc(
      context,
      random,
      x + (random() - 0.5) * 340,
      y + (random() - 0.5) * 420,
      index % 4 === 0 ? "#ffffff" : index % 3 === 0 ? accentBright : glow,
      1 + random() * 2.2,
      (0.18 + random() * 0.34) * glowStrength,
    );
  }

  context.save();
  context.translate(x, y);
  context.rotate(-0.1);
  context.scale(scaleX, scaleY);
  context.transform(1, 0, -0.1, 1, 0, 0);

  const blade = () => {
    context.beginPath();
    context.moveTo(-205, -300);
    context.lineTo(-30, -270);
    context.lineTo(76, -25);
    context.lineTo(76, -270);
    context.lineTo(205, -300);
    context.lineTo(205, 260);
    context.lineTo(30, 300);
    context.lineTo(-70, 40);
    context.lineTo(-70, 300);
    context.lineTo(-205, 260);
    context.closePath();
  };

  const shell = context.createLinearGradient(-220, -260, 230, 270);
  shell.addColorStop(0, shadeColor(accent, -0.68));
  shell.addColorStop(0.22, shadeColor(accent, -0.88));
  shell.addColorStop(0.48, shadeColor(accent, -0.76));
  shell.addColorStop(0.74, shadeColor(accent, -0.92));
  shell.addColorStop(1, shadeColor(accent, -0.96));

  context.save();
  context.shadowColor = glow;
  context.shadowBlur = 46;
  blade();
  context.fillStyle = shell;
  context.fill();
  context.restore();

  blade();
  context.strokeStyle = accentBright;
  context.globalAlpha = 0.95;
  context.lineWidth = 7;
  context.shadowColor = glow;
  context.shadowBlur = 34;
  context.stroke();
  context.globalAlpha = 1;
  context.shadowBlur = 0;

  context.save();
  blade();
  context.clip();

  const energy = context.createLinearGradient(-180, 220, 160, -240);
  energy.addColorStop(0, colorWithAlpha(accent, 0.18));
  energy.addColorStop(0.32, colorWithAlpha(accent, 0.26));
  energy.addColorStop(0.55, colorWithAlpha(accentBright, 0.22));
  energy.addColorStop(0.72, colorWithAlpha(accent, 0.12));
  energy.addColorStop(1, "rgba(2, 4, 2, 0.94)");
  context.fillStyle = energy;
  context.fillRect(-260, -300, 520, 600);

  context.globalCompositeOperation = "screen";

  context.fillStyle = colorWithAlpha(accentBright, 0.44);
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

  context.strokeStyle = "rgba(255, 255, 255, 0.88)";
  context.lineWidth = 5;
  context.shadowColor = "#ffffff";
  context.shadowBlur = 18;
  context.beginPath();
  context.moveTo(-152, 244);
  context.lineTo(-112, 116);
  context.lineTo(-42, -8);
  context.lineTo(48, -132);
  context.lineTo(144, -246);
  context.stroke();

  context.strokeStyle = colorWithAlpha(accentBright, 0.62);
  context.lineWidth = 2.4;
  context.shadowColor = glow;
  context.shadowBlur = 12;
  context.beginPath();
  context.moveTo(-184, 118);
  context.lineTo(-128, 20);
  context.lineTo(-58, -96);
  context.lineTo(18, -204);
  context.stroke();

  context.strokeStyle = "rgba(255, 255, 255, 0.5)";
  context.lineWidth = 1.6;
  context.beginPath();
  context.moveTo(-170, 246);
  context.lineTo(-134, 132);
  context.lineTo(-70, 26);
  context.lineTo(10, -84);
  context.lineTo(96, -196);
  context.stroke();
  context.restore();

  context.save();
  context.beginPath();
  context.moveTo(68, -272);
  context.lineTo(8, -34);
  context.lineTo(88, 40);
  context.lineTo(32, 272);
  context.lineTo(8, 272);
  context.lineTo(62, 46);
  context.lineTo(-18, -28);
  context.lineTo(32, -272);
  context.closePath();
  context.fillStyle = "rgba(2, 8, 0, 0.82)";
  context.fill();

  context.strokeStyle = "rgba(240, 255, 190, 0.75)";
  context.lineWidth = 3;
  context.shadowColor = glow;
  context.shadowBlur = 16;
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
  lime.addColorStop(0.7, shadeColor(accent, -0.28));
  lime.addColorStop(1, shadeColor(accent, -0.62));

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
  context.strokeStyle = colorWithAlpha(accentBright, 0.18);
  context.strokeText(last, startX + firstWidth, 0);

  context.restore();
}

function drawFrontPanel(
  context: CanvasRenderingContext2D,
  product: ProductConfig,
) {
  const font = bodyFont('"Arial", sans-serif');
  const { accentBright } = product.palette;

  context.save();
  context.fillStyle = colorWithAlpha(accentBright, 0.9);
  context.beginPath();
  context.moveTo(FRONT_CENTER - 238, 160);
  context.lineTo(FRONT_CENTER - 214, 160);
  context.lineTo(FRONT_CENTER - 224, 177);
  context.lineTo(FRONT_CENTER - 208, 177);
  context.lineTo(FRONT_CENTER - 234, 201);
  context.lineTo(FRONT_CENTER - 226, 182);
  context.lineTo(FRONT_CENTER - 242, 182);
  context.closePath();
  context.fill();

  context.fillStyle = "rgba(236, 238, 228, 0.86)";
  context.font = `600 22px ${font}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  drawSpacedText(context, "ZERO SUGAR · FLAVOUR", FRONT_CENTER + 12, 176, 5);

  context.fillStyle = "rgba(255, 255, 255, 0.32)";
  context.font = `500 16px ${font}`;
  drawSpacedText(context, "500 ML", FRONT_CENTER, 214, 8);
  context.restore();

  drawEmblem(context, product, FRONT_CENTER, 570, {
    scaleX: 1.05,
    scaleY: 1.02,
    glow: 0.92,
  });

  drawWordmark(context, product, FRONT_CENTER, 1046, 216);

  context.fillStyle = "rgba(238, 238, 230, 0.82)";
  context.font = `600 27px ${font}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  drawSpacedText(context, "ENERGY DRINK", FRONT_CENTER, 1110, 20);
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

  context.fillStyle = "rgba(236, 238, 228, 0.45)";
  context.font = `600 18px ${font}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  drawSpacedText(context, "FULL VOLTAGE", 0, 250, 12);

  context.fillStyle = "rgba(255, 255, 255, 0.3)";
  context.font = `500 15px ${font}`;
  drawSpacedText(context, "ZERO SUGAR · 500 ML", 0, 1080, 6);
  drawSpacedText(context, product.flavor.toUpperCase(), 0, 1116, 6);

  context.restore();
}

export function createLabelTexture(
  product: ProductConfig,
  resolutionScale = 1,
) {
  if (typeof document === "undefined") {
    throw new Error("Can label textures can only be generated in the browser.");
  }

  const scale = Math.min(1, Math.max(0.35, resolutionScale));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(TEXTURE_WIDTH * scale);
  canvas.height = Math.round(TEXTURE_HEIGHT * scale);
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D is unavailable.");
  }

  context.scale(scale, scale);

  const base = context.createLinearGradient(0, 0, 0, TEXTURE_HEIGHT);
  base.addColorStop(0, "#030303");
  base.addColorStop(0.42, "#080808");
  base.addColorStop(0.7, "#020202");
  base.addColorStop(1, "#050505");
  context.fillStyle = base;
  context.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);

  const energyWash = context.createRadialGradient(
    FRONT_CENTER,
    560,
    120,
    FRONT_CENTER,
    560,
    680,
  );
  energyWash.addColorStop(0, colorWithAlpha(product.palette.glow, 0.025));
  energyWash.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = energyWash;
  context.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);

  const backWash = context.createRadialGradient(0, 580, 80, 0, 580, 600);
  backWash.addColorStop(0, colorWithAlpha(product.palette.glow, 0.02));
  backWash.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = backWash;
  context.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);

  drawBackPanel(context, product, 0);
  drawBackPanel(context, product, TEXTURE_WIDTH);
  drawFrontPanel(context, product);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
}
