import React from "react";

import image1 from "./images/img028.jpg";
import { TemplateName } from "./templates";
import { ZinePageConfig } from "./configs";
import { ZinePage } from "./components";

/* TODO: REMOVE!!! SAMPLE FOR DEVELOPING TEMPLATE!!! */
const testPage = new ZinePageConfig({
  images: [image1],
  viewTimeRequirement: 1000,
  templateId: TemplateName.MAINFRAME,
});

/** Controls the render flow of pages. */
function Zine() {
  return <ZinePage {...testPage} />;
}

export default Zine;
