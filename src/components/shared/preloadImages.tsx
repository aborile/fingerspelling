import { memo } from "react";

import FingerspellImage from "./fingerspellImage";

function PreloadImages() {
  return (
    <div className="fixed h-10 invisible overflow-hidden top-0 -z-10">
      {Array.from({ length: 14 }).map((_, index) => (
        <FingerspellImage
          key={index}
          type="consonant"
          sign={index.toString().padStart(2, "0")}
        />
      ))}
      {Array.from({ length: 17 }).map((_, index) => (
        <FingerspellImage
          key={index}
          type="vowel"
          sign={index.toString().padStart(2, "0")}
        />
      ))}
    </div>
  );
}

export default memo(PreloadImages);
