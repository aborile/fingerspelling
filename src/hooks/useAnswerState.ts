"use client";

import { PlayingState } from "@/typings";
import { useCallback, useState } from "react";

export function useAnswerState() {
  const [answer, setAnswer] = useState<string>("정답");
  const [playingState, setPlayingState] = useState<PlayingState>("idle");

  const restartAnimation = useCallback(() => {
    setPlayingState("playing");
  }, []);
  const stopAnimation = useCallback(() => {
    setPlayingState("idle");
  }, []);
  const handleNext = useCallback(() => {
    setAnswer((a) => "다음 " + a);
  }, []);

  return { answer, playingState, restartAnimation, stopAnimation, handleNext };
}
