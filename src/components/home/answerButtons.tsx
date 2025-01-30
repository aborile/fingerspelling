"use client";

import { memo, useCallback, useState } from "react";
import { Button } from "../shared";
import { classNames } from "@/modules";
import { PlayingState } from "@/typings";

interface AnswerButtonsProps {
  answer: string;
  playingState: PlayingState;
  restartAnimation: () => void;
  stopAnimation: () => void;
  handleNext: () => void;
}
function AnswerButtons({
  answer,
  playingState,
  restartAnimation,
  stopAnimation,
  handleNext,
}: AnswerButtonsProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  const onClickRestart = useCallback(() => {
    restartAnimation();
  }, [restartAnimation]);

  const onClickStop = useCallback(() => {
    stopAnimation();
  }, [stopAnimation]);

  const onClickShowAnswer = useCallback(() => {
    setShowAnswer(true);
    stopAnimation();
  }, [stopAnimation]);

  const onClickNext = useCallback(() => {
    setShowAnswer(false);
    handleNext();
  }, [handleNext]);

  return (
    <>
      <div
        className={classNames(
          showAnswer && "!block",
          "font-bold hidden mt-6 text-violet-blue text-4xl"
        )}
      >
        {answer}
      </div>

      <div className="flex gap-8 mt-9 w-full">
        {playingState === "playing" ? (
          <Button onClick={onClickStop}>정지</Button>
        ) : (
          <Button onClick={onClickRestart}>재생</Button>
        )}
        {showAnswer ? (
          <Button onClick={onClickNext}>다음 문제</Button>
        ) : (
          <Button onClick={onClickShowAnswer}>정답 보기</Button>
        )}
      </div>
    </>
  );
}

export default memo(AnswerButtons);
