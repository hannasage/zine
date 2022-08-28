const fs = require("fs");

const {
  makeComponentName,
  NAME_REGEX,
  makeAnchorRegex,
} = require("../src/names");
const { path, RULE_TXT } = require("../src/paths");
const { debugLog } = require("../src/debug");

const GENERATOR = "framework";
const FOLDER = "extensions-rules";
const IMPORT_ANCHOR = "FrameworkImportAnchor";
const EXPORT_ANCHOR = "RuleExportAnchor";

/** Generates the import statement as a string
 *
 * @param name {string} Name argument from CLI
 * */
function makeRuleImport(name) {
  const componentName = makeComponentName(name, true);
  return `import { ${componentName} } from "./${FOLDER}/${componentName}";\n// ${IMPORT_ANCHOR}`;
}
/** Generates the export statement as a string
 *
 * @param name {string} Name argument from CLI
 * */
function makeRuleExport(name) {
  return `export { ${makeComponentName(name, true)} };\n// ${EXPORT_ANCHOR}`;
}
/** Main entry point for rule generation.
 * @param name {string} Name argument from CLI
 * @param debug {boolean?} Debug argument from CLI
 * */
function makeRule(name, debug) {
  const fileName = `${FOLDER}/${makeComponentName(name, true)}.ts`;
  const savePath = path(GENERATOR, fileName, debug);
  const indexPath = path(GENERATOR, "index.ts");
  const indexPathDebug = path(GENERATOR, "index.ts", debug);
  debugLog(debug, fileName, savePath, indexPath, indexPathDebug);

  const indexFile = fs.readFileSync(indexPath, "utf-8");
  const templateFile = fs.readFileSync(RULE_TXT, "utf-8");

  const updatedIndex = indexFile
    .replace(makeAnchorRegex(IMPORT_ANCHOR), makeRuleImport(name))
    .replace(makeAnchorRegex(EXPORT_ANCHOR), makeRuleExport(name));

  const generatedTemplate = templateFile.replace(
    NAME_REGEX,
    makeComponentName(name, true)
  );

  fs.writeFileSync(indexPathDebug, updatedIndex);
  fs.writeFileSync(savePath, generatedTemplate);
}

module.exports = {
  makeRule,
};
