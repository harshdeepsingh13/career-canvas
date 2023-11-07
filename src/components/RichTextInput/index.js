import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {RichTextInputWrapper} from "./styles";
import ReactQuill from "react-quill";
import {LabelWrapper} from "../InputFields/v2/styles";

const RichTextInput = ({value, label, placeholder, groupClassName, readOnly, onChange}) => {

    const [myInputValue, setMyInputValue] = useState(value);

    useEffect(() => {
        setMyInputValue(value)
    }, [value]);
    const handleChange = (value) => {
        setMyInputValue(value);
        onChange && onChange(value);
    }

    return <>
        <RichTextInputWrapper className={groupClassName} readOnly={readOnly}>
            {
                label &&
                <LabelWrapper>{label}</LabelWrapper>
            }
            <ReactQuill
                theme="snow"
                value={myInputValue}
                onChange={handleChange}
                placeholder={placeholder}
                readOnly={readOnly}
            />
        </RichTextInputWrapper>
    </>
};

RichTextInput.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    groupClassName: PropTypes.string,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func
};
RichTextInput.defaultProps = {
    value: "",
    readOnly: false
};

export default RichTextInput
