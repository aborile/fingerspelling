"use client";

import { memo, useCallback, useMemo, useState } from "react";

import { classNames } from "@/modules";
import { OpendictSense, PlayingState } from "@/typings";

import { Button, Icon, Loader } from "../shared";

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
        <p className="break-all font-bold relative text-violet-blue text-4xl">
          {answer}

          {!!answerInfo && (
            <a
              href={answerInfo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute p-0.5 -right-6 -top-2 hover:opacity-70"
            >
              <Icon name="dictionary" size={20} />
            </a>
          )}
        </p>
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
