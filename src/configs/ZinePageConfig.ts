import { TemplateName } from "../templates";

import CaptionConfig from "./CaptionConfig";
/** To extend the ZinePage capabilities, implement necessary params
 * in this object. All else is derived from this. */
interface ZinePageInterface {
  images: string[];
  viewTimeRequirement: number;
  templateId: TemplateName;
  // Extend under this line, ALL must be optional.
  captions?: CaptionConfig[];
}
type BasicFeatures = "images" | "viewTimeRequirement";
type BasicFeaturesWithCaptions = "images" | "viewTimeRequirement" | "captions";

/** A basic template accepts an images array and viewTimeRequirement value.
 * NOTE: _How many_ images is determined by your template. */
export type BasicTemplateProps = Pick<ZinePageInterface, BasicFeatures>;
/** A template that can take both images and captions.
 * NOTE: _How many_ images and captions are determined by your template. */
export type TemplateWithCaptionsProps = Pick<
  ZinePageInterface,
  BasicFeaturesWithCaptions
>;

/** Configuration class that's used to render individual pages. */
export default class ZinePageConfig implements ZinePageInterface {
  /** A collection of image references */
  images: string[] = [];
  /** The allotted amount of time to view a page */
  viewTimeRequirement: number = 0;
  /** An enumerated ID for a template */
  templateId: TemplateName;
  /** A collection of caption configurations */
  captions?: CaptionConfig[];
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
