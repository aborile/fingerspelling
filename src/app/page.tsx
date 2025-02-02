"use client";

import { useCallback, useMemo, useRef } from "react";

import {
  AnswerButtons,
  Canvas,
  Input,
  InputButton,
  PreloadImages,
  Speed,
  Title,
} from "@/components";
import { useAnswerState, useInputState, useType } from "@/hooks";

export default function Home() {
  // 정답, 재생 상태
  const {
    answer,
    answerSense,
    playingState,
    restartAnimation,
    stopAnimation,
    handleNext,
  } = useAnswerState();

  // 직접 입력하는 텍스트
  const {
    inputText,
    inputPlayingState,
    restartInputAnimation,
    stopInputAnimation,
    changeInputText,
  } = useInputState();

  // 속도
  const speedRef = useRef<number>(0.75);

  // 지문자 문제를 보여 주는지, 한글에 대한 지문자 결과를 보여주는지에 대한 type
  const { type, toggleType } = useType({ changeInputText });

  const word = useMemo(() => {
    return type === "지문자" ? answer : inputText;
  }, [type, answer, inputText]);

  const currentPlayingState = useMemo(() => {
    return type === "지문자" ? playingState : inputPlayingState;
  }, [playingState, inputPlayingState, type]);

  const stop = useCallback(() => {
    if (type === "지문자") {
      stopAnimation();
    } else {
      stopInputAnimation();
    }
  }, [stopAnimation, stopInputAnimation, type]);

  return (
    <div className="flex flex-col items-center px-6 pt-11 pb-4">
      <Title type={type} toggleType={toggleType} />

      {type === "한글" && (
        <>
          <div className="flex gap-2 mt-6 w-full">
            <Input changeAnswer={changeInputText} />
            <InputButton
              answer={inputText}
              playingState={inputPlayingState}
              restartAnimation={restartInputAnimation}
              stopAnimation={stopInputAnimation}
            />
          </div>
          <span className="mt-1 text-glaucous text-sm w-full">
            최대 일곱 글자까지 입력할 수는 있지만, 지문자가 화면 밖으로 넘어갈
            수도 있어요.
          </span>
        </>
      )}

      <Canvas
        word={word}
        playingState={currentPlayingState}
        speedRef={speedRef}
        stopAnimation={stop}
      />

      <Speed speedRef={speedRef} />

      {type === "지문자" && (
        <AnswerButtons
          answer={answer}
          answerSense={answerSense}
          playingState={playingState}
          restartAnimation={restartAnimation}
          stopAnimation={stopAnimation}
          handleNext={handleNext}
        />
      )}

      <PreloadImages />
    </div>
  );
}
