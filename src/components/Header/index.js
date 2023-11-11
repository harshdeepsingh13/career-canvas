import React from 'react';
import Logo from "../Logo";
import {getToken, removeToken} from "../../services/localStorage";
import {useNavigate} from "react-router";
import {HeaderWrapper} from "./styles";
import {Link, NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes";
import {useAuthenticationContext} from "../../context/AuthorizationContext";

const navs = [
    {text: "Build Resume", link: ROUTES.BUILD}, {text: "Your Details", link: ROUTES.DETAILS},
    {text: "Job Search", link: ROUTES.JOBS}
]
const Header = props => {

    const navigate = useNavigate();

    const {isAuthorized, logoutUser: logout} = useAuthenticationContext();

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
                    <NavLink
                        to={nav?.link || ""}
                        className={({isActive}) => `nav-link ${isActive && "active"}`}
                        key={`${nav.text}-${index}`}
                    >
                        {nav.text}
                    </NavLink>
                </>)}
                {
                    isAuthorized ?
                        <NavLink to={"/logout"}
                                 className={({isActive}) => `nav-link ${isActive && "active"}`}
                                 onClick={logout}
                        >
                            Logout
                        </NavLink> :
                        <NavLink to={ROUTES.LOGIN}
                                 className={({isActive}) => `nav-link ${isActive && "active"}`}
                        >
                            Login / Register
                        </NavLink>
                }
            </div>
        </HeaderWrapper>
    )
};

Header.propTypes = {};

export default Header
