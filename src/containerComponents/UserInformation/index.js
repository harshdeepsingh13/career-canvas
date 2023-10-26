import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {PageViewContainer} from "../../config/globalStyles";
import {UserInformationWrapper} from "./styles";
import {useUserContext} from "../../context/UserContextProvider";
import Loader from "../../components/Loader";

const UserInformation = props => {

    const {state: userState, loaders: userLoaders, actions: userActions} = useUserContext();

    const {userCompleteDetails} = userState;
    const {fetchCompleteUserDetails} = userActions;
    const {fetchUserDetailsLoader} = userLoaders;

    let isMounted = useRef(false);

    useEffect(() => {
        if(!isMounted.current){
            fetchCompleteUserDetails();
            isMounted.current = true;
        }
    }, []);


    return <>
        {fetchUserDetailsLoader && <Loader message={"Finding your details"}/>}
        <PageViewContainer>
            <UserInformationWrapper>
                {JSON.stringify(userCompleteDetails, null, 2)}
            </UserInformationWrapper>
        </PageViewContainer>
    </>
};

UserInformation.propTypes = {
    props: PropTypes.object
};
UserInformation.defaultProps = {
    props: {}
};

export default UserInformation
