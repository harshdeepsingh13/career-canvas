import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {PageHeader, PageViewContainer} from "../../config/globalStyles";
import {ActionsWrapper, TabContentWrapper, UserInformationTabsWrapper, UserInformationWrapper} from "./styles";
import {useUserContext} from "../../context/UserContextProvider";
import Loader from "../../components/Loader";
import {Button, Nav, Row, Tab} from "react-bootstrap";
import PersonalInformation from "./components/PersonalInformation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPenToSquare, faXmark} from "@fortawesome/free-solid-svg-icons";
import EducationalInformation from "./components/EducationalInformation";
import ExperienceInformation from "./components/ExperienceInformation";
import TrainingInformation from "./components/TrainingInformation";
import ProjectInformation from "./components/ProjectInformation";
import SkillsInformation from "./components/SkillsInformation";
import {API_ROUTES} from "../../config/config";

const TABS = {
    PERSONAL_INFORMATION: {
        EVENT_KEY: "personal-information",
        TEXT: "Personal",
        API: {ON_SAVE: API_ROUTES.UPDATE_USER_INFORMATION.BASIC_INFORMATION}
    },
    EDUCATIONAL_INFORMATION: {
        EVENT_KEY: "educational-information",
        TEXT: "Education",
        API: {ON_SAVE: API_ROUTES.UPDATE_USER_INFORMATION.EDUCATION_INFORMATION}
    },
    PROJECTS_INFORMATION: {
        EVENT_KEY: "projects-information",
        TEXT: "Projects",
        API: {ON_SAVE: API_ROUTES.UPDATE_USER_INFORMATION.PROJECT_INFORMATION}
    },
    SKILLS_INFORMATION: {
        EVENT_KEY: "skills-information",
        TEXT: "Skills",
        API: {ON_SAVE: API_ROUTES.UPDATE_USER_INFORMATION.SKILL_INFORMATION}
    },
    EXPERIENCE_INFORMATION: {
        EVENT_KEY: "experience-information",
        TEXT: "Professional Experience",
        API: {ON_SAVE: API_ROUTES.UPDATE_USER_INFORMATION.WORK_EXPERIENCE_INFORMATION}
    },
    TRAINING_INFORMATION: {
        EVENT_KEY: "training-information",
        TEXT: "Trainings/Certifications",
        API: {ON_SAVE: API_ROUTES.UPDATE_USER_INFORMATION.TRAINING_INFORMATION}
    }
}

export const VIEW_MODE = {VIEW: "VIEW", EDIT: "EDIT"};

const UserInformation = props => {

    const [tabActiveKey, setTabActiveKey] = useState(TABS.PERSONAL_INFORMATION.EVENT_KEY);
    const [viewMode, setViewMode] = useState(VIEW_MODE.VIEW)
    const [formData, setFormData] = useState();

    const {state: userState, loaders: userLoaders, actions: userActions} = useUserContext();

    const {userCompleteDetails} = userState;
    const {fetchCompleteUserDetails, updateCompleteUserDetails, deleteUserDetailsItem} = userActions;
    const {fetchUserDetailsLoader, updateUserInformationLoader} = userLoaders;

    let isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            fetchCompleteUserDetails();
            isMounted.current = true;
        }
    }, []);

    const tabs = useMemo(() => [
        TABS.PERSONAL_INFORMATION,
        TABS.EDUCATIONAL_INFORMATION,
        TABS.SKILLS_INFORMATION,
        TABS.EXPERIENCE_INFORMATION,
        TABS.TRAINING_INFORMATION,
        TABS.PROJECTS_INFORMATION
    ], []);

    const onSaveClick = () => {
        const onUpdateAPI = tabs.find(tab => tab.EVENT_KEY === tabActiveKey)?.API?.ON_SAVE;
        const successCallback = () => {
            setViewMode(VIEW_MODE.VIEW);
            fetchCompleteUserDetails();
        }
        updateCompleteUserDetails(onUpdateAPI, formData, successCallback)
    };

    const onCancelClick = () => {
        setViewMode(VIEW_MODE.VIEW)
    };

    const onTabChange = (nextKey) => {
        if (viewMode === VIEW_MODE.EDIT && window.confirm("You will lose all data after changing the tab, do you want to change the tab?")) {
            setTabActiveKey(nextKey);
            setViewMode(VIEW_MODE.VIEW);
        } else if (viewMode === VIEW_MODE.VIEW) {
            setTabActiveKey(nextKey);
        }
    }

    const onDeleteItem = (itemId) => {
        if (itemId) {
            const onUpdateAPI = tabs.find(tab => tab.EVENT_KEY === tabActiveKey)?.API?.ON_SAVE;
            const successCallback = () => {
                fetchCompleteUserDetails();
            }
            deleteUserDetailsItem(onUpdateAPI, itemId, successCallback)
        }
    }

    return <>
        {fetchUserDetailsLoader && <Loader message={"Finding your details"}/>}
        {updateUserInformationLoader && <Loader message={"updating your details"}/>}
        <PageViewContainer>
            <PageHeader>Your Complete Details</PageHeader>
            <ActionsWrapper>
                {viewMode === VIEW_MODE.VIEW &&
                    <Button
                        variant={"outline-primary"}
                        className={"edit-button"}
                        onClick={() => setViewMode(VIEW_MODE.EDIT)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare}/>
                        Edit
                    </Button>
                }
                {viewMode === VIEW_MODE.EDIT && <>

                    <Button
                        variant={"outline-secondary"}
                        onClick={onCancelClick}
                    >
                        <FontAwesomeIcon icon={faXmark}/>
                        Cancel
                    </Button>

                    <Button
                        variant={"primary"}
                        onClick={onSaveClick}
                    >
                        <FontAwesomeIcon icon={faCheck}/>
                        Save
                    </Button>
                </>}
            </ActionsWrapper>
            <UserInformationWrapper>
                <Tab.Container
                    id="complete-information-tabs"
                    activeKey={tabActiveKey}
                    // defaultActiveKey={TABS.PROJECTS_INFORMATION.EVENT_KEY}
                    mountOnEnter={true}
                    unmountOnExit={true}
                    onSelect={onTabChange}
                >
                    <Row>
                        <UserInformationTabsWrapper sm={3}>
                            <Nav variant="pills" className="flex-column">
                                {tabs.map(({EVENT_KEY, TEXT}) =>
                                    <Nav.Item key={EVENT_KEY}>
                                        <Nav.Link eventKey={EVENT_KEY}>{TEXT}</Nav.Link>
                                    </Nav.Item>
                                )}
                            </Nav>
                        </UserInformationTabsWrapper>
                        <TabContentWrapper sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey={TABS.PERSONAL_INFORMATION.EVENT_KEY}>
                                    {userCompleteDetails?.basicInformation &&
                                        <PersonalInformation
                                            data={userCompleteDetails?.basicInformation}
                                            onChangeData={data => setFormData(data)}
                                            viewMode={viewMode}
                                        />
                                    }
                                </Tab.Pane>
                                <Tab.Pane eventKey={TABS.EDUCATIONAL_INFORMATION.EVENT_KEY}>
                                    {userCompleteDetails?.educationInformation &&
                                        <EducationalInformation
                                            data={userCompleteDetails?.educationInformation?.educationInformation}
                                            onChangeData={data => setFormData(data)}
                                            viewMode={viewMode}
                                            onDeleteItem={onDeleteItem}
                                        />
                                    }
                                </Tab.Pane>
                                <Tab.Pane eventKey={TABS.SKILLS_INFORMATION.EVENT_KEY}>
                                    <SkillsInformation
                                        data={userCompleteDetails?.skillsInformation}
                                        onChangeData={data => setFormData(data)}
                                        viewMode={viewMode}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey={TABS.EXPERIENCE_INFORMATION.EVENT_KEY}>
                                    <ExperienceInformation
                                        data={userCompleteDetails?.workExperienceInformation?.workExperienceInformation}
                                        onChangeData={data => setFormData(data)}
                                        viewMode={viewMode}
                                        onDeleteItem={onDeleteItem}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey={TABS.TRAINING_INFORMATION.EVENT_KEY}>
                                    <TrainingInformation
                                        data={userCompleteDetails?.trainingInformation?.trainingInformation}
                                        onChangeData={data => setFormData(data)}
                                        viewMode={viewMode}
                                        onDeleteItem={onDeleteItem}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey={TABS.PROJECTS_INFORMATION.EVENT_KEY}>
                                    <ProjectInformation
                                        data={userCompleteDetails?.projects?.projectsInformation}
                                        onChangeData={data => setFormData(data)}
                                        viewMode={viewMode}
                                        onDeleteItem={onDeleteItem}
                                    />
                                </Tab.Pane>
                            </Tab.Content>
                        </TabContentWrapper>
                    </Row>
                </Tab.Container>
            </UserInformationWrapper>
        </PageViewContainer>
    </>
};

UserInformation.propTypes = {
    props: PropTypes.object
};
UserInformation.defaultProps = {
    props: {}
};

export default UserInformation
