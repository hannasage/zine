import { TemplateSetup } from "../framework";

import {
  imageLengthRule,
  mainFrameGenerator,
  viewTimeMinimumRule,
} from "./MainFrame/MainFrameSetup";

export enum TemplateName {
  SAMPLE = "sample",
  MAINFRAME = "main-frame",
}

export const TEMPLATES = new Map<TemplateName, TemplateSetup>().set(
  TemplateName.MAINFRAME,
  {
    id: TemplateName.MAINFRAME,
    generator: mainFrameGenerator,
    rules: [imageLengthRule, viewTimeMinimumRule],
  }
);
