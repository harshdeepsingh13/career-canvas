import styled from "styled-components";
import {Form} from "react-bootstrap";

export const GroupWrapper = styled(Form.Group)`
  margin: 10px 0;

  textarea {
    padding: 6px 12px;
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
