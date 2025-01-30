"use client";

import {
  AnswerButtons,
  Canvas,
  Input,
  InputButton,
  PreloadImages,
  Speed,
  Title,
} from "@/components";
import { useAnswerState, useType } from "@/hooks";
import { useRef } from "react";

export default function Home() {
  // 정답, 재생 상태
  const {
    answer,
    playingState,
    restartAnimation,
    stopAnimation,
    handleNext,
    changeAnswer,
  } = useAnswerState();

  // 지문자 문제를 보여 주는지, 한글에 대한 지문자 결과를 보여주는지에 대한 type
  const { type, toggleType } = useType({ handleNext, changeAnswer });

  // 속도
  const speedRef = useRef<number>(0.75);

  return (
    <div className="flex flex-col items-center px-6 pt-11">
      <Title type={type} toggleType={toggleType} />

      {type === "한글" && (
        <>
          <div className="flex gap-2 mt-6 w-full">
            <Input changeAnswer={changeAnswer} />
            <InputButton
              answer={answer}
              playingState={playingState}
              restartAnimation={restartAnimation}
              stopAnimation={stopAnimation}
            />
          </div>
          <span className="mt-1 text-glaucous text-sm w-full">
            최대 일곱 글자까지 입력할 수는 있지만, 지문자가 화면 밖으로 넘어갈
            수도 있어요.
          </span>
        </>
      )}

      <Canvas
        word={answer}
        playingState={playingState}
        speedRef={speedRef}
        stopAnimation={stopAnimation}
      />

      <Speed speedRef={speedRef} />

      {type === "지문자" && (
        <AnswerButtons
          answer={answer}
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
