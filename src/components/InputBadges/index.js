import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {BadgeItemWrapper, InputBadgesWrapper} from "./styles";
import InputV2 from "../InputFields/v2";
import {LabelWrapper} from "../InputFields/v2/styles";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const CLICK_ACTIONS = {DELETE: "DELETE"}

const InputBadges = ({
                         name,
                         id,
                         badgeProps,
                         badges,
                         label,
                         placeholder,
                         groupClassName,
                         readOnly,
                         onChange,
                         max,
                         clickAction,
                         onAutofill,
                         autofillItems,
                         autofillLoader,
    onSelectAutofill
                     }) => {
    const [myBadges, setMyBadges] = useState(badges);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setMyBadges(badges);
    }, [badges]);

    let isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            onChange && onChange(myBadges)
            setInputValue("");
        }
    }, [myBadges]);

    const addBadge = (newBadge) => {
        if (max && myBadges?.length < max)
            setMyBadges(prev => [...prev, newBadge])
        else if (!max)
            setMyBadges(prev => [...prev, newBadge])
    }

    const onKeyDown = (event) => {
        if ((event.keyCode === 13 || event.key === "Enter") && inputValue) {
            addBadge(inputValue);
        }
    }

    const onValueChange = value => {
        setInputValue(value);
    }

    const onBadgeClick = (event, badge, index) => {
        if (!readOnly) {
            switch (clickAction) {
                case CLICK_ACTIONS.DELETE:
                    setMyBadges(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
                default:
                    return;
            }
        }
    }

    const handleSelectAutofill = (autofillValue) => {
        addBadge(autofillValue);
        onSelectAutofill && onSelectAutofill(autofillValue)
    }

    return <>
        <InputBadgesWrapper controlId={id} className={groupClassName} readOnly={readOnly}>
            {label && <LabelWrapper>{label}</LabelWrapper>}
            <div className="badge-form-container">
                <div className="badges-container">
                    {
                        myBadges?.map((badge, index) => <BadgeItemWrapper
                            {...badgeProps}
                            readOnly={readOnly}
                            isClickActivated={!!clickAction}
                            onClick={(event) => onBadgeClick(event, badge, index)}
                        >
                            {badge}
                            <span className={"click-action-helper"}> | <FontAwesomeIcon icon={faTrash}/></span>
                        </BadgeItemWrapper>)
                    }
                </div>
                {!readOnly &&
                    <div className="input-container">
                        {max && <small>{myBadges?.length}/{max}</small>}
                        <InputV2
                            name={name}
                            id={id}
                            placeholder={placeholder}
                            groupClassName={"input-group"}
                            value={inputValue}
                            onChange={onValueChange}
                            onKeyDown={onKeyDown}
                            onAutofill={onAutofill}
                            autofillLoader={autofillLoader}
                            autofillItems={autofillItems}
                            onSelectAutofill={handleSelectAutofill}
                        />
                        <small>Press Enter &#8629; to add. Click on the badge to delete</small>
                    </div>
                }
            </div>
        </InputBadgesWrapper>
    </>
};

InputBadges.propTypes = {
    badgeProps: PropTypes.object,
    badges: PropTypes.array,
    name: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    groupClassName: PropTypes.string,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    max: PropTypes.number,
    clickAction: PropTypes.oneOf(Object.keys(CLICK_ACTIONS)),
    onAutofill: PropTypes.func,
    autofillItems: PropTypes.array,
    autofillLoader: PropTypes.bool,
    onSelectAutofill: PropTypes.func
};
InputBadges.defaultProps = {
    badgeProps: {},
    badges: [],
    name: "input-badge",
    id: "input-badge",
    placeholder: "Badge",
    readOnly: false,
};

export default InputBadges
