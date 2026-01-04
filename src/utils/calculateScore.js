export function calculateScore(game) {
  const rolls = []; // Flattened list of roll values

  // Convert input characters into numeric roll values
  for (let i = 0; i < game.length; i++) {
    const char = game[i];

    if (char === "X") {
      rolls.push(10); // Strike
    } else if (char === "/") {
      if (rolls.length === 0) return 0;
      rolls.push(10 - rolls[rolls.length - 1]); // Spare
    } else if (char === "-") {
      rolls.push(0); // Miss
    } else if (!isNaN(char)) {
      rolls.push(Number(char)); // Numeric roll
    }
  }

  let score = 0;
  let rollIndex = 0; // Tracks current roll position

  for (let frame = 0; frame < 10; frame++) {
    // Incomplete rolls — stop
    if (rollIndex >= rolls.length) break;

    // Strike
    if (rolls[rollIndex] === 10) {
      // Need next two rolls for bonus
      if (
        rolls[rollIndex + 1] === undefined ||
        rolls[rollIndex + 2] === undefined
      ) {
        break;
      }
      score += 10 + rolls[rollIndex + 1] + rolls[rollIndex + 2];
      rollIndex += 1; // Strike consumes one roll
    }

    // Spare
    else if (
      rolls[rollIndex + 1] !== undefined &&
      rolls[rollIndex] + rolls[rollIndex + 1] === 10
    ) {
      // Need next roll for bonus
      if (rolls[rollIndex + 2] === undefined) break;
      score += 10 + rolls[rollIndex + 2];
      rollIndex += 2; // Spare consumes two rolls
    }

    // Open frame
    else {
      if (rolls[rollIndex + 1] === undefined) break;
      score += rolls[rollIndex] + rolls[rollIndex + 1];
      rollIndex += 2; // Open frame consumes two rolls
    }
  }

  return score; // Total score so far
}
