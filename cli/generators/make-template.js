const fs = require("fs");

const {
  makeEnumName,
  makeGeneratorName,
  makeRulesName,
  makeTemplateName,
  makeComponentName,
  makeAnchorRegex,
  NAME_REGEX,
} = require("../src/names");
const { TEMPLATE_TXT, path } = require("../src/paths");

const GENERATOR = "templates";
const ENUM_ANCHOR = "TemplateEnumAnchor";
const SETUP_ANCHOR = "TemplateSetupAnchor";
const IMPORT_ANCHOR = "TemplateImportAnchor";

/** Creates a string to replace the anchor at the end of the TEMPLATE map
 * in `templates/index.ts`
 *
 * @param name {string} Name argument from CLI
 * @return string
 * */
function makeSetupMapEntry(name) {
  return `\r\n\t.set(TemplateName.${makeEnumName(name)}, {
    generator: ${makeGeneratorName(name)},
    rules: ${makeRulesName(name)},
  }); // ${SETUP_ANCHOR}`;
}
/** Creates a string to replace the anchor in the Import section of the
 * templates index file
 *
 * @example
 * `import { MyTemplateGenerator, MyTemplateRules } from "./MyTemplate"`
 * @param name {string} Name argument from CLI
 * */
function makeImportEntry(name) {
  return `import { ${makeGeneratorName(name)}, ${makeRulesName(
    name
  )} } from "./${makeTemplateName(name)}";\n// ${IMPORT_ANCHOR}`;
}
/** Creates the full enum class entry as a string.
 *
 * @example
 * 'NAME_PARAM = "name-param"'
 * @param name {string} The name argument from CLI
 * @return string
 * */
function makeEnumEntry(name) {
  return `${makeEnumName(name)} = "${name}",\n  // ${ENUM_ANCHOR}`;
}
/** Main entry point for making a template. This function uses `template.txt`
 * in the `code-templates` directory to generate files for `src`. It uses string
 * replacement to customize the templates and add their exports to the templates
 * index file.
 *
 * @param name {string} The name argument from CLI
 * @param debug {boolean?} Debug mode flag
 * @returns void*/
function makeTemplate(name, debug) {
  // New template's file name
  const fileName = `${makeTemplateName(name)}.tsx`;
  // Create relative paths
  const indexPath = path(GENERATOR, "index.ts"); // Input only
  const indexPathDebug = path(GENERATOR, "index.ts", debug); // Output only
  const newTemplatePath = path(GENERATOR, fileName, debug);
  // Read in files
  const templateContents = fs.readFileSync(TEMPLATE_TXT, "utf-8");
  const indexContents = fs.readFileSync(indexPath, "utf-8");
  // TEMP_NAME is a universal anchor in template.txt
  const modifiedTemplateContents = templateContents.replace(
    NAME_REGEX,
    makeComponentName(name)
  );
  const modifiedIndexContents = indexContents
    // Add template name to enum
    .replace(makeAnchorRegex(ENUM_ANCHOR), makeEnumEntry(name))
    // Add setup entry to exported template map
    .replace(makeAnchorRegex(SETUP_ANCHOR, true), makeSetupMapEntry(name))
    // Import the template resources
    .replace(makeAnchorRegex(IMPORT_ANCHOR), makeImportEntry(name));
  // Output to file (debuggable will go to _test)
  fs.writeFileSync(indexPathDebug, modifiedIndexContents);
  fs.writeFileSync(newTemplatePath, modifiedTemplateContents);
}

module.exports = makeTemplate;
