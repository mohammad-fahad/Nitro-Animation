# Asset inventory

This document distinguishes runtime assets committed to the project from local reference material used during implementation.

## Runtime assets

- `public/` contains static assets served by the application.
- `public/images/nitro-label.jpg` is the label image used by the can texture pipeline.
- `src/lib/products/products.ts` contains the five flavour configurations and their label asset references.
- `src/lib/products/createLabelTexture.ts` prepares the label artwork for the 3D can.
- `src/components/three/CanModel.tsx` applies the label texture and builds the can materials and geometry.
- `src/components/three/DewDrops.tsx` renders the 3D condensation droplets.

## Local reference material

The following directories are intentionally excluded from Git by `.gitignore`:

- `.review/` — supplied NITRO SVG samples, visual references, and local review screenshots.
- `.ref/` — recovered reference captures used during implementation.

These directories are local working materials, not application runtime dependencies. Keep the original supplied SVGs and reference captures in the local workspace; do not copy review screenshots into the production asset directory unless the application actually uses them.

## Source of truth

Use the supplied SVG artwork in `.review/` as the visual reference for the can and flavour designs. The committed runtime assets and texture-generation code under `public/` and `src/lib/products/` are what the application loads at runtime.
