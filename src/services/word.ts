import axios from "axios";

import { WORDS } from "@/constants";
import { OpendictDetail, Word } from "@/typings";

/** 우리말샘에서 랜덤한 단어를 하나 조회한다. */
export async function getNewWord() {
  try {
    const { data } = await axios.get<Word>("/api/word");
    return data;
  } catch {
    // 검색 결과가 없거나, 검색에 실패한 경우 WORDS 배열에서 랜덤 선택
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return { word: WORDS[randomIndex], sense: [] };
  }
}

/** 우리말샘에서 수어 정보가 있는 단어를 30개 조회한다. */
export async function getSignLanguageWords() {
  try {
    const { data } = await axios.get<Word[]>("/api/sign-word");
    return data;
  } catch {
    // 검색 결과가 없거나, 검색에 실패한 경우 WORDS 배열에서 랜덤 선택
    const COUNT = 10;
    const randomIndex = Math.floor(Math.random() * (WORDS.length - COUNT));
    return WORDS.slice(randomIndex, randomIndex + COUNT).map((word) => ({
      word,
      sense: [],
    }));
  }
}

/** 우리말샘에서 특정 target_code 단어의 상세 정보를 조회한다. */
export async function getWordDetailInfo(code: string) {
  try {
    const { data } = await axios.get<OpendictDetail>("/api/word/detail", {
      params: { code },
    });
    return data;
  } catch {
    return null;
  }
}
