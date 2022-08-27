#! /usr/bin/env node
const { program } = require("commander");

const makeTemplate = require("./generators/make-template");
const {
  makeComponent,
  invalidTypeCheck,
  debugOptions,
} = require("./generators/make-coponent");

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

program.parse();
