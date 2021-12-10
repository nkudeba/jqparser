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
  console.log("Updating configs...")
  console.log("Successes will be logged in successes.txt; failure will be logged in errors.txt")
  for await (const line of rl) {
    // console.log(line);
    
    await jq
      .run(line, jsonPath, options)
      .then((output) => {
        // console.log(line);
        f.writeFileSync(jsonPath, JSON.stringify(output));
        f.appendFile("./successes.txt", JSON.stringify(line) + "\r\n", (err) => {
          if (err) throw err;
          // console.log("complete!");
        });
      })
      .catch((err) => {
        console.error(err);
        f.appendFile("./errors.txt", JSON.stringify(line) + "\r\n", (err) => {
          if (err) throw err;
          console.log("failed!");
        });
        // Something went wrong...
      });
  }
};
start();
