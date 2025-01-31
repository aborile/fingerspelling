import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { configs } from "@/constants";
import { OpendictDetail } from "@/typings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const code = req.query.code as string;

    // 오픈사전 API를 통해 해당 키워드에 대한 검색 결과를 가져옴
    const { data } = await axios.get<OpendictDetail>(
      "https://opendict.korean.go.kr/api/view",
      {
        params: {
          key: configs.OPENDICT_API_KEY,
          q: code,
          method: "target_code",
          req_type: "json",
        },
      }
    );

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
}
