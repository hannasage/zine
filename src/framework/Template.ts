/* IDEAS:
 *
 * Package template components as JSX-returning functions along with
 * a prop validator
 *
 * . */

import { TEMPLATE_MAP, TemplateName } from "../templates";
import { ZinePageConfig } from "../configs";
import { UndefinedBundleError } from "../errors";

import PropValidator from "./PropValidator";
/** Function that generates a hydrated template */
export type TemplateGenerator<T> = (props: T) => JSX.Element;
/** The core members of a TemplateBundle */
export interface TemplateBundleInterface<T = any> {
  id: TemplateName;
  generator: TemplateGenerator<T>;
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
export class Template implements TemplateInterface {
  props;
  bundle;
  /** Construct a Template from a ZinePageConfig
   * @throws {UndefinedBundleError} */
  constructor(config: ZinePageConfig) {
    const bundle = TEMPLATE_MAP.get(config.templateId);
    if (bundle === undefined) throw new UndefinedBundleError(config.templateId);
    this.props = config;
    this.bundle = bundle;
  }
  /** Will use `TemplateBundle.validator` to validate props.
   * @throws {InvalidTemplatePropsError} */
  validateProps(): void {
    const { validator } = this.bundle;
    validator.validate(this.props);
  }
  /** Uses `TemplateBungle.generator` and hydrates it with props. */
  useTemplate(): JSX.Element {
    return this.bundle.generator(this.props);
  }
}
