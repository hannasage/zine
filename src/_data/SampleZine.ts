import { ZinePageConfig } from "../framework";
import { TemplateName } from "../templates";

const page1 = new ZinePageConfig({
  images: ["/images/img002.jpg"],
  viewTimeRequirement: 10000,
  templateId: TemplateName.MAINFRAME,
});

const page2 = new ZinePageConfig({
  images: ["/images/img012.jpg"],
  viewTimeRequirement: 5000,
  templateId: TemplateName.MAINFRAME,
});

const page3 = new ZinePageConfig({
  images: ["/images/img020.jpg"],
  viewTimeRequirement: 5000,
  templateId: TemplateName.MAINFRAME,
});

const SampleZine: ZinePageConfig[] = [page1, page2, page3];
export default SampleZine;
