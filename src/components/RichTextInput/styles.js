import styled from "styled-components";
import {GroupWrapper} from "../InputFields/v2/styles";
import {COLORS} from "../../config/colors";

export const RichTextInputWrapper = styled(GroupWrapper)`

  .quill {
    width: 100%;
    background-color: ${props => !props.readOnly && COLORS.BASIC_SOLID.WHITE};
  }
`;
