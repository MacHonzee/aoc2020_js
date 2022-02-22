const { attributes, yourTicket, nearbyTickets } = require("./input");
const Utils = require("../utils/utils");

function withinRange(num, range) {
  return num >= range[0] && num <= range[1];
}

function solvePartOne() {
  let attrRanges = Object.values(attributes).flat();

  let invalidValues = [];
  nearbyTickets.forEach(ticket => {
    ticket.forEach(num => {
      if (!attrRanges.some(range => withinRange(num, range))) {
        invalidValues.push(num);
      }
    });
  });

  console.log(Utils.arraySum(invalidValues));
}

solvePartOne();

// solution for part two
function solvePartTwo() {
  let attrNames = Object.keys(attributes);
  let attrPositions = attrNames.reduce((map, attrName) => {
    // fill it with all possible positions that each attribute can be
    let values = [];
    for (let i = 0; i < attrNames.length; i++) values.push(i);
    map[attrName] = new Set(values);
    return map;
  }, {});

  nearbyTickets.forEach(ticket => {
    let validTicket = true;
    let invalidAttrPositions = {};
    for (let i = 0; i < ticket.length; i++) {
      let ticketNum = ticket[i];

      let invalidAttributes = attrNames.filter(attrName => {
        let ranges = attributes[attrName];
        if (!ranges.find(range => withinRange(ticketNum, range))) {
          return attrName;
        }
      });

      // if we have found out that the current number does not fit in any of the attributes,
      // then the ticket is invalid and we have to continue with next one,
      if (invalidAttributes.length !== attrNames.length) {
        invalidAttributes.forEach(attrName => {
          invalidAttrPositions[attrName] = invalidAttrPositions[attrName] || new Set();
          invalidAttrPositions[attrName].add(i);
        });
      } else {
        validTicket = false;
        break;
      }
    }

    // only if we know that the ticket is valid, we remove the not valid combinations from attrPositions map,
    // otherwise we skip this ticket entirely
    if (validTicket) {
      Object.entries(invalidAttrPositions).forEach(([attrName, positions]) => {
        positions.forEach(position => attrPositions[attrName].delete(position));
      });
    } else {
      console.log(ticket.join(","));
    }
  });

  console.log("-> attrPositions", attrPositions);

  // now we have attrPositions, that have lot of attributes with multiple possible values, but
  // there should be at least one with just one possible position, so we eliminate these possibilities one by one
  let finalPositions = {};
  while (Object.keys(attrPositions).length > 0) {
    let exactMatch = Object.keys(attrPositions).find(attrName => attrPositions[attrName].size === 1 );
    if (!exactMatch) {
      throw "This shuold not happen!";
    } else {
      finalPositions[exactMatch] = Array.from(attrPositions[exactMatch])[0];
      delete attrPositions[exactMatch];
      Object.keys(attrPositions).forEach(attrName => attrPositions[attrName].delete(finalPositions[exactMatch]) );
    }
  }

  console.log("-> finalPositions", finalPositions);

  let sum = Utils.arrayProduct(attrNames, (attrName) => attrName.startsWith("departure") ? yourTicket[finalPositions[attrName]] : 1);
  console.log(sum);

  // 37050 answer is too low
}

solvePartTwo();
