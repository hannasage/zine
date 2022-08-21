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
        bundle: TEMPLATE_MAP.get(config.templateId)!!,
      }),
    [config]
  );

  useEffect(() => {
    template.validateProps();
  }, [template]);

  // TODO: Debug...not rendering!
  return template.useTemplate();
};
