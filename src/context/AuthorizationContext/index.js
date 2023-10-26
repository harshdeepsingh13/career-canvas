import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {getToken, removeToken, removeUserDetailsLS} from "../../services/localStorage";

export const AuthenticationContext = createContext({});

export const useAuthenticationContext = () => useContext(AuthenticationContext);

const AuthenticationContextProvider = ({children}) => {

    const isToken = Boolean(getToken());

    const [isAuthorized, setIsAuthorized] = useState(isToken);

    const logoutUser = useCallback(() => {
        removeToken();
        removeUserDetailsLS();
        window.location.href = "/";
    }, []);

    useEffect(() => {
        if (isToken) {
            setIsAuthorized(true);
        } else setIsAuthorized(false);
    }, [isToken]);

    const value = useMemo(() => ({isAuthorized, logoutUser}), [isAuthorized, logoutUser]);

    return <>
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    </>
};

export default AuthenticationContextProvider;
