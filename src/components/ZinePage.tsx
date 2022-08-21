import { useEffect, useMemo } from "react";

import ZinePageConfig from "../configs/ZinePageConfig";
import { Template } from "../framework/Template";

/** Controls the template generation and rendering of a page. */
export const ZinePage = (config: ZinePageConfig) => {
  // Throws if ZinePageConfig.templateId returns no TemplateBundle
  const template = useMemo(() => new Template(config), [config]);

  useEffect(() => {
    template.validateProps(); // Throws inside if props are invalid
  }, [template]);

  return template.useTemplate();
};
