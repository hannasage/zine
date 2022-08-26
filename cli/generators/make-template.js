const fs = require("fs");
/** Create a dynamic anchor regex. Anchors are easier ways to access the end
 * of object creators (i.e. `.set(...); //anchor`) so you can replace the anchor
 * with the desired string
 *
 * @example
 * ANCHOR_REGEX("TemplateMapAnchor") == //TemplateMapAnchor
 * @param anchorTerm {string} The term in your anchor comment (no whitespace)
 * @return RegExp
 * */
function ANCHOR_REGEX(anchorTerm) {
  return RegExp(`;\\s\\/\\/${anchorTerm.trim()}`);
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
  if (enumKey.includes("-")) return enumKey.replaceAll("-", "_");
  return enumKey;
}
/** Creates a `TemplateSetup` object as a string.
 *
 * @example
 * "{ generator: MyComponentGenerator, rules: MyGeneratorRules }"
 * @param name {string} Name argument from CLI
 * @returns string
 * */
function makeTemplateSetup(name) {
  function template(generatorKey, rulesKey) {
    return `{ generator: ${generatorKey}, rules: ${rulesKey} }`;
  }
}
/** Creates a string to replace the anchor at the end of the TEMPLATE map
 * in `templates/index.ts`
 *
 * @param name {string} Name argument from CLI
 * @return string
 * */
function makeSetupMapEntry(name) {
  return `.set(
    ${makeEnumName(name)},
    ${makeTemplateSetup()}
    ); //TemplateMapAnchor`;
}
/** Creates the full enum class entry as a string.
 *
 * @example
 * 'NAME_PARAM = "name-param"'
 * @param name {string} The name argument from CLI
 * @return string
 * */
function makeEnumEntry(name) {
  return `${makeEnumName(name)} = "${name}"}`;
}
/** Configures pieces for `templates/index.ts` as strings.
 *
 * @param piece {"enum" | "setup"} Type of config piece to create
 * @param name {string} The name argument from CLI
 * @returns string */
function makeConfigPiece(piece, name) {
  if (!name || name === "") throw new Error("Name is a required variable");
  switch (piece) {
    case "enum":
      makeEnumEntry(name);
      break;
    case "setup":
      makeSetupMapEntry(name);
      break;
    default:
      throw new Error(`Not a valid config piece: ${piece}`);
  }
}
/** Main entry point for making a template. This function uses `template.tsx`
 * in the `code-templates` directory to generate files for `src`. It uses string
 * replacement to customize the templates and add their exports to the templates
 * index file.
 *
 * @param name {string} The name argument from CLI
 * @returns void*/
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
    makeConfigPiece()
  );

  fs.writeFileSync("./cli/_test/indexTest.ts", modifiedIndexContents);
  fs.writeFileSync("./cli/_test/templateTest.tsx", modifiedTemplateContents);
}

module.exports = makeTemplate;
