import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {LoginWrapper} from "./styles";
import InputV2 from "../../components/InputFields/v2";
import {PageViewContainer} from "../../config/globalStyles";
import Button from "../../components/Button";
import {checkEmail, checkPassword, validateEmail, validatePassword} from "../../services/helpers";
import {Link} from "react-router-dom";
import {ROUTES} from "../../config/routes";

const Login = props => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChange = (value) => {
        setEmail(value);
    }
    const onPasswordChange = value => {
        setPassword(value);
    }
    const onLoginClick = () => {
      const data = {email, password}
      // if(validateData(data)){}
    }

    return <>
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
                    validator={validatePassword}
                />
                <Link to={ROUTES.REGISTER}> Create a new account </Link>
                <Button onClick={onLoginClick}>
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
