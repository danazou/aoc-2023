const fs = require("fs");
let sum = 1;

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("error", err);
  }

  const input = data.split("\n");
  const times = input[0].match(/[0-9]+/g);
  const distances = input[1].match(/[0-9]+/g);

  for (const [i, time] of times.entries()) {
    let count = 0;
    const record = distances[i];
    console.log(time, record);
    for (let j = 1; j < time / 2; j++) {
      const distance = (time - j) * j;
      if (distance > record) {
        count += 2;
      }
    }

    // if time is even, we're going to miss looking at one solution
    if (time % 2 == 0) {
      const hold = time / 2;
      const distance = (time - hold) * hold;
      if (distance > record) {
        count += 1;
      }
    }
    sum *= count;
  }
  console.log(sum);
  // expected output: 128700
});
