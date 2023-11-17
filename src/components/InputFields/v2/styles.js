import styled from "styled-components";
import {Form} from "react-bootstrap";
import {COLORS} from "../../../config/colors";

export const GroupWrapper = styled(Form.Group)`
  margin: 10px 0;


  .autofill-input-container {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .input-container {
      flex-basis: 100%;
    }

    textarea {
      min-height: 12em;
      padding: 6px 12px;
      width: 100%;
      border: 1px solid ${COLORS.TEXT.XLIGHT};
      border-radius: var(--bs-border-radius);

      &[readonly] {
        border: none;
      }
    }

    .autofill-loader-container {
      flex-basis: 50px;
      text-align: center;
    }

    .autofill-items-container {
      position: absolute;
      top: calc(100% + 10px);
      z-index: 102;
      width: 100%;
      background-color: ${COLORS.BASIC_SOLID.WHITE};
      border-radius: var(--bs-border-radius);
      box-shadow: 0 0 11px -7px  rgb(0, 0, 0);
      border: thin solid ${COLORS.TEXT.XLIGHT};

      .autofill-item {
        padding: 0.5em 1em;
        border-bottom: thin solid ${COLORS.TEXT.XLIGHT};
        color: ${COLORS.TEXT.DARK};
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          background-color: ${COLORS.PRIMARY.LIGHT};
        }

        &:last-child {
          border: unset;
        }

        &.placeholder-item {
          cursor: default;
          display: flex;
          align-items: center;
          justify-content: center;

          .placeholder-logo {
            width: 50px;
            margin-right: 1em;
            opacity: 0.2;
          }

          .message {
            color: ${COLORS.TEXT.MEDIUM};
            font-style: italic;
          }

          &:hover {
            background-color: initial;
          }
        }
      }
    }
  }
`;

export const InputWrapper = styled(Form.Control)`
  &[readonly] {
    color: initial;
    background-color: unset;
    border: unset;
    font-size: 1.1em;
    margin-top: unset;
    margin-bottom: unset;
    padding-top: unset;
    padding-bottom: unset;
  }
`;

export const LabelWrapper = styled(Form.Label)`
  text-transform: capitalize;
`;
export const SelectWrapper = styled(Form.Select)``;

export const CheckWrapper = styled(Form.Check)``

export const CustomAutofillItem = styled.div`
    .primary-content {
      font-weight: bold;
    }
  .secondary-content {
    color: ${COLORS.TEXT.LIGHT};
  }
`
