import React from 'react';
import {LogoWrapper} from "./styles";
import PropTypes from "prop-types";

export const LOGO_MODE = {STACKED: "STACKED", LONG: "LONG", ICON: "ICON"}
const LOGO_SOURCE = {[LOGO_MODE.STACKED]: "assets/logo.svg", [LOGO_MODE.LONG]: "assets/logo_long.svg", [LOGO_MODE.ICON]: "assets/logo_icon.png"}

const Logo = ({mode, className}) => {
  return <>
    <LogoWrapper src={LOGO_SOURCE[mode]} alt={"Career Canvas Logo"} className={className}/>
  </>
};

Logo.propTypes = {
  mode: PropTypes.oneOf(Object.keys(LOGO_MODE)),
  className: PropTypes.string
};

Logo.defaultProps = {
  mode: LOGO_MODE.STACKED
}

export default Logo
