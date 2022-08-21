import { InvalidTemplatePropsError } from "../errors";
import { ZinePageConfig } from "../configs";

import { RuleFunction } from "./PropValidator";

const imageLengthMessage = (actual: number, supported: number) =>
  `This template only supports ${supported} image, received: ${actual}`;
/** RULE: Template only supports a specific amount of images
 * @throws {InvalidTemplatePropsError} */
export const imageLengthCheck =
  (length: number): RuleFunction =>
  (config: ZinePageConfig): void => {
    if (config.images.length > length)
      throw new InvalidTemplatePropsError(
        imageLengthMessage(config.images.length, length)
      );
  };

const timeTooShortMessage = (actual: number, supported: number) =>
  `The viewTimeRequirement must exceed ${supported}. Received: ${actual}`;
/** RULE: ViewTime is greater than 1s (1000)
 * @throws {InvalidTemplatePropsError} */
export const viewTimeCheck =
  (viewTime: number): RuleFunction =>
  (config: ZinePageConfig): void => {
    if (config.viewTimeRequirement < viewTime)
      throw new InvalidTemplatePropsError(
        timeTooShortMessage(config.viewTimeRequirement, viewTime)
      );
  };
