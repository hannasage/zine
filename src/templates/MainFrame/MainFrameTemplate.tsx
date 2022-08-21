import React from "react";

import { BasicTemplateProps, ZinePageConfig } from "../../framework/configs";
import { Container, Frame, Image } from "../../components/ImageFrame";

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

/** Generator function for the MainFrameTemplate */
export const mainFrameGenerator = (props: ZinePageConfig) => (
  <MainFrameTemplate
    images={props.images}
    viewTimeRequirement={props.viewTimeRequirement}
  />
);
