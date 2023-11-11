import React from 'react';
import {Navigate} from 'react-router-dom';
// import {ROUTE_PATHS} from "../../config/endpoints";
// import {Container} from "react-bootstrap";
// import {useAuthenticationContext} from "../../context/AuthenticationContext";
import PropTypes from "prop-types";
import {useAuthenticationContext} from "../../context/AuthorizationContext";
import Header from "../Header";
import Footer from "../Footer";
import {ROUTES} from "../../config/routes";
// import Header from "../Header";

const RouteWrapper = ({children, isPrivate, header, footer, headerOptions, allCanOpen}) => {

    const {isAuthorized} = useAuthenticationContext();

    return <>

        {header && <Header options={headerOptions}/>}
        {
            allCanOpen ? children :
                isPrivate ?
                    <>
                        {isAuthorized ? <PrivateRoute>{children}</PrivateRoute> : <Navigate to={ROUTES.LOGIN}/>}
                    </> :
                    <>
                        {/*{!isAuthorized ? <Container>{children}</Container> : <Navigate to={ROUTE_PATHS.INDEX}/>}*/}
                        yo
                        {!isAuthorized ? children : <Navigate to={ROUTES.INDEX}/>}
                    </>
        }
        {footer && <Footer/>}
    </>
};

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    isHeader: PropTypes.bool,
    headerOptions: PropTypes.object
};
RouteWrapper.defaultProps = {
    isPrivate: false,
    isHeader: false
};

const PrivateRoute = ({children}) => {

    return <>
        {/*<Container>*/}
        {children}
        {/*</Container>*/}
    </>
}

export default RouteWrapper
