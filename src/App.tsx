import { useState } from "react";
import { SelectPrefecture } from "./components/SelectPrefecture/SelectPrefecture";
import { TypingGame } from "./components/TypingGame/TypingGame";
import { Collection } from "./components/Collection/Collection"; // ★追加
import "./App.css";

type Screen = "TOP" | "SELECT" | "PLAYING" | "COLLECTION";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("TOP");
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(
    null,
  );

  const handleSelect = (id: string) => {
    setSelectedPrefecture(id);
    setCurrentScreen("PLAYING");
  };

  const handleBackToTop = () => {
    setSelectedPrefecture(null);
    setCurrentScreen("TOP");
  };

  const handleBackToSelect = () => {
    setSelectedPrefecture(null);
    setCurrentScreen("SELECT");
  };

  return (
    <div>
      {/* トップ画面 */}
      {currentScreen === "TOP" && (
        <div
          style={{
            textAlign: "center",
            marginTop: "100px",
            fontFamily: "sans-serif",
          }}
        >
          <h1>47都道府県タイピング</h1>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <button
              onClick={() => setCurrentScreen("SELECT")}
              style={{
                padding: "15px 30px",
                fontSize: "1.2rem",
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              ゲームスタート
            </button>
          </div>
        </div>
      )}

      {/* 選択画面 */}
      {currentScreen === "SELECT" && (
        <SelectPrefecture
          onSelect={handleSelect}
          onBack={handleBackToTop}
          onGoCollection={() => setCurrentScreen("COLLECTION")}
        />
      )}

      {/* タイピング画面 */}
      {currentScreen === "PLAYING" && selectedPrefecture && (
        <TypingGame
          prefectureId={selectedPrefecture}
          onBack={handleBackToSelect}
        />
      )}

      {/* コレクション画面 */}
      {currentScreen === "COLLECTION" && (
        <Collection onBack={handleBackToTop} />
      )}
    </div>
  );
}

export default App;
