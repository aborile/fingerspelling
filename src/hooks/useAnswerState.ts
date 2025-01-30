"use client";

import { getNewWord } from "@/services/word";
import { PlayingState } from "@/typings";
import { useCallback, useEffect, useState } from "react";

export function useAnswerState() {
  const [answer, setAnswer] = useState<string>("");
  const [playingState, setPlayingState] = useState<PlayingState>("idle");

  // 최초 정답 단어를 가져옴
  useEffect(() => {
    getNewWord().then(setAnswer);
  }, []);

  const restartAnimation = useCallback(() => {
    setPlayingState("playing");
  }, []);
  const stopAnimation = useCallback(() => {
    setPlayingState("idle");
  }, []);
  const handleNext = useCallback(async () => {
    setAnswer("");
    const newAnswer = await getNewWord();
    setAnswer(newAnswer);
    setPlayingState("idle");
  }, []);

  return { answer, playingState, restartAnimation, stopAnimation, handleNext };
}
