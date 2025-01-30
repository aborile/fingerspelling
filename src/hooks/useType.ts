"use client";

import { useCallback, useState } from "react";

export function useType({
  handleNext,
  changeAnswer,
}: {
  handleNext: () => void;
  changeAnswer: (answer: string) => void;
}) {
  const [type, setType] = useState<"지문자" | "한글">("지문자");

  const toggleType = useCallback(() => {
    setType((prev) => {
      if (prev === "지문자") {
        changeAnswer("");
        return "한글";
      }
      handleNext();
      return "지문자";
    });
  }, [handleNext, changeAnswer]);

  return { type, toggleType };
}
