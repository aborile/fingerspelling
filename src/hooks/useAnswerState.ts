"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { getSignLanguageWords } from "@/services/word";
import { OpendictSense, PlayingState, Word } from "@/typings";

export function useAnswerState() {
  const [answer, setAnswer] = useState<string>("");
  const [answerSense, setAnswerSense] = useState<OpendictSense[]>();

  // 다음 정답 단어를 저장하는 ref -> 다음 단어를 가져오는 로딩 시간을 제거
  const nextAnswers = useRef<Word[]>([]);

  const [playingState, setPlayingState] = useState<PlayingState>("idle");

  const getNewWords = useCallback(async () => {
    const words = await getSignLanguageWords();
    const lastWord = words.pop();
    if (lastWord) {
      setAnswer(lastWord.word);
      setAnswerSense(lastWord.sense);
      nextAnswers.current = words.concat(nextAnswers.current);
      setPlayingState("idle");
      return true;
    }
    return false;
  }, []);

  // 최초 정답 단어를 가져옴
  useEffect(() => {
    getNewWords();
  }, [getNewWords]);

  const restartAnimation = useCallback(() => {
    setPlayingState("playing");
  }, []);
  const stopAnimation = useCallback(() => {
    setPlayingState("idle");
  }, []);

  const handleNext = useCallback(async () => {
    const nextAnswer = nextAnswers.current.pop();
    if (nextAnswer) {
      setAnswer(nextAnswer.word);
      setAnswerSense(nextAnswer.sense);
      setPlayingState("idle");
      // 남은 답이 3개보다 적을 시 다음 답을 미리 로드
      if (nextAnswers.current.length < 3) {
        getNewWords();
      }
    }
    // 다음 정답 단어가 없으면 새로운 단어를 가져옴
    else {
      setAnswer("");
      await getNewWords();
      setPlayingState("idle");
    }
  }, [getNewWords]);

  return {
    answer,
    answerSense,
    playingState,
    restartAnimation,
    stopAnimation,
    handleNext,
  };
}
