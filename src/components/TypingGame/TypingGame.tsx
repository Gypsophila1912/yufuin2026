import { useTypingGame } from "./useTypingGame";

interface Props {
  prefectureId: string;
  onBack: () => void;
}

export function TypingGame({ prefectureId, onBack }: Props) {
  // カスタムフックを呼び出して、必要なデータを受け取るだけ！
  const {
    targetPrefecture,
    currentQuestion,
    currentIndex,
    totalQuestions,
    displayTyped,
    displayRemaining,
    isStarted,
    isFinished,
    result,
  } = useTypingGame(prefectureId);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "sans-serif",
      }}
    >
      {/* ★追加：画面の左上に地図に戻るボタンを常に表示する */}
      <div style={{ textAlign: "left", marginLeft: "10%", marginBottom: "20px" }}>
        <button onClick={onBack} style={{ padding: "8px 16px", cursor: "pointer", backgroundColor: "#f8f9fa", border: "1px solid #ddd", borderRadius: "4px" }}>
          ← 地図に戻る
        </button>
      </div>

      <h1>{targetPrefecture?.name} のタイピング</h1>

      {!isStarted ? (
        <div
          style={{
            padding: "40px",
            border: "3px dashed #ccc",
            display: "inline-block",
            minWidth: "400px",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", color: "#555" }}>
            スペースキーを押してスタート！
          </h2>
        </div>
      ) : !isFinished ? (
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            display: "inline-block",
            minWidth: "400px",
            borderRadius: "10px",
          }}
        >
          <p>
            問題 {currentIndex + 1} / {totalQuestions}
          </p>
          <h2 style={{ fontSize: "2rem" }}>{currentQuestion.text}</h2>
          <div
            style={{
              fontSize: "1.5rem",
              letterSpacing: "2px",
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: "gray" }}>{displayTyped}</span>
            <span style={{ textDecoration: "underline" }}>
              {displayRemaining}
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: "20px",
            border: "2px solid green",
            display: "inline-block",
          }}
        >
          <h2>クリア！</h2>
          <p style={{ fontSize: "1.2rem" }}>
            タイピング速度: <strong>{result.speed} 文字/分</strong>
          </p>
          <p style={{ fontSize: "1.2rem" }}>
            正確率: <strong>{result.accuracy} %</strong>
          </p>
          <div
            style={{
              margin: "20px 0",
              padding: "15px",
              backgroundColor: "#f0f8ff",
              borderRadius: "8px",
            }}
          >
            {result.achievedRank > 0 ? (
              <h3 style={{ color: "#0056b3", margin: 0 }}>
                🎉 ランク {result.achievedRank} 獲得！
              </h3>
            ) : (
              <h3 style={{ color: "#856404", margin: 0 }}>
                💦 ランク獲得ならず…（速度か正確率が足りません）
              </h3>
            )}
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              ※最低クリア条件(Rank3): 速度
              {targetPrefecture?.requirements.rank3.speed}以上 かつ 正確率
              {targetPrefecture?.requirements.rank3.accuracy}%以上
            </p>
          </div>
          <button
            onClick={onBack}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            地図に戻る
          </button>
        </div>
      )}
    </div>
  );
}
