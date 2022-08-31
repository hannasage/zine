import { ZinePageConfig } from "../framework";
import { TemplateName } from "../templates";

const page1 = new ZinePageConfig({
  images: ["/images/img002.jpg", "/images/img012.jpg", "/images/img020.jpg"],
  viewTimeRequirement: 0,
  templateId: TemplateName.THREES_FRAME,
});

const page2 = new ZinePageConfig({
  images: ["/images/img012.jpg"],
  viewTimeRequirement: 0,
  templateId: TemplateName.MAIN_FRAME,
});

const page3 = new ZinePageConfig({
  images: ["/images/img020.jpg"],
  viewTimeRequirement: 0,
  templateId: TemplateName.MAIN_FRAME,
});

const SampleZine: ZinePageConfig[] = [page1, page2, page3];
export default SampleZine;
