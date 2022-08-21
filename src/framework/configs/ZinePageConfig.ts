import { TemplateName } from "../../templates";

/** To extend the ZinePage capabilities, implement necessary params
 * in this object. All else is derived from this. */
interface ZinePageInterface {
  images: string[];
  viewTimeRequirement: number;
  templateId: TemplateName;
}
type BasicFeatures = "images" | "viewTimeRequirement";

/** A basic template accepts an images array and viewTimeRequirement value.
 * NOTE: _How many_ images is determined by your template. */
export type BasicTemplateProps = Pick<ZinePageInterface, BasicFeatures>;

/** Configuration class that's used to render individual pages. */
export default class ZinePageConfig implements ZinePageInterface {
  /** A collection of image references */
  images: string[] = [];
  /** The allotted amount of time to view a page */
  viewTimeRequirement: number = 0;
  /** An enumerated ID for a template */
  templateId: TemplateName;
  /** NOTE: **ONLY** use this for generating hard-coded
   * @param params {ZinePageInterface} The configuration parameters */
  constructor({ images, viewTimeRequirement, templateId }: ZinePageInterface) {
    this.images = images;
    this.viewTimeRequirement = viewTimeRequirement;
    this.templateId = templateId;
  }
}
