import React from "react";

import {
  BasicTemplateProps,
  RuleFunction,
  TemplateGenerator,
} from "../framework";
import { imageCountCheck } from "../framework/extensions-rules/imageCount";
import { Container, Frame, Image } from "../components";

/* Template Component */
const ThreesFrameTemplate = React.forwardRef<any, BasicTemplateProps>(
  ({ images }, ref) => {
    return (
      <Container ref={ref}>
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
  }
);

/* Setup Rules */
export const ThreesFrameRules: RuleFunction[] = [imageCountCheck(3)];
/* Setup Generator */
export const ThreesFrameGenerator: TemplateGenerator = (props, ref) => (
  <ThreesFrameTemplate
    ref={ref}
    images={props.images}
    viewTimeRequirement={props.viewTimeRequirement}
  />
);
