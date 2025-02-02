import Image from "next/image";
import { memo } from "react";

interface IconProps {
  name: "help" | "invert" | "speed" | "dictionary" | "sign_language";
  size?: number;
}
function Icon({ name, size = 24 }: IconProps) {
  return (
    <Image src={`/svgs/${name}.svg`} alt={name} width={size} height={size} />
  );
}

export default memo(Icon);
