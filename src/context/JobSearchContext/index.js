import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import actions from './actions';
import {useToastContext} from "../ToastContext";

export const JobSearchContext = createContext({});

export const useJobSearchContext = () => useContext(JobSearchContext);

const initState = {
    jobResult: [],
    hasMoreItems: true
}

const JobSearchContextProvider = ({children}) => {

    const [state, setState] = useState(initState);
    const [jobSearchLoader, setJobSearchLoader] = useState(false)

    const {pushToast} = useToastContext();

    const updateState = useCallback((updatedData, toClear = false) => {
        setState((prevState => (toClear ? {} : {...prevState, ...updatedData})))
    }, [setState]);

    const pushJobs = useCallback((jobs, hasMoreItems) => {
        setState(prev => ({...prev, jobResult: [...prev.jobResult, ...jobs], hasMoreItems}))
    }, [])

    const enhancedActions = useMemo(() => actions(state, updateState, {setJobSearchLoader}, pushToast, pushJobs), [state, updateState, pushJobs]);

    const value = useMemo(() => ({
        actions: enhancedActions,
        state,
        loaders: {jobSearchLoader}
    }), [enhancedActions, state, jobSearchLoader]);

    return <>
        <JobSearchContext.Provider value={value}>
            {children}
        </JobSearchContext.Provider>
    </>
};

export default JobSearchContextProvider;
