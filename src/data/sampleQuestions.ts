import type { Question } from "../types/types";

export const questions: Question[] = [
  // --- 鳥取県の問題 ---
  { id: "t-1", prefectureId: "tottori", text: "大山", kana: "だいせん" },
  {
    id: "t-2",
    prefectureId: "tottori",
    text: "鳥取砂丘",
    kana: "とっとりさきゅう",
  },
  { id: "t-3", prefectureId: "tottori", text: "温泉", kana: "おんせん" },

  // --- 愛知県の問題 ---
  { id: "a-1", prefectureId: "aichi", text: "名古屋城", kana: "なごやじょう" },
  { id: "a-2", prefectureId: "aichi", text: "しゃちほこ", kana: "しゃちほこ" },
  {
    id: "a-3",
    prefectureId: "aichi",
    text: "味噌煮込みうどん",
    kana: "みそにこみうどん",
  },
];
