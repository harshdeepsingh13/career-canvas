import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Form} from "react-bootstrap";
import PropTypes from 'prop-types';
import {CheckWrapper, GroupWrapper, InputWrapper, LabelWrapper, SelectWrapper} from "./styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {COLORS} from "../../../config/colors";
import _ from "lodash";

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
                                      children,
                                      onAutofill,
                                      autofillItems,
                                      autofillLoader,
                                      onSelectAutofill,
                                  }, ref) => {

    const [myValue, setMyValue] = useState(value || "");
    const [isValid, setIsValid] = useState(true);
    const [invalidMessage, setInvalidMessage] = useState("");
    const [showAutofillList, setShowAutofillList] = useState(false);

    const inputRef = useRef();
    const autofillListRef = useRef();

    useEffect(() => {
        setMyValue(value)
    }, [value]);
    useEffect(() => {
        if (onAutofill && autofillItems && myValue) setShowAutofillList(true);
        const element = autofillListRef?.current;

        const handleClickOutside = (event) => {
            if (element && !element?.contains(event.target)) {
                setShowAutofillList(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onAutofill, autofillItems, autofillListRef, myValue]);

    const handleAutofillDebounced = useMemo(() => onAutofill && _.debounce(onAutofill, 300), [onAutofill])

    const handleChange = (args) => {
        const {target: {value: inputValue}} = args;
        setMyValue(inputValue);
        onChange && onChange(inputValue);
        if (validator) {
            const {isValid, message} = validator(inputValue);
            setIsValid(isValid);
            setInvalidMessage(message);
        }
        if (onAutofill) {
            if (inputValue)
                handleAutofillDebounced(inputValue);
            else
                setShowAutofillList(false);
        }
    }

    const handleOnKeyDown = (event) => {
        onKeyDown && onKeyDown(event)
    }

    const onClickAutofillItem = (autofill) => {
        handleChange({target: {value: ""}})
        // inputRef.current.value = autofill;
        inputRef.current.focus();
        onSelectAutofill && onSelectAutofill(autofill);
    }

    return <>
        <GroupWrapper controlId={id} className={groupClassName}>
            {
                label &&
                <LabelWrapper>{label}</LabelWrapper>
            }
            {children && children}
            <div className="autofill-input-container">
                <div className="input-container">
                    <InputWrapper
                        ref={inputRef}
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
                </div>
                {(onAutofill && autofillLoader) && <div className="autofill-loader-container">
                    <FontAwesomeIcon icon={faCircleNotch} color={COLORS.SECONDARY.ORANGE} size={"xl"} spin/>
                </div>}
                {
                    (onAutofill && showAutofillList && autofillItems) &&
                    <div className="autofill-items-container" ref={autofillListRef}>
                        {autofillItems.map((autofill, index) => <div
                                className="autofill-item"
                                key={`${autofill}-${index}`}
                                onClick={() => onClickAutofillItem(autofill)}
                            >
                                {typeof autofill === "object" && <autofill.Item/>}
                                {typeof autofill === "string" && autofill}
                            </div>
                        )}
                    </div>
                }
            </div>
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
    onAutofill: PropTypes.func,
    autofillItems: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.object,
            Item: PropTypes.func
        }))
    ]),
    autofillLoader: PropTypes.bool,
    onSelectAutofill: PropTypes.func,
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
    style: {},
    autofillLoader: false
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
    prev.readOnly === next.readOnly &&
    prev.autofillLoader === next.autofillLoader &&
    prev.autofillItems === next.autofillItems

export const SelectV2 = React.memo(SelectInput, arePropsEqual);
export const CheckV2 = React.memo(InputCheck, arePropsEqual)
export default React.memo(InputV2, arePropsEqual)
