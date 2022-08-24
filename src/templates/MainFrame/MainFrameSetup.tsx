// Supports 1 image file
import React from "react";

import {
  maxImagesLengthCheck,
  minimumViewTimeCheck,
  ZinePageConfig,
} from "../../framework";

import { MainFrameTemplate } from "./MainFrameTemplate";

const imageLengthRule = maxImagesLengthCheck(1);
const viewTimeMinimumRule = minimumViewTimeCheck(1000);
export const mainFrameRules = [imageLengthRule, viewTimeMinimumRule];
export const mainFrameGenerator = (props: ZinePageConfig) => (
  <MainFrameTemplate
    images={props.images}
    viewTimeRequirement={props.viewTimeRequirement}
  />
);
