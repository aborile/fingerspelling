"use client";

import { memo, RefObject, useEffect, useMemo } from "react";

import { getFingerspells } from "@/modules";
import { PlayingState } from "@/typings";

import SignImage from "./signImage";

interface CanvasProps {
  word: string;
  playingState: PlayingState;
  speedRef: RefObject<number>;
  stopAnimation: () => void;
}
function Canvas({ word, playingState, speedRef, stopAnimation }: CanvasProps) {
  /** 정답 단어를 지문자 정보로 변환 */
  const fingerspells = useMemo(() => getFingerspells(word), [word]);
  /** 전체 지문자 개수 */
  const totalSpellCount = useMemo(() => {
    return fingerspells.reduce(
      (count, { positions }) => count + positions.length,
      0
    );
  }, [JSON.stringify(fingerspells)]);

  /** 재생 속도에 따른 각 지문자 노출 시간 (ms) */
  const speed = Math.floor(200 / speedRef.current);

  // 애니메이션이 끝났을 때 playingState를 "idle"로 변경
  useEffect(() => {
    if (playingState === "idle") return;

    const timerId = setTimeout(() => {
      stopAnimation();
    }, totalSpellCount * speed + 50);

    return () => {
      clearTimeout(timerId);
    };
  }, [totalSpellCount, stopAnimation, playingState]);

  if (playingState === "idle") {
    return (
      <div className="bg-zinc-900 h-[240px] mt-8 pr-4 pt-6 rounded-lg w-full" />
    );
  }

  return (
    <div className="bg-zinc-900 h-[240px] mt-8 pr-4 pt-6 rounded-lg w-full">
      <div className="relative">
        {fingerspells.map((fingerspell, spellIndex) => {
          const marginRight = fingerspells
            .slice(0, spellIndex)
            .reduce((gap, { width }) => gap + width + 10, 0);
          return fingerspell.positions.map((position, positionIndex) => {
            const delayCount = fingerspells
              .slice(0, spellIndex)
              .reduce((count, { positions }) => count + positions.length, 0);
            return (
              <SignImage
                key={positionIndex}
                position={position}
                delay={(delayCount + positionIndex) * speed}
                animateTime={speed}
                marginRight={marginRight}
              />
            );
          });
        })}
      </div>
    </div>
  );
}

export default memo(Canvas);
