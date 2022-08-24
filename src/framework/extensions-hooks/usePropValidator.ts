import { useEffect } from "react";

import { Template } from "../Template";

export const usePropValidator = (template: Template) => {
  useEffect(() => {
    template.validateProps();
  }, []); //eslint-disable-line
};
