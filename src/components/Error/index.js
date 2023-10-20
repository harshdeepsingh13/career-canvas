import React from 'react';
import PropTypes from 'prop-types';
import {ErrorWrapper} from "./styles";

const Error = ({message, className}) => {

	return (
		<ErrorWrapper className={className}>
			<span className="error">
				{message}
			</span>
		</ErrorWrapper>
	)
};

Error.propTypes = {
	message: PropTypes.string.isRequired,
	className: PropTypes.string
};

export default Error
