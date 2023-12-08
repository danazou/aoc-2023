const fs = require("fs");
let locations = [];

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("error", err);
  }

  const input = data.split("\n\n");
  const seeds = input[0].split(": ")[1].split(" ");
  let maps = [];

  for (let i = 1; i < input.length; i++) {
    let map = [];
    const contents = input[i].split(":\n")[1].split("\n");
    for (const line of contents) {
      map.push(line.split(" ").map(Number));
    }
    maps.push(map);
  }

  for (const seed of seeds) {
    let target = seed;
    for (const map of maps) {
      for (const line of map) {
        const source = line[1];
        const destination = line[0];
        const range = line[2];

        if (source <= target && target <= source + range - 1) {
          target = destination + (target - source);
          break;
        }
      }
    }
    locations.push(target);
  }
  console.log(Math.min(...locations));
  // expected output: 214922730
});

/*
find lowest location number

seed number (the source) to a soil number (the destination)

the destination range start, the source range start, and the range length.
Any source numbers that aren't mapped correspond to the same destination number. 
So, seed number 10 corresponds to soil number 10.

seed number
  0. soil = num
  1. loop through each line in map
  2. if source <= num <= source + range - 1
    a. new = destination + (num - source)
  3. else, move on to next line
  
same logic for each map
array for each map, stored in an array
  */
