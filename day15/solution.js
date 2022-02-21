const startNums = require("./input");

// part one
function solvePartOne(limit) {
  // Map is so much better then {}, because we are working with numbers and there is no coercion this way when using Map
  let turnsMemory = new Map();

  // we assume that input numbers is a unique set, so we save it to turnsMemory directly
  startNums.forEach((num, i) => {
    turnsMemory.set(num, [i + 1]);
  });

  // consider lastNum
  let lastNum = startNums[startNums.length - 1];
  for (let i = startNums.length + 1; i <= limit; i++) {
    // calculate what should be the number to add to memory
    let turns = turnsMemory.get(lastNum);
    if (!turns || turns.length === 1) {
      lastNum = 0;
    } else {
      lastNum = turns[1] - turns[0];
    }

    // and add the num to memory
    let lastNumTurns = turnsMemory.get(lastNum);
    if (lastNumTurns) {
      if (lastNumTurns.length === 1) {
        lastNumTurns.push(i);
      } else {
        lastNumTurns[0] = lastNumTurns[1];
        lastNumTurns[1] = i;
      }
    } else {
      lastNumTurns = [i];
    }
    turnsMemory.set(lastNum, lastNumTurns);
  }

  console.log(lastNum);
}

solvePartOne(2020);

console.time("part one");
solvePartOne(30000000);
console.timeEnd("part one");
