import PropTypes from 'prop-types';
import React, { Suspense, useEffect, useState } from 'react';
import { LabelWrapper } from "../InputFields/v2/styles";
import { RichTextInputWrapper } from "./styles";

const ReactQuill = React.lazy(() => import('react-quill'));

const RichTextInput = ({value, label, placeholder, groupClassName, readOnly, onChange, showActionsOnReadOnly}) => {

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
            {
                (!showActionsOnReadOnly && readOnly) ?
                    <div className="text-read-only" dangerouslySetInnerHTML={{__html: myInputValue}} /> :
                    <Suspense fallback={null}>
                        <ReactQuill
                            theme="snow"
                            value={myInputValue}
                            onChange={handleChange}
                            placeholder={placeholder}
                            readOnly={readOnly}
                        />
                    </Suspense>
            }
        </RichTextInputWrapper>
    </>
};

RichTextInput.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    groupClassName: PropTypes.string,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    showActionsOnReadOnly: PropTypes.bool
};
RichTextInput.defaultProps = {
    value: "",
    readOnly: false,
    showActionsOnReadOnly: false
};

export default RichTextInput
