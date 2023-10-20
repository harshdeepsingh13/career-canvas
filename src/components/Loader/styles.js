import styled, {keyframes} from "styled-components";

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
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    stroke-dasharray: 1330;
    stroke-dashoffset: 0;
    animation: ${dashKeyFrame} 0.5s linear forwards infinite;
  }
`;
