import styled from "styled-components";
/** Width and height, in vw/vh percentage, for image frame.
 * The higher the percentage, the less border around the image. */
interface FrameProps {
  width: number;
  height: number;
}
export const Frame = styled.div<FrameProps>`
  width: ${(props) => `${props?.width}%`};
  height: ${(props) => `${props?.height}%`};
  margin: auto;
`;
