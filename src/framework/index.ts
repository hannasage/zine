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
import { InvalidTemplatePropsError, UndefinedSetupError } from "./errors";
import { ZinePageConfig, BasicTemplateProps } from "./configs";

/* Core framework */
export { TemplateBundle, Template, ZinePageConfig };
export type {
  RuleGenerator,
  RuleFunction,
  TemplateGenerator,
  TemplateSetup,
  BasicTemplateProps,
};

/* Rules */
export { maxImageLengthCheck, minimumViewTimeRequirementCheck };

/* Errors */
export { InvalidTemplatePropsError, UndefinedSetupError };

/* Extensions */
export { useAvailablePages, usePropValidator };
