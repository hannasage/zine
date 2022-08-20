import ZinePageConfig from "../configs/ZinePageConfig";

import { Template } from "./index";

/* TODO: REMOVE!!! SAMPLE FOR DEVELOPING TEMPLATE!!! */
const testPage = new ZinePageConfig({
  images: [],
  viewTimeRequirement: 0,
  captions: undefined,
  templateId: Template.SAMPLE,
});

export const ZinePage = (config: ZinePageConfig) => {
  return <></>;
};
