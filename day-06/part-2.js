const fs = require("fs");
let count = 0;

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("error", err);
  }

  const input = data.split("\n");
  const time = parseInt(input[0].split(":")[1].replace(/\s+/g, ""));
  const record = parseInt(input[1].split(":")[1].replace(/\s+/g, ""));

  for (let i = 1; i < time / 2; i++) {
    const distance = (time - i) * i;
    if (distance > record) {
      // distance between time interval where I would beat record
      count = time - i * 2 + 1;
      break;
    }
  }
  console.log(count);
  // expected output: 39594072
});
