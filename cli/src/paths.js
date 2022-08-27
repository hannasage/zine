/* All paths relative from Zine project root */

const TEMPLATE_TXT = "./cli/code-templates/template.txt";
const BLOCK_TXT = "./cli/code-templates/block.ts";
const LOGIC_TXT = "./cli/code-templates/logic.tsx";

/** Returns the relative path with debug override
 *
 * @example
 * "./src/templates/index.ts"
 * "./cli/_test/index.ts" // debug mode
 * @param generator {"templates" | "components"}
 * @param file {string} Name of file (including extension)
 * @param debug {boolean?} Debug mode flag
 * */
function path(generator, file, debug) {
  let outputDir = `./src/${generator}`;
  if (debug) {
    // Debug options override
    outputDir = "./cli/_test";
  }
  return `${outputDir}/${file}`;
}

module.exports = {
  TEMPLATE_TXT,
  BLOCK_TXT,
  LOGIC_TXT,
  path,
};
