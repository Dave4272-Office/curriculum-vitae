import Image from "next/image";

type BrandMarkProps = {
  src: string;
  label: string;
};

export function BrandMark({ src, label }: Readonly<BrandMarkProps>) {
  if (!src) {
    return null;
  }

  return (
    <span className="brand-mark" title={label} aria-hidden="true">
      <Image
        src={src}
        alt=""
        width={80}
        height={32}
        className="brand-mark__img"
        unoptimized
      />
    </span>
  );
}
