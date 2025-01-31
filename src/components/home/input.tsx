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
    <div className="flex-1">
      <input
        className="border border-glaucous h-12 outline-violet-blue px-3 rounded-lg truncate invalid:outline-red-500 w-full"
        onChange={onChange}
        placeholder="네 글자 이하의 한글 단어를 입력해 주세요."
        maxLength={7}
        pattern="[ㄱ-힣]{1,7}"
        type="text"
      />
    </div>
  );
}

export default memo(Input);
