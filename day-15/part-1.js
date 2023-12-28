const fs = require("fs");
let sum = 0;
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("error reading file", err);
    return;
  }

  const input = data.split(",");
  for (const line of input) {
    const string = [...line];
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = ((hash + line.charCodeAt(i)) * 17) % 256;
    }
    sum += hash;
  }

  console.log(sum);
  // expected output: 512283
});
