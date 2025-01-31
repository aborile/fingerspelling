import { OpendictSense } from "./opendict-search";

export interface Word {
  word: string;
  sense: OpendictSense[];
}
