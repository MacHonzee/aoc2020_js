const TreesMap = require("./input");
const Utils = require("../utils/utils");
const Grid2d = require("../utils/2d-grid");

// few times to the right should be enough. Pre-parsing to Grid2D is useless though
let biggerMap = [];
TreesMap.eachLine(line => {
  let newLine = [];
  Utils.nTimes(TreesMap.rowCount, () => {
    newLine.push(line);
  });
  biggerMap.push(newLine.flat());
});
biggerMap = new Grid2d(biggerMap);

const TREE = "#";

function getCollisionCount(increaseLine, increaseCol) {
  let lineI = 0;
  let colI = 0;

  let treeHits = 0;
  do {
    lineI += increaseLine;
    colI += increaseCol;
    if (biggerMap.data[lineI] && biggerMap.data[lineI][colI] === TREE) {
      treeHits++;
    }
  } while (lineI < biggerMap.rowCount);

  return treeHits;
}

console.log("-> partOne", getCollisionCount(1, 3));

const TRACKS = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
];
let results = TRACKS.map((track) => getCollisionCount(track[1], track[0]));

console.log("-> partTwo", results.reduce((product, result) => product * result, 1));
