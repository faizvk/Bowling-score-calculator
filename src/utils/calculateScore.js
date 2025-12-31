export function calculateScore(game) {
  const rolls = [];

  for (let i = 0; i < game.length; i++) {
    const char = game[i];

    if (char === "X") {
      rolls.push(10);
    } else if (char === "/") {
      if (rolls.length === 0) return 0;
      rolls.push(10 - rolls[rolls.length - 1]);
    } else if (char === "-") {
      rolls.push(0);
    } else if (!isNaN(char)) {
      rolls.push(Number(char));
    }
  }

  let score = 0;
  let rollIndex = 0;

  for (let frame = 0; frame < 10; frame++) {
    // Incomplete rolls — stop
    if (rollIndex >= rolls.length) break;

    // Strike
    if (rolls[rollIndex] === 10) {
      if (
        rolls[rollIndex + 1] === undefined ||
        rolls[rollIndex + 2] === undefined
      ) {
        break;
      }
      score += 10 + rolls[rollIndex + 1] + rolls[rollIndex + 2];
      rollIndex += 1;
    }
    // Spare
    else if (
      rolls[rollIndex + 1] !== undefined &&
      rolls[rollIndex] + rolls[rollIndex + 1] === 10
    ) {
      if (rolls[rollIndex + 2] === undefined) break;
      score += 10 + rolls[rollIndex + 2];
      rollIndex += 2;
    }
    // Open frame
    else {
      if (rolls[rollIndex + 1] === undefined) break;
      score += rolls[rollIndex] + rolls[rollIndex + 1];
      rollIndex += 2;
    }
  }

  return score;
}
