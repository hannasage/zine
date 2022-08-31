import { RuleFunction, RuleGenerator } from "../Template";
import InvalidTemplatePropsError from "../errors/InvalidTemplatePropsError";
import ZinePageConfig from "../configs/ZinePageConfig";

const minimumViewTimeMessage = (actual: number, supported: number) =>
  `The viewTimeRequirement must exceed ${supported}. Received: ${actual}`;
/** RULE: A minimum value (in ms) is required for viewTimeRequirement
 * @throws {InvalidTemplatePropsError} */
export const minimumViewTimeCheck: RuleGenerator =
  (viewTime: number): RuleFunction =>
  (config: ZinePageConfig): void => {
    if (config.viewTimeRequirement < viewTime)
      throw new InvalidTemplatePropsError(
        minimumViewTimeMessage(config.viewTimeRequirement, viewTime)
      );
  };
