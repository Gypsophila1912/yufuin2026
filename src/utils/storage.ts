export interface SaveData {
  [prefectureId: string]: {
    bestRank: number; // 1(最高) 〜 3(最低クリア)
    bestSpeed: number;
    bestAccuracy: number;
  };
}

// ローカルストレージに保存する時の「鍵」の名前
const STORAGE_KEY = "typing_game_save_data";

// データの読み込み
export function loadSaveData(): SaveData {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

// 記録の保存（自己ベストを更新した時だけ保存する）
export function saveResult(
  prefectureId: string,
  rank: number,
  speed: number,
  accuracy: number,
) {
  if (rank === 0) return; // ランク外（失敗）は保存しない

  const currentData = loadSaveData();
  const prevRecord = currentData[prefectureId];

  let shouldUpdate = false;
  if (!prevRecord) {
    shouldUpdate = true; // 初クリア
  } else if (rank < prevRecord.bestRank) {
    shouldUpdate = true; // ランクが更新された（例：Rank3 -> Rank1）
  } else if (rank === prevRecord.bestRank && speed > prevRecord.bestSpeed) {
    shouldUpdate = true; // ランクは同じだが、速度が自己ベスト
  }

  // 自己ベストなら保存
  if (shouldUpdate) {
    currentData[prefectureId] = {
      bestRank: rank,
      bestSpeed: speed,
      bestAccuracy: accuracy,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
  }
}
