const tileMap = require("./input");
const Grid2d = require("../utils/2d-grid");
const Utils = require("../utils/utils");

const SQUARE_LEN = Math.sqrt(tileMap.size);

// we create map, where key is tileId and value is every possible combination of stringified borders
function convertToBorders() {
  let bordersMap = new Map();

  tileMap.forEach((grid, tileId) => {
    let borders = [
      grid.getRow(0).join(""),
      grid.getCol(grid.colCount - 1).join(""),
      grid.getRow(grid.rowCount - 1).join(""),
      grid.getCol(0).join("")
    ];

    // could be done in iterations, this aint so bad though
    let bordersVariations = [
      borders,
      rotate(borders),
      rotate(rotate(borders)),
      rotate(rotate(rotate(borders))),

      flipHorizontally(borders),
      flipHorizontally(rotate(borders)),
      flipHorizontally(rotate(rotate(borders))),
      flipHorizontally(rotate(rotate(rotate(borders)))),

      flipVertically(borders),
      flipVertically(rotate(borders)),
      flipVertically(rotate(rotate(borders))),
      flipVertically(rotate(rotate(rotate(borders)))),

      flipHorizontally(flipVertically(borders)),
      flipHorizontally(flipVertically(rotate(borders))),
      flipHorizontally(flipVertically(rotate(rotate(borders)))),
      flipHorizontally(flipVertically(rotate(rotate(rotate(borders))))),
    ];
    bordersMap.set(tileId, bordersVariations);
  });

  return bordersMap;
}

function rotate(borders) {
  let newBorders = [...borders];
  newBorders.push(newBorders.shift());
  return newBorders;
}

function flipHorizontally(borders) {
  let newBorders = [...borders];
  let oldRight = newBorders[1];
  newBorders[1] = newBorders[3];
  newBorders[3] = oldRight;
  newBorders[0] = newBorders[0].split("").reverse().join("");
  newBorders[2] = newBorders[2].split("").reverse().join("");
  return newBorders;
}

function flipVertically(borders) {
  let newBorders = [...borders];
  let oldTop = newBorders[0];
  newBorders[0] = newBorders[2];
  newBorders[2] = oldTop;
  newBorders[1] = newBorders[1].split("").reverse().join("");
  newBorders[3] = newBorders[3].split("").reverse().join("");
  return newBorders;
}

function canBeInserted(globalMap, tile, emptyCoords, bordersMap) {
  let [x, y] = emptyCoords;

  // first position in map
  if (x === 0 && y === 0) return true;

  // any position on first row and not in first column,
  // check only left neighbour
  if (x === 0 && y > 0) return checkLeftAlignment(globalMap, tile, emptyCoords, bordersMap);

  // any position in first column and not in first row
  // check only right neighbour
  if (x > 0 && y === 0) return checkTopAlignment(globalMap, tile, emptyCoords, bordersMap);

  // check both left and top neighbour
  return checkLeftAlignment(globalMap, tile, emptyCoords, bordersMap) && checkTopAlignment(globalMap, tile, emptyCoords, bordersMap);
}

function checkTopAlignment(globalMap, tile, [x, y], bordersMap) {
  let [topTileId, borderIndex] = globalMap.getCell(x - 1, y).split("_");
  let topTileBorders = bordersMap.get(topTileId);
  let topTile = topTileBorders[parseInt(borderIndex)];
  return tile[0] === topTile[2];
}

function checkLeftAlignment(globalMap, tile, [x, y], bordersMap) {
  let [leftTileId, borderIndex] = globalMap.getCell(x, y - 1).split("_");
  let leftTileBorders = bordersMap.get(leftTileId);
  let leftTile = leftTileBorders[parseInt(borderIndex)];
  return tile[3] === leftTile[1];
}

function findNextEmptySlot(globalMap) {
  for (let x = 0; x < SQUARE_LEN; x++) {
    for (let y = 0; y < SQUARE_LEN; y++) {
      if (!globalMap.getCell(x, y)) return [x, y];
    }
  }

  return [undefined, undefined];
}

function solveNextStep(globalMap, bordersMap, tileIds) {
  let [x, y] = findNextEmptySlot(globalMap);

  // we have reached the end of globalMap, everything should be set properly
  if (x == null) return globalMap;

  // optimalization variable, this way we save a few iterations below
  let usedTiles = new Set();
  globalMap.eachCell(cell => cell && usedTiles.add(cell.split("_")[0]));

  // TODO breakpoint on : globalMap.getCell(0, 0) === "1951_8";
  // apparently, it inserts 2311_14 incorrectly to position 0,1 (should be other mutation)
  for (let tileId of tileIds) {
    if (usedTiles.has(tileId)) continue;

    let tileBorders = bordersMap.get(tileId);

    // try to check if tile can be inserted in any of the possible combinations
    for (let i in tileBorders) {
      let borders = tileBorders[i];

      if (canBeInserted(globalMap, borders, [x, y], bordersMap)) {
        // save it to state and continue by next borders
        usedTiles.add(tileId);
        globalMap.setCell(x, y, `${tileId}_${i}`);

        solveNextStep(globalMap, bordersMap, tileIds);
      }
    }
  }

  // rollback mechanism here, we have to clear globalMap, so we check if everything was filled
  // and if not (we have went through every rotation and every tile and none could fit),
  // then we make delete current globalMap possition
  let lastSlot = globalMap.getCell(SQUARE_LEN - 1, SQUARE_LEN - 1);
  if (!lastSlot) {
    globalMap.setCell(x, y, null);
  }

  return globalMap;
}

// this does not work, because it will create the inner array only once and reuse it
// new Array(SQUARE_LEN).fill(new Array(SQUARE_LEN).fill(null))
function getEmptyMap() {
  let data = [];
  Utils.nTimes(SQUARE_LEN, () => data.push(new Array(SQUARE_LEN).fill(null)));
  return new Grid2d(data);
}

function drawBorder(borderId, bordersMap) {
  console.log(borderId);
  let [tileId, borderI] = borderId.split("_");
  let border = bordersMap.get(tileId)[parseInt(borderI)];
  console.log(border[0]);
  for (let i = 1; i < border[1].length - 1; i++) {
    console.log(`${border[3][i]}${new Array(border[1].length - 1).join(" ")}${border[1][i]}`);
  }
  console.log(border[2] + "\n");
}

function solvePartOne() {
  // we simplify the grid to a set of string borders
  let tileIds = Array.from(tileMap.keys());
  let bordersMap = convertToBorders();

  drawBorder("1951_8", bordersMap);
  drawBorder("2311_14", bordersMap);

  // and then we work with simplification of target map to be filled by tiles
  let globalMap = getEmptyMap();

  // and start our backtracking algorithm that gradually populates the globalMap
  solveNextStep(globalMap, bordersMap, tileIds);

  console.log("-> globalMap", globalMap);
}

solvePartOne();
