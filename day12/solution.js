const instructions = require("./input");

const DIRECTIONS_ORDER = ["N", "E", "S", "W"];
const RIGHT_ANGLE = 90;

class Ship {
  constructor(north = 0, east = 0) {
    this.direction = "E";
    this.N = north;
    this.E = east;
    this.W = 0;
    this.S = 0;
  }

  moveInDirection(direction, value) {
    this[direction] += value;
  }

  getNewDirection(direction, rotation, degrees) {
    let indexesCount = (rotation === "R" ? degrees : -degrees) / RIGHT_ANGLE;
    let currentIndex = DIRECTIONS_ORDER.indexOf(direction);
    let newIndex = (currentIndex + indexesCount) % 4;
    if (newIndex < 0) newIndex += 4;
    return DIRECTIONS_ORDER[newIndex];
  }

  rotate(rotation, degrees) {
    this.direction = this.getNewDirection(this.direction, rotation, degrees);
  }

  translateByDegrees(rotation, degrees) {
    let newDirectionsValues = DIRECTIONS_ORDER.reduce((map, direction) => {
      let newDirection = this.getNewDirection(direction, rotation, degrees);
      map[newDirection] = this[direction];
      return map;
    }, {});

    Object.keys(newDirectionsValues).forEach(newDirection => {
      this[newDirection] = newDirectionsValues[newDirection];
    });
  }

  moveForward(value) {
    this.moveInDirection(this.direction, value);
  }

  getManhattanDistance() {
    return Math.abs(this.N - this.S) + Math.abs(this.W - this.E);
  }

  getOrientations() {
    return [
      this.N > this.S ? ["N", this.N - this.S] : ["S", this.S - this.N],
      this.E > this.W ? ["E", this.E - this.W] : ["W", this.W - this.E]
    ];
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

// part two
let waypoint = new Ship(1, 10);
let secondShip = new Ship();
for (let [instruction, value] of instructions) {
  switch (instruction) {
  case "N":
  case "E":
  case "W":
  case "S":
    waypoint.moveInDirection(instruction, value);
    break;
  case "R":
  case "L":
    waypoint.translateByDegrees(instruction, value);
    break;
  case "F": {
    let waypointOrientation = waypoint.getOrientations();
    secondShip.moveInDirection(waypointOrientation[0][0], value * waypointOrientation[0][1]);
    secondShip.moveInDirection(waypointOrientation[1][0], value * waypointOrientation[1][1]);
    break;
  }
  default:
    throw "Unexpected instruction";
  }
}

console.log(secondShip.getManhattanDistance());
