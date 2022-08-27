/** Logs options for debugging */
const { makeComponentName } = require("../src/names");
const { path } = require("../src/paths");

const GENERATOR = "components";
/** Middleware for debug mode */
function debugOptions(options) {
  if (options.debug) console.log(options);
}
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
 * @param type {"block" | "logic"} Type argument from CLI
 * */
function fileType(type) {
  if (type === "block") return "ts";
  return "tsx";
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
  // Create relative paths
  const indexPath = path(GENERATOR, "index.ts"); // Input only
  const indexPathDebug = path(GENERATOR, "index.ts", debug); // Output only
  const newComponentPath = path(`${GENERATOR}/${type}`, fileName, debug);

  console.log({
    fileName,
    indexPath,
    indexPathDebug,
    newComponentPath,
  });
}

module.exports = {
  invalidTypeCheck,
  makeComponent,
  debugOptions,
};
