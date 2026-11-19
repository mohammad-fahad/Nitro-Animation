"use client";

import { ProductCan } from "@/components/three/ProductCan";
import { CameraRig } from "@/components/three/CameraRig";
import { Lighting } from "@/components/three/Lighting";
import { LineupCans } from "@/components/three/LineupCans";
import type { ProductConfig } from "@/types/product";

export function Experience({
  product,
  lineup = false,
}: {
  product: ProductConfig;
  lineup?: boolean;
}) {
  return (
    <>
      <CameraRig />
      <Lighting />
      <ProductCan product={product} />
      {lineup ? <LineupCans /> : null}
    </>
  );
}
