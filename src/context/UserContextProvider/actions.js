import {
    deleteUserDetailsItemAPI,
    fetchCompleteUserDetailsAPI,
    fetchUserDetailsAPI,
    loginUserAPI,
    registerUserAPI,
    updateDetailsAPI,
    updateUserCompleteInformationAPI
} from "../../services/axios";
import {setToken, setUserDetails} from "../../services/localStorage";

export default (state, updateState, loaderSetters, pushToast) => {
    return ({
        registerUser: async (userData, successCallback) => {
            try {
                loaderSetters.setRegisterUserLoader(true);
                await registerUserAPI(userData);
                pushToast({text: "Your account is completely setup!", variant: "success"})
                successCallback();
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setRegisterUserLoader(false);
            }
        },
        loginUser: async (data, successCallback, emailPasswordErrorCallback) => {
            try {
                loaderSetters.setRegisterUserLoader(true);
                const {data: dataResponse} = await loginUserAPI(data);
                setToken(dataResponse.data.token);
                pushToast({text: "Login successful", variant: "success"});
                successCallback();
            } catch (e) {
                console.log("e.response.data", e.response.data);
                if (e.response.data.status === 404) {
                    emailPasswordErrorCallback && emailPasswordErrorCallback(e.response.data.message);
                } else
                    pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setRegisterUserLoader(false);
            }
        },
        fetchUserDetails: async (successCallback) => {
            try {
                loaderSetters.setFetchUserDetailsLoader(true);
                const {data: {data: userDetails}} = await fetchUserDetailsAPI();
                // setUserDetails({name: userDetails.name, rollbackSeconds: userDetails.rollbackSeconds});
                updateState({userDetails});
                successCallback && successCallback(userDetails);
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setFetchUserDetailsLoader(false);
            }
        },
        updateUser: async (updateDetails, successCallback) => {
            try {
                loaderSetters.setFetchUserDetailsLoader(true);
                const {data: {data: {user}}} = await updateDetailsAPI(updateDetails)
                updateState({user});
                setUserDetails({name: user.name, rollbackSeconds: user.rollbackSeconds});
                successCallback && successCallback(user);
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setFetchUserDetailsLoader(false);
            }
        },
        fetchCompleteUserDetails: async (successCallback) => {
            try {
                loaderSetters.setFetchUserDetailsLoader(true);
                const {data: {data}} = await fetchCompleteUserDetailsAPI();
                updateState({userCompleteDetails: data});
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setFetchUserDetailsLoader(false);
            }
        },
        updateCompleteUserDetails: async (updateAPI, updateData, successCallback) => {
            try {
                loaderSetters.setUpdateUserInformationLoader(true);
                await updateUserCompleteInformationAPI(updateAPI, updateData);
                pushToast({text: "Details updated successfully", variant: "success"})
                successCallback && successCallback();
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setUpdateUserInformationLoader(false)
            }
        },
        deleteUserDetailsItem: async (deleteAPI, toDeleteID, successCallback) => {
            try {
                loaderSetters.setUpdateUserInformationLoader(true);
                await deleteUserDetailsItemAPI(deleteAPI, toDeleteID)
                pushToast({text: "Details updated successfully", variant: "success"})
                successCallback && successCallback();
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setUpdateUserInformationLoader(false)
            }
        }
    });
};
