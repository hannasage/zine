const fs = require("fs");

const {
  makeComponentName,
  NAME_REGEX,
  makeAnchorRegex,
} = require("../src/names");
const { path, RULE_TXT, HOOK_TXT } = require("../src/paths");
const { debugLog } = require("../src/debug");

const GENERATOR = "framework";
const RULES_FOLDER = "extensions-rules";
const HOOKS_FOLDER = "extensions-hooks";
const IMPORT_ANCHOR = "FrameworkImportAnchor";
const RULE_EXPORT_ANCHOR = "RuleExportAnchor";
const HOOK_EXPORT_ANCHOR = "HookExportAnchor";

/** Middleware to validate options from CLI
 * @param options {any} Options from CLI
 * */
function validateExtensionOptions(options) {
  const { type } = options;
  if (!type || (type !== "hook" && type !== "rule"))
    throw Error(`Invalid type: ${type}. Valid extension types: rule, hook`);
}
/** Easy extension type check
 * @param type {"rule" | "hook"}
 * */
function isRule(type) {
  return type === "rule";
}
/** Returns correct extension folder
 * @param type {"rule" | "hook"}
 * */
function getFolder(type) {
  return isRule(type) ? RULES_FOLDER : HOOKS_FOLDER;
}
/** Returns the right export anchor
 * @param type {"rule" | "hook"}
 * */
function getExportAnchor(type) {
  return isRule(type) ? RULE_EXPORT_ANCHOR : HOOK_EXPORT_ANCHOR;
}
/** Returns the right template txt file
 * @param type {"rule" | "hook"}
 * */
function getTemplateTxt(type) {
  return isRule(type) ? RULE_TXT : HOOK_TXT;
}
/** Modifies the name of the function based on type
 * @param type {"rule" | "hook"}
 * @param componentName {string} Name argument modified by {@link makeComponentName}
 * */
function makeExtensionFunctionName(type, componentName) {
  return isRule(type) ? `${componentName}Check` : `use${componentName}`;
}
/** Modifies the filename of the extension based on type
 * @param type {"rule" | "hook"}
 * @param name {string} Name argument from CLI
 * */
function makeExtensionFileName(type, name) {
  const componentName = makeComponentName(name, isRule(type));
  const functionName = makeExtensionFunctionName(type, componentName);
  return `${functionName}.ts`;
}
/** Generates the import statement as a string
 * @param name {string} Name argument from CLI
 * @param type {"rule" | "hook"} Type argument from CLI
 * */
function makeExtensionImport(name, type) {
  const componentName = makeComponentName(name, isRule(type));
  const importName = makeExtensionFunctionName(type, componentName);
  const importFolder = `./${getFolder(type)}/${importName}`;
  function template(transformedName, folder) {
    return `import { ${transformedName} } from "${folder}";\n// ${IMPORT_ANCHOR}`;
  }
  return template(importName, importFolder);
}
/** Generates the export statement as a string
 * @param name {string} Name argument from CLI
 * @param type {"hook" | "rule"}
 * */
function makeRuleExport(name, type) {
  const extensionName = makeExtensionFunctionName(
    type,
    makeComponentName(name, isRule(type))
  );
  function template(transformedName) {
    return `export { ${transformedName} };\n// ${getExportAnchor(type)}`;
  }
  return template(extensionName);
}
/** Main entry point for rule generation.
 * @param name {string} Name argument from CLI
 * @param type {"hook" | "rule"} Options from CLI
 * @param debug {boolean?} Debug argument from CLI
 * */
function makeExtension(name, type, debug) {
  // File name includes dynamic extension folder
  const fileName = `${getFolder(type)}/${makeExtensionFileName(type, name)}`;
  // Create paths
  const savePath = path(GENERATOR, fileName, debug);
  const indexPath = path(GENERATOR, "index.ts");
  const indexPathDebug = path(GENERATOR, "index.ts", debug);
  debugLog(debug, fileName, savePath, indexPath, indexPathDebug);
  // Read in index and template
  // Dynamic, based on type
  const indexFile = fs.readFileSync(indexPath, "utf-8");
  const templateFile = fs.readFileSync(getTemplateTxt(type), "utf-8");
  // Update files with dynamic content
  const updatedIndex = indexFile
    .replace(makeAnchorRegex(IMPORT_ANCHOR), makeExtensionImport(name, type))
    .replace(
      makeAnchorRegex(getExportAnchor(type)),
      makeRuleExport(name, type)
    );
  const generatedTemplate = templateFile.replace(
    NAME_REGEX,
    makeComponentName(name, isRule(type))
  );
  // Write changes
  fs.writeFileSync(indexPathDebug, updatedIndex);
  fs.writeFileSync(savePath, generatedTemplate);
}

module.exports = {
  makeExtension,
  validateExtensionOptions,
};
