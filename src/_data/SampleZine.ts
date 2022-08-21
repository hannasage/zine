import { ZinePageConfig } from "../framework/configs";
import { TemplateName } from "../templates";

const page1 = new ZinePageConfig({
  images: ["/images/img002.jpg"],
  viewTimeRequirement: 1000,
  templateId: TemplateName.MAINFRAME,
});

const page2 = new ZinePageConfig({
  images: ["/images/img012.jpg"],
  viewTimeRequirement: 1000,
  templateId: TemplateName.MAINFRAME,
});

const page3 = new ZinePageConfig({
  images: ["/images/img020.jpg"],
  viewTimeRequirement: 1000,
  templateId: TemplateName.MAINFRAME,
});

const PAGES: ZinePageConfig[] = [page1, page2, page3];
export default PAGES;
