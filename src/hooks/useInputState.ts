"use client";

import { useCallback, useState } from "react";

import { PlayingState } from "@/typings";

export function useInputState() {
  const [inputText, setInputText] = useState<string>("");

  const [inputPlayingState, setInputPlayingState] =
    useState<PlayingState>("idle");

  const restartInputAnimation = useCallback(() => {
    setInputPlayingState("playing");
  }, []);
  const stopInputAnimation = useCallback(() => {
    setInputPlayingState("idle");
  }, []);

  const changeInputText = useCallback((text: string) => {
    setInputText(text);
  }, []);

  return {
    inputText,
    inputPlayingState,
    restartInputAnimation,
    stopInputAnimation,
    changeInputText,
  };
}
