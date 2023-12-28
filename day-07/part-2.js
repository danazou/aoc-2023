const fs = require("fs");
let hands = [[], [], [], [], [], [], []]; // ordered lowest to highest
let bids = new Object();
const ranks = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];
let winnings = 0;
let patterns = [
  [1, 1, 1, 1, 1],
  [2, 1, 1, 1],
  [2, 2, 1],
  [3, 1, 1],
  [3, 2],
  [4, 1],
  [5],
];

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("error", err);
  }

  const input = data.split("\n");
  for (line of input) {
    const hand = line.split(" ")[0];
    const bid = line.split(" ")[1];
    bids[hand] = bid;

    let repeats = new Object();
    for (card of hand) {
      if (card in repeats) {
        repeats[card] += 1;
      } else {
        repeats[card] = 1;
      }
    }
    let j = 0;
    if ("J" in repeats && Object.keys(repeats).length > 1) {
      // remove J from repeats, keep track of count
      // avoid case where all cards are J
      j = repeats["J"];
      delete repeats["J"];
    }
    const counts = Object.values(repeats).toSorted((a, b) => b - a);

    // add J to highest count
    counts[0] += j;
    // determine type of hand
    // leon's solution: match counts to patterns
    let index = patterns.findIndex((x) => x.toString() == counts.toString());
    hands[index].push(hand);
  }

  for (const hand of hands) {
    hand.sort(function (a, b) {
      // order from lowest to highest
      for (let i = 0; i < 5; i++) {
        if (a[i] != b[i]) {
          return ranks.indexOf(b[i]) - ranks.indexOf(a[i]);
        }
      }
    });
  }

  for (const [index, hand] of hands.flat().entries()) {
    winnings += (index + 1) * bids[hand];
  }

  console.log(winnings);
  // expected output: 247885995
});
