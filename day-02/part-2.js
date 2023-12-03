let fs = require("fs");
let sum = 0;

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }

  let input = data.split("\n");

  // iterate through each game
  for (const [index, line] of input.entries()) {
    let maximum = {
      red: 0,
      green: 0,
      blue: 0,
    };
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

        // check if it is greater than maximum
        if (num > maximum[color]) {
          maximum[color] = num;
        }
      }
    }
    const power = maximum["red"] * maximum["blue"] * maximum["green"];
    sum += power;
  }
  console.log(sum);
  // expected output: 87984
});

/*
in each game you played, what is the fewest number of cubes of each color 
that could have been in the bag to make the game possible?

The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together.

for each game,
    1. what is the maximum number of cubes for each color
    2. red x green x blue
    3. add to sum
*/
