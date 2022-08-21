import { TemplateName } from "../index";
import { TemplateBundle } from "../../framework";

import {
  mainFrameGenerator,
  mainFramePropValidator,
} from "./MainFrameTemplate";

export default new TemplateBundle({
  id: TemplateName.MAINFRAME,
  generator: mainFrameGenerator,
  validator: mainFramePropValidator,
});
