const foods = require("./input");

// we setup some globals here, to reuse them in solution of part two
const ALLERGENS_MAP = groupValues("allergens");
const ALERGENS_LENGTH = Object.keys(ALLERGENS_MAP).length;

const WORDS_TO_ALLRG_MAP = groupAllergens();

function groupValues(key) {
  return foods.reduce((map, food, i) => {
    food[key].forEach((val) => {
      map[val] = map[val] || [];
      map[val].push(i);
    });
    return map;
  }, {});
}

function groupAllergens() {
  let foodMapWithSet = foods.reduce((map, food) => {
    food.words.forEach(ingredient => {
      map[ingredient] = map[ingredient] || new Set();
      food.allergens.forEach(allrg => map[ingredient].add(allrg));
    });
    return map;
  }, {});

  return Object.keys(foodMapWithSet).reduce((map, word) => {
    // we need to convert it back to Array, because we need for..of
    map[word] = Array.from(foodMapWithSet[word]);
    return map;
  }, {});
}

function areAllergensAssigned(wordSetup) {
  return wordSetup.size === ALERGENS_LENGTH;
}

function canAssignAllergen(word, allrg) {
  return ALLERGENS_MAP[allrg].every(foodIndex => {
    let words = foods[foodIndex].words;
    return words.has(word);
  });
}

// another backtracking algorithm
function findAllrgCombos(allrgSetup, wordSetup, invalidWords) {
  for (let word of Object.keys(WORDS_TO_ALLRG_MAP)) {
    // skip those that are used and those that cannot be already used
    if (allrgSetup.has(word) || invalidWords.has(word)) continue;

    for (let allrg of WORDS_TO_ALLRG_MAP[word]) {
      // we skip those allergens that are already assigned to some word
      if (wordSetup.has(allrg)) continue;

      // we have unused word and unused allergen, now we have to back-check if this current word+allergen
      // is present on all lines, where the allergen should be found
      if (canAssignAllergen(word, allrg)) {
        allrgSetup.add(word);
        wordSetup.add(allrg);

        if (areAllergensAssigned(wordSetup)) return true;

        findAllrgCombos(allrgSetup, wordSetup, invalidWords);
      }
    }
  }

  if (!areAllergensAssigned(wordSetup)) {
    let lastWord = Array.from(allrgSetup).pop();
    let lastAllergen = Array.from(wordSetup).pop();
    allrgSetup.delete(lastWord);
    wordSetup.delete(lastAllergen);
    return false;
  }

  return true;
}

function solvePartOne() {

  // we go word by word and try every possible allergen for each word,
  // and if there is none such possible allergen, then we put the word away
  let invalidWords = new Set();
  Object.entries(WORDS_TO_ALLRG_MAP).forEach(([word, allergens]) => {
    // first match is enough
    let foundAllrg = allergens.find(allrg => {
      // we need to check if the allergen can be actually assigned in the first place,
      // so if the word+allrg is present on all lines where the allergen should be
      if (!canAssignAllergen(word, allrg, ALLERGENS_MAP)) return false;

      // we need a two-way map, for easy reading of both words and allergens
      let allrgSetup = new Set([word]);
      let wordSetup = new Set([allrg]);
      return findAllrgCombos(allrgSetup, wordSetup, invalidWords);
    });

    if (!foundAllrg) {
      invalidWords.add(word);
    }
  });

  let wordsMap = groupValues("words");
  let partOneResult = Array.from(invalidWords).reduce((sum, word) => sum + wordsMap[word].length, 0);
  console.log("-> partOneResult", partOneResult);

  return invalidWords;
}

console.time("partOne");
let invalidWords = solvePartOne();
console.timeEnd("partOne");

// part two
function solvePartTwo(invalidWords) {
  // should be kinda easy and fast - just run the algorithm again, this time with
  // complete invalidWords set, it should go almost directly to only possible combination,
  // because there will be only exactly that many valid words left as there are allergens
  let allrgSetup = new Set();
  let wordSetup = new Set();
  findAllrgCombos(allrgSetup, wordSetup, invalidWords);

  let wordArr = Array.from(allrgSetup);
  let partTwoResult = Array.from(wordSetup)
    .map((allrg, i) => [allrg, i])
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(wordWithI => wordArr[wordWithI[1]])
    .join(",");
  console.log("-> partTwoResult", partTwoResult);
}

solvePartTwo(invalidWords);
