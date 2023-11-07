import styled from "styled-components";
import {Form} from "react-bootstrap";
import {COLORS} from "../../config/colors";
import CustomBadge from "../CustomBadge";

export const InputBadgesWrapper = styled(Form.Group)`

  .badge-form-container {
    width: 100%;

    ${props => !props.readOnly && {
      border: "thin solid rgb(222, 226, 230)",
      padding: "2em",
      "border-radius": "6px",
      "background-color": "white",
    }}
    .badges-container {
      display: flex;
      flex-wrap: wrap;
    }

    .input-container {
      .input-group {
        margin-top: unset;
        margin-bottom: unset;
      }

      small {
        color: ${COLORS.TEXT.LIGHT};
        font-size: 0.8em;
        padding: 0 1em;
      }
    }
  }
`;

export const BadgeItemWrapper = styled(CustomBadge)`
  margin-right: 1em;
  //margin-top: 1em;
  margin-bottom: 1em;
  padding: 10px 2em 10px 1em;
  font-size: 1em;
  font-weight: normal;
  cursor: default;
  position: relative;

  .click-action-helper {
    display: none;
    font-size: 0.8em;
    position: absolute;
    opacity: 0;
    top: 50%;
    margin-left: 5px;
    transform: translateY(-50%);
    right: 10px;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  ${({isClickActivated, readOnly}) => {
    if (!readOnly && isClickActivated) {
      return {
        cursor: "pointer",
        ".click-action-helper": {
          display: "block"
        },
        "&:hover": {
          backgroundColor: `${COLORS.BASIC_SOLID.RED} !important`,
          ".click-action-helper": {
            opacity: 0.8,
            visibility: "visible"
          }
        }
      }
    }
  }}
`;


