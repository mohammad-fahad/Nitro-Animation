# Asset inventory

All recovered references are stored in `.ref/`. They are retained as captured and
must not be overwritten or deleted. Paths are relative to the repository root.

## Original recovered references

| File | Size | Status | Role |
| --- | ---: | --- | --- |
| `.ref/figma-cover-640.jpg` | 137,786 bytes | Valid | Primary desktop hero composition: black background, oversized yellow NITRO wordmark, centered horizontal can, navigation and footer. |
| `.ref/nav-zoom.png` | 35,865 bytes | Valid | Navigation spacing, typography, and Buy Now treatment. |
| `.ref/nav-buynow.png` | 18,142 bytes | Valid | Close-up of the yellow Buy Now button. |
| `.ref/footer-zoom.png` | 120,141 bytes | Valid | Footer copy, dual CTA treatment, and social icons. |
| `.ref/can-zoom.png` | 465,189 bytes | Valid | Horizontal can proportions, label layout, metal rims, and emblem placement. |
| `.ref/big-N.png` | 97,894 bytes | Valid | Oversized background wordmark geometry and layering. |
| `.ref/can-rot-cw.png` | 455,188 bytes | Valid | Clockwise axial can rotation state. |
| `.ref/can-rot-ccw.png` | 455,329 bytes | Valid | Counter-clockwise axial can rotation state. |
| `.ref/figma-cover.jpg` | 61 bytes | Corrupt | Failed download placeholder containing a JSON error. Preserved for recovery provenance; not usable as an image. |

The corrupt file contains:

```json
{"status":400,"err":"Width and height must be 0 > x >= 1280"}
```

## Derived inspection files

These files were generated during label-layout investigation. They are derived
from the original references and are not source assets.

- `.ref/inspect-label-left.png`
- `.ref/inspect-label-left-rot90.png`
- `.ref/inspect-label-left-rotm90.png`

## Artwork status

No original NITRO label artwork or layered source file was recovered. The can
label currently uses a procedural, provisional texture generated in
`src/lib/products/createLabelTexture.ts`.

The production-ready replacement path is already reserved:

- `ProductConfig.labelTexture` (`src/types/product.ts`)
- `ProductConfig.artworkSource` distinguishes `"procedural-provisional"` from
  `"provided"` in `src/lib/products/products.ts`

A supplied label texture should be treated as the source of truth for emblem
geometry, typography, gradients, condensation detail, and back-panel layout.

## Verification captures

Local review captures live in `.review/` and are not source assets:

- Desktop: `hero-01.png`, `hero-02-scroll.png`, `hero-03-scroll.png`
- Lab: `lab-01-horizontal.png`, `lab-02-axial.png`, `lab-03-vertical.png`
- Mobile: `mobile-01-hero.png`, `mobile-02-scroll.png`, `mobile-03-can-lab.png`
