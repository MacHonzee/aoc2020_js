const operations = require("./input");

let visitedIndexes = new Set();
let globalAccumulator = 0;

function executeTask(taskIndex, operations) {
  if (taskIndex >= operations.length) return; // program is terminated, last instruction reached

  if (visitedIndexes.has(taskIndex)) {
    throw { code: "indexAlreadyExecuted" };
  }

  visitedIndexes.add(taskIndex);
  let [operation, value] = operations[taskIndex];
  if (operation === "nop") {
    executeTask(taskIndex + 1, operations);
  } else if (operation === "acc") {
    globalAccumulator += value;
    executeTask(taskIndex + 1, operations);
  } else if (operation === "jmp") {
    executeTask(taskIndex + value, operations);
  } else {
    throw { code: "invalidOperation" };
  }
}

try {
  executeTask(0, operations, true);
} catch (e) {
  if (e.code === "indexAlreadyExecuted") {
    console.log("partOne", globalAccumulator);
  } else {
    throw e;
  }
}



let currentOperations = operations;
let hasError;
let lastIndex = -1;

do {
  visitedIndexes = new Set();
  globalAccumulator = 0;

  try {
    executeTask(0, currentOperations, true);
  } catch (e) {
    if (e.code === "indexAlreadyExecuted") {

      // in case it throws error, we try to modify single jpm to nop (or viceversa)
      currentOperations = JSON.parse(JSON.stringify(operations));
      lastIndex = currentOperations.findIndex((op, i) => {
        return i > lastIndex && (op[0] === "nop" || op[0] === "jmp") && !(op[0] === "nop" && op[1] === 0);
      });
      currentOperations[lastIndex][0] = currentOperations[lastIndex][0] === "nop" ? "jmp" : "nop";
      hasError = true;
      continue;

    } else {
      throw e;
    }
  }

  hasError = false;
} while (hasError);

console.log("partTwo", globalAccumulator);
