#! /usr/bin/env node
const { program } = require("commander");

const makeTemplate = require("./generators/make-template");

program
  .option("-d, --debug", "Show given options on call")
  .option("-t, --template", "Create a new Zine template")
  .argument("<name>", "Desired name of the template")
  .description(
    "Create a Zine template and export it from the templates index."
  );

program.parse(process.argv);

const options = program.opts();
console.log(options);
if (options.template) {
  makeTemplate(options.template);
}
