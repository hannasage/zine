import { TemplateName, TEMPLATES } from "../templates";

import { ZinePageConfig } from "./configs";
import { UndefinedBundleError } from "./errors";

/** Function that validates props for a template */
export type RuleFunction = (config: ZinePageConfig) => void;
export type RuleGenerator = (...args: any[]) => RuleFunction;
/** The core members of a TemplateSetup */
interface TemplateSetupInterface {
  id: TemplateName;
  generator: TemplateGenerator;
  rules: RuleFunction[];
}
/** Creates a setup object for a TemplateBundle */
export class TemplateSetup implements TemplateSetupInterface {
  id;
  generator;
  rules;
  constructor({ id, generator, rules }: TemplateSetupInterface) {
    this.id = id;
    this.generator = generator;
    this.rules = rules;
  }
}
export const getTemplateSetup = (
  templateId: TemplateName
): TemplateSetup | never => {
  const template = TEMPLATES.get(templateId);
  if (template === undefined) throw new UndefinedBundleError(templateId);
  return template;
};
/** Function that generates a hydrated template */
export type TemplateGenerator = (props: ZinePageConfig) => JSX.Element;

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
    this.props = config;
    this.bundle = new TemplateBundle(config.templateId);
  }
  /** Uses `TemplateBungle.generator` and hydrates it with props. */
  useTemplate(): JSX.Element {
    const { generator } = this.bundle;
    return generator(this.props);
  }
  /** */
  validateProps(): void | never {
    this.bundle.rules.forEach((rule) => rule(this.props));
  }
}
