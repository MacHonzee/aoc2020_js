const util = require("util");
const initialGrid = require("./input");
const Utils = require("../utils/utils");

const FULL = "#";
const EMPTY = ".";

function getNeighbourIndexes(grid, x, y, z) {
  let neighbours = [];
  for (let x1 = -1; x1 <= 1; x1++) {
    for (let y1 = -1; y1 <= 1; y1++) {
      for (let z1 = -1; z1 <= 1; z1++) {
        if (x1 === 0 && y1 === 0 && z1 === 0) continue;

        if (grid[x + x1]?.[y + y1]?.[z + z1]) {
          neighbours.push([x + x1, y + y1, z + z1]);
        }
      }
    }
  }
  return neighbours;
}

function solvePartOne(cycles) {
  // create a 3D structure with only x and y set from original 2D
  let grid = JSON.parse(JSON.stringify(initialGrid)).map(row => {
    return row.map(char => {
      return [char];
    });
  });

  Utils.nTimes(cycles, () => {
    // add one more dimension to every edge
    let cubeLength = grid.length;
    grid = [
      new Array(cubeLength + 2).fill(new Array(cubeLength).fill(".")),
      ...grid.map(row => [
        new Array(cubeLength).fill("."),
        ...row.map(col => [".", ...col, "."]),
        new Array(cubeLength).fill("."),
      ]),
      new Array(cubeLength + 2).fill(new Array(cubeLength).fill("."))
    ];

    let currentCopy = JSON.parse(JSON.stringify(grid));
    Utils.nTimes(currentCopy.length, x => {
      Utils.nTimes(currentCopy[0].length, y => {
        Utils.nTimes(currentCopy[0][0].length, z => {
          // check it against grid, save it to currentCopy
          let cube = grid[x][y][z];
          let neighIdx = getNeighbourIndexes(currentCopy, x, y, z);
          let actives = neighIdx.filter(([xA, yA, zA]) => grid[xA][yA][zA] === FULL);

          // If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
          if (cube === FULL && actives.length !== 2 && actives.length !== 3) {
            currentCopy[x][y][z] = EMPTY;
          }

          // If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
          if (cube === EMPTY && actives.length === 3) {
            currentCopy[x][y][z] = FULL;
          }
        });
      });
    });

    grid = currentCopy;
  });

  console.log(Array.from(JSON.stringify(grid).matchAll("#")).length);
}

solvePartOne(6);

function get4dNeighbourIndexes(grid, x, y, z, w) {
  let neighbours = [];
  for (let x1 = -1; x1 <= 1; x1++) {
    for (let y1 = -1; y1 <= 1; y1++) {
      for (let z1 = -1; z1 <= 1; z1++) {
        for (let w1 = -1; w1 <= 1; w1++) {
          if (x1 === 0 && y1 === 0 && z1 === 0 && w1 === 0) continue;

          if (grid[x + x1]?.[y + y1]?.[z + z1]?.[w + w1]) {
            neighbours.push([x + x1, y + y1, z + z1, w + w1]);
          }
        }
      }
    }
  }
  return neighbours;
}


const DEBUG = false;
const DRAW_MAP = false;
function draw4d(grid) {
  if (!DEBUG) return;
  DRAW_MAP && console.log(util.inspect(grid, {showHidden: false, depth: null, colors: true}));

  let x = grid.length;
  let y = grid[0].length;
  let z = grid[0][0].length;
  let w = grid[0][0][0].length;

  console.log("x", x);
  console.log("y", y);
  console.log("z", z);
  console.log("w", w);

  // check that we have copied it correctly
  Utils.nTimes(x, x => {
    if (grid[x].length !== y) throw "Invalid Y dimension";
    Utils.nTimes(y, y => {
      if (grid[x][y].length !== z) throw "Invalid Z dimension";
      Utils.nTimes(z, z => {
        if (grid[x][y][z].length !== w) throw "Invalid W dimension";
      });
    });
  });
}

function solvePartTwo(cycles) {
  // create a 4D structure with only x and y set from original 2D
  let grid = JSON.parse(JSON.stringify(initialGrid)).map(row => {
    return row.map(char => {
      return [[char]];
    });
  });

  draw4d(grid);

  Utils.nTimes(cycles, () => {
    // add one more dimension to every edge (ugly bastard, I know ...)
    let cubeLength = grid.length;
    let cubeDepth = grid[0][0].length;
    grid = [
      new Array(cubeLength + 2).fill(new Array(cubeDepth + 2).fill(new Array(cubeDepth + 2).fill("."))),
      ...grid.map(row => [
        new Array(cubeDepth + 2).fill(new Array(cubeDepth + 2).fill(".")),
        ...row.map(col => [
          new Array(cubeDepth + 2).fill("."),
          ...col.map(width => [".", ...width, "."]),
          new Array(cubeDepth + 2).fill(".")
        ]),
        new Array(cubeDepth + 2).fill(new Array(cubeDepth + 2).fill(".")),
      ]),
      new Array(cubeLength + 2).fill(new Array(cubeDepth + 2).fill(new Array(cubeDepth + 2).fill("."))),
    ];

    draw4d(grid);

    let currentCopy = JSON.parse(JSON.stringify(grid));
    Utils.nTimes(currentCopy.length, x => {
      Utils.nTimes(currentCopy[0].length, y => {
        Utils.nTimes(currentCopy[0][0].length, z => {
          Utils.nTimes(currentCopy[0][0][0].length, w => {
          // check it against grid, save it to currentCopy
            let cube = grid[x][y][z][w];
            let neighIdx = get4dNeighbourIndexes(currentCopy, x, y, z, w);
            let actives = neighIdx.filter(([xA, yA, zA, wA]) => grid[xA][yA][zA][wA] === FULL);

            // If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
            if (cube === FULL && actives.length !== 2 && actives.length !== 3) {
              currentCopy[x][y][z][w] = EMPTY;
            }

            // If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
            if (cube === EMPTY && actives.length === 3) {
              currentCopy[x][y][z][w] = FULL;
            }
          });
        });
      });
    });

    grid = currentCopy;
  });

  console.log(Array.from(JSON.stringify(grid).matchAll("#")).length);
}

solvePartTwo(6);

