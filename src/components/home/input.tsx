"use client";

import { ChangeEvent, memo, useCallback } from "react";

interface InputProps {
  changeAnswer: (newAnswer: string) => void;
}
function Input({ changeAnswer }: InputProps) {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      changeAnswer(value.replace(/[^ㄱ-힣]/g, ""));
    },
    [changeAnswer]
  );

  return (
    <input
      className="border border-glaucous flex-1 h-12 outline-violet-blue px-3 rounded-lg invalid:outline-red-500"
      onChange={onChange}
      placeholder="네 글자 이하의 한글 단어를 입력해 주세요."
      maxLength={7}
      pattern="[ㄱ-힣]{1,7}"
      type="text"
    />
  );
}

export default memo(Input);
