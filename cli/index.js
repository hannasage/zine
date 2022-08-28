#! /usr/bin/env node
const { program } = require("commander");

const makeTemplate = require("./generators/make-template");
const {
  makeComponent,
  invalidTypeCheck,
} = require("./generators/make-coponent");
const { debugOptions } = require("./src/debug");
const {
  validateExtensionOptions,
  makeExtension,
} = require("./generators/make-extension");

function debugMode(options) {
  return options?.debug !== undefined;
}

program
  .name("Zine CLI")
  .description(
    "Used to generate templates, components, and features for the Zine ecosystem."
  )
  .version("1.0.0");

program
  .command("template")
  .description("Create a Zine template and export it from the templates index.")
  .argument("<name>", "The name of your new template")
  .option("-d, --debug", "Enable debug mode")
  .action(function (name, options) {
    makeTemplate(name, debugMode(options));
  });

program
  .command("component")
  .description("Create a Zine component and export it")
  .argument("<name>", "The name of your new component")
  .requiredOption("-t, --type <type>", "Define component type, block or logic")
  .option("-d, --debug", "Enable debug mode")
  .action(function (name, options) {
    const { type, debug } = options;
    debugOptions(options);
    invalidTypeCheck(type);
    makeComponent(type, name, debug);
  });

program
  .command("extension")
  .description("Create a Zine template rule and export it")
  .argument("<name>", "Name of the rule")
  .requiredOption("-t, --type <type>", "Define type of extension")
  .option("-d, --debug", "Enable debug mode")
  .action(function (name, options) {
    const { debug, type } = options;
    debugOptions(debug);
    validateExtensionOptions(options);
    makeExtension(name, type, debug);
  });

program.parse();
