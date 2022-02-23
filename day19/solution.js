const { rules, messages } = require("./input");

const MAX_RECURSION_COUNT = 0;

function evaluateRules(index, infinityCheck) {
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
      let newRules;
      if (ruleNum === index) {
        if (infinityCheck === MAX_RECURSION_COUNT) {
          break;
        }

        newRules = evaluateRules(ruleNum, infinityCheck + 1);
      } else {
        newRules = evaluateRules(ruleNum, 0);
      }
      newRules = Array.from(newRules);

      if (ruleMatches.length === 0) {
        ruleMatches = [...newRules];
      } else {
        ruleMatches = ruleMatches.map(oldRule => newRules.map(newRule => oldRule + newRule)).flat();
      }
    }

    matches = [...matches, ...ruleMatches];
  });

  return new Set(matches);
}

function solvePartOne() {
  console.time("matches");
  let matches = evaluateRules(0, 0);
  console.timeEnd("matches");

  console.log(messages.filter(msg => matches.has(msg)).length);
}

solvePartOne();

function hasPartialRuleMatch(msg, pointer, rule) {
  let ruleLength = Array.from(rule)[0].length;
  let msgPart = msg.substring(pointer, pointer + ruleLength);
  return rule.has(msgPart);
}

function checkValidMsg(msg, rule31, rule42) {
  let pointer = 0;
  let rule31length = Array.from(rule31)[0].length;
  let rule42length = Array.from(rule42)[0].length;

  // required start with two rules 42
  if (!hasPartialRuleMatch(msg, pointer, rule42)) return;
  pointer += rule42length;

  if (!hasPartialRuleMatch(msg, pointer, rule42)) return;
  pointer += rule42length;

  // now we have to decide whether it continues with rule42 or it already switched to 31
  let rule42matches = 2;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (hasPartialRuleMatch(msg, pointer, rule42)) {
      pointer += rule42length;
      rule42matches++;
    } else if (hasPartialRuleMatch(msg, pointer, rule31)) {
      pointer += rule31length;
      break;
    } else {
      return;
    }
  }

  // and it has to end by rule 31 (now optionally, it could have been checked in cycle before)
  let rule31matches = 1;
  while (pointer < msg.length) {
    if (hasPartialRuleMatch(msg, pointer, rule31)) {
      pointer += rule31length;
      rule31matches++;
    } else {
      return;
    }
  }

  // we also calculate whether we have matched rule 31 less then rule42 times (at least by difference of 1)
  return rule42matches - rule31matches >= 1;
}

function solvePartTwo() {
  // change rules to have infinite loop and try it again
  rules.set(8, [[42], [42, 8]]);
  rules.set(11, [[42, 31], [42, 11, 31]]);

  // rule 8 tells that there can be infinite number of rule 42 matches in the beginning
  // rule 11 after rule 8 makes sure that there are at least 2 rule 42 matches in the start
  // and that it can end with infinite number of rule 31 matches in the end

  // valid message combos -> rule 42 * (2, ~20) + rule 31 * (1, ~20)
  let rule42 = evaluateRules(42, 0);
  console.log("-> rule42", rule42);
  let rule31 = evaluateRules(31, 0);
  console.log("-> rule31", rule31);

  // 328 is too high
  let msgCount = messages.filter(msg => checkValidMsg(msg, rule31, rule42)).length;
  console.log("-> msgCount", msgCount);
}

solvePartTwo();

