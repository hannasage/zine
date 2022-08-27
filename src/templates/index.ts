/* eslint-disable */
import { TemplateSetup } from "../framework";

import { MainFrameGenerator, MainFrameRules } from "./MainFrameTemplate";
// TemplateImportAnchor

/** Keys to the TEMPLATES array. */
export enum TemplateName {
  SAMPLE = "sample",
  MAIN_FRAME = "main-frame",
  // TemplateNameAnchor
}

/** Main export for the `templates` module. Any other module using a template
 * will retrieve the setup from here, hydrate a TemplateBundle, and use the
 * bundle to validate and render the template with props */
export const TEMPLATES = new Map<TemplateName, TemplateSetup>()
  .set(TemplateName.MAIN_FRAME,{
    generator: MainFrameGenerator,
    rules: MainFrameRules,
  }); // TemplateMapAnchor
