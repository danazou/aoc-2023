#!/usr/bin/env node

// imports readfile function
const fs = require("fs");
let sum = 0;
let numToString = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

// read file
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }

  input = data.split("\n");

  // iterate over each input line
  for (let s of input) {
    let nums = [];
    for (let i = 0; i < s.length; i++) {
      // create substring
      let current = s.substring(i);

      // if first character is digit
      let firstChar = current[0];
      if (firstChar.match(/[0-9]/) != null) {
        nums.push(firstChar);
      } else {
        // e.g. current starts with 'two'
        for (const [index, number] of numToString.entries()) {
          if (current.startsWith(number)) {
            nums.push(String(index + 1));
            break;
          }
        }
      }
    }
    sum += parseInt(nums[0] + nums[nums.length - 1]);
  }

  console.log(sum);
  // Expected output: 55249
});

/*
for each substring,
    1. check if first letter is a digit
    2. if it is, add to array of nums
    3. otherwise, check if string starts with one of 9 numbers
    4. if it is, add to array of nums
*/
