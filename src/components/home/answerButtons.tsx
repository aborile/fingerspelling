"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { classNames } from "@/modules";
import { OpendictSense, PlayingState } from "@/typings";

import { Button, Icon, Loader } from "../shared";
import { getWordDetailInfo } from "@/services/word";

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

  // 수어 정보
  const [signLanguage, setSignLanguage] = useState<string>();
  useEffect(() => {
    if (answerInfo?.target_code) {
      setSignLanguage(undefined);
      getWordDetailInfo(answerInfo.target_code).then((data) => {
        setSignLanguage(data?.channel.item?.senseInfo?.sl_info_link);
      });
    }
  }, [answerInfo?.target_code]);

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
        </p>

        {!!answerInfo && (
          <div className="bg-glaucous/15 mt-3 p-4 rounded text-sm w-full">
            <div className="flex gap-2">
              <a
                href={answerInfo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-glaucous flex gap-1 h-6 items-center px-2 rounded-full hover:opacity-70"
              >
                <Icon name="dictionary" size={20} />
                <span>사전 정보</span>
              </a>
              {!!signLanguage && (
                <a
                  href={signLanguage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-glaucous flex gap-1 h-6 items-center px-2 rounded-full hover:opacity-70"
                >
                  <Icon name="sign_language" size={20} />
                  <span>수어 정보</span>
                </a>
              )}
            </div>
            <p className="mt-1">
              {answerInfo.pos && (
                <span className="text-gray-500">[{answerInfo.pos}] </span>
              )}
              {answerInfo.cat && (
                <span className="text-gray-500">[{answerInfo.cat}] </span>
              )}
              {answerInfo.definition}
            </p>
          </div>
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
