const core = require("@actions/core");
const fs = require("fs");
const yamlFront = require("yaml-front-matter");

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

  const escapedResults = results.map((r) => {
    return { ...r, [nameOfContentField]: escapeHtml(r[nameOfContentField]) };
  });

  const json = JSON.stringify(escapedResults, null, 2);
  core.setOutput("output", json);
} catch (error) {
  core.setFailed(error.message);
}
