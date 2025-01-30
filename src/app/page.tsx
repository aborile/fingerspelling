"use client";

import { AnswerButtons, Canvas, Speed, Title } from "@/components";
import { useAnswerState, useType } from "@/hooks";
import { useRef } from "react";

export default function Home() {
  // 지문자 문제를 보여 주는지, 한글에 대한 지문자 결과를 보여주는지에 대한 type
  const { type, toggleType } = useType();

  // 정답, 재생 상태
  const { answer, playingState, restartAnimation, stopAnimation, handleNext } =
    useAnswerState();

  // 속도
  const speedRef = useRef<number>(0.75);

  return (
    <div className="flex flex-col items-center px-6 pt-11">
      <Title type={type} toggleType={toggleType} />

      <Canvas
        word={answer}
        playingState={playingState}
        speedRef={speedRef}
        stopAnimation={stopAnimation}
      />

      <Speed speedRef={speedRef} />

      <AnswerButtons
        answer={answer}
        playingState={playingState}
        restartAnimation={restartAnimation}
        stopAnimation={stopAnimation}
        handleNext={handleNext}
      />
    </div>
  );
}
