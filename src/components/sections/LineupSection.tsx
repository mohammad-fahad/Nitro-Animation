import { products } from "@/lib/products/products";

export function LineupSection() {
  return (
    <>
      <div
        data-lineup-backdrop
        className="pointer-events-none invisible absolute inset-0 z-0 opacity-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_44%_52%_at_50%_44%,rgba(184,240,0,0.13),transparent_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.92),transparent_26%,transparent_68%,rgba(0,0,0,0.92))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_48%,transparent_36%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      <section
        data-lineup-scene
        aria-label="NITRO product lineup"
        className="pointer-events-none invisible absolute inset-0 z-30 opacity-0"
      >
        <div
          data-lineup-kicker
          className="absolute inset-x-0 top-24 flex items-center justify-between px-6 sm:px-10 md:top-28 lg:px-16"
        >
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
            <span className="size-1.5 rounded-full bg-nitro-yellow shadow-[0_0_12px_#e3ea00]" />
            The lineup
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Five flavours / One voltage
          </p>
        </div>

        <div
          data-lineup-heading
          className="absolute inset-x-0 top-[15%] z-10 px-6 md:hidden"
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-white/35">
            Choose your voltage
          </p>
          <p className="since-headline mt-2 text-[clamp(2.5rem,11.5vw,4rem)] leading-[0.82]">
            FIVE
            <br />
            FLAVOURS.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-[2.8vh] sm:bottom-[2.4vh]">
          <ul className="grid w-full grid-cols-5 items-start gap-0">
            {products.map((product) => {
              return (
                <li
                  key={product.id}
                  data-lineup-label
                  className="flex flex-col items-center text-center"
                >
                  <p className="whitespace-nowrap font-display text-[9px] italic leading-none tracking-[-0.02em] text-white sm:text-[17px] md:text-[20px] xl:text-[22px]">
                    {product.name.toUpperCase()}
                  </p>
                  <p className="mt-1.5 hidden whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-white/40 sm:block md:text-[11px]">
                    High intensity
                  </p>
                  <p className="mt-1.5 whitespace-nowrap text-[10px] font-medium tracking-[0.04em] text-white sm:text-[13px] md:text-[14px] xl:text-[15px]">
                    {product.priceUsd.toFixed(2)} $
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
