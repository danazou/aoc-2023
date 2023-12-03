#!/usr/bin/env node

const fs = require("fs");
let sum = 0;
let numToString = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }

  input = data.split("\n");

  //iterate over each input line
  for (let i = 0; i < input.length; i++) {
    let s = input[i];
    let nums = [];
    for (let j = 0; j < s.length; j++) {
      let current = s.substring(j);
      //if first character is digit
      let firstChar = current.charAt(0);
      if (firstChar.match(/[0-9]/) != null) {
        nums.push(firstChar);
      } else {
        //to see if the stirng contains a digit in string
        for (const num in numToString) {
          if (current.startsWith(num)) {
            nums.push(numToString[num]);
            break;
          }
        }
      }
    }
    sum += parseInt(nums[0] + nums[nums.length - 1]);
  }

  console.log(sum);
});

/*
whilst string is not empty,
    1. check if string starts with one of 9 numbers
    2. if it is, add to array of nums
    2. if it doesn't, remove first letter
    3. check if letter is a digit
    4. if it is, add to array of nums
*/
