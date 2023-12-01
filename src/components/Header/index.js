import React, {useEffect} from 'react';
import Logo from "../Logo";
import {getToken, removeToken} from "../../services/localStorage";
import {useNavigate} from "react-router";
import {HeaderWrapper} from "./styles";
import {Link, NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes";
import {useAuthenticationContext} from "../../context/AuthorizationContext";
import {useUserContext} from "../../context/UserContextProvider";
import Loader from "../Loader";

const navs = [
    {text: "Build Resume", link: ROUTES.BUILD},
    {text: "Your Details", link: ROUTES.DETAILS},
    {text: "Job Search", link: ROUTES.JOBS},
    {text: "Cover Letter", link: ROUTES.COVER_LETTER}
]
const Header = props => {

    const navigate = useNavigate();

    const {isAuthorized, logoutUser: logout} = useAuthenticationContext();
    const {state: userState, loaders: userLoaders, actions: userActions} = useUserContext();

    const {userDetails} = userState;
    const {fetchUserDetails} = userActions;
    const {fetchUserDetailsLoader} = userLoaders;

    useEffect(() => {
        if (!Object.keys(userDetails).length)
            fetchUserDetails();
    }, [isAuthorized, userDetails])

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
            {fetchUserDetailsLoader && <Loader message={"Getting your details"}/>}
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
