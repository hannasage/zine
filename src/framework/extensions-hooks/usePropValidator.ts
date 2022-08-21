import { useEffect, useMemo } from "react";

import { PropValidator, RuleFunction } from "../Template";
import { ZinePageConfig } from "../configs";

export const usePropValidator = (
  config: ZinePageConfig,
  ...rules: RuleFunction[]
) => {
  const validator = useMemo(() => new PropValidator(...rules), []);
  useEffect(() => validator.validate(config));
};
