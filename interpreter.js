//@ts-check

class Interpreter {
  #privateMAX_SIZE = 255;
  #privateMIN_SIZE = 0;

  #privateinputPosition;
  #privatecell;
  #privatecellPosition;
  #privateresult;
  #privateloop;
  #privateKEYWORDS;
  #privateinput;

  /**
   * Provides array of characters
   * @param {string[]} input
   */
  constructor(input) {
    this.#privateinput = input;
    this.#privateinputPosition = 0;
    this.#privatecell = [0];
    this.#privatecellPosition = 0;
    this.#privateresult = "";
    this.#privateloop = {};
    this.#privateKEYWORDS = {
      "🤜": this.#privatestartLoop.bind(this),
      "🤛": this.#privateendLoop.bind(this),
      "👉": this.#privatenextCell.bind(this),
      "👆": this.#privateincrementCell.bind(this),
      "👈": this.#privatepreviousCell.bind(this),
      "👊": this.#privatesaveChar.bind(this),
      "👇": this.#privatedecreaseCell.bind(this),
    };
  }

  #privatenextCell() {
    this.#privatecellPosition += 1;
    if (this.#privatecellPosition >= this.#privatecell.length) {
      this.#privatecell.push(0);
    }
  }

  #privatepreviousCell() {
    this.#privatecellPosition -= 1;

    if (this.#privatecellPosition < 0) {
      throw new Error(
        `It is not possible to access a negative memory cell, POSITION: ${
          this.#privateinputPosition + 1
        }`
      );
    }
  }

  #privateincrementCell() {
    this.#privatecell[this.#privatecellPosition] =
      this.#privatecell[this.#privatecellPosition] === this.#privateMAX_SIZE
        ? this.#privateMIN_SIZE
        : (this.#privatecell[this.#privatecellPosition] += 1);
  }

  #privatedecreaseCell() {
    this.#privatecell[this.#privatecellPosition] =
      this.#privatecell[this.#privatecellPosition] === this.#privateMIN_SIZE
        ? this.#privateMAX_SIZE
        : (this.#privatecell[this.#privatecellPosition] -= 1);
  }

  #privatestartLoop() {
    if (this.#privatecell[this.#privatecellPosition] === 0) {
      this.#privateinputPosition =
        this.#privateloop[this.#privateinputPosition];
    }
  }

  #privateendLoop() {
    if (this.#privatecell[this.#privatecellPosition] !== 0) {
      this.#privateinputPosition =
        this.#privateloop[this.#privateinputPosition];
    }
  }

  #privatesaveChar() {
    this.#privateresult += String.fromCharCode(
      this.#privatecell[this.#privatecellPosition]
    );
  }

  #privateregisterLoops() {
    let fistcount = 0;
    const stack = [];

    this.#privateinput.forEach((c, i) => {
      if (c === "🤜") {
        stack.push(i);
        fistcount++;
      }

      if (c === "🤛") {
        const start = stack.pop();

        if (start === undefined) {
          throw new Error(`Element to finish LOOP ${i + 1} has no opening element`);
        }

        this.#privateloop[start] = i;
        this.#privateloop[i] = start;

        fistcount++;
      }
    });

    if (fistcount % 2 !== 0) {
      throw new Error("There is a loop that is not open or closed");
    }
  }

  #privatereadInput() {
    for (
      this.#privateinputPosition;
      this.#privateinputPosition < this.#privateinput.length;
      this.#privateinputPosition++
    ) {
      const keyword = this.#privateinput[this.#privateinputPosition];
      this.#privateKEYWORDS[keyword]();
    }
  }

  interpreter() {
    try {
      this.#privateregisterLoops();

      this.#privatereadInput();

      return this.#privateresult;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      process.exit(1);
    }
  }
}

export default Interpreter;
