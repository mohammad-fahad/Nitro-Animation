type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "x" | "linkedin";
};

const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "X", href: "https://x.com", icon: "x" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
];

function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  const sharedProps = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (icon === "facebook") {
    return (
      <svg {...sharedProps}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg {...sharedProps}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }

  if (icon === "x") {
    return (
      <svg {...sharedProps}>
        <path d="M4 4l16 16" />
        <path d="M20 4L4 20" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className="flex size-9 items-center justify-center rounded-full border border-nitro-yellow/70 text-nitro-yellow transition-colors hover:bg-nitro-yellow hover:text-black"
          >
            <SocialIcon icon={link.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
