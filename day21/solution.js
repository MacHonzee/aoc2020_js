const foods = require("./input");

function groupValues(key) {
  return foods.reduce((map, food, i) => {
    food[key].forEach((val) => {
      map[val] = map[val] || [];
      map[val].push(i);
    });
    return map;
  }, {});
}

function solvePartOne() {
  let wordsMap = groupValues("words");
  console.log("-> wordsMap", wordsMap);

  let allergensMap = groupValues("allergens");
  console.log("-> allergensMap", allergensMap);
}

solvePartOne();
