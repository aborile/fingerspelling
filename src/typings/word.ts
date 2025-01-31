import { OpendictSense } from "./opendict";

export interface Word {
  word: string;
  sense: OpendictSense[];
}
