import { useState } from "react";
import { Trophy, Keyboard } from "lucide-react";
import { calculateScore } from "../utils/calculateScore";

export default function BowlingScore() {
  const [input, setInput] = useState(""); // Controlled input value

  let score = 0;
  try {
    score = input ? calculateScore(input) : 0; // Compute live score
  } catch {
    score = 0; // Fallback for incomplete input
  }

  // Checks whether a full 10-frame game has been completed
  function isGameComplete(input) {
    let frame = 0;
    let i = 0;

    // Frames 1–9
    while (i < input.length && frame < 9) {
      if (input[i] === "X") {
        frame++;
        i += 1; // Strike consumes one roll
      } else {
        if (i + 1 >= input.length) return false;
        frame++;
        i += 2; // Normal frame consumes two rolls
      }
    }

    if (frame < 9) return false;

    const rollsIn10th = input.slice(i); // Remaining rolls in 10th frame

    if (rollsIn10th.length === 0) return false;
    if (rollsIn10th[0] === "X") return rollsIn10th.length >= 3; // Strike bonus
    if (rollsIn10th.length >= 2 && rollsIn10th[1] === "/")
      return rollsIn10th.length >= 3; // Spare bonus

    return rollsIn10th.length >= 2; // Open frame
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

          if (value.length > 21) return; // Max possible rolls
          if (!isGameComplete(input) || value.length < input.length) {
            setInput(value);
          }
        }}
        placeholder="X7/9-XXXXXXXX"
      />

      {/* Predefined test cases for quick verification */}
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
