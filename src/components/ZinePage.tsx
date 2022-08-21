import { useEffect, useMemo } from "react";

import ZinePageConfig from "../configs/ZinePageConfig";
import { Template } from "../framework/Template";
import { TEMPLATE_MAP } from "../templates";

/** Controls the template generation and rendering of a page. */
export const ZinePage = (config: ZinePageConfig) => {
  const template = useMemo(
    () =>
      new Template({
        props: config,
        bundle: TEMPLATE_MAP.get(config.templateId)!!, // Throws inside Template if undefined
      }),
    [config]
  );

  useEffect(() => {
    template.validateProps(); // Throws inside if props are invalid
  }, [template]);

  return template.useTemplate();
};
