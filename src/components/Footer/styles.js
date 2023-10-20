import {Container} from "../../config/globalStyles";
import styled from "styled-components";
import {COLORS} from "../../config/colors";

export const FooterWrapper = styled(Container)`
  background-color: ${COLORS.PRIMARY.DARK};
  color: ${COLORS.PRIMARY.LIGHT};
  border-bottom: 10px solid ${COLORS.SECONDARY.ORANGE};
  padding-top: 5em;
  padding-bottom: 5em;

  h2 {
    text-align: center;
    padding-bottom: 2em;
    border-bottom: 2px solid ${COLORS.PRIMARY.LIGHT};

    img {
      width: 50%;
    }
  }

  p {
    margin: 2em 0;
    text-align: center;
  }
`
