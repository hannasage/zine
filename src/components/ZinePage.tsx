import ZinePageConfig from "../configs/ZinePageConfig";
import { MainFrameTemplate } from "../templates/MainFrameTemplate";

/** Controls the template generation and rendering of a page. */
export const ZinePage = (config: ZinePageConfig) => {
  const { images, viewTimeRequirement } = config;
  return (
    <MainFrameTemplate
      images={images}
      viewTimeRequirement={viewTimeRequirement}
    />
  );
};
