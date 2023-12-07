const fs = require("fs");
let sum = 0;
const regEx = /[0-9]+/dg;

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const input = data.split("\n");
  for (const [yIndex, line] of input.entries()) {
    const matches = line.matchAll(regEx);
    for (const match of matches) {
      const num = parseInt(match[0]);
      const start = match.index;
      const end = match.index + match[0].length;

      // console.log(num, start, end);
      // find search positions
      let searchPositions = [];
      for (let i = start - 1; i < end + 1; i++) {
        searchPositions.push([i, yIndex - 1], [i, yIndex + 1]);
      }
      searchPositions.push([start - 1, yIndex], [end, yIndex]);
      searchLoop: for (indices of searchPositions) {
        const y = indices[0];
        const x = indices[1];
        if (x < 0 || x >= line.length || y < 0 || y >= input.length) {
          // invalid position
          continue;
        } else {
          // search for symbol
          if (input[x][y].match(/[0-9]|\./)) {
            // not a symbol
            // continue
          } else {
            // found symbol
            sum += num;
            break searchLoop;
          }
        }
      }
    }
  }
  console.log(sum);
  // expected output: 532428
});

/*
any number adjacent to a symbol, even diagonally, is a "part number"
sum up all part number

  0. in each line, find start & end positions of all numbers
  1. at each start position, find length
  2. search for symbol
  ..SSSSSS..
  ..SNNNNS..
  ..SSSSSS..
    a. generate search positions - top, down, left, right
    b. loop through positions
    c. reject invalid positions
    if found symbol, add to sum and exit search 


*/
