const fs = require("fs");

const LOGIC_KEY = "logic";
const BLOCK_KEY = "block";
const TEMPLATE_KEY = "template";

const CODE_TEMPLATES = new Map()
  .set(LOGIC_KEY, "./code-templates/logic.tsx")
  .set(BLOCK_KEY, "./code-templates/block.ts")
  .set(TEMPLATE_KEY, "./code-templates/block.ts");

const INDEXES = new Map().set(LOGIC_KEY, "").set(BLOCK_KEY, "");

function ANCHOR_REGEX(anchorTerm) {
  return `\\);\\s\\/\\/${anchorTerm}`;
}
function getSource(key, map) {
  const template = map.get(key);
  if (!template) throw new Error(`Could not find template: ${key}`);
  return template;
}

function getTemplate(key) {
  return getSource(key, CODE_TEMPLATES);
}
function getIndex(key) {
  return getSource(key, INDEXES);
}

function makeTemplate() {
  const templateContents = fs.readFileSync(getTemplate(TEMPLATE_KEY), "utf-8");
  const indexContents = fs.readFileSync(getIndex(TEMPLATE_KEY), "utf-8");

  const modifiedTemplateContents = templateContents.replace("TEMP_NAME", "");
  const modifiedIndexContents = indexContents.replace(
    ANCHOR_REGEX("map-anchor"),
    ""
  );

  fs.writeFileSync("./_test/indexTest.ts", modifiedIndexContents);
  fs.writeFileSync("./_test/templateTest.tsx", modifiedTemplateContents);
}

module.exports = makeTemplate;
