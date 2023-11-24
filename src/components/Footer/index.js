import React from 'react';
import {FooterWrapper} from "./styles";
import {Link} from "react-router-dom";
import Logo, {LOGO_MODE} from "../Logo";
import {H2} from "../../config/globalStyles";


const Footer = props => {
  return <>
    <FooterWrapper>
      <H2 className="header-continer">
        <Link to={"/"}><Logo mode={LOGO_MODE.LONG}/></Link>
      </H2>
      <p className="footer-body">
        &copy; Copyright 2023
      </p>
    </FooterWrapper>
  </>
};

Footer.propTypes = {};
Footer.defaultProps = {};

export default Footer
