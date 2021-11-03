const core = require("@actions/core");
const fs = require("fs");
const yamlFront = require("yaml-front-matter");

try {
  const inputDirectory = core.getInput("input-directory");
  const files = fs.readdirSync(`${inputDirectory}`);

  const contents = files.map((file) =>
    fs.readFileSync(`${inputDirectory}/${file}`)
  );

  const results = contents.map((content) =>
    yamlFront.loadFront(content, { contentKeyName: "content" })
  );

  core.setOutput("output", JSON.stringify(results, null, 2));
} catch (error) {
  core.setFailed(error.message);
}
