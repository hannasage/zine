import { render } from "@testing-library/react";

import ZinePageConfig from "../configs/ZinePageConfig";
import { TemplateName } from "../templates";

import { ZinePage } from "./ZinePage";

const testConfig = new ZinePageConfig({
  images: [],
  viewTimeRequirement: 0,
  captions: undefined,
  templateId: TemplateName.SAMPLE,
});

describe("ZinePage", () => {
  test("ZinePage renders", () => {
    render(<ZinePage {...testConfig} />);
  });
});
