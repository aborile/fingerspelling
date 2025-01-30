export interface Fingerspell {
  first: FingerspellInfo;
  middle: FingerspellInfo;
  last: FingerspellInfo;
}
export interface FingerspellInfo {
  signs: string[];
  position?: "right" | "bottom";
}
export interface FingerspellPosition {
  type: "consonant" | "vowel";
  sign: string;
  top: number;
  right: number;
}

export type PlayingState = "playing" | "idle";
