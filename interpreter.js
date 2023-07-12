//@ts-check

class Interpreter {
  MAX_SIZE = 255;
  MIN_SIZE = 0;

  /**
   * Provides array of characters
   * @param {string[]} input
   */
  constructor(input) {
    this.input = input;
    this.inputPosition = 0;
    this.cell = [0];
    this.cellPosition = 0;
    this.result = [];
    this.loop = {};
    this.KEYWORD = {
      "🤜": this.startLoop.bind(this),
      "🤛": this.endLoop.bind(this),
      "👉": this.nextCell.bind(this),
      "👆": this.incrementCell.bind(this),
      "👈": this.previousCell.bind(this),
      "👊": this.saveChar.bind(this),
      "👇": this.decreaseCell.bind(this),
    };
  }

  nextCell() {
    this.cellPosition += 1;
    if (this.cellPosition >= this.cell.length) {
      this.cell.push(0);
    }
  }

  previousCell() {
    this.cellPosition -= 1;
  }

  incrementCell() {
    this.cell[this.cellPosition] =
      this.cell[this.cellPosition] === this.MAX_SIZE
        ? this.MIN_SIZE
        : (this.cell[this.cellPosition] += 1);
  }

  decreaseCell() {
    this.cell[this.cellPosition] =
      this.cell[this.cellPosition] === this.MIN_SIZE
        ? this.MAX_SIZE
        : (this.cell[this.cellPosition] -= 1);
  }

  startLoop() {
    if (this.cell[this.cellPosition] === 0) {
      this.inputPosition = this.loop[this.inputPosition];
    }
  }

  endLoop() {
    if (this.cell[this.cellPosition] !== 0) {
      this.inputPosition = this.loop[this.inputPosition];
    }
  }

  saveChar() {
    this.result.push(String.fromCharCode(this.cell[this.cellPosition]));
  }

  init() {
    const stack = [];

    this.input.forEach((c, i) => {
      if (c === "🤜") {
        stack.push(i);
      }

      if (c === "🤛") {
        const start = stack.pop();

        this.loop[start] = i;
        this.loop[i] = start;
      }
    });

    for (
      this.inputPosition;
      this.inputPosition < this.input.length;
      this.inputPosition++
    ) {
      this.KEYWORD[this.input[this.inputPosition]]();
    }
  }

  showResult() {
    console.log(this.result.join(""));
  }

  returnResult() {
    return this.result.join("");
  }
}

export default Interpreter;
