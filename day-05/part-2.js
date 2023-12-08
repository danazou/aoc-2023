const fs = require("fs");
let locations = [];

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("error", err);
  }

  const input = data.split("\n\n");
  const firstLine = input[0].split(": ")[1].split(" ").map(Number);
  let seeds = [];

  firstLine.forEach((value, i) => {
    if (i % 2 == 0) {
      // even index
      seeds.push([value, firstLine[i + 1]]);
    }
  });

  console.log(seeds);

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
    const start = seed[0];
    const end = seed[0] + seed[1];

    // loop from start to end
    for (let i = start; i < end; i++) {
      let target = i;
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
  }
  console.log(Math.min(...locations));
  // expected output: 214922730
});

/*
seed: [start, range]

interval [start, end]
find overlap between interval and source interval
  max (start, source start) = l
  min (end, source end) = r
  l<r
an interval will move on to next mapping
an interval may stay to check next line

*/
