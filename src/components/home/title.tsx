import { memo } from "react";

import { Icon } from "../shared";

interface TitleProps {
  type: "지문자" | "한글";
  toggleType: () => void;
}
function Title({ type, toggleType }: TitleProps) {
  return (
    <div className="flex gap-1 items-center">
      <p className="font-bold text-xl">
        {type === "지문자" ? "지문자 → 한글" : "한글 → 지문자"}
      </p>
      <button
        className="p-1 transition-all hover:rotate-180"
        onClick={toggleType}
      >
        <Icon name="invert" />
      </button>
    </div>
  );
}

export default memo(Title);
