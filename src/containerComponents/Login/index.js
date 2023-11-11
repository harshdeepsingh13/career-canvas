import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {LoginWrapper} from "./styles";
import InputV2 from "../../components/InputFields/v2";
import {PageViewContainer} from "../../config/globalStyles";
import Button from "../../components/Button";
import {checkEmail, checkPassword, validateEmail, validatePassword} from "../../services/helpers";
import {Link} from "react-router-dom";
import {ROUTES as ROUTE_PATH, ROUTES} from "../../config/routes";
import {useUserContext} from "../../context/UserContextProvider";
import Loader from "../../components/Loader";

const Login = props => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emptyFieldsValidation, setEmptyFieldsValidation] = useState([])

    const {state: userState, actions: userActions, loaders: userLoaders} = useUserContext();

    const {loginUser} = userActions;
    const {registerUserLoader} = userLoaders;

    const onEmailChange = (value) => {
        setEmail(value);
    }
    const onPasswordChange = value => {
        setPassword(value);
    }

    const validateData = data => {
        let isValid = true;
        let emptyFields = [];

        if (!data?.email) {
            emptyFields.push("email")
            isValid = false;
        }
        if (!data?.password) {
            emptyFields.push('password');
            isValid = false;
        }
        setEmptyFieldsValidation(emptyFields)
        return isValid;
    }

    const onLoginClick = () => {
        const data = {email, password}
        if (validateData(data)) {
            const successCallback = () => {
                window.location.href = ROUTE_PATH.INDEX;
            }
            loginUser(data, successCallback);
        }
    }

    return <>
        {registerUserLoader && <Loader/>}
        <PageViewContainer>
            <LoginWrapper>
                <InputV2
                    type={"email"}
                    id={"email"}
                    name={"email"}
                    value={email}
                    onChange={onEmailChange}
                    placeholder={"Enter Email"}
                    label={"Email"}
                    validator={validateEmail}
                />
                <InputV2
                    type={"password"}
                    id={"password"}
                    name={"password"}
                    value={password}
                    onChange={onPasswordChange}
                    placeholder={"Enter Password"}
                    label={"Password"}
                />
                <Link to={ROUTES.REGISTER} className={"create-account-link"}> Create a new account </Link>
                <Button onClick={onLoginClick} className={"login-button"}>
                    Login
                </Button>
            </LoginWrapper>
        </PageViewContainer>
    </>
};

Login.propTypes = {
    props: PropTypes.object
};
Login.defaultProps = {
    props: {}
};

export default Login
