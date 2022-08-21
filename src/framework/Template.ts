import { TemplateName, TEMPLATES } from "../templates";

import { ZinePageConfig } from "./configs";
import { UndefinedSetupError } from "./errors";

/** Function that validates props for a template */
export type RuleFunction = (config: ZinePageConfig) => void;
/** Safely type your own rules with this */
export type RuleGenerator = (...args: any[]) => RuleFunction;
/** Function that generates a hydrated template */
export type TemplateGenerator = (props: ZinePageConfig) => JSX.Element;
/** The core members of a TemplateSetup */
export interface TemplateSetup {
  id: TemplateName;
  generator: TemplateGenerator;
  rules: RuleFunction[];
}

/** Gets a template setup or dies trying!
 * @throws {UndefinedSetupError} */
export const getTemplateSetup = (
  templateId: TemplateName
): TemplateSetup | never => {
  const template = TEMPLATES.get(templateId);
  if (template === undefined) throw new UndefinedSetupError(templateId);
  return template;
};

/** Object containing methods and members to validate and return a hydrated
 * template. */
export class TemplateBundle {
  generator;
  rules;
  constructor(templateId: TemplateName) {
    const setup = getTemplateSetup(templateId);
    this.generator = setup.generator;
    this.rules = setup.rules;
  }
}

/** Contains the user's props and desired TemplateBundle */
export class Template {
  props: ZinePageConfig;
  bundle: TemplateBundle;
  /** Construct a Template from a ZinePageConfig
   * @throws {UndefinedSetupError} */
  constructor(config: ZinePageConfig) {
    this.props = config;
    this.bundle = new TemplateBundle(config.templateId);
  }
  /** Uses `TemplateBundle.generator` and hydrates it with props. */
  useTemplate(): JSX.Element {
    const { generator } = this.bundle;
    return generator(this.props);
  }
  /** Uses TemplateBundle.rules to validate this.props
   * @throws {InvalidTemplatePropsError} */
  validateProps(): void | never {
    this.bundle.rules.forEach((rule) => rule(this.props));
  }
}
