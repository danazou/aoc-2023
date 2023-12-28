const fs = require("fs");
let boxes = new Array(256).fill([]).map(() => []);
let focals = new Object();
const operations = /-|=/;
let sum = 0;

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("error reading file", err);
    return;
  }

  const input = data.split(",");
  for (const line of input) {
    const operation = line.match(operations)[0];
    const label = line.split(/-|=/)[0];

    // find box number
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
      hash = ((hash + label.charCodeAt(i)) * 17) % 256;
    }
    let contents = boxes[hash];
    if (operation == "=") {
      // if not already in box, add to box
      if (!contents.includes(label)) {
        contents.push(label);
      }
      focals[label] = line.match(/[0-9]+/)[0];
    } else if (operation == "-") {
      const index = contents.indexOf(label);
      if (index > -1) {
        contents.splice(index, 1);
      }
    }
  }

  for (const [index, box] of boxes.entries()) {
    for (const [slot, lens] of box.entries()) {
      sum += (1 + index) * (slot + 1) * focals[lens];
    }
  }

  console.log(sum);
  // expected output; 215827
});
