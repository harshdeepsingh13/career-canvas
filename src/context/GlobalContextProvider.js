import React from 'react';
import AuthenticationContextProvider from "./AuthorizationContext";
import ToastContextProvider from "./ToastContext";
import UserContextProvider from "./UserContextProvider";
import ResumeTemplateContextProvider from "./ResumeTemplateContextProvider";

const GlobalContextProvider = ({children}) => {
    return <>
        <ToastContextProvider>
            <AuthenticationContextProvider>
                <UserContextProvider>
                    <ResumeTemplateContextProvider>
                        {children}
                    </ResumeTemplateContextProvider>
                </UserContextProvider>
            </AuthenticationContextProvider>
        </ToastContextProvider>
    </>
};

GlobalContextProvider.propTypes = {};
GlobalContextProvider.defaultProps = {};

export default GlobalContextProvider
