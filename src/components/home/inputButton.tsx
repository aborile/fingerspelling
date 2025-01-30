import { memo, useCallback } from "react";

import { PlayingState } from "@/typings";

import { Button } from "../shared";

interface InputButtonProps {
  answer: string;
  playingState: PlayingState;
  restartAnimation: () => void;
  stopAnimation: () => void;
}
function InputButton({
  answer,
  playingState,
  restartAnimation,
  stopAnimation,
}: InputButtonProps) {
  const onClickRestart = useCallback(() => {
    restartAnimation();
  }, [restartAnimation]);

  const onClickStop = useCallback(() => {
    stopAnimation();
  }, [stopAnimation]);

  if (playingState === "playing") {
    return (
      <Button className="flex-initial !h-12 w-20" onClick={onClickStop}>
        정지
      </Button>
    );
  }
  return (
    <Button
      className="flex-initial !h-12 w-20"
      disabled={!answer}
      onClick={onClickRestart}
    >
      재생
    </Button>
  );
}

export default memo(InputButton);
