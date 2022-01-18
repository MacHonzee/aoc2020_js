const passes = require("./input");

function processHalves(chars, max) {
  let currentMin = 0;
  let currentMax = max;
  for (let char of chars) {
    let half = currentMin + Math.floor((currentMax - currentMin) / 2);
    if (char === "F" || char === "L") {
      currentMax = half;
    } else {
      currentMin = half + 1;
    }
  }
  return currentMin;
}

function getSeat(pass) {
  let row = processHalves(pass.split("").slice(0, 7), 127);
  let col = processHalves(pass.split("").slice(7), 7);

  return row * 8 + col;
}
console.log(Math.max(...passes.map(getSeat)));

let seatIds = passes.map(getSeat).sort((a, b) => a - b);
for (let i = 0; i < seatIds.length; i++) {
  if (seatIds[i] + 1 !== seatIds[i + 1]) {
    console.log(seatIds[i] + 1);
    break;
  }
}
