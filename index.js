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
import fs from "fs";
import Interpreter from "./interpreter.js";

const fileName = process.argv[2];

if (!fileName) {
  console.error("Debe proporcionar un nombre de archivo como argumento");
  process.exit(1);
}

const readStream = fs.createReadStream(fileName, "utf8");

let data = "";

readStream.on("data", (chunk) => {
  data += chunk;
});

readStream.on("error", (err) => {
  console.error("Error al leer el archivo:", err);
  process.exit(1);
});

readStream.on("end", () => {
  const input = [...data];
  const interpreter = new Interpreter(input);

  const result = interpreter.interpreter();

  console.log(result);
});
