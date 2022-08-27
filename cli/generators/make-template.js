const fs = require("fs");
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
  }); // TemplateMapAnchor`;
}
/** Creates a string to replace the anchor in the Imports section of the
 * templates index file
 *
 * @example
 * `import { MyTemplateGenerator, MyTemplateRules } from "./MyTemplate"`
 * @param name {string} Name argument from CLI
 * */
function makeImport(name) {
  return `import { ${makeGeneratorName(name)}, ${makeRulesName(
    name
  )} } from "./${makeComponentName(name)}";\n// TemplateImportAnchor`;
}
/** Creates the full enum class entry as a string.
 *
 * @example
 * 'NAME_PARAM = "name-param"'
 * @param name {string} The name argument from CLI
 * @return string
 * */
function makeEnumEntry(name) {
  return `${makeEnumName(name)} = "${name}",\n  // TemplateNameAnchor`;
}
/** Configures pieces for `templates/index.ts` as strings.
 *
 * @param piece {"enum" | "setup" | "import"} Type of config piece to create
 * @param name {string} The name argument from CLI
 * @returns string */
function makeConfigPiece(piece, name) {
  if (!name || name === "") throw new Error("Name is a required variable");
  switch (piece) {
    case "enum":
      return makeEnumEntry(name);
    case "setup":
      return makeSetupMapEntry(name);
    case "import":
      return makeImport(name);
    default:
      throw new Error(`Not a valid config piece: ${piece}`);
  }
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
  if (name === undefined || name === "")
    throw new Error("Cannot use template generator without {name} argument");
  const templateContents = fs.readFileSync(
    "./code-templates/template.txt",
    "utf-8"
  );
  const indexContents = fs.readFileSync("./src/templates/index.ts", "utf-8");

  const modifiedTemplateContents = templateContents.replace(
    RegExp(/TEMP_NAME/g),
    makeComponentName(name)
  );
  const modifiedIndexContents = indexContents
    .replace(
      makeAnchorRegex("TemplateNameAnchor"),
      makeConfigPiece("enum", name)
    )
    .replace(
      makeAnchorRegex("TemplateMapAnchor", true),
      makeConfigPiece("setup", name)
    )
    .replace(
      makeAnchorRegex("TemplateImportAnchor"),
      makeConfigPiece("import", name)
    );

  fs.writeFileSync("./src/templates/index.ts", modifiedIndexContents);
  fs.writeFileSync(
    `./src/templates/${makeComponentName(name)}.tsx`,
    modifiedTemplateContents
  );
}

module.exports = makeTemplate;
