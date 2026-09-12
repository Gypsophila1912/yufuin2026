import { useState, useEffect, useCallback, useMemo } from "react";
import { questions } from "../../data/sampleQuestions";
import { parseKana } from "../../utils/romaji";
import { prefectures } from "../../data/prefectures";
import { saveResult } from "../../utils/storage";

export function useTypingGame(prefectureId: string) {
  const targetPrefecture = useMemo(() => {
    return prefectures.find((p) => p.id === prefectureId);
  }, [prefectureId]);

  const targetQuestions = useMemo(() => {
    return questions.filter((q) => q.prefectureId === prefectureId);
  }, [prefectureId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = targetQuestions[currentIndex];

  const nodes = useMemo(() => {
    return currentQuestion ? parseKana(currentQuestion.kana) : [];
  }, [currentQuestion]); //currentQuestion が変わらないなら再計算しない

  const [nodeIndex, setNodeIndex] = useState(0);
  const [typedInNode, setTypedInNode] = useState("");
  const [completedInputs, setCompletedInputs] = useState<string[]>([]);

  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null); // 修正②: クリア時刻を保存するStateを追加
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalMiss, setTotalMiss] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isFinished || nodes.length === 0) return;
      if (!isStarted) {
        if (e.code === "Space") {
          e.preventDefault(); // スペースキーで画面がスクロールするのを防ぐ
          setIsStarted(true);
          setStartTime(Date.now()); // スペースを押した瞬間をスタート時刻にする！
        }
        return; // 始まっていない時はこれ以降の判定をしない
      }

      if (e.key.length !== 1) return;

      const inputChar = e.key.toLowerCase();
      const targetNode = nodes[nodeIndex];
      const attempt = typedInNode + inputChar;

      const validPatterns = targetNode.patterns.filter((p) =>
        p.startsWith(attempt),
      );

      if (validPatterns.length > 0) {
        setTotalCorrect((prev) => prev + 1);
        setTypedInNode(attempt);

        if (validPatterns.includes(attempt)) {
          setCompletedInputs((prev) => [...prev, attempt]);

          if (nodeIndex + 1 < nodes.length) {
            // 次の文字へ
            setNodeIndex((prev) => prev + 1);
            setTypedInNode("");
          } else {
            // 次の問題へ
            if (currentIndex + 1 < targetQuestions.length) {
              setCurrentIndex((prev) => prev + 1);
              // 修正①: useEffectではなく、ここで直接次の問題用のステートリセットを行う
              setNodeIndex(0);
              setTypedInNode("");
              setCompletedInputs([]);
            } else {
              // ゲームクリア
              setIsFinished(true);
              setEndTime(Date.now()); // 修正②: クリアした瞬間の時刻を保存
            }
          }
        }
      } else {
        setTotalMiss((prev) => prev + 1);
      }
    },
    [currentIndex, isFinished, startTime, nodes, nodeIndex, typedInNode],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  let displayTyped = "";
  let displayRemaining = "";

  if (nodes.length > 0) {
    displayTyped = completedInputs.join("") + typedInNode;
    if (nodeIndex < nodes.length) {
      const targetNode = nodes[nodeIndex];
      const expectedPattern =
        targetNode.patterns.find((p) => p.startsWith(typedInNode)) ||
        targetNode.patterns[0];
      const remainingInNode = expectedPattern.slice(typedInNode.length);
      const futureStr = nodes
        .slice(nodeIndex + 1)
        .map((n) => n.patterns[0])
        .join("");
      displayRemaining = remainingInNode + futureStr;
    }
  }

  const timeElapsedMin =
    startTime && endTime ? (endTime - startTime) / 1000 / 60 : 0;
  const speed =
    timeElapsedMin > 0 ? Math.floor(totalCorrect / timeElapsedMin) : 0;

  const totalKeystrokes = totalCorrect + totalMiss;
  const accuracyNum =
    totalKeystrokes > 0 ? (totalCorrect / totalKeystrokes) * 100 : 0;
  const accuracy = accuracyNum.toFixed(1);

  let achievedRank = 0; // 0 はランク外（失敗）
  if (targetPrefecture) {
    const reqs = targetPrefecture.requirements;

    // ★一番難しい Rank 1 から順番に判定していく
    if (speed >= reqs.rank1.speed && accuracyNum >= reqs.rank1.accuracy) {
      achievedRank = 1; // 最高ランク！
    } else if (
      speed >= reqs.rank2.speed &&
      accuracyNum >= reqs.rank2.accuracy
    ) {
      achievedRank = 2;
    } else if (
      speed >= reqs.rank3.speed &&
      accuracyNum >= reqs.rank3.accuracy
    ) {
      achievedRank = 3; // 最低クリアライン
    }
  }

  useEffect(() => {
    if (isFinished && achievedRank > 0 && targetPrefecture) {
      saveResult(targetPrefecture.id, achievedRank, speed, accuracyNum);
    }
  }, [isFinished, achievedRank, speed, accuracyNum, targetPrefecture]);

  return {
    targetPrefecture, // ★画面表示用に都道府県データも返す
    currentQuestion,
    currentIndex,
    totalQuestions: targetQuestions.length,
    displayTyped,
    displayRemaining,
    isStarted,
    isFinished,
    result: { speed, accuracy, achievedRank },
  };
}
