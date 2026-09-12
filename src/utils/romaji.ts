export const romajiMap: Record<string, string[]> = {
  あ: ["a"],
  い: ["i"],
  う: ["u"],
  え: ["e"],
  お: ["o"],
  か: ["ka"],
  き: ["ki"],
  く: ["ku", "cu"],
  け: ["ke"],
  こ: ["ko", "co"],
  さ: ["sa"],
  し: ["shi", "si"],
  す: ["su"],
  せ: ["se"],
  そ: ["so"],
  た: ["ta"],
  ち: ["chi", "ti"],
  つ: ["tsu", "tu"],
  て: ["te"],
  と: ["to"],
  な: ["na"],
  に: ["ni"],
  ぬ: ["nu"],
  ね: ["ne"],
  の: ["no"],
  は: ["ha"],
  ひ: ["hi"],
  ふ: ["fu", "hu"],
  へ: ["he"],
  ほ: ["ho"],
  ま: ["ma"],
  み: ["mi"],
  む: ["mu"],
  め: ["me"],
  も: ["mo"],
  や: ["ya"],
  ゆ: ["yu"],
  よ: ["yo"],
  ら: ["ra"],
  り: ["ri"],
  る: ["ru"],
  れ: ["re"],
  ろ: ["ro"],
  わ: ["wa"],
  を: ["wo"],
  ん: ["nn", "xn"],

  が: ["ga"],
  ぎ: ["gi"],
  ぐ: ["gu"],
  げ: ["ge"],
  ご: ["go"],
  ざ: ["za"],
  じ: ["ji", "zi"],
  ず: ["zu"],
  ぜ: ["ze"],
  ぞ: ["zo"],
  だ: ["da"],
  ぢ: ["di"],
  づ: ["du"],
  で: ["de"],
  ど: ["do"],
  ば: ["ba"],
  び: ["bi"],
  ぶ: ["bu"],
  べ: ["be"],
  ぼ: ["bo"],
  ぱ: ["pa"],
  ぴ: ["pi"],
  ぷ: ["pu"],
  ぺ: ["pe"],
  ぽ: ["po"],
  // 拗音（2文字セット）
  きゃ: ["kya"],
  きゅ: ["kyu"],
  きょ: ["kyo"],
  しゃ: ["sha", "sya"],
  しゅ: ["shu", "syu"],
  しょ: ["sho", "syo"],
  ちゃ: ["cha", "tya", "cya"],
  ちゅ: ["chu", "tyu", "cyu"],
  ちょ: ["cho", "tyo", "cyo"],
  にゃ: ["nya"],
  にゅ: ["nyu"],
  にょ: ["nyo"],
  ひゃ: ["hya"],
  ひゅ: ["hyu"],
  ひょ: ["hyo"],
  みゃ: ["mya"],
  みゅ: ["myu"],
  みょ: ["myo"],
  りゃ: ["rya"],
  りゅ: ["ryu"],
  りょ: ["ryo"],
  ぎゃ: ["gya"],
  ぎゅ: ["gyu"],
  ぎょ: ["gyo"],
  じゃ: ["ja", "jya", "zya"],
  じゅ: ["ju", "jyu", "zyu"],
  じょ: ["jo", "jyo", "zyo"],
  びゃ: ["bya"],
  びゅ: ["byu"],
  びょ: ["byo"],
  ぴゃ: ["pya"],
  ぴゅ: ["pyu"],
  ぴょ: ["pyo"],
  ぁ: ["la", "xa"],
  ぃ: ["li", "xi"],
  ぅ: ["lu", "xu"],
  ぇ: ["le", "xe"],
  ぉ: ["lo", "xo"],
  ゃ: ["lya", "xya"],
  ゅ: ["lyu", "xyu"],
  ょ: ["lyo", "xyo"],
  ー: ["-"],
};

export interface KanaNode {
  kana: string;
  patterns: string[];
}

//
export function parseKana(kanaString: string): KanaNode[] {
  const nodes: KanaNode[] = [];
  for (let i = 0; i < kanaString.length; i++) {
    //2文字セットの処理
    const twoChars = kanaString.substring(i, i + 2); //開始位置から終了位置の一個手前までの文字を取り出す
    if (romajiMap[twoChars]) {
      nodes.push({
        kana: twoChars,
        patterns: [...romajiMap[twoChars]],
      });
      i++;
      continue;
    }

    //っの処理
    const char = kanaString[i];
    if (char == "っ") {
      const nextChar = kanaString[i + 1];
      const nextTwoChars = kanaString.substring(i + 1, i + 3);

      let nextPatterns: string[] = [];
      if (nextTwoChars && romajiMap[nextTwoChars]) {
        nextPatterns = romajiMap[nextTwoChars];
      } else if (nextChar && romajiMap[nextChar]) {
        nextPatterns = romajiMap[nextChar];
      }

      const doubleConsonants = nextPatterns
        .map((p) => p[0])
        .filter((c) => !["a", "i", "u", "e", "o"].includes(c));

      const patterns = Array.from(
        new Set([...doubleConsonants, "xtu", "ltu", "ltsu"]),
      );
      nodes.push({ kana: "っ", patterns });
      continue;
    }

    if (romajiMap[char]) {
      nodes.push({ kana: char, patterns: [...romajiMap[char]] });
    } else {
      nodes.push({ kana: char, patterns: [char] }); //記号など
    }
  }

  return nodes;
}
