import React from "react";

import {
  BasicTemplateProps,
  maxImagesLengthCheck,
  minimumViewTimeCheck,
  ZinePageConfig,
} from "../framework";
import { Container, Frame, Image } from "../components";

/** TEMPLATE: A single image in a frame. */
export const MainFrameTemplate: React.FC<BasicTemplateProps> = (props) => {
  return (
    <Container>
      <Frame width={87} height={87}>
        <Image src={`${process.env.REACT_APP_PUBLIC_URL}${props.images[0]}`} />
      </Frame>
    </Container>
  );
};

/* Setup Rules */
const imageLengthRule = maxImagesLengthCheck(1);
const viewTimeMinimumRule = minimumViewTimeCheck(1000);

export const mainFrameRules = [imageLengthRule, viewTimeMinimumRule];

/* Setup Generator */
export const mainFrameGenerator = (props: ZinePageConfig) => (
  <MainFrameTemplate
    images={props.images}
    viewTimeRequirement={props.viewTimeRequirement}
  />
);
