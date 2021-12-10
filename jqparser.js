// To run this file, do >> node jqparser <jsonfile> <filters>
// For instance, node jqparser sample.json filters.txt

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

results = jsonPath;

const rl = readline.createInterface({
  input: f.createReadStream(commands),
  output: process.stdout,
});

const start = async () => {
  for await (const line of rl) {
    console.log(line);
    filter = line;
    console.log("myfilter is now: " + filter);
    await jq
      .run(line, jsonPath, options)
      .then((output) => {
        console.log(output);
        f.writeFileSync(jsonPath, JSON.stringify(output));
      })
      .catch((err) => {
        console.error(err);
        // Something went wrong...
      });
  }
};
start();
