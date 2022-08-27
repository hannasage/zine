import React from "react";

import { RuleFunction, ZinePageConfig } from "../src/framework";

/* Template Component */
export const TEST_SUCCEEDEDTemplate = () => {
  return <></>;
};

/* Setup Rules */
export const TEST_SUCCEEDEDRules: RuleFunction[] = [];
/* Setup Generator */
export const TEST_SUCCEEDEDGenerator = (props: ZinePageConfig) => (
  <TEST_SUCCEEDEDTemplate />
);
