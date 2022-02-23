const { rules, messages } = require("./input");

let RULE_CACHE = new Map();

function evaluateRules(index) {
  // first we check cache if we already know the result for given rule or not
  let cachedRules = RULE_CACHE.get(index);
  if (cachedRules) {
    return cachedRules;
  }

  let indexRules = rules.get(index);

  // we are at the charactered position, so we return the character itself
  if (indexRules[0][0] === "a" || indexRules[0][0] === "b") {
    return [ indexRules[0][0] ];
  }

  let matches = [];
  indexRules.forEach(rulesList => {

    let ruleMatches = [];
    for (let ruleNum of rulesList) {
      // each number can give us multiple possibilites of matching characters, so we have to join them with
      // every currently existing ruleMatch
      let newRules = evaluateRules(ruleNum);
      if (ruleMatches.length === 0) {
        ruleMatches = [...newRules];
      } else {
        ruleMatches = ruleMatches.map(oldRule => newRules.map(newRule => oldRule + newRule)).flat();
      }
    }

    matches = [...matches, ...ruleMatches];
  });

  // save it to cache to make evaluation faster
  RULE_CACHE.set(index, matches);

  return matches;
}

function solvePartOne() {
  let matches = new Set(evaluateRules(0));

  console.log(messages.filter(msg => matches.has(msg)).length);
}

solvePartOne();
