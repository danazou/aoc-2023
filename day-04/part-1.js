const fs = require("fs");
let sum = 0;
const regEx = /[0-9]+/g;
fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const input = data.split("\n");
  for (line of input) {
    const card = line.split(": ")[1].split(" | ");
    const win = new Set(card[0].match(regEx));
    const nums = new Set(card[1].match(regEx));
    let matchCount = 0;
    for (num of nums) {
      if (win.has(num)) {
        matchCount++;
      }
    }
    if (matchCount > 0) {
      sum += Math.pow(2, matchCount - 1);
    }
  }
  console.log(sum);
  // expected output: 33950
});

/*
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
41 48 83 86 17 | 83 86  6 31 17  9 48 53

Each card has two lists of numbers separated by a vertical bar (|): 
a list of winning numbers and then a list of numbers you have. 

Which of the numbers you have appear in the list of winning numbers. 
The first match makes the card worth one point
each match after the first doubles the point value of that card.


*/
