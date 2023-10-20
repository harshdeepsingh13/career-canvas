import React from 'react';
import AuthenticationContextProvider from "./AuthorizationContext";
import ToastContextProvider from "./ToastContext";
import UserContextProvider from "./UserContextProvider";

const GlobalContextProvider = ({children}) => {
    return <>
        <ToastContextProvider>
            <AuthenticationContextProvider>
                <UserContextProvider>
                    {children}
                </UserContextProvider>
            </AuthenticationContextProvider>
        </ToastContextProvider>
    </>
};

GlobalContextProvider.propTypes = {};
GlobalContextProvider.defaultProps = {};

export default GlobalContextProvider
