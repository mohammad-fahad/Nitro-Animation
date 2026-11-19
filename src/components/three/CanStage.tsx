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
  lineup = false,
}: {
  product?: ProductConfig;
  className?: string;
  lineup?: boolean;
}) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <CanExperience product={product} lineup={lineup} />
    </div>
  );
}
