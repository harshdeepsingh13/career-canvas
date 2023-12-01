import styled from "styled-components";
import {GroupWrapper} from "../InputFields/v2/styles";
import {COLORS} from "../../config/colors";

const borderRadius = "4px"

export const RichTextInputWrapper = styled(GroupWrapper)`

  .quill {
    width: 100%;
    background-color: ${props => !props.readOnly && COLORS.BASIC_SOLID.WHITE};

    .ql-toolbar {
      border-top-left-radius: ${borderRadius};
      border-top-right-radius: ${borderRadius};
    }

    .ql-container {
      border-bottom-left-radius: ${borderRadius};
      border-bottom-right-radius: ${borderRadius};
    }
  }
`;
