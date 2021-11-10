const core = require("@actions/core");
const fs = require("fs");
const yamlFront = require("yaml-front-matter");
const glob = require("glob");

function main() {
  try {
    // const inputDirectory = "./demo";
    const inputDirectory = core.getInput("input-directory");

    // const jsonRelativePaths = getGlobbedPaths(inputDirectory);

    const json = processDir(inputDirectory);

    // fs.writeFileSync("a", JSON.stringify(json, null, 2));
    // console.log("out", json);
    core.setOutput("output", json);
  } catch (error) {
    core.setFailed(error.message);
  }

  function processDir(dir) {
    const contents = readDirectory(dir);
    const results = contentToJSON(contents);
    return results;
  }
}

function getGlobbedPaths(inputDirectory) {
  return inputDirectory.split(",").reduce((accum, current) => {
    if (current.indexOf("*") === -1) {
      return [...accum, current];
    }

    const globFormula = current.replace(/\\/, "/");
    const expandedGlob = glob.sync(globFormula, {});
    return [...accum, ...expandedGlob];
  }, []);
}

function contentToJSON(contents) {
  const nameOfContentField = core.getInput("content-field");
  // const nameOfContentField = "description";
  const results = contents.map((content) =>
    yamlFront.loadFront(content, { contentKeyName: nameOfContentField })
  );
  return results;
}

function readDirectory(inputDirectory) {
  const files = fs
    .readdirSync(`${inputDirectory}`)
    .filter((fn) => fn.endsWith(".md"));

  const contents = files.map((file) =>
    fs.readFileSync(`${inputDirectory}/${file}`)
  );
  return contents;
}

main();
