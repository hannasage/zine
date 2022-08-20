import { Template } from "../templates";

import CaptionConfig from "./CaptionConfig";

interface ZinePageInterface {
  images: string[];
  viewTimeRequirement: number;
  captions: CaptionConfig[] | undefined;
  templateId: Template | undefined;
}
export type TemplateBasicInterface = Pick<
  ZinePageInterface,
  "images" | "viewTimeRequirement"
>;

/** Configuration class that's used to render individual pages. */
export default class ZinePageConfig implements ZinePageInterface {
  /** A collection of image references */
  images: string[] = [];
  /** The allotted amount of time to view a page */
  viewTimeRequirement: number = 0;
  /** A collection of caption configurations */
  captions: CaptionConfig[] | undefined;
  /** An enumerated ID for a template */
  templateId: Template | undefined;
  /** NOTE: **ONLY** use this for generating hard-coded
   * @param params {ZinePageInterface} The configuration parameters */
  constructor({
    images,
    viewTimeRequirement,
    captions,
    templateId,
  }: ZinePageInterface) {
    this.images = images;
    this.viewTimeRequirement = viewTimeRequirement;
    this.captions = captions;
    this.templateId = templateId;
  }
}
