// Supports 1 image file
import React from "react";

import {
  maxImageLengthCheck,
  minimumViewTimeRequirementCheck,
  ZinePageConfig,
} from "../../framework";

import { MainFrameTemplate } from "./MainFrameTemplate";

const imageLengthRule = maxImageLengthCheck(1);
const viewTimeMinimumRule = minimumViewTimeRequirementCheck(1000);
export const mainFrameRules = [imageLengthRule, viewTimeMinimumRule];
export const mainFrameGenerator = (props: ZinePageConfig) => (
  <MainFrameTemplate
    images={props.images}
    viewTimeRequirement={props.viewTimeRequirement}
  />
);
