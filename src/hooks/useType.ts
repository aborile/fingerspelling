"use client";

import { useCallback, useState } from "react";

export function useType({
  changeInputText,
}: {
  changeInputText: (answer: string) => void;
}) {
  const [type, setType] = useState<"지문자" | "한글">("지문자");

  const toggleType = useCallback(() => {
    setType((prev) => {
      if (prev === "지문자") {
        return "한글";
      }
      changeInputText("");
      return "지문자";
    });
  }, [changeInputText]);

  return { type, toggleType };
}
