import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import actions from './actions';
import {useToastContext} from "../ToastContext";


export const ResumeTemplateContext = createContext({});

export const useResumeTemplateContext = () => useContext(ResumeTemplateContext);

const initState = {
    professionalSummary: "",
    skillsAutofillItems: [],
    workExperienceAutofillItems: [],
    projectAutofillItems: [],
    templates: []
};

const ResumeTemplateContextProvider = ({children}) => {

    const [state, setState] = useState(initState);
    const [fetchTemplatesLoader, setFetchTemplatesLoader] = useState(false);
const [addTemplateLoader, setAddTemplateLoader] = useState(false);
    const [fetchSummaryLoader, setFetchSummaryLoader] = useState(false)
    const [skillsAutofillLoader, setSkillsAutofillLoader] = useState(false)
    const [workExperienceAutofillLoader, setWorkExperienceAutofillLoader] = useState(false);
    const [projectAutofillLoader, setProjectAutofillLoader] = useState(false);

    const {pushToast} = useToastContext();

    const updateState = useCallback((updatedData, toClear = false) => {
        setState((prevState => (toClear ? {} : {...prevState, ...updatedData})))
    }, [setState]);

    const enhancedActions = useMemo(() => actions(state, updateState, {
        setFetchSummaryLoader,
        setSkillsAutofillLoader,
        setWorkExperienceAutofillLoader,
        setProjectAutofillLoader,
        setFetchTemplatesLoader,
        setAddTemplateLoader
    }, pushToast), [state, updateState]);


    const value = useMemo(() => ({
        actions: {...enhancedActions, updateState},
        state,
        loaders: {
            fetchSummaryLoader,
            skillsAutofillLoader,
            workExperienceAutofillLoader,
            projectAutofillLoader,
            fetchTemplatesLoader,
            addTemplateLoader
        }
    }), [enhancedActions, state, fetchSummaryLoader, skillsAutofillLoader, updateState, workExperienceAutofillLoader, projectAutofillLoader, fetchTemplatesLoader, addTemplateLoader]);

    return <>
        <ResumeTemplateContext.Provider value={value}>
            {children}
        </ResumeTemplateContext.Provider>
    </>
};

export default ResumeTemplateContextProvider;
