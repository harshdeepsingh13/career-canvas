import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import actions from './actions';
import {useToastContext} from "../ToastContext";

export const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({children}) => {

	const [state, setState] = useState({userDetails: null});

	const [registerUserLoader, setRegisterUserLoader] = useState(false);
	const [fetchUserDetailsLoader, setFetchUserDetailsLoader] = useState(false);

	const {pushToast} = useToastContext();

	const updateState = useCallback(async (updatedData, toClear = false) => {
		setState((prevState => (toClear ? {} : {...prevState, ...updatedData})));
		return true;
	}, [setState]);

	const enhancedActions = useMemo(() => actions(state, updateState, {
		setRegisterUserLoader,
		setFetchUserDetailsLoader
	}, pushToast), [state, updateState]);


	const value = useMemo(() => ({
		actions: enhancedActions,
		state,
		loaders: {registerUserLoader, fetchUserDetailsLoader}
	}), [enhancedActions, state, registerUserLoader, fetchUserDetailsLoader]);

	return <>
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	</>
};

export default UserContextProvider;
