const numbers = require("./input");
const Utils = require("../utils/utils");

const PREAMBLE_LENGTH = 25;

function solvePartOne(numbers) {
  for (let currNumI = PREAMBLE_LENGTH; currNumI < numbers.length; currNumI++) {
    let num = numbers[currNumI];
    let found = false;
    for (let i = currNumI - PREAMBLE_LENGTH; i < currNumI + PREAMBLE_LENGTH; i++) {
      for (let y = i + 1; y < currNumI + PREAMBLE_LENGTH; y++) {
        if ((numbers[i] + numbers[y]) === num) {
          found = true;
          break;
        }
      }

      if (found) {
        break;
      }
    }

    if (!found) return num;
  }
}

let invalidNumber = solvePartOne(numbers);
console.log("partOne", invalidNumber);

function solvePartTwo(invalidNum, numbers) {
  let numI = numbers.indexOf(invalidNum);
  for (let i = 0; i < numI; i++) {
    for (let y = i + 1; y < numI; y++) {
      let allNums = numbers.slice(i, y);
      let sum = Utils.arraySum(allNums);
      if (sum === invalidNum) return allNums;
    }
  }
}

let resultTwo = solvePartTwo(invalidNumber, numbers);
console.log("partTwo", Math.min(...resultTwo) + Math.max(...resultTwo));
