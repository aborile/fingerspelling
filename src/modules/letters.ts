import { 모음, 자음, 종성, 중성, 초성 } from "@/constants";
import { Fingerspell } from "@/typings";

/** 글자를 초성/중성/종성으로 분리 */
export function splitLetter(letter: string) {
  // 한 글자인지 확인
  if (letter.length !== 1) return null;

  // 해당 글자가 한글인지 확인
  const charCode = letter.charCodeAt(0);
  const isKorean = charCode >= 44032 && charCode <= 55203;
  if (!isKorean) return null;

  // 해당 글자의 초성, 중성, 종성을 분리
  const firstIndex = Math.floor((charCode - 44032) / 588);
  const middleIndex = Math.floor(((charCode - 44032) % 588) / 28);
  const lastIndex = Math.floor((charCode - 44032) % 28);
  return {
    first: 초성[firstIndex],
    middle: 중성[middleIndex],
    last: 종성[lastIndex],
  };
}

/** 글자의 초/중/종성을 분리한 후 지문자 정보에 매핑 */
export function mapToSign(letter: string): Fingerspell | null {
  const letters = splitLetter(letter);
  if (!letters) return null;
  const { first, middle, last } = letters;
  return { first: 자음[first], middle: 모음[middle], last: 자음[last] };
}

/** 단어를 지문자로 변환 */
export function getFingerspellInfo(word: string) {
  const letters = word.split("");
  return letters.map((letter) => mapToSign(letter)).filter(Boolean);
}
