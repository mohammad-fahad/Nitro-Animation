export interface ProductPalette {
  accent: string;
  accentBright: string;
  glow: string;
}

export interface ProductConfig {
  id: "gold" | "red" | "green" | "sky" | "blue";
  name: string;
  flavor: string;
  palette: ProductPalette;
  artworkSource: "procedural-provisional" | "provided";
  labelTexture?: string;
}

export type CanOrientation = "horizontal" | "vertical";
