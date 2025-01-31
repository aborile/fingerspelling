import { ChangeEvent, memo, RefObject, useCallback } from "react";

import { Icon } from "../shared";

interface SpeedProps {
  speedRef: RefObject<number>;
}
function Speed({ speedRef }: SpeedProps) {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    speedRef.current = e.target.valueAsNumber;
  }, []);

  return (
    <div className="cursor-default flex gap-1 items-center mt-4 w-full">
      <Icon name="speed" />
      <span className="text-sm">속도</span>

      <div className="flex-1 mb-3 px-3.5 relative">
        <input
          alt="속도 조절을 위한 슬라이더"
          className="accent-glaucous cursor-pointer w-full"
          onChange={onChange}
          type="range"
          min={0.4}
          max={1.0}
          step={0.05}
          defaultValue={0.6}
        />
        <span className="absolute -bottom-5 left-0 text-center text-xs">
          <div>×0.4</div>
          <div className="leading-3 text-gray-400">(느리게)</div>
        </span>
        <span className="absolute -bottom-5 right-0 text-center text-xs">
          <div>×1.0</div>
          <div className="leading-3 text-gray-400">(빠르게)</div>
        </span>
      </div>
    </div>
  );
}

export default memo(Speed);
