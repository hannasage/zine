#! /usr/bin/env node
const { program } = require("commander");

const makeTemplate = require("./generators/make-template");

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
  .argument("<name>", "The name of your new template")
  .option("-d, --debug", "Show given options on call")
  .description("Create a Zine template and export it from the templates index.")
  .action(function (name, options) {
    makeTemplate(name, debugMode(options));
  });

program.parse();
