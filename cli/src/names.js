/** Replacement regex for code-template files */
const NAME_REGEX = RegExp(/TEMP_NAME/g);
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

module.exports = {
  makeComponentName,
  makeEnumName,
  makeAnchorRegex,
  NAME_REGEX,
};
