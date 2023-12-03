const fs = require("fs");
let bag = {
  red: 12,
  green: 13,
  blue: 14,
};
let sum = 0;

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }

  let input = data.split("\n");

  // iterate through each game
  for (const [index, line] of input.entries()) {
    const game = line.split(": ");
    const picks = game[1].split("; ");
    let isWithinLimit = true;

    // iterate through each set of picks
    loop: for (const pick of picks) {
      const cubes = pick.split(", ");

      // iterate through each type of cube
      for (const cube of cubes) {
        const num = parseInt(cube.split(" ")[0]);
        const color = cube.split(" ")[1];

        // check if it is within limit
        if (num > bag[color]) {
          isWithinLimit = false;
          break loop;
        }
      }
    }
    if (isWithinLimit == true) {
      sum += index + 1;
    }
  }
  console.log(sum);
  // expected output: 2486
});

/*
parsing
    1. GAME: remove 'Game X: ' -> split at ': ' and only take 2nd array
    2. PICKS: split at '; ' => ['3 blue, 4 red', '1 red, 2 green, 6 blue']
    2. PICK: split at ', ' => end up with [['3 blue', '4 red'], ['1 red', '2 green', '6 blue']]

bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes
for each game, each pick, each color
    1. check whether number of cubes are within limit
    2. if it is within limit, move on, until we check every color & pick in the game
    3. if it doesn't, move to next game
*/
