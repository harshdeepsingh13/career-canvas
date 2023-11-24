import React from 'react';
import AuthenticationContextProvider from "./AuthorizationContext";
import ToastContextProvider from "./ToastContext";
import UserContextProvider from "./UserContextProvider";
import ResumeTemplateContextProvider from "./ResumeTemplateContextProvider";
import JobSearchContextProvider from "./JobSearchContext";

const GlobalContextProvider = ({children}) => {
    return <>
        <ToastContextProvider>
            <AuthenticationContextProvider>
                <UserContextProvider>
                    <ResumeTemplateContextProvider>
                        <JobSearchContextProvider>
                            {children}
                        </JobSearchContextProvider>
                    </ResumeTemplateContextProvider>
                </UserContextProvider>
            </AuthenticationContextProvider>
        </ToastContextProvider>
    </>
};

GlobalContextProvider.propTypes = {};
GlobalContextProvider.defaultProps = {};

export default GlobalContextProvider
