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
/** */
function isRule(type) {
  return type === "rule";
}
/** */
function getFolder(type) {
  return isRule(type) ? RULES_FOLDER : HOOKS_FOLDER;
}
/** */
function getExportAnchor(type) {
  return isRule(type) ? RULE_EXPORT_ANCHOR : HOOK_EXPORT_ANCHOR;
}
/** */
function getTemplateTxt(type) {
  return isRule(type) ? RULE_TXT : HOOK_TXT;
}
/** */
function extensionTypeName(type, componentName) {
  return isRule(type) ? `${componentName}Check` : `use${componentName}`;
}
/** */
function makeExtensionFileName(type, name) {
  const componentName = makeComponentName(name, isRule(type));
  const typedName = extensionTypeName(type, componentName);
  return `${typedName}.ts`;
}
/** Generates the import statement as a string
 *
 * @param name {string} Name argument from CLI
 * @param type {"rule" | "hook"} Type argument from CLI
 * */
function makeExtensionImport(name, type) {
  const componentName = makeComponentName(name, isRule(type));
  const importName = extensionTypeName(type, componentName);
  const importFolder = `./${getFolder(type)}/${importName}`;
  function template(transformedName, folder) {
    return `import { ${transformedName} } from "${folder}";\n// ${IMPORT_ANCHOR}`;
  }
  return template(importName, importFolder);
}
/** Generates the export statement as a string
 *
 * @param name {string} Name argument from CLI
 * @param type {"hook" | "rule"}
 * */
function makeRuleExport(name, type) {
  const extensionName = extensionTypeName(
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
  const fileName = `${getFolder(type)}/${makeExtensionFileName(type, name)}`;

  const savePath = path(GENERATOR, fileName, debug);
  const indexPath = path(GENERATOR, "index.ts");
  const indexPathDebug = path(GENERATOR, "index.ts", debug);
  debugLog(debug, fileName, savePath, indexPath, indexPathDebug);

  const indexFile = fs.readFileSync(indexPath, "utf-8");
  const templateFile = fs.readFileSync(getTemplateTxt(type), "utf-8");

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

  fs.writeFileSync(indexPathDebug, updatedIndex);
  fs.writeFileSync(savePath, generatedTemplate);
}

module.exports = {
  makeRule: makeExtension,
};
