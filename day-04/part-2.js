const fs = require("fs");
let sum = 0;
const regEx = /[0-9]+/g;

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const input = data.split("\n");
  let cardCount = Array(input.length).fill(1);
  for ([index, line] of input.entries()) {
    const card = line.split(": ")[1].split(" | ");
    const win = new Set(card[0].match(regEx));
    const nums = new Set(card[1].match(regEx));
    let matchCount = 0;
    for (num of nums) {
      if (win.has(num)) {
        matchCount++;
      }
    }
    for (let i = 1; i < matchCount + 1; i++) {
      cardCount[index + i] += cardCount[index];
    }
  }
  for (count of cardCount) {
    sum += count;
  }
  console.log(sum);
});

/*
array of cardCount = populate 1 for length of input
every time 

Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53 -> 4 matching numbers
41 48 83 86 17 | 83 86  6 31 17  9 48 53

Each card has two lists of numbers separated by a vertical bar (|): 
a list of winning numbers and then a list of numbers you have. 

You win copies of the scratchcards below the winning card equal to the number of matches. 
So, if card 10 were to have 5 matching numbers, you would win one copy each of cards 
11, 12, 13, 14, and 15.

how many total scratchcards do you end up with?
*/
