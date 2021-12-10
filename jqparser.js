// To run this file, do >> node ConfigParser configfile parsingcommands
const readline = require("readline");
const f = require("fs");
const jq = require("node-jq");

const args = process.argv;
console.log(args);

const jsonPath = args[2];
console.log(jsonPath);
const options = { output: "json" };

var commands = args[3];
console.log(commands);
// var rows = readline.createInterface({
//   input: f.createReadStream(commands),
//   ouput: process.stdout,
//   terminal: false,
// });

results = jsonPath;

//const fileStream = fs.createReadStream('input.txt');

const rl = readline.createInterface({
  input: f.createReadStream(commands),
  output: process.stdout,
});

const start = async () => {
  for await (const line of rl) {
    console.log(line);
    filter = line;
    console.log("myfilter is now: " + filter);
    // f.appendFile("./jqTest.txt", JSON.stringify(line) + "\r\n", (err) => {
    //     if (err) throw err;
    //     console.log("complete!");
    //   });
    await jq
      .run(line, jsonPath, options)
      .then((output) => {
        console.log(output);
        f.writeFileSync("data2.json", JSON.stringify(output));
      })
      .catch((err) => {
        console.error(err);
        // Something went wrong...
      });
  }
};
start();

// jq.run(newfilt, jsonPath, options)
//   .then((data) => {
//     f.appendFile("./jqTest.txt", JSON.stringify(data) + "\r\n", (err) => {
//       if (err) throw err;
//       console.log("complete!");
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// console.log("results: " + results);
