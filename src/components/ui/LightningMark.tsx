import type { SVGProps } from "react";

export function LightningMark({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 160"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path
        d="M62 3 14 77h32L22 157 90 72H56L82 3H62Z"
        fill="currentColor"
      />
      <path
        d="M55 24 31 66h29l-9 52 31-51H57l9-43Z"
        fill="#050505"
        fillOpacity="0.58"
      />
      <path
        d="M62 3 14 77h32L22 157 90 72H56L82 3H62Z"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
    </svg>
  );
}
