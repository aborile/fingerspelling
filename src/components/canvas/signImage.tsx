import { memo, useEffect, useMemo, useState } from "react";

import { classNames } from "@/modules";
import { FingerspellPosition } from "@/typings";

import { FingerspellImage } from "../shared";

interface SignImageProps {
  position: FingerspellPosition;
  delay: number;
  animateTime: number;
  marginRight: number;
}
function SignImage({
  position,
  delay,
  animateTime,
  marginRight,
}: SignImageProps) {
  const [showImage, setShowImage] = useState(false);
  const [hideImage, setHideImage] = useState(false);
  const { type, sign, top, right } = useMemo(() => position, [position]);

  // 이미지 노출 및 숨김 타이머 설정
  useEffect(() => {
    const showTimerId = setTimeout(() => {
      setShowImage(true);
    }, delay);
    const hideTimerId = setTimeout(() => {
      setHideImage(true);
    }, delay + animateTime + 50);

    return () => {
      clearTimeout(showTimerId);
      clearTimeout(hideTimerId);
    };
  }, []);

  return (
    <FingerspellImage
      type={type}
      sign={sign}
      className={classNames(
        "absolute",
        showImage ? "fade-in" : "invisible",
        hideImage && "fade-out"
      )}
      style={{ top, right: right + marginRight }}
    />
  );
}

export default memo(SignImage);
