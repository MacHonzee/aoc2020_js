const instructions = require("./input");

const DIRECTION_MAP = {
  N: "_north",
  S: "_south",
  E: "_east",
  W: "_west"
};
const DIRECTIONS_ORDER = ["N", "E", "S", "W"];

class Ship {
  constructor() {
    this._direction = "E";
    this._north = 0;
    this._east = 0;
    this._west = 0;
    this._south = 0;
  }

  moveInDirection(direction, value) {
    let directionKey = DIRECTION_MAP[direction];
    this[directionKey] += value;
  }

  rotate(direction, degrees) {
    let indexesCount = (direction === "R" ? degrees : -degrees) / 90;
    let currentIndex = DIRECTIONS_ORDER.indexOf(this._direction);
    let newIndex = (currentIndex + indexesCount) % 4;
    if (newIndex < 0) newIndex += 4;
    this._direction = DIRECTIONS_ORDER[newIndex];
  }

  moveForward(value) {
    this.moveInDirection(this._direction, value);
  }

  getManhattanDistance() {
    return Math.abs(this._north - this._south) + Math.abs(this._west - this._east);
  }
}

let firstShip = new Ship();
for (let [instruction, value] of instructions) {
  switch (instruction) {
  case "N":
  case "E":
  case "W":
  case "S":
    firstShip.moveInDirection(instruction, value);
    break;
  case "R":
  case "L":
    firstShip.rotate(instruction, value);
    break;
  case "F":
    firstShip.moveForward(value);
    break;
  default:
    throw "Unexpected instruction";
  }
}

console.log(firstShip.getManhattanDistance());
