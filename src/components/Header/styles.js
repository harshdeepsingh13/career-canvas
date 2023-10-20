import styled from "styled-components";
import {Container} from "../../config/globalStyles";
import {COLORS} from "../../config/colors";

export const HeaderWrapper = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${COLORS.BASIC_SOLID.WHITE};
  -webkit-box-shadow: 0 -6px 14px 0 rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 -6px 14px 0 rgba(0, 0, 0, 0.75);
  box-shadow: 0 -6px 14px 0 rgba(0, 0, 0, 0.75);

  .logo-container {
    width: 150px;
  }

  .nav-link-container {
    display: flex;
    align-items: center;

    .nav-link {
      margin: 10px;
    }

  }
`;
