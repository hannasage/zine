const fs = require("fs");

/** Logs options for debugging */
const {
  makeComponentName,
  NAME_REGEX,
  makeAnchorRegex,
} = require("../src/names");
const { path, BLOCK_TXT, LOGIC_TXT } = require("../src/paths");
const { debugLog } = require("../src/debug");

const GENERATOR = "components";
const IMPORT_ANCHOR = "ImportAnchor";
const EXPORT_ANCHOR = "ExportAnchor";

/** Middleware to validate incoming type argument
 *
 * @param type {string} Type argument from CLI
 * @return void
 * */
function invalidTypeCheck(type) {
  if (type !== "block" && type !== "logic")
    console.error(
      `ERROR: <type> must be either logic or block: given "${type}"`
    );
}
/** Provides the correct file type for each type of component
 *
 * @param type {"block" | "logic"} Type argument from CLI
 * @return {"ts" | "tsx"}
 * */
function fileType(type) {
  if (type === "block") return "ts";
  return "tsx";
}
/** Returns proper path constant for type
 *
 * @param type {"block" | "logic"} Type argument from CLI
 * @return string
 * */
function templateFromType(type) {
  if (type === "block") return BLOCK_TXT;
  return LOGIC_TXT;
}
/** Generates the import statement as a string
 *
 * @param name {string} Name argument from CLI
 * @param type {"block" | "logic"}
 * */
function makeComponentImport(name, type) {
  const componentName = makeComponentName(name);
  return `import { ${componentName} } from "./${type}/${componentName}";\n// ${IMPORT_ANCHOR}`;
}
/** Generates the export statement as a string
 *
 * @param name {string} Name argument from CLI
 * */
function makeComponentExport(name) {
  return `export { ${makeComponentName(name)} };\n// ${EXPORT_ANCHOR}`;
}
/** Main entry point for generating components. Handles creation and export of
 * a new zine component
 *
 * @param type {"block" | "logic"} Type argument from CLI
 * @param name {string} Name argument from CLI
 * @param debug {boolean?} Debug argument from CLI
 * */
function makeComponent(type, name, debug) {
  const fileName = `${makeComponentName(name)}.${fileType(type)}`;
  const templatePath = templateFromType(type);
  // Create relative paths
  const indexPath = path(GENERATOR, "index.ts"); // Input only
  const indexPathDebug = path(GENERATOR, "index.ts", debug); // Output only
  const newComponentPath = path(`${GENERATOR}/${type}`, fileName, debug);
  debugLog(debug, indexPath, indexPathDebug, newComponentPath);
  // Read in files
  const templateContents = fs.readFileSync(templatePath, "utf-8");
  const indexContents = fs.readFileSync(indexPath, "utf-8");
  // Modify file contents with regex anchors
  const newComponent = templateContents.replace(
    NAME_REGEX,
    makeComponentName(name)
  );
  const updatedIndex = indexContents
    .replace(makeAnchorRegex(IMPORT_ANCHOR), makeComponentImport(name, type))
    .replace(makeAnchorRegex(EXPORT_ANCHOR), makeComponentExport(name));
  // Write out to file system
  fs.writeFileSync(indexPathDebug, updatedIndex);
  fs.writeFileSync(newComponentPath, newComponent);
}

module.exports = {
  invalidTypeCheck,
  makeComponent,
};
