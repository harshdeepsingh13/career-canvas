import {EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX} from "../config/config";

const checkEmail = (email) => {
    return email.trim().toLowerCase().match(EMAIL_REGEX);
}
const checkPassword = password => {
    return password.trim().match(PASSWORD_REGEX);
}
const checkPhoneNumber = phone => {
    return phone.trim().match(PHONE_REGEX);
}

export const validateEmail = email => {
    if (email) {
        const isValid = checkEmail(email);
        return {isValid: !!isValid, message: "Email is not valid"}
    }
    return {isValid: true}
}
export const validatePassword = password => {
    if (password) {
        const isValid = checkPassword(password);
        return {
            isValid: !!isValid,
            message: "Minimum length is 8 with at least one capital letter, numeric number and a symbol"
        }
    }
    return {isValid: true}
}

export const validatePhoneNumber = phone => {
    if (phone) {
        const isValid = checkPhoneNumber(phone);
        return {
            isValid: !!isValid,
            message: "Phone is not valid"
        }
    }
    return {isValid: true}
}
