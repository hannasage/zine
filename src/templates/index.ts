import { TemplateBundle } from "../framework";

import MainFrameBundle from "./MainFrame/MainFrameBundle";

export enum TemplateName {
  SAMPLE = "sample",
  MAINFRAME = "main-frame",
}

export const TEMPLATE_BUNDLES = new Map<TemplateName, TemplateBundle>().set(
  TemplateName.MAINFRAME,
  MainFrameBundle
);
