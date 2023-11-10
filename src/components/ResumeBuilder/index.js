import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {DataContentWrapper, ResumeBuilderWrapper} from "./styles";
import {useResumeTemplateContext} from "../../context/ResumeTemplateContextProvider";
import Loader from "../Loader";
import InputBadges, {CLICK_ACTIONS} from "../InputBadges";
import InputV2 from "../InputFields/v2";
import {CustomAutofillItem} from "../InputFields/v2/styles";

const SECTIONS = {OBJECTIVE: "OBJECTIVE", SKILLS: "SKILLS", WORK_EXPERIENCE: "WORK_EXPERIENCE"}

const ResumeBuilder = props => {

    const {state: templateState, actions: templateActions, loaders: templateLoaders} = useResumeTemplateContext();

    const {objective, skillsAutofillItems, workExperienceAutofillItems, projectAutofillItems} = templateState;
    const {
        fetchSummaryLoader,
        skillsAutofillLoader,
        workExperienceAutofillLoader,
        projectAutofillLoader
    } = templateLoaders;
    const {fetchSkills, updateState, fetchWorkExperiences, fetchProjects} = templateActions;

    // const [tabActiveKey, setTabActiveKey] = useState(TABS.SUMMARY.EVENT_KEY);
    const [skills, setSkills] = useState([]);
    const [workExperiences, setWorkExperiences] = useState([]);
    const [projects, setProjects] = useState([]);
    const [showSaveButton, setShowSaveButton] = useState([]);


    let isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            // templateActions.fetchProfessionalSummary();

            isMounted.current = true;
        }
    }, []);
    useEffect(() => {
        setShowSaveButton(prev => [...prev, SECTIONS.SKILLS])
    }, [skills]);

    const onSkillsAutofill = (q) => {
        fetchSkills(q);
    }

    const onWorkExperienceAutofill = (q) => {
        fetchWorkExperiences(q)
    }

    const onProjectAutofill = (q) => {
        fetchProjects(q);
    }

    const onSelectSkillAutofill = () => {
        updateState({skillsAutofillItems: []})
    }

    /*const onSelectWorkExperienceAutofill = (selected) => {
        setWorkExperiences(prev => [...prev, selected?.value]);
    }

    const onSelectProjectAutofill = selected => setP*/

    const onSelectAutofill = (selected, setter = () => {
    }) => {
        setter(prev => [...prev, selected?.value])
    }

    const workExperienceAFCustomItems = useMemo(
        () =>
            workExperienceAutofillItems
                ?.filter(item => !workExperiences.find(i => i._id === item._id))
                ?.map(item => ({
                    value: item,
                    Item: () => <CustomAutofillItem>
                        <div className="primary-content"> Company: {item.company} </div>
                        <div className="secondary-content">
                            Position: {item.position}
                        </div>
                    </CustomAutofillItem>
                })),
        [workExperienceAutofillItems, workExperiences]
    );

    const projectAFCustomItems = useMemo(
        () =>
            projectAutofillItems
                ?.filter(item => !projects.find(i => i._id === item._id))
                ?.map(item => ({
                    value: item,
                    Item: () => <CustomAutofillItem>
                        <div className="primary-content"> Project Name: {item.name} </div>
                        <div className="secondary-content">
                            <div>link: {item?.link}</div>
                            <div>website: {item?.website}</div>
                        </div>
                    </CustomAutofillItem>
                })),
        [projectAutofillItems, projects]
    );

    return <>
        <ResumeBuilderWrapper>
            {fetchSummaryLoader && <Loader message={"Fetching your details"}/>}
            <DataContentWrapper>
                <h2 className={"section-header"}>Professional Summary</h2>
                <div className="main-content">
                    {objective}
                </div>
            </DataContentWrapper>

            <DataContentWrapper>
                <h2 className="section-header">
                    Skills
                </h2>
                <div className="main-content skills-content">
                    <InputBadges
                        name={"skills"}
                        id={"skills"}
                        placeholder={"Add Skills"}
                        groupClassName={"skills-container"}
                        badges={skills}
                        onChange={value => setSkills(value)}
                        clickAction={CLICK_ACTIONS.DELETE}
                        onAutofill={onSkillsAutofill}
                        autofillItems={skillsAutofillItems}
                        autofillLoader={skillsAutofillLoader}
                        onSelectAutofill={onSelectSkillAutofill}
                    />
                </div>
            </DataContentWrapper>

            <DataContentWrapper>
                <h2 className="section-header">
                    Work Experience
                </h2>
                <div className="main-content">
                    <InputV2
                        id={"search-work-experience"}
                        name={"search-work-experience"}
                        placeholder={"Search your work experiences (search using your company names)"}
                        onAutofill={onWorkExperienceAutofill}
                        autofillLoader={workExperienceAutofillLoader}
                        autofillItems={workExperienceAFCustomItems}
                        onSelectAutofill={(selected) => onSelectAutofill(selected, setWorkExperiences)}
                    />
                    <div className="content-items-container">
                        {workExperiences.map(item => <div className="content-item" key={item._id}>
                                {JSON.stringify({item}, null, 2)}
                            </div>
                        )}
                    </div>
                </div>
            </DataContentWrapper>

            <DataContentWrapper>
                <h2 className="section-header">Projects</h2>
                <div className="main-content">
                    <InputV2
                        id={"search-project"}
                        name={"search-project"}
                        placeholder={"Search your projects (search using your project names)"}
                        onAutofill={onProjectAutofill}
                        autofillLoader={projectAutofillLoader}
                        autofillItems={projectAFCustomItems}
                        onSelectAutofill={(selected) => onSelectAutofill(selected, setProjects)}
                    />
                    <div className="content-items-container">
                        {projects.map(item => <div className="content-item" key={item._id}>
                                {JSON.stringify({item}, null, 2)}
                            </div>
                        )}
                    </div>
                </div>
            </DataContentWrapper>
        </ResumeBuilderWrapper>
    </>
};

ResumeBuilder.propTypes = {
    props: PropTypes.object
};
ResumeBuilder.defaultProps = {
    props: {}
};

export default ResumeBuilder
