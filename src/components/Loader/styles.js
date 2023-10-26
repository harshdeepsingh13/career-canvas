import styled, {keyframes} from "styled-components";
import {COLORS} from "../../config/colors";

const dashKeyFrame = keyframes`
  from {
    stroke-dashoffset: 1330;
  }
  to {
    stroke-dashoffset: 0;
  }
`

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);

  .loader {
    stroke-dasharray: 1330;
    stroke-dashoffset: 0;
    animation: ${dashKeyFrame} 0.5s linear forwards infinite;
  }

  p {
    display: block;
    text-align: center;
    font-size: 1em;
    color: ${COLORS.BASIC_SOLID.WHITE}
  }
`;
