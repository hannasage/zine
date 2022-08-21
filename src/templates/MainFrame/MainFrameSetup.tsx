// Supports 1 image file
import React from "react";

import {
  maxImageLengthCheck,
  minimumViewTimeRequirementCheck,
  ZinePageConfig,
} from "../../framework";

import { MainFrameTemplate } from "./MainFrameTemplate";

export const imageLengthRule = maxImageLengthCheck(1);
// 1 second minimum view time when configuring template
export const viewTimeMinimumRule = minimumViewTimeRequirementCheck(1000);

/** Generator function for the MainFrameTemplate */
export const mainFrameGenerator = (props: ZinePageConfig) => (
  <MainFrameTemplate
    images={props.images}
    viewTimeRequirement={props.viewTimeRequirement}
  />
);
