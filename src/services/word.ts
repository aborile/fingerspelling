import axios from "axios";

import { WORDS } from "@/constants";
import { Word } from "@/typings/word";

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
