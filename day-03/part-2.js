const fs = require("fs");
const regEx = /[0-9]+/dg;
let sum = 0;

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const input = data.split("\n");
  let stars = {};
  for (const [row, line] of input.entries()) {
    // find all numbers
    const matches = line.matchAll(regEx);
    for (const match of matches) {
      const num = match[0];
      const start = match.index;
      const end = start + num.length;

      // generate search positions
      // left, right
      let searchPositions = [
        [row, start - 1],
        [row, end],
      ];
      // top + bottom row
      for (let i = start - 1; i < end + 1; i++) {
        searchPositions.push([row + 1, i], [row - 1, i]);
      }

      // search
      for (position of searchPositions) {
        const y = position[0];
        const x = position[1];

        if (y < 0 || y >= input.length || x < 0 || x >= row.length) {
          // invalid position
          continue;
        }
        if (input[y][x] == "*") {
          const yx = `${y}-${x}`;
          // check if star already found before
          if (Object.hasOwn(stars, yx)) {
            // found
            stars[yx].push(num);
          } else {
            // new star
            stars[yx] = [num];
          }
        }
      }
    }
  }
  for (const yx in stars) {
    // find star that only has 2 adjcanet numbers
    if (stars[yx].length == 2) {
      sum += stars[yx][0] * stars[yx][1];
    }
  }
  console.log(sum);
  // expected output: 84051670
});

/*
A gear is any * symbol that is adjacent to exactly two part numbers. 
Its gear ratio is the result of multiplying those two numbers together.

Find the gear ratio of every gear and add them all up

same as part 1
find numbers that are adjacent to a *
remember location of *

* locations: (row, index) of *: [num1, num2, num3...]

find values that have length of 2 -> gear
*/
