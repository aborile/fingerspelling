import { memo } from "react";

import FingerspellImage from "./fingerspellImage";

function PreloadImages() {
  return (
    <div className="invisible">
      {Array.from({ length: 14 }).map((_, index) => (
        <FingerspellImage
          key={index}
          type="consonant"
          sign={index.toString().padStart(2, "0")}
          size={1}
        />
      ))}
      {Array.from({ length: 17 }).map((_, index) => (
        <FingerspellImage
          key={index}
          type="vowel"
          sign={index.toString().padStart(2, "0")}
          size={1}
        />
      ))}
    </div>
  );
}

export default memo(PreloadImages);
