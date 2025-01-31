import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { configs, SEARCH_KEY } from "@/constants";
import { OpendictResult } from "@/typings";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // 검색할 키워드를 SEARCH_KEY 배열에서 랜덤 선택
    const q = SEARCH_KEY[Math.floor(Math.random() * SEARCH_KEY.length)];

    // 오픈사전 API를 통해 해당 키워드에 대한 검색 결과를 가져옴
    const { data } = await axios.get<OpendictResult>(
      "https://opendict.korean.go.kr/api/search",
      {
        params: {
          key: configs.OPENDICT_API_KEY,
          q,
          req_type: "json",
          num: 50,
          sort: "popular",
          advanced: "y",
          method: Math.random() > 0.5 ? "start" : "include",
          type1: "word",
          type3: "general",
        },
      }
    );

    // 검색 결과에서 단어만 추출, 한글이 아닌 문자는 제거, 길이가 2~4인 단어만 필터링
    const results = data.channel.item
      .map(({ word, sense }) => ({
        word: word.replace(/[^가-힣]/g, ""),
        sense,
      }))
      .filter(({ word }) => word.length > 1 && word.length < 5);

    // 검색 결과가 없을 경우 에러
    if (results.length === 0) {
      return res.status(404).json("No results");
    }

    // 검색 결과 중 랜덤 선택
    const randomIndex = Math.floor(Math.random() * results.length);
    const word = results[randomIndex];
    return res.status(200).json(word);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
}
