import { InvalidTemplatePropsError, ZinePageConfig } from "../index";

const imageCountMessage = (actual: number, supported: number) =>
  `This template only supports ${supported} image(s), received: ${actual}`;
/** RULE: Template only supports a specific amount of images
 * @throws {InvalidTemplatePropsError} */
export const imageCountCheck =
  (length: number) =>
  (config: ZinePageConfig): void => {
    if (config.images.length !== length)
      throw new InvalidTemplatePropsError(
        imageCountMessage(config.images.length, length)
      );
  };
