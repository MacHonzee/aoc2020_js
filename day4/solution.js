const passports = require("./input");

const REQUIRED_FIELDS = [
  "byr",
  "iyr" ,
  "eyr" ,
  "hgt",
  "hcl",
  "ecl",
  "pid",
];
const OPTIONAL_FIELDS = [
  "cid",
];

let validPassports = passports.filter(pass => {
  for (let field of REQUIRED_FIELDS) {
    if (!pass[field]) return false;
  }
  return true;
});
console.log(validPassports.length);

function numberWithinRange(number, minRange, maxRange) {
  if (!number) return false;

  let num = parseInt(number);
  if (isNaN(num)) return false;

  return number >= minRange && number <= maxRange;
}

const VALID_FORMATS = {
  byr: (val) => numberWithinRange(val, 1920, 2002),
  iyr: (val) => numberWithinRange(val, 2010, 2020),
  eyr: (val) => numberWithinRange(val, 2020, 2030),
  hgt: (val) => {
    if (!val) return false;
    let groups = val.match(/^(\d{2,3})(cm|in)$/);
    if (!groups) return false;
    let [, num, unit] = groups;
    return unit === "cm" ? numberWithinRange(num, 150, 193) : numberWithinRange(num, 59, 76);
  },
  hcl: (val) => val && val.match(/^#[a-f0-9]{6}$/),
  ecl: (val) => val && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val),
  pid: (val) => val && val.match(/^\d{9}$/),
  cid: () => true
};

let validPassTwo = passports.filter(pass => {
  for (let [key, formatFunc] of Object.entries(VALID_FORMATS)) {
    if (!formatFunc(pass[key])) return false;
  }
  return true;
});
console.log("-> validPassTwo", validPassTwo.length);
