#! /usr/bin/env node
const { program } = require("commander");

const makeTemplate = require("./generators/make-template");

program
  .option("-t, --template")
  .description(
    "Create a Zine template and export it from the templates index."
  );

program.parse();

if (program.opts().template) {
  makeTemplate();
}
