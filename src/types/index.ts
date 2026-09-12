// 新しくランクの条件を表す型を追加
export interface RankRequirement {
  speed: number; // 必要速度（文字/分）
  accuracy: number; // 必要正確率（%）
}

export interface Prefecture {
  id: string;
  name: string;
  majorLevel: number; // 大きな難易度Lv (1〜10)
  internalLevel: number; // 内部Lv (1〜5)
  requirements: {
    // 各ランクを獲得するための条件
    rank1: RankRequirement;
    rank2: RankRequirement;
    rank3: RankRequirement;
  };
}

export interface Question {
  id: string;
  prefectureId: string;
  text: string;
  kana: string;
}
