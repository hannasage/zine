import { useEffect } from "react";

import { Template } from "../Template";

/** FEATURE: Hooks into `Template.validateProps` which throws if props
 * do not match the template rules.
 *
 * ---
 *
 * This is used exclusively for template-rendering components (i.e. `ZinePage`)
 * */
export const usePropValidator = (template: Template) => {
  useEffect(() => {
    template.validateProps();
  }, []); //eslint-disable-line
};
