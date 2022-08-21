import React from "react";

import image1 from "./images/img028.jpg";
import image2 from "./images/img020.jpg";
import image3 from "./images/img012.jpg";
import { TemplateName } from "./templates";
import { ZinePageConfig } from "./configs";
import { TemplateErrorBoundary, ZinePage } from "./components";
import { useAvailablePages } from "./framework/useAvailablePages";
// import { ZinePageConfig } from "./configs";
// import { image1, image2, image3 } from "./_data/Sample";
// import { TemplateName } from "./templates";
// import PAGES from "./_data/Sample/zineConfig";

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

/** Controls the render flow of pages. */
function Zine() {
  const pages = useAvailablePages(PAGES);
  return (
    <TemplateErrorBoundary>
      {pages.map((config, idx) => (
        <ZinePage key={`${idx}-${config.templateId}`} {...config} />
      ))}
    </TemplateErrorBoundary>
  );
}

export default Zine;
