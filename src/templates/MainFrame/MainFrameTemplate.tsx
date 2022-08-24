import React, { useEffect } from "react";

import { BasicTemplateProps } from "../../framework";
import { Container, Frame, Image } from "../../components/ImageFrame";
import { usePageContext } from "../../components/PageProvider";

/** TEMPLATE: A single image in a frame. */
export const MainFrameTemplate: React.FC<BasicTemplateProps> = (props) => {
  const { makeNextPageAvailable } = usePageContext();
  useEffect(() => {
    setTimeout(makeNextPageAvailable, props.viewTimeRequirement);
  }, []); //eslint-disable-line

  return (
    <Container>
      <Frame width={87} height={87}>
        <Image src={`${process.env.REACT_APP_PUBLIC_URL}${props.images[0]}`} />
      </Frame>
    </Container>
  );
};
