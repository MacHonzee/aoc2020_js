const bagRules = require("./input");

const TARGET_COLOR = "shiny gold";

function buildMapForColor(color, rules, map) {
  for (let [srcColor, containedBags] of Object.entries(rules)) {
    if (containedBags.find(bag => bag.bagColor === color)) {
      map[srcColor] = buildMapForColor(srcColor, rules, {});
    }
  }
  return map;
}

function listKeys(object, set) {
  Object.keys(object).forEach(key => {
    set.add(key);
    listKeys(object[key], set);
  });
}

let goldMap = buildMapForColor(TARGET_COLOR, bagRules, {});
let allColors = new Set();
listKeys(goldMap, allColors);
console.log("-> partOne", allColors.size);

function countBags(color, rules) {
  let sum = 1;
  rules[color].forEach(bag => {
    sum += (bag.count * (countBags(bag.bagColor, rules || 1)));
  });
  return sum;
}

// exclude shiny gold bag
console.log("-> partTwo", countBags(TARGET_COLOR, bagRules) - 1);
