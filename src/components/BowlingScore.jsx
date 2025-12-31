import { useState } from "react";
import { Trophy, Keyboard } from "lucide-react";
import { calculateScore } from "../utils/calculateScore";

export default function BowlingScore() {
  const [input, setInput] = useState("");

  let score = 0;
  try {
    score = input ? calculateScore(input) : 0;
  } catch {
    score = 0;
  }

  function isGameComplete(input) {
    let frame = 0;
    let i = 0;

    while (i < input.length && frame < 9) {
      if (input[i] === "X") {
        frame++;
        i += 1;
      } else {
        if (i + 1 >= input.length) return false;
        frame++;
        i += 2;
      }
    }

    if (frame < 9) return false;

    const rollsIn10th = input.slice(i);

    if (rollsIn10th.length === 0) return false;
    if (rollsIn10th[0] === "X") return rollsIn10th.length >= 3;
    if (rollsIn10th.length >= 2 && rollsIn10th[1] === "/")
      return rollsIn10th.length >= 3;

    return rollsIn10th.length >= 2;
  }

  return (
    <div className="container">
      <h1>
        <Trophy size={28} />
        Bowling Score Calculator
      </h1>

      <label htmlFor="game">
        <Keyboard size={16} />
        Enter Game Rolls
      </label>

      <input
        id="game"
        type="text"
        value={input}
        onChange={(e) => {
          const value = e.target.value.toUpperCase();
          if (value.length > 21) return;
          if (!isGameComplete(input) || value.length < input.length) {
            setInput(value);
          }
        }}
        placeholder="X7/9-XXXXXXXX"
      />

      <div className="test-cases">
        <button onClick={() => setInput("9-9-9-9-9-9-9-9-9-9-")}>
          All Open Frames (90)
        </button>

        <button onClick={() => setInput("XXXXXXXXXXXX")}>
          Perfect Game (300)
        </button>

        <button onClick={() => setInput("5/5/5/5/5/5/5/5/5/5/5")}>
          All Spares (150)
        </button>
      </div>

      <div className="score-card">
        <div className="score-header">
          <h2>Total Score</h2>
          {isGameComplete(input) ? (
            <span className="score-subtext">Game complete</span>
          ) : (
            <span className="score-subtext">Live calculation</span>
          )}
        </div>

        <div className="score-value">{score}</div>
      </div>
    </div>
  );
}
