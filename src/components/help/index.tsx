"use client";

import { memo, useCallback, useMemo, useState } from "react";

import { 단자음, 모음, 자음 } from "@/constants";
import { FingerspellType } from "@/typings";

import { FingerspellImage } from "../shared";
import { classNames } from "@/modules";

function HelpFingerspell() {
  const [type, setType] = useState<FingerspellType>("consonant");
  const [showAllConsonant, setShowAllConsonant] = useState(false);

  const selectConsonant = useCallback(() => {
    setType("consonant");
  }, []);
  const selectVowel = useCallback(() => {
    setType("vowel");
  }, []);

  const toggleShowAllConsonant = useCallback(() => {
    setShowAllConsonant((showAll) => !showAll);
  }, []);

  const list = useMemo(() => {
    if (type === "consonant") {
      if (showAllConsonant) {
        return Object.entries(자음).slice(1);
      }
      return Object.entries(단자음);
    }
    return Object.entries(모음);
  }, [type, showAllConsonant]);

  return (
    <div className="h-full overflow-y-auto p-6 w-full">
      <div className="flex gap-2 font-bold">
        <button
          onClick={selectConsonant}
          className={classNames(
            "border-b-4 flex h-10 items-center justify-center w-20",
            type === "consonant" ? "border-violet-blue" : "border-transparent"
          )}
        >
          자음
        </button>
        <button
          onClick={selectVowel}
          className={classNames(
            "border-b-4 flex h-10 items-center justify-center w-20",
            type === "vowel" ? "border-violet-blue" : "border-transparent"
          )}
        >
          모음
        </button>
      </div>

      {type === "consonant" && (
        <div>
          <button
            onClick={toggleShowAllConsonant}
            className="flex gap-2 items-center mt-2"
          >
            <input
              type="checkbox"
              checked={showAllConsonant}
              readOnly
              className=" accent-violet-blue cursor-pointer"
            />
            겹자음 보기
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {list.map(([key, fingerspellInfo]) => (
          <div key={key} className="border border-midnight p-1 rounded-sm">
            <div className="flex">
              {fingerspellInfo.signs.map((sign, index) => (
                <FingerspellImage
                  key={index}
                  type={type}
                  sign={sign}
                  size={60}
                  className="flex-shrink-0"
                />
              ))}
            </div>
            <p className="text-center">{key}</p>
          </div>
        ))}
      </div>

      <div className="bg-glaucous/30 mt-8 p-2 rounded-lg text-sm text-gray-700">
        지문자(指文字, 영어: fingerspelling 또는 manual alphabet)는 수화에서
        표현할 수 없는 말을 보충하기 위해 문자언어를 손모양이나 손동작으로
        표현하는 것이다. 지문자는 손만을 사용하여 쓰기 체계, 때로는 숫자 체계의
        문자를 표현하는 것이다. 한글 지문자는 한국수화에서 한글을 나타내는
        지문자이다.{" "}
        <span className="text-gray-500">
          (출처:{" "}
          <a
            href="https://ko.wikipedia.org/wiki/%EC%A7%80%EB%AC%B8%EC%9E%90"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-70"
          >
            위키백과
          </a>
          )
        </span>
      </div>
    </div>
  );
}

export default memo(HelpFingerspell);
