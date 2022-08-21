import { TemplateName } from "../index";
import {
  maxImageLengthCheck,
  minimumViewTimeRequirementCheck,
  TemplateBundle,
} from "../../framework";

import { mainFrameGenerator } from "./MainFrameTemplate";

// Supports 1 image file
const imageLengthRule = maxImageLengthCheck(1);
// 1 second minimum view time when configuring template
const viewTimeMinimumRule = minimumViewTimeRequirementCheck(1000);

export default new TemplateBundle({
  id: TemplateName.MAINFRAME,
  generator: mainFrameGenerator,
  rules: [imageLengthRule, viewTimeMinimumRule],
});
