import { TemplateName } from "../templates";

import ZinePageConfig from "./ZinePageConfig";
import CaptionConfig from "./CaptionConfig";

const imgRefArray = ["ref1", "ref2", "ref3"];
const timeout = 2000;
const captions = [new CaptionConfig()];
const template = TemplateName.SAMPLE;

describe("ZinePageConfig", () => {
  test("constructor", () => {
    const testConfig = new ZinePageConfig({
      images: imgRefArray,
      viewTimeRequirement: timeout,
      captions: captions,
      templateId: template,
    });

    expect(testConfig.images).toEqual(imgRefArray);
    expect(testConfig.viewTimeRequirement).toEqual(timeout);
    expect(testConfig.captions).toEqual(captions);
    expect(testConfig.templateId).toEqual(template);
  });
});
