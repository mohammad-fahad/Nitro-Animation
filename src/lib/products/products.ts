import type { ProductConfig } from "@/types/product";

export const products: ProductConfig[] = [
  {
    id: "gold",
    name: "NITRO Gold",
    flavor: "Tropical Surge",
    priceUsd: 10.58,
    palette: {
      accent: "#ffc400",
      accentBright: "#ffe86a",
      glow: "#ffb800",
    },
    labelTexture: "/images/nitro-label.jpg",
  },
  {
    id: "red",
    name: "NITRO Red",
    flavor: "Cherry Charge",
    priceUsd: 11,
    palette: {
      accent: "#ff3d2e",
      accentBright: "#ff9a84",
      glow: "#ff2a12",
    },
    labelTexture: "/images/nitro-label.jpg",
  },
  {
    id: "green",
    name: "NITRO Green",
    flavor: "Lime Voltage",
    priceUsd: 12,
    palette: {
      accent: "#b8f000",
      accentBright: "#e3ea00",
      glow: "#8aff00",
    },
    labelTexture: "/images/nitro-label.jpg",
  },
  {
    id: "sky",
    name: "NITRO Sky",
    flavor: "Arctic Rush",
    priceUsd: 11,
    palette: {
      accent: "#5fd8ff",
      accentBright: "#c5f3ff",
      glow: "#37c8ff",
    },
    labelTexture: "/images/nitro-label.jpg",
  },
  {
    id: "blue",
    name: "NITRO Blue",
    flavor: "Midnight Berry",
    priceUsd: 10.58,
    palette: {
      accent: "#2f6bff",
      accentBright: "#94b7ff",
      glow: "#1e4dff",
    },
    labelTexture: "/images/nitro-label.jpg",
  },
];

export const greenProduct =
  products.find((product) => product.id === "green") ?? products[2];
