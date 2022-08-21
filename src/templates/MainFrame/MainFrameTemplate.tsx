import React from "react";

import { BasicTemplateProps, ZinePageConfig } from "../../framework/configs";
import { Container, Frame, Image } from "../../components/ImageFrame";
import {
  maxImageLengthCheck,
  minimumViewTimeRequirementCheck,
} from "../../framework";
import { PropValidator } from "../../framework";

/** TEMPLATE: A single image in a frame. */
export const MainFrameTemplate: React.FC<BasicTemplateProps> = (config) => {
  return (
    <Container>
      <Frame width={87} height={87}>
        <Image src={`${process.env.REACT_APP_PUBLIC_URL}${config.images[0]}`} />
      </Frame>
    </Container>
  );
};

const imageLengthRule = maxImageLengthCheck(1);
// 1 second minimum view time when configuring template
const viewTimeMinimumRule = minimumViewTimeRequirementCheck(1000);

/** PropValidator rule set for the MainFrameTemplate */
export const mainFramePropValidator = new PropValidator(
  imageLengthRule,
  viewTimeMinimumRule
);
/** Generator function for the MainFrameTemplate */
export const mainFrameGenerator = (props: ZinePageConfig) => (
  <MainFrameTemplate
    images={props.images}
    viewTimeRequirement={props.viewTimeRequirement}
  />
);
