import { ZinePageConfig } from "../../configs";
import { TemplateName } from "../../templates";

import { image1, image2, image3 } from "./index";

const page1 = new ZinePageConfig({
  images: [image1],
  viewTimeRequirement: 1000,
  templateId: TemplateName.MAINFRAME,
});

const page2 = new ZinePageConfig({
  images: [image2],
  viewTimeRequirement: 1000,
  templateId: TemplateName.MAINFRAME,
});

const page3 = new ZinePageConfig({
  images: [image3],
  viewTimeRequirement: 1000,
  templateId: TemplateName.MAINFRAME,
});

const PAGES: ZinePageConfig[] = [page1, page2, page3];
export default PAGES;
