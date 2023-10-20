import React from 'react';

import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {LoaderWrapper} from "./styles";
import {COLORS} from "../../config/colors";

library.add(faCircleNotch);

export const LOADER_SIZE = {LARGE: "lg", SMALL: "sm"}

const Loader = ({size, className}) => {
	return (
		<LoaderWrapper className={className}>
			<FontAwesomeIcon
				icon={"circle-notch"}
				spin
				size={size}
				color={COLORS.SECONDARY.ORANGE}
			/>
		</LoaderWrapper>
	)
};

Loader.propTypes = {
	size: PropTypes.oneOf(Object.values(LOADER_SIZE)),
	className: PropTypes.string
};
Loader.defaultProps = {
	size: LOADER_SIZE.LARGE
}

export default Loader
