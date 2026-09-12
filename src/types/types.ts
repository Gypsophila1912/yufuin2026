export interface Prefecture {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  prefectureId: string; // ★追加：どの都道府県の問題かを紐づけるID
  text: string;
  kana: string;
}
