export interface Fingerspell {
  first: FingerspellInfo;
  middle: FingerspellInfo;
  last: FingerspellInfo;
}
export interface FingerspellInfo {
  signs: string[];
  position?: "right" | "bottom";
}
export type FingerspellType = "consonant" | "vowel";
export interface FingerspellPosition {
  type: FingerspellType;
  sign: string;
  top: number;
  right: number;
}

export type PlayingState = "playing" | "idle";
