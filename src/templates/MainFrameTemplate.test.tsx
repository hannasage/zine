import { render } from "@testing-library/react";

import { BasicTemplateProps } from "../configs/ZinePageConfig";

import { MainFrameTemplate } from "./MainFrameTemplate";

const testConfig: BasicTemplateProps = {
  images: ["sample-src/sample-img.jpg"],
  viewTimeRequirement: 0,
};

describe("MainFrameTemplate", () => {
  test("renders", () => {
    render(<MainFrameTemplate {...testConfig} />);
  });
});
