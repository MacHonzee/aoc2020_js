const lines = require("./input");
const Utils = require("../utils/utils");

function extractFromBrackets(line, bracketsStart) {
  let bracketsCount = 0;
  let i = bracketsStart;
  do {
    let char = line[i];
    if (char === "(") bracketsCount++;
    if (char === ")") bracketsCount--;
    i++;
  } while (bracketsCount !== 0);
  return line.substring(bracketsStart + 1, i - 1);
}

const MathMethods = {
  add(a, b) {
    return a + b;
  },

  multiply(a, b) {
    return a * b;
  }
};


function evaluateLine(line) {
  // setup the start of the expression by evaluating the first part
  let result;
  let pointer;
  let firstChar = line[0];
  if (firstChar === "(") {
    let bracketsContent = extractFromBrackets(line, 0);
    result = evaluateLine(bracketsContent);
    pointer = bracketsContent.length + 3; // left and right bracket + one more position to go to next operation
  } else {
    // otherwise it is a number
    result = parseInt(firstChar);
    pointer = 2;
  }

  while (pointer < line.length) {
    let operation = line[pointer];

    if (operation !== "+" && operation !== "*") {
      throw "This should never happen: " + pointer;
    }

    let mathMethod = operation === "+" ? "add" : "multiply";
    let secondOperand = line[pointer + 2];
    if (secondOperand === "(") {
      let bracketsContent = extractFromBrackets(line, pointer + 2);
      result = MathMethods[mathMethod](result, evaluateLine(bracketsContent));
      pointer += (bracketsContent.length + 5); // initial space, then two brackets, then space and then to operation
    } else {
      result = MathMethods[mathMethod](result, parseInt(secondOperand));
      pointer += 4;
    }
  }

  return result;
}

function solvePartOne() {
  // too low
  console.log(Utils.arraySum(lines, evaluateLine));
}
solvePartOne();
