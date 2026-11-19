"use client";

import { ProductCan } from "@/components/three/ProductCan";
import { CameraRig } from "@/components/three/CameraRig";
import { Lighting } from "@/components/three/Lighting";
import type { ProductConfig } from "@/types/product";

export function Experience({ product }: { product: ProductConfig }) {
  return (
    <>
      <CameraRig />
      <Lighting />
      <ProductCan product={product} />
    </>
  );
}
