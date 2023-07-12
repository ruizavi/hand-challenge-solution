/**
👉 : moves the memory pointer to the next cell

👈 : moves the memory pointer to the previous cell

👆 : increment the memory cell at the current position 

👇 : decreases the memory cell at the current position. 

🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛

🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜

👊 : Display the current character represented by the ASCII code defined by the current position.

- As memory cells are bytes, from 0 to 255 value, if you decrease 0 you'll get  255, if you increment 255 you'll get 0.
- Loops of 🤜 and 🤛 can be nested. 
*/
const input = [
  ..."👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊",
];
let inputPosition = 0;

const cell = [0];
let cellPosition = 0;

const result = [];

// Variables
const MAX_SIZE = 255;
const MIN_SIZE = 0;

function nextCell() {
  cellPosition += 1;

  if (cellPosition >= cell.length) {
    cell.push(0);
  }
}

function previousCell() {
  cellPosition -= 1;
}

function incrementCell() {
  cell[cellPosition] =
    cell[cellPosition] === MAX_SIZE ? MIN_SIZE : (cell[cellPosition] += 1);
}

function decreaseCell() {
  cell[cellPosition] =
    cell[cellPosition] === MIN_SIZE ? MAX_SIZE : (cell[cellPosition] -= 1);
}

function startLoop() {
  if (cell[cellPosition] === 0) {
    inputPosition = loop[inputPosition];
  }
}

function endLoop() {
  if (cell[cellPosition] !== 0) {
    inputPosition = loop[inputPosition];
  }
}

function displayChar() {
  result.push(String.fromCharCode(cell[cellPosition]));
}

const stack = [];
const loop = {};

input.forEach((c, i) => {
  if (c === "🤜") {
    stack.push(i);
  }

  if (c === "🤛") {
    const start = stack.pop();

    loop[start] = i;
    loop[i] = start;
  }
});

const eventKeyword = {
  "🤜": startLoop,
  "🤛": endLoop,
  "👉": nextCell,
  "👆": incrementCell,
  "👈": previousCell,
  "👊": displayChar,
  "👇": decreaseCell,
};

for (inputPosition; inputPosition < input.length; inputPosition++) {
  eventKeyword[input[inputPosition]]();
}

console.log(result.join(""));
