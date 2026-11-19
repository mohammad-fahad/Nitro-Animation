"use client";

import dynamic from "next/dynamic";
import { greenProduct } from "@/lib/products/products";
import type { ProductConfig } from "@/types/product";

const CanExperience = dynamic(
  () =>
    import("@/components/three/CanExperience").then(
      (module) => module.CanExperience,
    ),
  { ssr: false },
);

export function CanStage({
  product = greenProduct,
  className = "",
}: {
  product?: ProductConfig;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <CanExperience product={product} />
    </div>
  );
}
