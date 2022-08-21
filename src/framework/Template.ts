/* IDEAS:
 *
 * Package template components as JSX-returning functions along with
 * a prop validator
 *
 * . */

import { TemplateName } from "../templates";
import { ZinePageConfig } from "../configs";
import { UndefinedBundleError } from "../errors";
/** Validator will either return a boolean or throw with no return */
type ValidatorReturn = boolean | never;
/** Function that validates props for a template */
export type ValidatorFunction = (props: ZinePageConfig) => ValidatorReturn;
/** Function that generates a hydrated template */
export type TemplateGenerator<T> = (props: T) => JSX.Element;
/** The core members of a TemplateBundle */
export interface TemplateBundleInterface<T = any> {
  id: TemplateName;
  generator: TemplateGenerator<T>;
  validator: ValidatorFunction;
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
  constructor({ props, bundle }: TemplateInterface) {
    if (bundle === undefined) throw new UndefinedBundleError(props.templateId);
    this.props = props;
    this.bundle = bundle;
  }
  /** Will use `TemplateBundle.validator` to validate props.
   * @throws {InvalidPropsError} */
  validateProps(): boolean {
    return this.bundle.validator(this.props);
  }
  /** Uses `TemplateBungle.generator` and hydrates it with props. */
  useTemplate(): JSX.Element {
    return this.bundle.generator(this.props);
  }
}
