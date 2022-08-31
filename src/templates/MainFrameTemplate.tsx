import React from "react";

import { BasicTemplateProps, ZinePageConfig } from "../framework";
import { Container, Frame, Image } from "../components";
import { imageCountCheck } from "../framework/extensions-rules/imageCount";

/** TEMPLATE: A single image in a frame. */
const MainFrameTemplate = React.forwardRef<HTMLDivElement, BasicTemplateProps>(
  (props, ref) => {
    return (
      <Container ref={ref}>
        <Frame width={87} height={87}>
          <Image
            src={`${process.env.REACT_APP_PUBLIC_URL}${props.images[0]}`}
          />
        </Frame>
      </Container>
    );
  }
);

export const MainFrameRules = [imageCountCheck(1)];

/* Setup Generator */
export const MainFrameGenerator = (props: ZinePageConfig) => (
  <MainFrameTemplate
    images={props.images}
    viewTimeRequirement={props.viewTimeRequirement}
  />
);
