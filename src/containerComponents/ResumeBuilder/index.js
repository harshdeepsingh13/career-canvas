import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    DataContentWrapper,
    NoTemplatesWrapper,
    ResumeBuilderWrapper,
    SaveWrapper,
    TemplateDetailsWrapper
} from "./styles";
import {useResumeTemplateContext} from "../../context/ResumeTemplateContextProvider";
import {PageHeader, PageViewContainer} from "../../config/globalStyles";
import {faClose, faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CustomAutofillItem} from "../../components/InputFields/v2/styles";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import InputBadges, {CLICK_ACTIONS} from "../../components/InputBadges";
import InputV2, {SelectV2} from "../../components/InputFields/v2";
import {createPortal} from "react-dom";

const SECTIONS = {
    TEMPLATE_NAME: "TEMPLATE_NAME",
    OBJECTIVE: "OBJECTIVE",
    SKILLS: "SKILLS",
    WORK_EXPERIENCE: "WORK_EXPERIENCE",
    PROJECT: "PROJECT",
    EDUCATION: "EDUCATION",
    CERTIFICATES: "CERTIFICATES"
}

const SaveComponent = ({show, onSave, onCancel}) => createPortal(<>
    <SaveWrapper show={show}>
        <Button className={"action-btn"} onClick={onCancel} variant={"outline-dark"}>
            Cancel
        </Button>
        <Button className={"action-btn"} onClick={onSave}>
            Save
        </Button>
    </SaveWrapper>
</>, document.getElementById("builder"))

const ResumeBuilder = props => {

    const {state: templateState, actions: templateActions, loaders: templateLoaders} = useResumeTemplateContext();

    const {
        templates,
        skillsAutofillItems,
        workExperienceAutofillItems,
        projectAutofillItems,
        templateDetails,
        educationAutofillItems,
        certificateAutofillItems
    } = templateState;
    const {
        fetchSummaryLoader,
        skillsAutofillLoader,
        workExperienceAutofillLoader,
        projectAutofillLoader,
        educationAutofillLoader,
        fetchTemplatesLoader,
        addTemplateLoader,
        fetchTemplateDetailsLoader,
        certificateAutofillLoader,
        updateTemplateLoader
    } = templateLoaders;
    const {
        fetchSkills,
        updateState,
        fetchWorkExperiences,
        fetchProjects,
        fetchEducationDetails,
        fetchResumeTemplates: fetchTemplates,
        addResumeTemplate,
        fetchTemplateDetails,
        fetchCertificates,
        updateTemplate
    } = templateActions;

    // const [tabActiveKey, setTabActiveKey] = useState(TABS.SUMMARY.EVENT_KEY);
    const [templateName, setTemplateName] = useState("")
    const [objective, setObjective] = useState();
    const [skills, setSkills] = useState([]);
    const [workExperiences, setWorkExperiences] = useState([]);
    const [projects, setProjects] = useState([]);
    const [educations, setEducations] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState();
    const [isEditName, setIsEditName] = useState(false);

    let isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            // templateActions.fetchProfessionalSummary();
            fetchTemplates();
            isMounted.current = true;
        }
    }, []);
    /*useEffect(() => {
        setShowSaveButton(prev => [...prev, SECTIONS.SKILLS])
    }, [skills]);*/
    useEffect(() => {
        if (templates.length && !selectedTemplate) {
            setSelectedTemplate(templates[0])
        }
    }, [templates, selectedTemplate]);
    useEffect(() => {
        if (selectedTemplate) {
            const successCallback = (templateDetails) => {
                // setMyTemplateDetails(templateDetails)
            }
            fetchTemplateDetails(selectedTemplate._id, successCallback);
        }
    }, [selectedTemplate])
    useEffect(() => {
        if (templateDetails) {
            initializeTemplateDetails()
        }
    }, [templateDetails]);
    /*  useEffect(() => {
          if (isMounted.current) {
              setShowSaveButton(true);
          }
      }, [objective, skills, workExperiences, projects, educations, certificates, templateName]);*/

    const onAddTemplate = () => {
        const successCallback = () => {
            fetchTemplates();
        }
        addResumeTemplate(successCallback);
    }

    const onSkillsAutofill = (q) => {
        fetchSkills(q);
    }

    const onWorkExperienceAutofill = (q) => {
        fetchWorkExperiences(q)
    }

    const onProjectAutofill = (q) => {
        fetchProjects(q);
    }

    const onEducationAutofill = q => {
        fetchEducationDetails(q)
    }

    const onCertificateAutofill = q => {
        fetchCertificates(q);
    }

    const onSelectSkillAutofill = () => {
        updateState({skillsAutofillItems: []})
    }


    const onSelectAutofill = (selected, setter = () => {
    }, sectionName) => {
        setter(prev => [...prev, selected?.value])
        setShowSaveButton(true);
    }

    const onChangeTemplateName = value => {
        setTemplateName(value);
        setShowSaveButton(true);
    }

    const initializeTemplateDetails = () =>{
        setTemplateName(templateDetails?.templateName)
        setObjective(templateDetails?.objective);
        setSkills(templateDetails?.skills || [])
        setWorkExperiences(templateDetails?.workExperience || [])
        setProjects(templateDetails?.projects || [])
        setEducations(templateDetails?.educationDetails || [])
        setCertificates(templateDetails?.trainingsCertifications || [])
        setShowSaveButton(false)
        setIsEditName(false)
    }

    const onSaveTemplate =  () => {
        const data = {
            templateName,
            objective,
            educationDetails: educations,
            skills,
            workExperience: workExperiences,
            projects,
            trainingsCertifications: certificates
        }
         updateTemplate(selectedTemplate._id, data)
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

    const educationAFCustomItems = useMemo(
        () =>
            educationAutofillItems
                ?.filter(item => !educations.find(i => i._id === item._id))
                ?.map(item => ({
                    value: item,
                    Item: () => <CustomAutofillItem>
                        <div className="primary-content"> Institute Name: {item.instituteName} </div>
                        <div className="secondary-content">
                            <div>Course Name: {item?.course}</div>
                        </div>
                    </CustomAutofillItem>
                })),
        [educationAutofillItems, educations]
    );

    const certificateAFCustomItems = useMemo(() =>
            certificateAutofillItems
                ?.filter(item => !certificates.find(i => i._id === item._id))
                ?.map(item => ({
                    value: item,
                    Item: () => <CustomAutofillItem>
                        <div className="primary-content"> Name: {item.name} </div>
                        {/* <div className="secondary-content">
                            <div>Course Name: {item?.course}</div>
                        </div>*/}
                    </CustomAutofillItem>
                })),
        [certificateAutofillItems, certificates]);

    return <>
        <PageViewContainer>
            <ResumeBuilderWrapper>
                <SaveComponent show={showSaveButton} onCancel={initializeTemplateDetails} onSave={onSaveTemplate}/>
                <PageHeader>Your Resume Templates</PageHeader>
                {fetchSummaryLoader && <Loader message={"Fetching your details"}/>}
                {fetchTemplatesLoader && <Loader message={"Getting your templates"}/>}
                {addTemplateLoader && <Loader message={"Adding new Resume Template"}/>}
                {fetchTemplateDetailsLoader && <Loader message={"Getting your template details"}/>}
                <TemplateDetailsWrapper>
                    <div className="templates-container">
                        {!!templates.length && <>
                            <div className="main-options-container">
                                <SelectV2
                                    id={"templates"}
                                    name={"templates"}
                                    value={selectedTemplate?._id}
                                    onChange={value => setSelectedTemplate(templates.find(t => t._id === value))}
                                    groupClassName={"template-select"}
                                >
                                    {templates.map(template => <option
                                            value={template._id}
                                            key={template._id}
                                        >
                                            {template.templateName}
                                        </option>
                                    )}
                                </SelectV2>
                                <InputV2
                                    id={"template-name"}
                                    name={"template-name"}
                                    placeholder={"Template Name"}
                                    groupClassName={"template-name-input"}
                                    value={templateName}
                                    onChange={onChangeTemplateName}
                                    readOnly={!isEditName}
                                    disabled={!isEditName}
                                />
                                {
                                    !isEditName ?
                                        <Button
                                            variant={"outline-primary"}
                                            className={"action-btn"}
                                            onClick={() => setIsEditName(true)}
                                        >
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </Button> : <>
                                            <Button
                                                variant={"outline-danger"}
                                                className={"action-btn"}
                                                onClick={() => {
                                                    setIsEditName(false)
                                                    setShowSaveButton(false)
                                                    setTemplateName(templateDetails?.templateName)
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faClose}/>
                                            </Button>
                                        </>
                                }
                            </div>
                            <Button onClick={onAddTemplate} variant={"outline-secondary"}>
                                <FontAwesomeIcon icon={faPlus}/>
                                Add new Resume Template
                            </Button>
                        </>}
                    </div>
                    <div className="template-details-container">
                        {
                            !templates.length ?
                                <>
                                    <NoTemplatesWrapper>
                                        <h3>You haven't created any templates yet.</h3>
                                        <Button onClick={onAddTemplate} variant={"outline-secondary"}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                            Add new Resume Template
                                        </Button>
                                    </NoTemplatesWrapper>
                                </> :
                                !selectedTemplate ?
                                    <>
                                        <NoTemplatesWrapper>
                                            <h3>Select a resume template</h3>
                                        </NoTemplatesWrapper>
                                    </> :
                                    <>
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
                                                    onChange={value => {
                                                        setSkills(value);
                                                        setShowSaveButton(true);
                                                    }}
                                                    clickAction={CLICK_ACTIONS.DELETE}
                                                    onAutofill={onSkillsAutofill}
                                                    autofillItems={skillsAutofillItems}
                                                    autofillLoader={skillsAutofillLoader}
                                                    onSelectAutofill={onSelectSkillAutofill}
                                                    autofillEmptyItemMessage={"To add more skills, edit your details and add your skills there."}
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
                                                    onSelectAutofill={(selected) => onSelectAutofill(selected, setWorkExperiences, SECTIONS.WORK_EXPERIENCE)}
                                                    autofillEmptyItemMessage={"To add more work experiences, edit your details and add your work experiences there."}
                                                />
                                                <div className="content-items-container">
                                                    {workExperiences?.map(item => <div className="content-item"
                                                                                       key={item._id}>
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
                                                    onSelectAutofill={(selected) => onSelectAutofill(selected, setProjects, SECTIONS.PROJECT)}
                                                    autofillEmptyItemMessage={"To add more projects, edit your details and add your projects there."}
                                                />
                                                <div className="content-items-container">
                                                    {projects?.map(item => <div className="content-item"
                                                                                key={item._id}>
                                                            {JSON.stringify({item}, null, 2)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </DataContentWrapper>

                                        <DataContentWrapper>
                                            <h2 className="section-header">Certificates</h2>
                                            <div className="main-content">
                                                <InputV2
                                                    id={"search-certificate"}
                                                    name={"search-certificate"}
                                                    placeholder={"Search your certificates (search using your certification names)"}
                                                    onAutofill={onCertificateAutofill}
                                                    autofillLoader={certificateAutofillLoader}
                                                    autofillItems={certificateAFCustomItems}
                                                    onSelectAutofill={(selected) => onSelectAutofill(selected, setCertificates, SECTIONS.CERTIFICATES)}
                                                    autofillEmptyItemMessage={"To add more certificates, edit your details and add your certificates there."}
                                                />
                                                <div className="content-items-container">
                                                    {educations.map(item => <div className="content-item"
                                                                                 key={item._id}>
                                                            {JSON.stringify({item}, null, 2)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </DataContentWrapper>

                                        <DataContentWrapper>
                                            <h2 className="section-header">Education</h2>
                                            <div className="main-content">
                                                <InputV2
                                                    id={"search-education"}
                                                    name={"search-education"}
                                                    placeholder={"Search your educations (search using your institution names)"}
                                                    onAutofill={onEducationAutofill}
                                                    autofillLoader={educationAutofillLoader}
                                                    autofillItems={educationAFCustomItems}
                                                    onSelectAutofill={(selected) => onSelectAutofill(selected, setEducations, SECTIONS.EDUCATION)}
                                                    autofillEmptyItemMessage={"To add more education details, edit your details and add your education details there."}
                                                />
                                                <div className="content-items-container">
                                                    {educations.map(item => <div className="content-item"
                                                                                 key={item._id}>
                                                            {JSON.stringify({item}, null, 2)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </DataContentWrapper>
                                    </>
                        }
                    </div>
                </TemplateDetailsWrapper>
            </ResumeBuilderWrapper>
        </PageViewContainer>
    </>
}

ResumeBuilder.propTypes = {};
ResumeBuilder.defaultProps = {};

export default ResumeBuilder;
