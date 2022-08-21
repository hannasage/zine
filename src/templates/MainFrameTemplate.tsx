import React from "react";

import { BasicTemplateProps, ZinePageConfig } from "../configs";
import { Container, Frame, Image } from "../components";
import { ValidatorFunction } from "../framework/Template";
import { InvalidTemplatePropsError } from "../errors";

/** TEMPLATE: A single image in a frame. */
export const MainFrameTemplate: React.FC<BasicTemplateProps> = (config) => {
  return (
    <Container>
      <Frame width={87} height={87}>
        <Image src={config.images[1]} />
      </Frame>
    </Container>
  );
};

export const imageError = (length: number) =>
  `This template only supports one image, received: ${length}`;
export const imageCheck = (images: string[]) => {
  if (images.length > 1)
    throw new InvalidTemplatePropsError(imageError(images.length));
  return true;
};

export const timeError = (time: number) =>
  `The viewTimeRequirement must exceed 1 second (1000). Received: ${time}`;
export const viewTimeCheck = (time: number) => {
  if (time < 1000) throw new InvalidTemplatePropsError(timeError(time));
  return true;
};

export const mainFramePropValidator: ValidatorFunction = (props) => {
  const { images, viewTimeRequirement } = props;
  return imageCheck(images) && viewTimeCheck(viewTimeRequirement);
};

export const mainFrameGenerator = (props: ZinePageConfig) => (
  <MainFrameTemplate
    images={props.images}
    viewTimeRequirement={props.viewTimeRequirement}
  />
);
