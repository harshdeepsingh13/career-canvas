import {LOCAL_STORAGE_KEY} from "../config/config";

export const getToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
}

export const setToken = (token) => {
    return localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
}

export const removeToken = () => {
    return localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN)
}

export const removeUserDetailsLS = () => {
    return localStorage.removeItem(LOCAL_STORAGE_KEY.USER_DETAILS);
}

export const getUserDetailsLS = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY.USER_DETAILS);
    return data ? JSON.parse(data) : null;
};

export const setUserDetails = (user) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.USER_DETAILS, JSON.stringify(user));
}
