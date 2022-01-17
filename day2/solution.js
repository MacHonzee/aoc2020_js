const policies = require("./input");

let validPolicies = policies.filter(policy => {
  let count = policy.pass.match(new RegExp(policy.char, "g"));
  if (count && count.length >= policy.range[0] && count.length <= policy.range[1]) return true;
});
console.log(validPolicies.length);

let validPoliciesTwo = policies.filter(policy => {
  return (policy.pass[policy.range[0] - 1] === policy.char) ^ (policy.pass[policy.range[1] - 1] === policy.char);
});
console.log(validPoliciesTwo.length);
