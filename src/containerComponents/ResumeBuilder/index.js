import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    DataContentWrapper,
    NoTemplatesWrapper,
    ResumeBuilderWrapper,
    ResumeTemplateWrapper,
    SaveWrapper,
    TemplateDetailsWrapper
} from "./styles";
import {useResumeTemplateContext} from "../../context/ResumeTemplateContextProvider";
import {PageHeader, PageViewContainer} from "../../config/globalStyles";
import {faCircleNotch, faClose, faDownload, faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CustomAutofillItem} from "../../components/InputFields/v2/styles";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import InputBadges, {CLICK_ACTIONS} from "../../components/InputBadges";
import InputV2, {SelectV2} from "../../components/InputFields/v2";
import {createPortal} from "react-dom";
import PDFViewer from "../../components/PDFViewer";
import {VIEW_MODE} from "../UserInformation";
import RichTextInput from "../../components/RichTextInput";
import ExperienceInformation from "../UserInformation/components/ExperienceInformation";
import ProjectInformation from "../UserInformation/components/ProjectInformation";
import TrainingInformation from "../UserInformation/components/TrainingInformation";
import EducationalInformation from "../UserInformation/components/EducationalInformation";

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
        certificateAutofillItems,
        pdfViewFile
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
        updateTemplateLoader,
        fetchPdfViewLoader,
        downloadResumePdfLoader
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
        updateTemplate,
        fetchPdfView,
        downloadResumePdf
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
    // const [isEditName, setIsEditName] = useState(false);
    const [viewMode, setViewMode] = useState(VIEW_MODE.VIEW)
    const [isPdfLoaded, setIsPdfLoaded] = useState(false);

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
                fetchPdfView(selectedTemplate._id)
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

    useEffect(() => {
        if (viewMode === VIEW_MODE.VIEW)
            setShowSaveButton(false);
        else if (viewMode === VIEW_MODE.EDIT)
            setShowSaveButton(true);
    }, [viewMode]);

    const onAddTemplate = () => {
        const templateName = window.prompt("Enter new Template Name");
        const successCallback = () => {
            fetchTemplates();
        }
        addResumeTemplate(templateName, successCallback);
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

    const initializeTemplateDetails = () => {
        setTemplateName(templateDetails?.templateName)
        setObjective(templateDetails?.objective);
        setSkills(templateDetails?.skills || [])
        setWorkExperiences(templateDetails?.workExperience || [])
        setProjects(templateDetails?.projects || [])
        setEducations(templateDetails?.educationDetails || [])
        setCertificates(templateDetails?.trainingsCertifications || [])
        setShowSaveButton(false)
        setViewMode(VIEW_MODE.VIEW)
    }

    const onSaveTemplate = () => {
        const data = {
            templateName,
            objective,
            educationDetails: educations,
            skills,
            workExperience: workExperiences,
            projects,
            trainingsCertifications: certificates
        }
        const successCallback = () => {
            fetchPdfView(selectedTemplate._id)
        }
        updateTemplate(selectedTemplate._id, data, successCallback)
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

    const onDownloadClick = () => {
        downloadResumePdf(selectedTemplate._id);
    }

    const onChangeExperience = (data, isDelete = false) => {
        if (viewMode === VIEW_MODE.EDIT) {
            if (isDelete) {
                const itemId = data;
                setWorkExperiences(prev => prev.filter(i => i._id !== itemId))
            } else
                setWorkExperiences(data.workExperiences)

        }
    }

    const onChangeProjects = (data, isDelete = false) => {
        if (viewMode === VIEW_MODE.EDIT) {
            if (isDelete) {
                const itemId = data;
                setProjects(prev => prev.filter(i => i._id !== itemId))
            } else
                setProjects(data.projects)

        }
    }

    const onChangeCertificates = (data, isDelete = false) => {
        if (viewMode === VIEW_MODE.EDIT) {
            if (isDelete) {
                const itemId = data;
                setCertificates(prev => prev.filter(i => i._id !== itemId))
            } else
                setCertificates(data.trainings)

        }
    }

    const onChangeEducations = (data, isDelete = false) => {
        if (viewMode === VIEW_MODE.EDIT) {
            if (isDelete) {
                const itemId = data;
                setEducations(prev => prev.filter(i => i._id !== itemId))
            } else
                setEducations(data.educations)

        }
    }

    return <>
        <PageViewContainer>
            <ResumeBuilderWrapper>
                <SaveComponent show={showSaveButton} onCancel={initializeTemplateDetails} onSave={onSaveTemplate}/>
                <PageHeader>Your Resume Templates</PageHeader>
                {fetchSummaryLoader && <Loader message={"Fetching your details"}/>}
                {fetchTemplatesLoader && <Loader message={"Getting your templates"}/>}
                {addTemplateLoader && <Loader message={"Adding new Resume Template"}/>}
                {fetchTemplateDetailsLoader && <Loader message={"Getting your template details"}/>}
                {updateTemplateLoader && <Loader message={"Updating your details"}/>}
                <TemplateDetailsWrapper>
                    <div className="resume-details-container">
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
                                    {viewMode === VIEW_MODE.EDIT &&
                                        <InputV2
                                            id={"template-name"}
                                            name={"template-name"}
                                            placeholder={"Template Name"}
                                            groupClassName={"template-name-input"}
                                            value={templateName}
                                            onChange={onChangeTemplateName}
                                            // label={"Name"}
                                        />
                                    }
                                </div>
                                <div className="action-btn-container">
                                    {
                                        viewMode === VIEW_MODE.VIEW ?
                                            <Button className="action-btn" onClick={() => setViewMode(VIEW_MODE.EDIT)}>
                                                <FontAwesomeIcon icon={faEdit}/>
                                                Edit
                                            </Button> :
                                            <Button
                                                className="action-btn"
                                                onClick={() => setViewMode(VIEW_MODE.VIEW)}
                                                variant={"outline-danger"}
                                            >
                                                <FontAwesomeIcon icon={faClose}/>
                                                Cancel
                                            </Button>
                                    }
                                    <Button className="action-btn" onClick={onAddTemplate}
                                            variant={"outline-secondary"}>
                                        <FontAwesomeIcon icon={faPlus}/>
                                        Add new Resume Template
                                    </Button>
                                </div>
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
                                            <ResumeTemplateWrapper>
                                                <div className="template-details">
                                                    <DataContentWrapper>
                                                        <h2 className={"section-header"}>Professional Summary</h2>
                                                        <div className="main-content">
                                                            <RichTextInput
                                                                value={objective}
                                                                groupClassName={"data-field-container"}
                                                                readOnly={viewMode === VIEW_MODE.VIEW}
                                                                showActionsOnReadOnly={false}
                                                                onChange={value => {
                                                                    setObjective(value);
                                                                    setShowSaveButton(true)
                                                                }}
                                                            />
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
                                                                <ExperienceInformation
                                                                    data={{workExperiences}}
                                                                    viewMode={viewMode}
                                                                    addRecord={false}
                                                                    onDeleteItem={(itemId) => onChangeExperience(itemId, true)}
                                                                    onChangeData={onChangeExperience}
                                                                />
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
                                                                <ProjectInformation
                                                                    data={{projects}}
                                                                    viewMode={viewMode}
                                                                    addRecord={false}
                                                                    onDeleteItem={(itemId) => onChangeProjects(itemId, true)}
                                                                    onChangeData={onChangeProjects}
                                                                />
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
                                                                <TrainingInformation
                                                                    data={{trainings: certificates}}
                                                                    viewMode={viewMode}
                                                                    addRecord={false}
                                                                    onDeleteItem={(itemId) => onChangeCertificates(itemId, true)}
                                                                    onChangeData={onChangeCertificates}
                                                                />
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
                                                                <EducationalInformation
                                                                    data={{educations}}
                                                                    viewMode={viewMode}
                                                                    addRecord={false}
                                                                    onDeleteItem={(itemId) => onChangeEducations(itemId, true)}
                                                                    onChangeData={onChangeEducations}
                                                                />
                                                            </div>
                                                        </div>
                                                    </DataContentWrapper>
                                                </div>
                                                <div className="template-view-container">
                                                    <PDFViewer
                                                        pdf={{url: "/api/v1/static/temp.pdf"}}
                                                        // onLoadProgress={() => setIsPdfLoaded(false)}
                                                        onLoadSuccess={() => setIsPdfLoaded(true)}
                                                    />
                                                    {isPdfLoaded &&
                                                        <div className="download-btn-container">
                                                            <Button
                                                                className={"download-btn"}
                                                                onClick={onDownloadClick}
                                                            >
                                                                {
                                                                    downloadResumePdfLoader ?
                                                                        <FontAwesomeIcon icon={faCircleNotch}
                                                                                         spin/> : <>
                                                                            <FontAwesomeIcon icon={faDownload}/>
                                                                            Download Resume
                                                                        </>
                                                                }
                                                            </Button>
                                                        </div>
                                                    }
                                                </div>
                                            </ResumeTemplateWrapper>
                                        </>
                            }
                        </div>
                    </div>

                </TemplateDetailsWrapper>
            </ResumeBuilderWrapper>
        </PageViewContainer>
    </>
}

ResumeBuilder.propTypes = {};
ResumeBuilder.defaultProps = {};

export default ResumeBuilder;
