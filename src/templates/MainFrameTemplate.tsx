import { TemplateBasicInterface } from "../configs/ZinePageConfig";
import { Container, Frame, Image } from "../components/TemplateTools";

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
