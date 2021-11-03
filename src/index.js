const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
const yamlFront = require("yaml-front-matter");

const inputDirectory = "./release";
const outputFilename = "release.json";

try {
  const files = fs.readdirSync(`${inputDirectory}`);

  const contents = files.map((file) =>
    fs.readFileSync(`${inputDirectory}/${file}`)
  );

  const results = contents.map((content) =>
    yamlFront.loadFront(content, { contentKeyName: "content" })
  );

  // fs.writeFileSync(outputFilename, JSON.stringify(results, null, 2));

  console.log(JSON.stringify(results, null, 2));

  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
