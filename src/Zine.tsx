import React from "react";

import image1 from "./images/img028.jpg";
import image2 from "./images/img020.jpg";
import image3 from "./images/img012.jpg";
import { TemplateName } from "./templates";
import { ZinePageConfig } from "./configs";
import { ZinePage } from "./components";
import { useAvailablePages } from "./framework/useAvailablePages";

/* TODO: REMOVE!!! SAMPLE FOR DEVELOPING TEMPLATE!!! */
const testPage1 = new ZinePageConfig({
  images: [image1],
  viewTimeRequirement: 1000,
  templateId: TemplateName.MAINFRAME,
});
const testPage2 = new ZinePageConfig({
  images: [image2],
  viewTimeRequirement: 1000,
  templateId: TemplateName.MAINFRAME,
});
const testPage3 = new ZinePageConfig({
  images: [image3],
  viewTimeRequirement: 1000,
  templateId: TemplateName.MAINFRAME,
});

/** Controls the render flow of pages. */
function Zine() {
  const pages = useAvailablePages([testPage1, testPage2, testPage3]);
  return (
    <>
      {pages.map((config, idx) => (
        <ZinePage key={`${idx}-${config.templateId}`} {...config} />
      ))}
    </>
  );
}

export default Zine;
