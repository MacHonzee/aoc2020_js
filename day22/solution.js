const [player1, player2] = require("./input");

function solvePartOne() {
  let deck1 = [...player1];
  let deck2 = [...player2];

  while (deck1.length && deck2.length) {
    let winner = deck1[0] > deck2[0] ? deck1 : deck2;
    let nonWinner = winner === deck1 ? deck2: deck1;
    winner.push(winner.shift());
    winner.push(nonWinner.shift());
  }

  let winner = deck1.length ? deck1 : deck2;
  let resultPartOne = winner.reduce((sum, num, i) => sum + (num * (winner.length - i)), 0);
  console.log("-> resultPartOne", resultPartOne);
}

solvePartOne();
