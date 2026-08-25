import Image from "next/image";
import { publicAsset } from "../lib/assets";

type BrandMarkProps = {
  src: string;
  label: string;
};

export function BrandMark({ src, label }: Readonly<BrandMarkProps>) {
  const href = publicAsset(src);
  if (!href) {
    return null;
  }

  return (
    <span className="brand-mark" title={label} aria-hidden="true">
      <Image
        src={href}
        alt=""
        width={48}
        height={20}
        className="brand-mark__img"
        unoptimized
      />
    </span>
  );
}
