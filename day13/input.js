const string = `1008713
13,x,x,41,x,x,x,x,x,x,x,x,x,467,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,353,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23`.split("\n");

module.exports = [
  parseInt(string[0]),
  string[1].split(",").map(char => char === "x" ? "x" : Number(char))
];
