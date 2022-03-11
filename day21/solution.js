const foods = require("./input");

// we setup some globals here, to reuse them in solution of part two
const ALLERGENS_MAP = groupValues("allergens");
const LAST_ALERGEN = Object.keys(ALLERGENS_MAP).pop();

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
  return wordSetup[LAST_ALERGEN];
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
    if (allrgSetup[word] || invalidWords.has(word)) continue;

    for (let allrg of WORDS_TO_ALLRG_MAP[word]) {
      // we skip those allergens that are already assigned to some word
      if (wordSetup[allrg]) continue;

      // we have unused word and unused allergen, now we have to back-check if this current word+allergen
      // is present on all lines, where the allergen should be found
      if (canAssignAllergen(word, allrg)) {
        allrgSetup[word] = allrg;
        wordSetup[allrg] = word;

        findAllrgCombos(allrgSetup, wordSetup, invalidWords);

        if (areAllergensAssigned(wordSetup)) return true;
      }
    }
  }

  if (!areAllergensAssigned(wordSetup)) {
    let lastAddedWord = Object.keys(allrgSetup).pop();
    let lastAllergen = allrgSetup[lastAddedWord];
    delete allrgSetup[lastAddedWord];
    delete wordSetup[lastAllergen];
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
      let allrgSetup = {
        [word]: allrg
      };
      let wordSetup = {
        [allrg]: word
      };
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

let invalidWords = solvePartOne();

// part two
function solvePartTwo(invalidWords) {
  // should be kinda easy and fast - just run the algorithm again, this time with
  // complete invalidWords set, it should go almost directly to only possible combination,
  // because there will be only exactly that many valid words left as there are allergens
  let allrgSetup = {};
  let wordSetup = {};
  findAllrgCombos(allrgSetup, wordSetup, invalidWords);

  console.log("-> wordSetup", wordSetup);
  let partTwoResult = Object.keys(wordSetup).sort().map(allrg => wordSetup[allrg]).join(",");
  console.log("-> partTwoResult", partTwoResult);

  // this is not the result! wtf how is it possible
  // tsqpn,nrl,zqzmzl,tfqsb,xhnk,cltx
}

solvePartTwo(invalidWords);
