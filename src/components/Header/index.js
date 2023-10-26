import React from 'react';
import Logo from "../Logo";
import {getToken, removeToken} from "../../services/localStorage";
import {useNavigate} from "react-router";
import {HeaderWrapper} from "./styles";
import {Link, NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes";

const navs = [
  {text: "Build Resume", link: ROUTES.BUILD}, {text: "Your Details", link: ROUTES.DETAILS}, {text: "nav3"}
]
const Header = props => {

  const navigate = useNavigate();

  const onSubmitClick = () => {
    if (getToken()) {
      removeToken();
      window.location.href = "/";
    } else {
      navigate('/register');
    }
  }

  return (
    <HeaderWrapper>
      <Link to={"/"} className="logo-container"> <Logo/> </Link>
      <div className="nav-link-container">
        {navs.map((nav, index) => <>
          <NavLink to={nav?.link || ""} className="nav-link" key={`${nav.text}-${index}`}>
            {nav.text}
          </NavLink>
        </>)}
      </div>
    </HeaderWrapper>
  )
};

Header.propTypes = {};

export default Header
