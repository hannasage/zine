import { TEMPLATE_BUNDLES, TemplateName } from "../templates";

import { ZinePageConfig } from "./configs";
import { UndefinedBundleError } from "./errors";

/** Function that validates props for a template */
export type RuleFunction = (config: ZinePageConfig) => void;
export type RuleGenerator = (...args: any[]) => RuleFunction;
/** Contains all validation rules for a template */
export class PropValidator {
  rules: RuleFunction[] = [];
  constructor(...rules: RuleFunction[]) {
    this.rules = rules;
  }
  /** Cycle through all rules.
   * @returns {void}
   * @throws {InvalidTemplatePropsError}*/
  validate(props: ZinePageConfig) {
    this.rules.forEach((rule) => rule(props));
  }
}
/** Function that generates a hydrated template */
export type TemplateGenerator = (props: ZinePageConfig) => JSX.Element;
/** The core members of a TemplateBundle */
interface TemplateBundleInterface {
  id: TemplateName;
  generator: TemplateGenerator;
  validator: PropValidator;
}
/** Object containing methods and members to validate and return a hydrated
 * template. */
export class TemplateBundle implements TemplateBundleInterface {
  id;
  generator;
  validator;
  constructor({ id, generator, validator }: TemplateBundleInterface) {
    this.id = id;
    this.generator = generator;
    this.validator = validator;
  }
}

interface TemplateInterface {
  props: ZinePageConfig;
  bundle: TemplateBundle;
}
/** Contains the user's props and desired TemplateBundle */
export class Template implements TemplateInterface {
  props;
  bundle;
  /** Construct a Template from a ZinePageConfig
   * @throws {UndefinedBundleError} */
  constructor(config: ZinePageConfig) {
    const bundle = TEMPLATE_BUNDLES.get(config.templateId);
    if (bundle === undefined) {
      throw new UndefinedBundleError(config.templateId);
    } else {
      this.props = config;
      this.bundle = bundle;
    }
  }
  /** Will use `TemplateBundle.validator` to validate props.
   * @throws {InvalidTemplatePropsError} */
  validateProps(): void {
    const { validator } = this.bundle;
    validator.validate(this.props);
  }
  /** Uses `TemplateBungle.generator` and hydrates it with props. */
  useTemplate(): JSX.Element {
    const { generator } = this.bundle;
    return generator(this.props);
  }
}
