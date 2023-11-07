import React from 'react';
import PropTypes from 'prop-types';
import {BadgeWrapper} from "./styles";

const CustomBadge = ({children, ...rest}) => {
return <>
    <BadgeWrapper {...rest}>{children}</BadgeWrapper>
</>
};

CustomBadge.propTypes={
    props: PropTypes.object
};
CustomBadge.defaultProps={
    props: {}
};

export default CustomBadge
