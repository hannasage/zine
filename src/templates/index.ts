import { TemplateSetup } from "../framework";

import { mainFrameGenerator, mainFrameRules } from "./MainFrame/MainFrameSetup";

/** Keys to the TEMPLATES array. */
export enum TemplateName {
  SAMPLE = "sample",
  MAINFRAME = "main-frame",
}

/** Main export for the `templates` module. Any other module using a template
 * will retrieve the setup from here, hydrate a TemplateBundle, and use the
 * bundle to validate and render the template with props */
export const TEMPLATES = new Map<TemplateName, TemplateSetup>().set(
  TemplateName.MAINFRAME,
  { generator: mainFrameGenerator, rules: mainFrameRules }
); //anchor
