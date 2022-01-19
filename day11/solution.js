const seatMap = require("./input");

// for part two and for references error
const seatMapBackup = seatMap.copy();

let previousSeatMap;
let currentSeatMap = seatMap;

const FLOOR = ".";
const EMPTY = "L";
const OCCUPIED = "#";

function moveSeats(seatMap) {
  let newData = [];
  seatMap.eachCell((cell, rowI, colI) => {
    if (colI === 0) newData.push([]);

    if (cell === FLOOR) {
      newData[rowI].push(cell);
    } else if (cell === EMPTY) {

      let neighbours = seatMap.getNeighbours(rowI, colI, true);
      if (neighbours.filter(neigh => neigh === OCCUPIED).length === 0) {
        newData[rowI].push(OCCUPIED);
      } else {
        newData[rowI].push(cell);
      }

    } else {
      let neighbours = seatMap.getNeighbours(rowI, colI, true);
      if (neighbours.filter(neigh => neigh === OCCUPIED).length >= 4) {
        newData[rowI].push(EMPTY);
      } else {
        newData[rowI].push(cell);
      }
    }

  });

  return newData;
}

do {
  previousSeatMap = currentSeatMap.copy();
  currentSeatMap.data = moveSeats(currentSeatMap);
} while (previousSeatMap.rawData !== currentSeatMap.rawData);

console.log("partOne", currentSeatMap.rawData.split("").filter(char => char === OCCUPIED).length);

// part two
function traverseByDirection(seatMap, rowI, colI, rowInc, colInc) {
  let currentRowI = rowI + rowInc;
  let currentColI = colI + colInc;
  while (currentRowI >= 0 && currentColI >= 0 && currentRowI < seatMap.rowCount && currentColI < seatMap.colCount) {
    let value = seatMap.data[currentRowI][currentColI];
    if (value !== FLOOR) return value;
    currentRowI = currentRowI + rowInc;
    currentColI = currentColI + colInc;
  }
}

function getSightNeighbours(seatMap, rowI, colI) {
  return [
    traverseByDirection(seatMap, rowI, colI, -1, -1),
    traverseByDirection(seatMap, rowI, colI, -1, 0),
    traverseByDirection(seatMap, rowI, colI, -1, 1),

    traverseByDirection(seatMap, rowI, colI, 0, -1),
    traverseByDirection(seatMap, rowI, colI, 0, 1),

    traverseByDirection(seatMap, rowI, colI, 1, -1),
    traverseByDirection(seatMap, rowI, colI, 1, 0),
    traverseByDirection(seatMap, rowI, colI, 1, 1),
  ].filter(val => val);
}

function moveSeatsBySight(seatMap) {
  let newData = [];
  seatMap.eachCell((cell, rowI, colI) => {
    if (colI === 0) newData.push([]);

    if (cell === FLOOR) {
      newData[rowI].push(cell);

    } else if (cell === EMPTY) {

      let neighbours = getSightNeighbours(seatMap, rowI, colI);
      if (neighbours.filter(neigh => neigh === OCCUPIED).length === 0) {
        newData[rowI].push(OCCUPIED);
      } else {
        newData[rowI].push(cell);
      }

    } else {
      let neighbours = getSightNeighbours(seatMap, rowI, colI);
      if (neighbours.filter(neigh => neigh === OCCUPIED).length >= 5) {
        newData[rowI].push(EMPTY);
      } else {
        newData[rowI].push(cell);
      }
    }

  });

  return newData;
}

previousSeatMap = undefined;
currentSeatMap = seatMapBackup;

do {
  previousSeatMap = currentSeatMap.copy();
  currentSeatMap.data = moveSeatsBySight(currentSeatMap);
} while (previousSeatMap.rawData !== currentSeatMap.rawData);

console.log("partTwo", currentSeatMap.rawData.split("").filter(char => char === OCCUPIED).length);
