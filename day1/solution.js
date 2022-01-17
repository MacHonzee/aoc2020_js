const numbers = require("./input");

const YEAR = 2020;

// solution part 1
let result = numbers.flatMap(num1 => numbers.map(num2 => [num1, num2])).find(([num1, num2]) => num1 + num2 === YEAR);
console.log(result[0] * result[1]);

// solution part 2
let resultTwo = numbers.flatMap(num1 => numbers.flatMap(num2 => numbers.map(num3 => [num1, num2, num3]))).find(([num1, num2, num3]) => num1 + num2 + num3 === YEAR);
console.log(resultTwo[0] * resultTwo[1] * resultTwo[2]);
