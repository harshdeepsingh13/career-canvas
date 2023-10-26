import axios from 'axios';
import {getToken} from "./localStorage";
import {API_ROUTES} from "../config/config";

const axiosInstance = axios.create({
    baseURL: API_ROUTES.BASE_URL_V1,
    headers: {authorization: `Bearer ${getToken()}`}
});

export const registerUserAPI = (data) => axios({
    method: "POST",
    url: API_ROUTES.BASE_URL_V1 + API_ROUTES.REGISTER_USER,
    data
});

export const fetchUserDetailsAPI = () => axiosInstance({method: "GET", url: API_ROUTES.USER_DETAILS})
export const loginUserAPI = (data) => axios({
    method: "POST",
    url: API_ROUTES.BASE_URL_V1 + API_ROUTES.LOGIN_USER,
    data
});

export const fetchMediaAPI = () => axiosInstance({
    method: "GET",
    url: API_ROUTES.FETCH_MEDIA
})

export const uploadAudioAPI = (data) => axiosInstance({
    method: "POST",
    url: API_ROUTES.UPLOAD_AUDIO,
    data
})

export const deleteMediaAPI = (id) => axiosInstance({
    method: "DELETE",
    url: API_ROUTES.DELETE_MEDIA(id)
})

export const renameMediaAPI = (id, name) => axiosInstance({
    method: "PUT",
    url: API_ROUTES.RENAME_MEDIA(id),
    data: {name}
})

export const updateDetailsAPI = updateDetails =>
    axiosInstance({
        method: "PUT",
        url: API_ROUTES.UPDATE_USER,
        data: {details: updateDetails}
    })

export const fetchCompleteUserDetailsAPI = () => axiosInstance({method: "GET", url: API_ROUTES.COMPLETE_USER_DETAILS})
