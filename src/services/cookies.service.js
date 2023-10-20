/*
import Cookies from 'universal-cookie';
import {LOCAL_STORAGE_KEY} from "../config/config";

const cookies = new Cookies();
const path = "/";

export const setItem = data => cookies.set(LOCAL_STORAGE_KEY, data, {path});

export const getToken = () => {
	const cookieData = cookies.get(LOCAL_STORAGE_KEY, {path});
	// const data = cookieData ? JSON.parse(cookieData) : {};
	return (cookieData && cookieData.token) ? cookieData.token : undefined;
};

export const getItem = () => cookies.get(LOCAL_STORAGE_KEY, {path})

export const removeItem = () => {
	cookies.remove(LOCAL_STORAGE_KEY, {path})
}
*/
