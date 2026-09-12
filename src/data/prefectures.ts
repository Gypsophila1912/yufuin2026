import type { Prefecture } from "../types";

export const prefectures: Prefecture[] = [
  {
    id: "tottori",
    name: "鳥取県",
    majorLevel: 1,
    internalLevel: 1,
    requirements: {
      rank1: { speed: 150, accuracy: 95 }, // ★Rank1を最高難易度にする
      rank2: { speed: 120, accuracy: 90 },
      rank3: { speed: 80, accuracy: 85 }, // ★Rank3を最低クリアラインにする
    },
  },
  {
    id: "aichi",
    name: "愛知県",
    majorLevel: 10,
    internalLevel: 1,
    requirements: {
      rank1: { speed: 230, accuracy: 98 }, // ★ここも入れ替え
      rank2: { speed: 180, accuracy: 95 },
      rank3: { speed: 130, accuracy: 90 },
    },
  },
];
