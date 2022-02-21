const lines = require("./input");
const NumUtils = require("../utils/num-utils");
const StringUtils = require("../utils/string-utils");
const Utils = require("../utils/utils");

function applyMask(mask, value) {
  let binaryValue = NumUtils.decimalToBinary(value).padStart(mask.length, "0");
  mask.forEach((char, i) => {
    if (char === "0" || char === "1") {
      binaryValue = StringUtils.setCharAt(binaryValue, char, i);
    }
  });
  return NumUtils.binaryToDecimal(binaryValue);
}

function solvePartOne(lines) {
  let memory = new Map();

  lines.forEach(({mask, memWrites}) => {
    let maskChars = mask.split("");
    memWrites.forEach(([slot, value]) => {
      memory.set(slot, applyMask(maskChars, value));
    });
  });

  let values = Array.from(memory.values());
  console.log(Utils.arraySum(values));
}

solvePartOne(lines);

// =========================================

function permutateOnX(floatingVal, binValList) {
  // console.log("-> floatingVal", floatingVal);
  let firstX = floatingVal.indexOf("X");
  if (firstX > -1) {
    let zeroBinVal = StringUtils.setCharAt(floatingVal, "0", firstX);
    permutateOnX(zeroBinVal, binValList);

    let oneBinVal = StringUtils.setCharAt(floatingVal, "1", firstX);
    permutateOnX(oneBinVal, binValList);
  } else {
    binValList.push(floatingVal);
  }
}

function applyFloatingMask(mask, value) {
  let floatingBinVal = NumUtils.decimalToBinary(value).padStart(mask.length, "0");
  mask.forEach((char, i) => {
    if (char === "1" || char === "X") {
      floatingBinVal = StringUtils.setCharAt(floatingBinVal, char, i);
    }
  });

  // apply 0, 1 permutations to every X position in floatingBinVal
  let binaryValues = [];
  console.log("-> floatingBinVal", floatingBinVal);
  permutateOnX(floatingBinVal, binaryValues);
  // console.log("-> binaryValues", binaryValues);

  return binaryValues.map(binVal => NumUtils.binaryToDecimal(binVal));
}

function solvePartTwo(lines) {
  let memory = new Map();

  lines.forEach(({mask, memWrites}) => {
    let maskChars = mask.split("");
    memWrites.forEach(([slot, value]) => {
      let memoryAddresses = applyFloatingMask(maskChars, slot);
      for (let slot of memoryAddresses) {
        memory.set(slot, value);
      }
    });
  });

  let values = Array.from(memory.values());
  console.log(Utils.arraySum(values));
}

solvePartTwo(lines);
