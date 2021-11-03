const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
const yamlFront = require("yaml-front-matter");

const outputFilename = "demo.json";

try {
  // const inputDirectory = core.getInput("input-directory");
  const inputDirectory = "./demo";
  const files = fs.readdirSync(`${inputDirectory}`);

  const contents = files.map((file) =>
    fs.readFileSync(`${inputDirectory}/${file}`)
  );

  const results = contents.map((content) =>
    yamlFront.loadFront(content, { contentKeyName: "content" })
  );

  // fs.writeFileSync(outputFilename, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  core.setOutput("output", JSON.stringify(results, null, 2));
} catch (error) {
  core.setFailed(error.message);
}
