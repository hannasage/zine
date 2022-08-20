import { TemplateBasicInterface } from "../configs";
import { Container, Frame, Image } from "../components";

/** TEMPLATE: A single image in a frame. */
export const MainFrameTemplate = (config: TemplateBasicInterface) => {
  return (
    <Container>
      <Frame width={87} height={87}>
        <Image src={config.images[1]} />
      </Frame>
    </Container>
  );
};
