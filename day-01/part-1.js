#!/usr/bin/env node

const fs = require("fs");

let input = "";
let sum = 0;

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file", err);
    return;
  }

  input = data.split("\n");

  for (let i = 0; i < input.length; i++) {
    let nums = input[i].match(/[0-9]/g);
    const num = nums[0] + nums[nums.length - 1];
    sum += parseInt(num);
  }

  console.log(sum);
  // Expected output: 54605
});
