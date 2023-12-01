import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import actions from './actions';
import {useToastContext} from "../ToastContext";


export const CoverLetterContext = createContext({});

export const useCoverLetterContext = () => useContext(CoverLetterContext);

const initState = {coverLetter: ""}
const CoverLetterContextProvider = ({children}) => {

    const [state, setState] = useState(initState);
    const [generateCoverLetterLoader, setGenerateCoverLetterLoader] = useState(false);

    const {pushToast} = useToastContext();

    const updateState = useCallback((updatedData, toClear = false) => {
        setState((prevState => (toClear ? {} : {...prevState, ...updatedData})))
    }, [setState]);

    const pushCoverLetterContent = useCallback((newCoverLetterData) => {
        setState(prev => ({...prev, coverLetter: newCoverLetterData}))
    }, [])

    const enhancedActions = useMemo(() => actions(state, updateState, {setGenerateCoverLetterLoader}, pushToast, pushCoverLetterContent), [state, updateState, setGenerateCoverLetterLoader, pushCoverLetterContent]);


    const value = useMemo(() => ({
        actions: enhancedActions,
        state,
        loaders: {generateCoverLetterLoader}
    }), [enhancedActions, state, generateCoverLetterLoader]);

    return <>
        <CoverLetterContext.Provider value={value}>
            {children}
        </CoverLetterContext.Provider>
    </>
};

export default CoverLetterContextProvider;
