import React from "react";

import image1 from "./images/img028.jpg";
import image2 from "./images/img024.jpg";
import image3 from "./images/img029-edit.jpg";
import image4 from "./images/img002.jpg";
import image5 from "./images/img020.jpg";
import image6 from "./images/img012.jpg";
import { Template } from "./templates";
import { ZinePageConfig } from "./configs";
import { ZinePage } from "./components";

/* TODO: REMOVE!!! SAMPLE FOR DEVELOPING TEMPLATE!!! */
const testPage = new ZinePageConfig({
  images: [image1, image2, image3, image4, image5, image6],
  viewTimeRequirement: 0,
  captions: undefined,
  templateId: Template.SAMPLE,
});

/** Controls the render flow of pages. */
function Zine() {
  return <ZinePage {...testPage} />;
}

export default Zine;
