const string = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;

module.exports = string.split("\n").map(line => {
  let [allWords, allAlergens] = line.split(" (contains ");
  return {
    words: allWords.split(" "),
    allergens: allAlergens.replace(")", "").split(", ")
  };
});
