"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { Button, Loader } from "../shared";
import { classNames } from "@/modules";
import { PlayingState } from "@/typings";
import { OpendictSense } from "@/typings/opendict";

interface AnswerButtonsProps {
  answer: string;
  answerSense: OpendictSense[] | undefined;
  playingState: PlayingState;
  restartAnimation: () => void;
  stopAnimation: () => void;
  handleNext: () => void;
}
function AnswerButtons({
  answer,
  answerSense,
  playingState,
  restartAnimation,
  stopAnimation,
  handleNext,
}: AnswerButtonsProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const answerInfo = useMemo(() => {
    return answerSense?.[0];
  }, [JSON.stringify(answerSense)]);

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
          showAnswer && "!flex",
          "flex-col hidden mt-6 items-center w-full"
        )}
      >
        {!!answerInfo ? (
          <a href={answerInfo.link} target="_blank" rel="noopener noreferrer">
            <p className="font-bold text-violet-blue text-4xl hover:underline">
              {answer}
            </p>
          </a>
        ) : (
          <p className="font-bold text-violet-blue text-4xl break-all w-full">
            {answer}
          </p>
        )}
      </div>

      {!answer && <Loader className="mt-6" />}

      <div className="flex gap-8 mt-9 w-full">
        {playingState === "playing" ? (
          <Button onClick={onClickStop}>정지</Button>
        ) : (
          <Button disabled={!answer} onClick={onClickRestart}>
            재생
          </Button>
        )}
        {showAnswer ? (
          <Button onClick={onClickNext}>다음 문제</Button>
        ) : (
          <Button disabled={!answer} onClick={onClickShowAnswer}>
            정답 보기
          </Button>
        )}
      </div>
    </>
  );
}

export default memo(AnswerButtons);
