const fs = require("fs");

const ENUM_ANCHOR = "TemplateEnumAnchor";
const SETUP_ANCHOR = "TemplateSetupAnchor";
const IMPORT_ANCHOR = "TemplateImportAnchor";

/** Creates a regex to find an anchor (i.e. `// MyAnchor`). Anchors must have
 * no whitespace between words. Matches are case-sensitive, but any case is
 * allowed.
 *
 * @example
 * makeAnchorRegex("TemplateNameAnchor") === "// TemplateNameAnchor"
 * makeAnchorRegex("TemplateMapAnchor", true) === "; // TemplateMapAnchor"
 * @param anchorTerm {string} The term in your anchor comment (no whitespace)
 * @param includeSemicolon {boolean?} Include a semicolon and trailing whitespace in the regex
 * @return RegExp
 * */
function makeAnchorRegex(anchorTerm, includeSemicolon) {
  if (includeSemicolon) {
    return RegExp(`;\\s\\/\\/\\s${anchorTerm.trim()}`);
  }
  return RegExp(`\\/\\/\\s${anchorTerm.trim()}`);
}
/** Makes an `enum` key as a string.
 *
 * @example
 * "my-component" -> "MY_COMPONENT"
 * @param name {string} Name argument from CLI
 * @returns string
 * */
function makeEnumName(name) {
  const enumKey = name.toUpperCase();
  if (enumKey.includes("-")) return enumKey.replace(/-/g, "_");
  return enumKey;
}
/** Make name arg into component name. Component names are templated in new files.
 * This is primarily used for building the code blocks below.
 *
 * @example
 * makeComponentName("test-component") === "TestComponent
 * @param name {string} Name argument from CLI
 * */
function makeComponentName(name) {
  function capitalize(word) {
    return `${word.charAt(0).toUpperCase()}${word.substring(1)}`;
  }
  let words = name.split("-");
  words = words.map((wordInName) => capitalize(wordInName));
  return `${words.join("")}`;
}
/** Proxy to {@link makeComponentName} appended by "Generator"
 * @param name {string} Name argument from CLI
 * */
function makeGeneratorName(name) {
  return `${makeComponentName(name)}Generator`;
}
/** Proxy to {@link makeComponentName} appended by "Rules"
 * @param name {string} Name argument from CLI
 * */
function makeRulesName(name) {
  return `${makeComponentName(name)}Rules`;
}
/** Proxy to {@link makeComponentName} appended by "Template" */
function makeTemplateName(name) {
  return `${makeComponentName(name)}Template`;
}
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
/** Creates a string to replace the anchor in the Imports section of the
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
  let outputDir = "./src/templates";
  if (debug) {
    // Debug options override
    outputDir = "./cli/_test";
  }

  const templateContents = fs.readFileSync(
    "./cli/code-templates/template.txt",
    "utf-8"
  );
  const indexContents = fs.readFileSync("./src/templates/index.ts", "utf-8");

  // TEMP_NAME is a universal anchor in template.txt
  const modifiedTemplateContents = templateContents.replace(
    RegExp(/TEMP_NAME/g),
    makeComponentName(name)
  );
  const modifiedIndexContents = indexContents
    // Add template name to enum
    .replace(makeAnchorRegex(ENUM_ANCHOR), makeEnumEntry(name))
    // Add setup entry to exported template map
    .replace(makeAnchorRegex(SETUP_ANCHOR, true), makeSetupMapEntry(name))
    // Import the template resources
    .replace(makeAnchorRegex(IMPORT_ANCHOR), makeImportEntry(name));

  fs.writeFileSync(`${outputDir}/index.ts`, modifiedIndexContents);
  fs.writeFileSync(
    `${outputDir}/${makeTemplateName(name)}.tsx`,
    modifiedTemplateContents
  );
}

module.exports = makeTemplate;
