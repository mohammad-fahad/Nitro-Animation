import type { CSSProperties } from "react";
import { greenProduct } from "@/lib/products/products";
import { LightningMark } from "@/components/ui/LightningMark";
import type { ProductConfig } from "@/types/product";
import styles from "./ProductCanPreview.module.css";

type ProductTheme = CSSProperties & {
  "--accent": string;
  "--accent-bright": string;
  "--glow": string;
};

function productTheme(product: ProductConfig): ProductTheme {
  return {
    "--accent": product.palette.accent,
    "--accent-bright": product.palette.accentBright,
    "--glow": product.palette.glow,
  } as ProductTheme;
}

export function ProductCanPreview({
  product,
  className = "",
  featured = false,
}: {
  product: ProductConfig;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.stage} ${featured ? styles.featured : ""} ${className}`}
      style={productTheme(product)}
    >
      <div className={styles.aura} />
      <div className={styles.can}>
        <div className={styles.rimTop} />
        <div className={styles.canBody}>
          <div className={styles.sheen} />
          <div className={styles.label}>
            <span className={styles.topline}>ZERO SUGAR - FLAVOUR</span>
            <div className={styles.art}>
              <LightningMark className={styles.bolt} />
            </div>
            <span className={styles.logo}>
              NIT<span className={styles.logoAccent}>RO</span>
            </span>
            <span className={styles.energy}>ENERGY DRINK</span>
          </div>
        </div>
        <div className={styles.rimBottom} />
      </div>
      <div className={styles.shadow} />
    </div>
  );
}

export function CampaignCan() {
  return (
    <div
      aria-hidden="true"
      className={styles.campaign}
      style={productTheme(greenProduct)}
    >
      <div className={styles.campaignCan}>
        <div className={styles.campaignRimLeft} />
        <div className={styles.campaignRimRight} />
        <div className={styles.campaignFace}>
          <div className={styles.campaignBrand}>
            <span className={styles.campaignWordmark}>
              NIT<span className={styles.campaignWordAccent}>RO</span>
            </span>
            <span className={styles.campaignEnergy}>ENERGY DRINK</span>
          </div>
          <div className={styles.campaignArt}>
            <LightningMark className={styles.campaignBolt} />
          </div>
          <div className={styles.campaignMeta}>
            <span>ZERO SUGAR - FLAVOUR</span>
            <span>500 ML</span>
          </div>
        </div>
        <div className={styles.campaignSheen} />
      </div>
      <div className={styles.campaignShadow} />
    </div>
  );
}
