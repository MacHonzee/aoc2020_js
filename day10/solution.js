const adapters = require("./input");

let sortedAdapters = [...adapters].sort((a, b) => a - b);
sortedAdapters.unshift(0);
sortedAdapters.push(sortedAdapters[sortedAdapters.length - 1] + 3);

// part one
let diffs = new Map([[1, 0], [2, 0], [3, 0]]);
sortedAdapters.forEach((value, index) => {
  if (index !== sortedAdapters.length - 1) {
    let diff = sortedAdapters[index + 1] - value;
    diffs.set(diff, diffs.get(diff) + 1);
  }
});

console.log("-> partOne", diffs.get(1) * diffs.get(3));

// based on input data, the differences are always 1 or 3, so it means that it is always
// list of consecutive numbers, then a difference by 3 and then a list of another consecutive numbers

// this constant was done manually, I was not able to think about some logic into it
const COMBO_MAP = {
  1: 1,
  2: 1,
  3: 2,
  4: 4,
  5: 7
};

let variants = 1;
let currentIndex = 0;
while (currentIndex < sortedAdapters.length) {
  let currentNum = sortedAdapters[currentIndex];

  for (let i = 1; i < sortedAdapters.length; i++) {
    if (currentNum + i !== sortedAdapters[currentIndex + i]) {
      // "i" is count of consecutive numbers, so we can calculate based on this probably
      let comboVariants = COMBO_MAP[i.toString()];

      if (!comboVariants) throw "Should not happen, based on heuristics lol";

      variants *= comboVariants;
      currentIndex += i;
      break;
    }
  }
}
console.log("-> partTwo", variants);
