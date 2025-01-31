import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { configs } from "@/constants";
import { OpendictResult } from "@/typings";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // 1/31 기준 수어 정보가 있는 단어가 총 21646개,
    // 30개씩 검색하므로 안전하게 700까지 랜덤으로 시작 위치를 지정
    const start = Math.floor(Math.random() * 700);

    // 오픈사전 API를 통해 수어 정보가 있는 단어에 대한 검색 결과를 가져옴
    const { data } = await axios.get<OpendictResult>(
      "https://opendict.korean.go.kr/api/search",
      {
        params: {
          key: configs.OPENDICT_API_KEY,
          q: "",
          req_type: "json",
          start,
          num: 30,
          sort: "popular",
          advanced: "y",
          target: 14,
          method: "yes",
        },
      }
    );

    // 검색 결과 단어에서 한글이 아닌 문자는 제거, 길이가 2~4인 단어만 필터링
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

    // 전체 검색 결과를 반환
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
}
