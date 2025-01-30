"use client";

import { useCallback, useState } from "react";

export function useType() {
  const [type, setType] = useState<"지문자" | "한글">("지문자");

  const toggleType = useCallback(() => {
    setType((prev) => (prev === "지문자" ? "한글" : "지문자"));
  }, []);

  return { type, toggleType };
}
