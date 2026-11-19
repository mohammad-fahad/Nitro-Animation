import type { ProductConfig } from "@/types/product";

export const products: ProductConfig[] = [
  {
    id: "gold",
    name: "NITRO Gold",
    flavor: "Tropical Surge",
    palette: {
      accent: "#ffc400",
      accentBright: "#ffe86a",
      glow: "#ffb800",
    },
    artworkSource: "procedural-provisional",
  },
  {
    id: "red",
    name: "NITRO Red",
    flavor: "Cherry Charge",
    palette: {
      accent: "#ff3d2e",
      accentBright: "#ff9a84",
      glow: "#ff2a12",
    },
    artworkSource: "procedural-provisional",
  },
  {
    id: "green",
    name: "NITRO Green",
    flavor: "Lime Voltage",
    palette: {
      accent: "#b8f000",
      accentBright: "#e3ea00",
      glow: "#8aff00",
    },
    artworkSource: "procedural-provisional",
  },
  {
    id: "sky",
    name: "NITRO Sky",
    flavor: "Arctic Rush",
    palette: {
      accent: "#5fd8ff",
      accentBright: "#c5f3ff",
      glow: "#37c8ff",
    },
    artworkSource: "procedural-provisional",
  },
  {
    id: "blue",
    name: "NITRO Blue",
    flavor: "Midnight Berry",
    palette: {
      accent: "#2f6bff",
      accentBright: "#94b7ff",
      glow: "#1e4dff",
    },
    artworkSource: "procedural-provisional",
  },
];

export const greenProduct =
  products.find((product) => product.id === "green") ?? products[2];
