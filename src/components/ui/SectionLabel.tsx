import type { ReactNode } from "react";

export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
      <span className="text-nitro-yellow">{index}</span>
      <span className="h-px w-8 bg-nitro-yellow/35" />
      <span>{children}</span>
    </p>
  );
}
