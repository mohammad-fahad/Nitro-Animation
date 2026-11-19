export const CAN_BASE_LOCAL_Y = -2.157;

export const LINEUP_BASE_Y = -2.5;
export const LINEUP_GREEN_SCALE = 1.22;
export const LINEUP_SIDE_SCALE = 0.72;

export const LINEUP_SLOTS = [
  { id: "gold", x: -4.6 },
  { id: "red", x: -2.3 },
  { id: "green", x: 0 },
  { id: "sky", x: 2.3 },
  { id: "blue", x: 4.6 },
] as const;

export const LINEUP_HALF_WIDTH = 5.85;

export const LINEUP_SCREEN_FRACTIONS = [0.1, 0.3, 0.5, 0.7, 0.9] as const;

export function lineupWorldXAtFraction(
  cameraZ: number,
  fov: number,
  aspect: number,
  fraction: number,
  targetZ = -0.12,
) {
  const distance = Math.max(0.05, cameraZ - targetZ);
  const halfWidth = Math.tan((fov * Math.PI) / 360) * distance * aspect;

  return (fraction - 0.5) * 2 * halfWidth;
}

export function lineupSpread(aspect: number) {
  return Math.min(1, Math.max(0.55, aspect / 1.4));
}

export function lineupBaseY(aspect: number) {
  return LINEUP_BASE_Y - 6.5 * (1 - lineupSpread(aspect));
}

export function lineupGreenY(aspect: number) {
  return lineupBaseY(aspect) + Math.abs(CAN_BASE_LOCAL_Y) * LINEUP_GREEN_SCALE;
}

export function lineupSideY(aspect: number) {
  return lineupBaseY(aspect) + Math.abs(CAN_BASE_LOCAL_Y) * LINEUP_SIDE_SCALE;
}

export function lineupHalfWidth(aspect: number) {
  return LINEUP_HALF_WIDTH * lineupSpread(aspect);
}
