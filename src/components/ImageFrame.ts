import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
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

export const Image = styled.img`
  display: block;
  height: 100%;
  width: auto;
  margin: 0px auto;
  object-fit: contain;
`;
