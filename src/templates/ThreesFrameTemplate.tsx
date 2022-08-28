import React from "react";

import {
  BasicTemplateProps,
  maxImagesLengthCheck,
  RuleFunction,
  ZinePageConfig,
} from "../framework";
import { Container, Frame, Image } from "../components";

/* Template Component */
export const ThreesFrameTemplate: React.FC<BasicTemplateProps> = ({
  images,
}) => {
  return (
    <Container>
      <Frame width={33} height={88}>
        <Image src={images[0]} />
      </Frame>
      <Frame width={33} height={88}>
        <Image src={images[1]} />
      </Frame>
      <Frame width={33} height={88}>
        <Image src={images[2]} />
      </Frame>
    </Container>
  );
};

/* Setup Rules */
export const ThreesFrameRules: RuleFunction[] = [maxImagesLengthCheck(3)];
/* Setup Generator */
export const ThreesFrameGenerator = (props: ZinePageConfig) => (
  <ThreesFrameTemplate
    images={props.images}
    viewTimeRequirement={props.viewTimeRequirement}
  />
);
