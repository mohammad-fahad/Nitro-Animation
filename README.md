# NITRO 3D Experience

A scroll-driven NITRO Energy Drink product experience built with Next.js, React
Three Fiber, and GSAP.

## Current milestone

Batch 2 delivers the responsive hero and interactive single-can milestone:

- desktop and mobile hero compositions
- scroll-driven can rotation, scale, and camera motion
- procedural studio lighting and reflections
- supplied can label artwork with per-flavour hue treatment
- transparent 3D condensation droplets
- reduced-motion support and a WebGL fallback
- `/can-lab` review route for can orientation, spin, scale, and offset checks

Label textures are generated in `src/lib/products/createLabelTexture.ts` from
the supplied three-panel artwork, with per-flavour hues matching the SVGs in
`.review/`. The runtime label asset is `public/images/nitro-label.jpg`.

## Stack

- Next.js 16.4.6 (App Router, Turbopack)
- React 19.3.0
- Three.js 0.187.0 with `@react-three/fiber` and `@react-three/drei`
- GSAP 3.15.1 with `@gsap/react` and ScrollTrigger
- Tailwind CSS 4.3.3
- TypeScript

## Getting started

Requires Node.js 22+ and pnpm.

```bash
pnpm install --registry=https://registry.npmjs.org
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The review route is
[http://localhost:3000/can-lab](http://localhost:3000/can-lab).

## Scripts

```bash
pnpm dev        # development server
pnpm build      # production build
pnpm start      # production server
pnpm lint       # ESLint
pnpm typecheck  # TypeScript
```

## Structure

```text
src/app/                    routes, fonts, design tokens
src/components/layout/      navigation and social links
src/components/sections/    hero section and scroll timeline
src/components/three/       canvas, can, lighting, camera, lab UI
src/lib/animation/          shared scroll-driven experience state
src/lib/products/           product configs and label texture treatment
src/types/                  shared product and orientation types
.ref/                       recovered visual references (preserve)
.review/                    supplied SVG artwork and review captures
docs/                       asset inventory and recovery report
```

## Documentation

- [Asset inventory](docs/asset-inventory.md)
- [Recovery report](docs/recovery-report.md)
