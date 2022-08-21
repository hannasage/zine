import { ZinePageConfig } from "../configs";

/** Function that validates props for a template */
export type RuleFunction = (config: ZinePageConfig) => void;
export type RuleGenerator = (...args: any[]) => RuleFunction;
/** Contains all validation rules for a template */
export default class PropValidator {
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
