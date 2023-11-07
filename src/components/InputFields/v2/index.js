import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import PropTypes from 'prop-types';
import {CheckWrapper, GroupWrapper, InputWrapper, LabelWrapper, SelectWrapper} from "./styles";

const SelectInput = React.forwardRef(({
                                          name,
                                          type,
                                          id,
                                          value,
                                          onChange,
                                          placeholder,
                                          validator,
                                          disabled,
                                          readOnly,
                                          required,
                                          error,
                                          label,
                                          errorMessage,
                                          className,
                                          groupClassName,
                                          children
                                      }, ref) => {
    const [myValue, setMyValue] = useState(value || " ")

    useEffect(() => {
        setMyValue(value);
    }, [value]);

    const handleChange = (event) => {
        const {target: {value: inputValue}} = event;
        setMyValue(inputValue);
        onChange(inputValue)
    }

    return <>
        <GroupWrapper className={groupClassName}>
            {label &&
                <LabelWrapper>{label}</LabelWrapper>
            }

            <SelectWrapper
                type={type}
                name={name}
                id={id}
                value={myValue}
                placeholder={placeholder}
                onChange={handleChange}
                className={className}
                disabled={disabled}
                readOnly={readOnly}
            >
                {children}
            </SelectWrapper>
        </GroupWrapper>
    </>
})

const InputCheck = React.forwardRef(({
                                         as,
                                         name,
                                         type,
                                         id,
                                         value,
                                         checked,
                                         onChange,
                                         placeholder,
                                         validator,
                                         disabled,
                                         readOnly,
                                         required,
                                         error,
                                         label,
                                         errorMessage,
                                         className,
                                         groupClassName,
                                         children
                                     }, ref) => {
    // const [myValue, setMyValue] = useState(value || "");
    const [myChecked, setMyChecked] = useState(checked);
    const [isValid, setIsValid] = useState(true);
    const [invalidMessage, setInvalidMessage] = useState("");

    useEffect(() => {
        setMyChecked(checked)
    }, [checked]);

    const handleChange = (args) => {
        const {target: {checked: inputValue}} = args;
        setMyChecked(inputValue);
        onChange(inputValue);
        if (validator) {
            const {isValid, message} = validator(inputValue);
            setIsValid(isValid);
            setInvalidMessage(message);
        }
    }

    return <>
        <GroupWrapper controlId={id} className={groupClassName}>
            {
                label &&
                <LabelWrapper>{label}</LabelWrapper>
            }
            {children && children}
            <CheckWrapper
                as={as}
                type={type}
                name={name}
                id={id}
                checked={myChecked}
                placeholder={placeholder}
                onChange={handleChange}
                className={className}
                isInvalid={error || !isValid}
                disabled={disabled}
                readOnly={readOnly}
            />
            {(error || Boolean(validator)) &&
                <Form.Control.Feedback type="invalid">
                    {error ? errorMessage : !isValid ? invalidMessage : ""}
                </Form.Control.Feedback>
            }
        </GroupWrapper>
    </>
})

const InputV2 = React.forwardRef(({
                                      name,
                                      as,
                                      type,
                                      id,
                                      value,
                                      onChange,
                                      onKeyDown,
                                      placeholder,
                                      validator,
                                      disabled,
                                      readOnly,
                                      required,
                                      error,
                                      label,
                                      errorMessage,
                                      className,
                                      groupClassName,
                                      children
                                  }, ref) => {

    const [myValue, setMyValue] = useState(value || "");
    const [isValid, setIsValid] = useState(true);
    const [invalidMessage, setInvalidMessage] = useState("");

    useEffect(() => {
        setMyValue(value)
    }, [value]);

    const handleChange = (args) => {
        const {target: {value: inputValue}} = args;
        setMyValue(inputValue);
        onChange(inputValue);
        if (validator) {
            const {isValid, message} = validator(inputValue);
            setIsValid(isValid);
            setInvalidMessage(message);
        }
    }

    const handleOnKeyDown = (event) => {
        onKeyDown && onKeyDown(event)
    }

    return <>
        <GroupWrapper controlId={id} className={groupClassName}>
            {
                label &&
                <LabelWrapper>{label}</LabelWrapper>
            }
            {children && children}
            <InputWrapper
                as={as}
                type={type}
                name={name}
                id={id}
                value={myValue}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleOnKeyDown}
                className={className}
                isInvalid={error || !isValid}
                disabled={disabled}
                readOnly={readOnly}
            />
            {(error || Boolean(validator)) &&
                <Form.Control.Feedback type="invalid">
                    {error ? errorMessage : !isValid ? invalidMessage : ""}
                </Form.Control.Feedback>
            }
        </GroupWrapper>
    </>
});

const propTypes = {
    name: PropTypes.string,
    as: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    validator: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    groupClassName: PropTypes.string,
    type: PropTypes.oneOf(["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"])
};
const defaultProps = {
    name: "name",
    id: "id",
    type: "text",
    placeholder: "placeholder",
    required: false,
    disabled: false,
    readOnly: false,
    error: false,
    style: {}
};

InputV2.propTypes = propTypes;
InputV2.defaultProps = defaultProps;

SelectInput.propTypes = propTypes;
SelectInput.defaultProps = defaultProps;

InputCheck.propTypes = propTypes;
InputCheck.defaultProps = defaultProps;

const arePropsEqual = (prev, next) => prev.value === next.value &&
    prev.checked === next.checked &&
    prev.error === next.error &&
    prev.errorMessage === next.errorMessage &&
    prev.disabled === next.disabled &&
    prev.readOnly === next.readOnly

export const SelectV2 = React.memo(SelectInput, arePropsEqual);
export const CheckV2 = React.memo(InputCheck, arePropsEqual)
export default React.memo(InputV2, arePropsEqual)
