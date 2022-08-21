import { useAvailablePages, usePropValidator } from "./extensions-hooks";
import {
  maxImageLengthCheck,
  minimumViewTimeRequirementCheck,
} from "./extensions-rules/common-rules";
import {
  TemplateGenerator,
  TemplateBundle,
  Template,
  TemplateSetup,
  RuleGenerator,
  RuleFunction,
} from "./Template";
import { InvalidTemplatePropsError, UndefinedBundleError } from "./errors";
import {
  ZinePageConfig,
  BasicTemplateProps,
  TemplateWithCaptionsProps,
} from "./configs";

/* Core framework */
export { TemplateBundle, Template, ZinePageConfig };
export type {
  RuleGenerator,
  RuleFunction,
  TemplateGenerator,
  TemplateSetup,
  BasicTemplateProps,
  TemplateWithCaptionsProps,
};

/* Rules */
export { maxImageLengthCheck, minimumViewTimeRequirementCheck };

/* Errors */
export { InvalidTemplatePropsError, UndefinedBundleError };

/* Extensions */
export { useAvailablePages, usePropValidator };
