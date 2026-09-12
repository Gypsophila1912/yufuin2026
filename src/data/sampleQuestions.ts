import type { Question } from "../types";

export const sampleQuestions: Question[] = [
  { id: "t-1", text: "大山", kana: "だいせん" },
  { id: "t-2", text: "鳥取砂丘", kana: "とっとりさきゅう" }, // っ や きゅ が入るテスト用
  { id: "t-3", text: "温泉", kana: "おんせん" },
  { id: "t-4", text: "梨", kana: "なし" },
  { id: "t-5", text: "松葉ガニ", kana: "まつばがに" }, // が などの濁音
];
