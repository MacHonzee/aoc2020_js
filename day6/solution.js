const groups = require("./input");
const Utils = require("../utils/utils");

// part one
let counts = groups.map(group => {
  let chars = new Set();
  for (let answers of group) {
    answers.split("").forEach(char => chars.add(char));
  }
  return chars.size;
});

console.log(Utils.arraySum(counts));

// part two
let countsTwo = groups.map(group => {
  let peopleCount = group.length;
  let chars = group[0].split("");
  return chars.filter(char => group.filter(innerChars => innerChars.includes(char)).length === peopleCount).length;
});

console.log(Utils.arraySum(countsTwo));
