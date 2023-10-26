import React, {useEffect} from 'react';

import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {LoaderWrapper} from "./styles";
import {COLORS} from "../../config/colors";

library.add(faCircleNotch);

export const LOADER_SIZE = {LARGE: "lg", SMALL: "sm", XXL: "2xl"}

const Loader = ({size, className, message}) => {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "initial";
        }
    }, []);

    return (
        <LoaderWrapper className={className}>
            <FontAwesomeIcon
                icon={"circle-notch"}
                spin
                size={size}
                color={COLORS.SECONDARY.ORANGE}
            />
            <p className="message">{message}</p>
        </LoaderWrapper>
    )
};

Loader.propTypes = {
    size: PropTypes.oneOf(Object.values(LOADER_SIZE)),
    className: PropTypes.string,
    message: PropTypes.string
};
Loader.defaultProps = {
    size: LOADER_SIZE.LARGE,
    message: "Loading"
}

export default Loader
