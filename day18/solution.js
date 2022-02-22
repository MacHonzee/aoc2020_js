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
  console.log(Utils.arraySum(lines, evaluateLine));
}
solvePartOne();

// lets try different approach, by moving through the precedences
// 1) solve brackets
// 2) solve addition
// 3) solve multiplication
function evaluateLineTwo(line) {
  // 1) solve all brackets, there should be no brackets after this while cycle
  let bracketsStart = line.indexOf("(");
  while (bracketsStart > -1) {
    let content = extractFromBrackets(line, bracketsStart);
    let partialResult = evaluateLineTwo(content);
    line = line.substring(0, bracketsStart) + partialResult + line.substring(bracketsStart + content.length + 2);
    bracketsStart = line.indexOf("(");
  }

  // 2) solve all additions by matching groups of numbers separated by " * "
  let additionGroups = line.split(" * ");
  let additionResults = additionGroups.map(group => Utils.arraySum(group.split(" + ").map(Number)));

  // 3) now we should have all numbers added, so we multiply them together
  return Utils.arrayProduct(additionResults);
}

function solvePartTwo() {
  console.log(Utils.arraySum(lines, evaluateLineTwo));
}
solvePartTwo();
