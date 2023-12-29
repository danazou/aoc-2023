const fs = require("fs");
let sum = 0;

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("error reading file", err);
    return;
  }

  const input = data.split("\n");
  for (line of input) {
    const values = line.split(" ");
    sum += predict(values);
  }

  console.log(sum);
  // expected output: 1100
});

function predict(values) {
  if (values.every((n) => n == 0)) {
    return 0;
  }

  let difference = [];

  for (let i = 1; i < values.length; i++) {
    difference.push(values[i] - values[i - 1]);
  }

  return parseInt(values[0]) - predict(difference);
}
