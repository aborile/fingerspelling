"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { getNewWord } from "@/services/word";
import { OpendictSense, PlayingState, Word } from "@/typings";

export function useAnswerState() {
  const [answer, setAnswer] = useState<string>("");
  const [answerSense, setAnswerSense] = useState<OpendictSense[]>();
  // 다음 정답 단어를 저장하는 ref -> 다음 단어를 가져오는 로딩 시간을 제거
  const nextAnswer = useRef<Word>(null);

  const [playingState, setPlayingState] = useState<PlayingState>("idle");

  // 최초 정답 단어를 가져옴
  useEffect(() => {
    getNewWord().then(({ word, sense }) => {
      setAnswer(word);
      setAnswerSense(sense);
    });
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
      setAnswer(newAnswer.word);
      setAnswerSense(newAnswer.sense);
      setPlayingState("idle");
      const newWord = await getNewWord();
      nextAnswer.current = newWord;
    } else {
      setAnswer(nextAnswer.current.word);
      setAnswerSense(nextAnswer.current.sense);
      setPlayingState("idle");
      nextAnswer.current = null;
      const newWord = await getNewWord();
      nextAnswer.current = newWord;
    }
  }, []);

  const changeAnswer = useCallback((newAnswer: string) => {
    setAnswer(newAnswer);
  }, []);

  return {
    answer,
    answerSense,
    playingState,
    restartAnimation,
    stopAnimation,
    handleNext,
    changeAnswer,
  };
}
