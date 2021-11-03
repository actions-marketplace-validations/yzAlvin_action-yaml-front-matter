const core = require("@actions/core");
const fs = require("fs");
const yamlFront = require("yaml-front-matter");

try {
  const inputDirectory = core.getInput("input-directory");
  const files = fs.readdirSync(`${inputDirectory}`);

  const contents = files.map((file) =>
    fs.readFileSync(`${inputDirectory}/${file}`)
  );

  const nameOfContentField = core.getInput("content-field");
  const results = contents.map((content) =>
    yamlFront.loadFront(content, { contentKeyName: nameOfContentField })
  );

  const json = JSON.stringify(results, null, 2);
  core.setOutput("output", json);
} catch (error) {
  core.setFailed(error.message);
}
