import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto relative flex h-20 items-center justify-between px-6 sm:px-10 lg:px-16">
        <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-black/80 to-transparent" />

        <Link href="#home" aria-label="NITRO home" className="block">
          <Image
            src="/images/brand-logo.svg"
            alt="NITRO"
            width={72}
            height={17}
            priority
            unoptimized
            className="h-[17px] w-auto"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-42 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[12px] font-medium text-white transition-colors hover:text-nitro-yellow"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#shop"
          className="rounded-[2px] bg-nitro-yellow px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-white"
        >
          Buy Now
        </Link>
      </div>
    </header>
  );
}
