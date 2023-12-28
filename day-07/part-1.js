const fs = require("fs");
let hands = { 5: [], 4: [], 1: [], "3+2": [], 3: [], "2+2": [], 2: [] };
let bids = new Object();
const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const types = { 5: 0, 4: 1, "3+2": 2, 3: 3, "2+2": 4, 2: 5, 1: 6 };
let orderedHands = [[], [], [], [], [], [], []];
let winnings = 0;

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("error", err);
  }

  const input = data.split("\n");
  for (line of input) {
    const hand = line.split(" ")[0];
    const bid = line.split(" ")[1];
    bids[hand] = bid;
    // console.log(bids);
    let repeats = new Object();
    for (card of hand) {
      if (card in repeats) {
        repeats[card] += 1;
      } else {
        repeats[card] = 1;
      }
    }

    const counts = Object.values(repeats).toSorted((a, b) => b - a);
    const max = counts[0];
    // determine type of hand
    if ([5, 4, 1].includes(max)) {
      hands[max].push(hand);
    } else if (max == 3) {
      if (counts[1] == 2) {
        hands["3+2"].push(hand);
      } else {
        hands[max].push(hand);
      }
    } else if (max == 2) {
      if (counts[1] == 2) {
        hands["2+2"].push(hand);
      } else {
        hands[max].push(hand);
      }
    }
  }

  for (const [type, values] of Object.entries(hands)) {
    // console.log(type);

    values.sort(function (a, b) {
      for (let i = 0; i < 5; i++) {
        if (a[i] != b[i]) {
          return ranks.indexOf(a[i]) - ranks.indexOf(b[i]);
        }
      }
    });
    orderedHands[types[type]].push(...values);
    // console.log(values);
  }
  const flatHands = orderedHands.flat();

  for (const [index, hand] of flatHands.entries()) {
    // console.log(bids[hand]);
    //(765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5)
    winnings += (flatHands.length - index) * bids[hand];
    // console.log(flatHands.length - index, bids[hand]);
  }

  console.log(winnings);
});
