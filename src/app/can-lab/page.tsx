import type { Metadata } from "next";
import { CanLabClient } from "@/components/three/CanLabClient";

export const metadata: Metadata = {
  title: "Single-can laboratory — NITRO",
  description:
    "Technically focused review of the NITRO can geometry, orientation, axial spin and scale states.",
};

export default function CanLabPage() {
  return <CanLabClient />;
}
