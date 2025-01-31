"use client";

import { getNewWord } from "@/services/word";
import { PlayingState } from "@/typings";
import { useCallback, useEffect, useRef, useState } from "react";

export function useAnswerState() {
  const [answer, setAnswer] = useState<string>("");
  // 다음 정답 단어를 저장하는 ref -> 다음 단어를 가져오는 로딩 시간을 제거
  const nextAnswer = useRef("");

  const [playingState, setPlayingState] = useState<PlayingState>("idle");

  // 최초 정답 단어를 가져옴
  useEffect(() => {
    getNewWord().then(setAnswer);
    getNewWord().then((word) => (nextAnswer.current = word));
  }, []);

  const restartAnimation = useCallback(() => {
    setPlayingState("playing");
  }, []);
  const stopAnimation = useCallback(() => {
    setPlayingState("idle");
  }, []);
  const handleNext = useCallback(async () => {
    // 다음 정답 단어가 없으면 새로운 단어를 가져옴
    if (!nextAnswer.current) {
      setAnswer("");
      const newAnswer = await getNewWord();
      setAnswer(newAnswer);
      setPlayingState("idle");
      const newWord = await getNewWord();
      nextAnswer.current = newWord;
    } else {
      setAnswer(nextAnswer.current);
      setPlayingState("idle");
      nextAnswer.current = "";
      const newWord = await getNewWord();
      nextAnswer.current = newWord;
    }
  }, []);

  const changeAnswer = useCallback((newAnswer: string) => {
    setAnswer(newAnswer);
  }, []);

  return {
    answer,
    playingState,
    restartAnimation,
    stopAnimation,
    handleNext,
    changeAnswer,
  };
}
