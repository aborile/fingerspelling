import { Fingerspell, FingerspellPosition } from "@/typings";
import { getFingerspellInfo } from "./letters";

const RIGHT_GAP = 25;
const LINE_GAP = 50;

/** 해당 글자의 width를 계산 */
export function getFingerspellWidth(fingerspell: Fingerspell) {
  const { first, middle, last } = fingerspell;
  const isBottomVowel = middle.position === "bottom";

  if (isBottomVowel) {
    return (
      (Math.max(first.signs.length, middle.signs.length, last.signs.length) +
        1) *
      RIGHT_GAP
    );
  }
  return (
    (Math.max(first.signs.length + middle.signs.length, last.signs.length) +
      1) *
    RIGHT_GAP
  );
}

/** 해당 글자의 각 초성/중성/종성 별 위치 정보 계산 */
export function getFingerspellPosition(fingerspell: Fingerspell | null) {
  if (!fingerspell) return { positions: [], width: 0 };

  const { first, middle, last } = fingerspell;
  const isBottomVowel = middle.position === "bottom";

  const positions = [] as FingerspellPosition[];

  first.signs.forEach((sign, index) => {
    positions.push({
      type: "consonant",
      sign,
      top: 0,
      right: index * RIGHT_GAP,
    });
  });

  const middleRightGap = isBottomVowel
    ? ((first.signs.length - 1) / 2) * RIGHT_GAP
    : first.signs.length * RIGHT_GAP;
  middle.signs.forEach((sign, index) => {
    if (isBottomVowel) {
      positions.push({
        type: "vowel",
        sign,
        top: LINE_GAP,
        right: index * RIGHT_GAP + middleRightGap,
      });
    } else {
      positions.push({
        type: "vowel",
        sign,
        top: 0,
        right: index * RIGHT_GAP + middleRightGap,
      });
    }
  });

  const bottomRightGap = isBottomVowel
    ? middleRightGap
    : ((first.signs.length + middle.signs.length - 1) / 2) * RIGHT_GAP;
  last.signs.forEach((sign, index) => {
    if (isBottomVowel) {
      positions.push({
        type: "consonant",
        sign,
        top: LINE_GAP * 2,
        right: index * RIGHT_GAP + bottomRightGap,
      });
    } else {
      positions.push({
        type: "consonant",
        sign,
        top: LINE_GAP,
        right: index * RIGHT_GAP + bottomRightGap,
      });
    }
  });

  return { positions, width: getFingerspellWidth(fingerspell) };
}

/** 전체 단어의 지문자 정보(초성/중성/종성의 위치, 전체 너비)를 매핑 */
export function getFingerspells(word: string) {
  const letters = word.split("");
  const fingerspells = letters.map(getFingerspellInfo);
  return fingerspells.reduce((result, letter) => {
    return result.concat(letter.map(getFingerspellPosition));
  }, [] as { positions: FingerspellPosition[]; width: number }[]);
}
