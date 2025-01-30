import Image from "next/image";
import { DetailedHTMLProps, ImgHTMLAttributes, memo } from "react";

import { FingerspellType } from "@/typings";

interface FingerspellImageProps
  extends Omit<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"
  > {
  type: FingerspellType;
  sign: string;
  size?: number;
}
function FingerspellImage({
  type,
  sign,
  size = 80,
  ...props
}: FingerspellImageProps) {
  return (
    <Image
      src={`/pngs/${type}/${sign}.png`}
      alt={`${type} ${sign}번째 지문자`}
      width={size}
      height={size}
      {...props}
    />
  );
}

export default memo(FingerspellImage);
