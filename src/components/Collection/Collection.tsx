import { prefectures } from "../../data/prefectures";
import { loadSaveData } from "../../utils/storage";

interface Props {
  onBack: () => void;
}

export function Collection({ onBack }: Props) {
  const saveData = loadSaveData();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>コレクション（クリア状況）</h1>

      {/* 47都道府県のカードを並べるためのグリッドデザイン */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {prefectures.map((pref) => {
          const record = saveData[pref.id];

          return (
            <div
              key={pref.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: record ? "#fffceb" : "#f9f9f9", // クリア済なら色を変える
              }}
            >
              <h2>{pref.name}</h2>
              {record ? (
                <div>
                  <h3 style={{ color: "#d4af37", margin: "10px 0" }}>
                    Rank {record.bestRank}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    速度: {record.bestSpeed}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    正確率: {record.bestAccuracy}%
                  </p>
                </div>
              ) : (
                <p style={{ color: "gray", margin: "10px 0" }}>未クリア</p>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={onBack}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        トップ画面に戻る
      </button>
    </div>
  );
}
