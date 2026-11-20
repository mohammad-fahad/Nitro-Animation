# NITRO 3D Experience

A responsive, scroll-driven NITRO energy drink product experience built with Next.js, React Three Fiber, Three.js, and GSAP.

## Tech stack

- Next.js 16 (App Router)
- React 19 and TypeScript
- Three.js with React Three Fiber and Drei
- GSAP with ScrollTrigger
- Tailwind CSS 4

## Requirements

- Node.js 22+
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
pnpm dev        # Start the development server
pnpm build      # Create a production build
pnpm start      # Start the production server
pnpm lint       # Run ESLint
pnpm typecheck  # Run TypeScript checks
```

## Project structure

```text
src/app/                    App Router pages and global styles
src/components/layout/      Navigation and shared layout elements
src/components/sections/    Page sections and scroll experience
src/components/three/       Three.js scene, can model, camera, and lighting
src/lib/animation/          Scroll-driven animation state and timelines
src/lib/products/           Product configuration and label texture generation
src/types/                  Shared TypeScript types
public/                     Static runtime assets
docs/                       Project asset notes
```

## Review route

`/can-lab` is a local can-model inspection route. It is intended for development and visual review.

## Reference assets

The original design references, supplied SVG samples, and local review screenshots are kept in the ignored `.ref/` and `.review/` directories. They are local working materials and are not included in the Git repository. See [Asset inventory](docs/asset-inventory.md) for details.
