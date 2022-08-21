import { useAvailablePages } from "./extensions-hooks/useAvailablePages";
import {
  maxImageLengthCheck,
  minimumViewTimeRequirementCheck,
} from "./extensions-rules/common-rules";
import {
  TemplateGenerator,
  TemplateBundle,
  Template,
  PropValidator,
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
export { PropValidator, TemplateBundle, Template, ZinePageConfig };
export type {
  RuleGenerator,
  RuleFunction,
  TemplateGenerator,
  BasicTemplateProps,
  TemplateWithCaptionsProps,
};

/* Rules */
export { maxImageLengthCheck, minimumViewTimeRequirementCheck };

/* Errors */
export { InvalidTemplatePropsError, UndefinedBundleError };

/* Extensions */
export { useAvailablePages };
