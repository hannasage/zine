import { useMemo } from "react";

import ZinePageConfig from "../../framework/configs/ZinePageConfig";
import { Template, usePageTimer, usePropValidator } from "../../framework";

/** Controls the template generation, rendering, and timing of a page. */
export const ZinePage = (config: ZinePageConfig) => {
  // Throws if ZinePageConfig.templateId returns no TemplateBundle
  const template = useMemo(() => new Template(config), [config]);
  // Throws if any props are invalid for the desired template
  usePropValidator(template);
  // Handles releasing the next page
  usePageTimer(config.viewTimeRequirement);
  // Hydrate and render the component now that everything is valid
  return template.hydrate();
};
