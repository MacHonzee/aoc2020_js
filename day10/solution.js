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

// TODO part two

