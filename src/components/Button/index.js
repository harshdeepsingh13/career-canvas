import React from 'react';
import PropTypes from 'prop-types';
import {ButtonWrapper} from "./styles";

export const button_variant = {
    primary: "primary",
    secondary: "secondary",
    success: "success",
    warning: "warning",
    danger: "danger",
    info: "info",
    light: "light",
    dark: "dark",
    link: "link",
}

const Button = ({onClick, className, children, variant, as}) => {
    return <>
        <ButtonWrapper onClick={onClick} className={className} variant={variant} as={as}>
            {children}
        </ButtonWrapper>
    </>
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    variant: PropTypes.oneOf(Object.keys(button_variant))
};
Button.defaultProps = {
    variant: button_variant.primary
};

export default Button


