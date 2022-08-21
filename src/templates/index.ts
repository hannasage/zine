import { TemplateBundle } from "../framework/Template";

import {
  mainFrameGenerator,
  mainFramePropValidator,
  MainFrameTemplate,
} from "./MainFrameTemplate";

export enum TemplateName {
  SAMPLE = "sample",
  MAINFRAME = "main-frame",
}

export const mainFrameBundle = new TemplateBundle({
  id: TemplateName.MAINFRAME,
  generator: mainFrameGenerator,
  validator: mainFramePropValidator,
});

export const TEMPLATE_MAP = new Map<TemplateName, TemplateBundle>().set(
  TemplateName.MAINFRAME,
  mainFrameBundle
);

export { MainFrameTemplate };
