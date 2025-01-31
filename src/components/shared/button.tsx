import { ButtonHTMLAttributes, memo, useMemo } from "react";

import { useCheckMobile } from "@/hooks";
import { classNames } from "@/modules";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "midnight" | "violet-blue" | "glaucous" | "gray";
}
function Button({
  children,
  className,
  color = "glaucous",
  disabled,
  ...props
}: ButtonProps) {
  const { isMobile } = useCheckMobile();

  const bgColor = useMemo(() => {
    if (disabled) return "bg-gray-300";
    switch (color) {
      case "midnight":
        return "bg-midnight";
      case "violet-blue":
        return "bg-violet-blue";
      case "glaucous":
        return "bg-glaucous";
      case "gray":
        return "bg-gray-300";
    }
  }, [disabled, color]);

  return (
    <button
      className={classNames(
        "flex flex-1 font-bold h-16 items-center justify-center text-xl text-white rounded-lg ",
        bgColor,
        !disabled && !isMobile && "hover:opacity-70",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default memo(Button);
