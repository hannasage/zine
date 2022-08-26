const fs = require("fs");

function ANCHOR_REGEX(anchorTerm) {
  return RegExp(`;\\s\\/\\/${anchorTerm}`);
}

function templateMapCode(enumName, generatorName, rulesName) {
  return `.set(
    ${enumName},
    { generator: ${generatorName}, rules: ${rulesName} }
    );`;
}

function makeEnum(name) {
  const enumKey = name.toUpperCase();
  if (enumKey.includes("-")) {
    return `${enumKey.replaceAll("-", "_")} = "${name}"`;
  }
  return `${enumKey} = "${name}"}`;
}

function makeRules(name) {
  function template(generatorKey, rulesKey) {
    return `{ generator: ${generatorKey}, rules: ${rulesKey} }`;
  }
}

function makeGenerator(name) {
  function template(templateComponentName) {
    return `export const ${templateComponentName}Generator = () => <${templateComponentName} />`;
  }
}

function makeConfigPiece(type, name) {
  if (!name || name === "") throw new Error("Name is a required variable");
  switch (type) {
    case "enum":
      makeEnum(name);
      break;
    case "generator":
      makeGenerator(name);
      break;
    case "rules":
      makeRules(name);
      break;
    default:
      throw new Error(`Not a valid name type: ${type}`);
  }
}

function makeTemplate(name) {
  const templateContents = fs.readFileSync(
    "./code-templates/template.tsx",
    "utf-8"
  );
  const indexContents = fs.readFileSync("./src/templates/index.ts", "utf-8");

  const modifiedTemplateContents = templateContents.replace(
    RegExp(/TEMP_NAME/g),
    "TEST_SUCCEEDED"
  );
  const modifiedIndexContents = indexContents.replace(
    ANCHOR_REGEX("anchor"),
    templateMapCode()
  );

  fs.writeFileSync("./cli/_test/indexTest.ts", modifiedIndexContents);
  fs.writeFileSync("./cli/_test/templateTest.tsx", modifiedTemplateContents);
}

module.exports = makeTemplate;
