import { useEffect, useState, useRef } from "react";
import type { MouseEvent } from "react";
import { prefectures } from "../../data/prefectures";
import { loadSaveData } from "../../utils/storage";
import "./SelectPrefecture.css"; // ★先ほど作ったCSSを読み込む

interface Props {
  onSelect: (prefectureId: string) => void;
  onBack: () => void;           // ★追加
  onGoCollection: () => void;   // ★追加
}

export function SelectPrefecture({ onSelect, onBack, onGoCollection }: Props) {
  // SVGの中身（文字列）を保存するステート
  const [svgContent, setSvgContent] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const saveData = loadSaveData();

  // ① 画面表示時に public/map-polygon.svg を読み込む
  useEffect(() => {
    fetch("/map-polygon.svg")
      .then((res) => res.text())
      .then((text) => setSvgContent(text));
  }, []);

  // ② SVGが読み込まれた後、クリア状況に応じて色（クラス）を付ける
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    prefectures.forEach((pref) => {
      const record = saveData[pref.id];
      if (record) {
        // SVG内から該当する県（例: .tottori）を探す
        const gElement = containerRef.current!.querySelector(`.${pref.id}`);
        if (gElement) {
          if (record.bestRank === 1) gElement.classList.add("rank-1");
          if (record.bestRank === 2) gElement.classList.add("rank-2");
          if (record.bestRank === 3) gElement.classList.add("rank-3");
        }
      }
    });
  }, [svgContent, saveData]);

  // ③ クリック時の処理（どの県をクリックしたか判定する）
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    // クリックした要素の親にある '.prefecture' を探す
    const gElement = target.closest(".prefecture");

    if (gElement) {
      const classNames = gElement.getAttribute("class") || "";
      // クラス名（例: "tottori chugoku prefecture"）の先頭が県名IDになっている
      const prefId = classNames.split(" ")[0];

      const exists = prefectures.some((p) => p.id === prefId);
      if (exists) {
        onSelect(prefId);
      } else {
        alert("この県はまだ工事中です！（問題データがありません）");
      }
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "30px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>遊ぶ都道府県を選択</h1>

      {/* ★追加：ナビゲーションボタン */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <button onClick={onBack} style={{ padding: '10px 20px', cursor: 'pointer' }}>トップに戻る</button>
        <button onClick={onGoCollection} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>コレクションを見る</button>
      </div>

      <div
        className="map-container"
        ref={containerRef}
        onClick={handleClick}
        dangerouslySetInnerHTML={{
          __html: svgContent,
        }} /* SVG文字列をHTMLとして展開 */
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      />
    </div>
  );
}
