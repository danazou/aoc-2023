const fs = require("fs");
let locations = [];
let current = [];
let next = [];
let mapped = [];

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
    // start and end of interval
    current = [[seed[0], seed[0] + seed[1] - 1]];

    for (const map of maps) {
      for (const line of map) {
        // map: destination source range
        const mapStart = line[1];
        const mapEnd = mapStart + line[2] - 1;
        const destination = line[0];
        const mapping = destination - mapStart;

        while (current.length > 0) {
          // look at last interval and remove from current
          const currentInterval = current.pop();
          const start = currentInterval[0];
          const end = currentInterval[1];

          // find overlap
          const l = Math.max(start, mapStart);
          const r = Math.min(end, mapEnd);

          if (l <= r) {
            // overlap moves on to next map
            const overlap = [mapping + l, mapping + r];
            mapped.push(overlap);

            // non overlap moves to next line
            const left = [start, l - 1];
            const right = [r + 1, end];

            if (left[0] < left[1]) {
              next.push(left);
            } else if (right[0] < right[1]) {
              next.push(right);
            }
          } else {
            // no overlap
            next.push(currentInterval);
          }
        }
        // update current
        if (next.length != 0) {
          current = next.slice(); // deep copy of arrays
          next = [];
        }
      }
      // unmapped intervals
      if (current.length != 0) {
        mapped.push(...current); // pushing each item of current!
      }

      // update current
      if (mapped.length != 0) {
        current = mapped.slice();
        mapped = [];
      }
    }

    // reached end of maps -> location
    locations.push(...current);
  }

  const lowest = Math.min(...locations.flat());
  console.log(lowest);
  // expected output: 148041808
});
