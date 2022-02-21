const [earliestTs, busIds] = require("./input");

// part one
function solvePartOne() {
  let departs = busIds.map(id => {
    if (id === "x") return id;
    return id * (Math.ceil(earliestTs / id));
  });

  let lowest = Math.min(...departs.filter(id => id !== "x"));
  let lowestId = busIds[departs.indexOf(lowest)];
  console.log(lowestId * (lowest - earliestTs));
}
solvePartOne();

// part two
function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function solvePartTwo() {
  let timestamp = busIds[0];
  let period = busIds[0];

  busIds.forEach((id, i) => {
    if (i === 0 || id === "x") return;

    while ((timestamp + i) % id !== 0) {
      timestamp += period;
    }

    period = lcm(period, id);
  });

  console.log("-> timestamp", timestamp);
  return timestamp;
}

console.time("two");
solvePartTwo();
console.timeEnd("two");
