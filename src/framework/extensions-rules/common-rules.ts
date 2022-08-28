import { RuleFunction, RuleGenerator } from "../Template";
import InvalidTemplatePropsError from "../errors/InvalidTemplatePropsError";
import ZinePageConfig from "../configs/ZinePageConfig";

const maxImagesLengthMessage = (actual: number, supported: number) =>
  `This template only supports ${supported} image, received: ${actual}`;
/** RULE: Template only supports a specific amount of images
 * @throws {InvalidTemplatePropsError} */
export const maxImagesLengthCheck: RuleGenerator =
  (length: number): RuleFunction =>
  (config: ZinePageConfig): void => {
    if (config.images.length > length)
      throw new InvalidTemplatePropsError(
        maxImagesLengthMessage(config.images.length, length)
      );
  };

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
