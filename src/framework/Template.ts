import { MutableRefObject } from "react";

import { TemplateName, TEMPLATES } from "../templates";

import ZinePageConfig from "./configs/ZinePageConfig";
import UndefinedSetupError from "./errors/UndefinedSetupError";

/** Function that validates props for a template */
export type RuleFunction = (config: ZinePageConfig) => void;
/** Safely type your own rules with this */
export type RuleGenerator = (...args: any[]) => RuleFunction;
/** Function that generates a hydrated template */
export type TemplateGenerator = (
  props: ZinePageConfig,
  ref: MutableRefObject<any>
) => JSX.Element;
/** The core members of a TemplateSetup */
export interface TemplateSetup {
  generator: TemplateGenerator;
  rules: RuleFunction[];
}

/** Takes an id to find the right setup and fill out the bundle. */
export class TemplateBundle implements TemplateSetup {
  generator: TemplateGenerator;
  rules: RuleFunction[];
  /** @throws {UndefinedSetupError} */
  constructor(templateId: TemplateName) {
    const setup = this.getTemplateSetup(templateId);
    this.generator = setup.generator;
    this.rules = setup.rules;
  }
  /** Gets a template setup or dies trying!
   * @throws {UndefinedSetupError} */
  getTemplateSetup = (templateId: TemplateName): TemplateSetup | never => {
    const template = TEMPLATES.get(templateId);
    if (template === undefined) throw new UndefinedSetupError(templateId);
    return template;
  };
}

/** Contains the user's props and desired TemplateBundle */
export class Template {
  props: ZinePageConfig;
  ref: MutableRefObject<any>;
  bundle: TemplateBundle;
  /** Construct a Template from a ZinePageConfig
   * @throws {UndefinedSetupError} */
  constructor(config: ZinePageConfig, ref: MutableRefObject<any>) {
    this.props = config;
    this.ref = ref;
    this.bundle = new TemplateBundle(config.templateId);
  }
  /** Uses `TemplateBundle.generator` and hydrates it with props. */
  hydrate(): JSX.Element {
    const { generator } = this.bundle;
    return generator(this.props, this.ref);
  }
  /** Uses TemplateBundle.rules to validate this.props
   * @throws {InvalidTemplatePropsError} */
  validateProps(): void | never {
    const { rules } = this.bundle;
    rules.forEach((rule) => rule(this.props));
  }
}
