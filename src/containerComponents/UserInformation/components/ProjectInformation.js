import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import InputV2, {CheckV2} from "../../../components/InputFields/v2";
import {DataFieldWrapper, NoRecordWrapper, ProjectInformationWrapper} from "../styles";
import {VIEW_MODE} from "../index";
import moment from "moment";
import RichTextInput from "../../../components/RichTextInput";
import InputBadges from "../../../components/InputBadges";
import Button from "../../../components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

const ProjectInformation = ({data, viewMode, onChangeData, onDeleteItem}) => {
    const [formData, setFormData] = useState(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    let isMounted = useRef(false);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
        } else{
            onChangeData && onChangeData(formData)
        }
    }, [formData]);

    const onChangeFormData = (index, key, value) => {
        setFormData(prev => {
            if (prev?.projects)
                prev.projects[index] = {...prev?.projects[index], [key]: value}
            return {...prev};
        });
    }

    const value = useMemo(() => {
        if (viewMode === VIEW_MODE.VIEW) return data;
        if (viewMode === VIEW_MODE.EDIT) return formData;
        return data;
    }, [formData, data, viewMode]);

    const onAddButtonClick = () => {
        setFormData(prev => {
            prev.projects = [...prev.projects, {}];
            return {...prev};
        })
    }

    const onDeleteRecord = (index, id) => {
        if (window.confirm("Are you sure you want to delete the record?")) {
            if (id) {
                onDeleteItem && onDeleteItem(id);
            } else
                setFormData(prev => {
                    prev.projects = [...prev.projects.slice(0, index), ...prev.projects.slice(index + 1)]
                    return {...prev};
                })
        }
    }

    return <>
        <ProjectInformationWrapper>
            {value?.projects?.length === 0 ? <NoRecordWrapper>
                <p>Your projects details will come here. Add your details now</p>
            </NoRecordWrapper> : <>
                {value?.projects?.map((project, index) =>
                    <div className={"project-item"} key={project._id}>
                        {viewMode === VIEW_MODE.EDIT &&
                            <Button variant={"outline-danger"} className="delete-icon-container"
                                    onClick={() => onDeleteRecord(index, project._id)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        }
                        <DataFieldWrapper>
                            <InputV2
                                id={"name"}
                                name={"name"}
                                value={project?.name}
                                onChange={value => onChangeFormData(index, "name", value)}
                                label={"name"}
                                placeholder={"name"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <InputV2
                                type={"date"}
                                id={"startDate"}
                                name={"startDate"}
                                value={project?.startDate && moment(project?.startDate.split("Z")[0]).format("YYYY-MM-DD")}
                                onChange={value => onChangeFormData(index, "startDate", value)}
                                label={"start date"}
                                placeholder={"start date"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <CheckV2
                                type={"switch"}
                                id={"isPresent"}
                                name={"isPresent"}
                                checked={project?.isPresent}
                                onChange={value => onChangeFormData(index, "isPresent", !!value)}
                                label={"still going on?"}
                                placeholder={"still going on?"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        {!project?.isPresent &&
                            <DataFieldWrapper>
                                <InputV2
                                    type={"date"}
                                    id={"endDate"}
                                    name={"endDate"}
                                    value={project?.endDate && moment(project?.endDate?.split("Z")[0]).format("YYYY-MM-DD")}
                                    onChange={value => onChangeFormData(index, "endDate", value)}
                                    label={"end date"}
                                    placeholder={"end date"}
                                    disabled={viewMode === VIEW_MODE.VIEW}
                                    readOnly={viewMode === VIEW_MODE.VIEW}
                                    groupClassName={"data-field-container"}
                                />
                            </DataFieldWrapper>
                        }

                        <DataFieldWrapper>
                            <InputV2
                                id={"link"}
                                name={"link"}
                                value={project?.link}
                                onChange={value => onChangeFormData(index, "link", value)}
                                label={"Link"}
                                placeholder={"Link"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <InputV2
                                id={"website"}
                                name={"website"}
                                value={project?.website}
                                onChange={value => onChangeFormData(index, "website", value)}
                                label={"website"}
                                placeholder={"website"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <RichTextInput
                                value={project?.summary}
                                label={"summary"}
                                placeholder={"summary"}
                                groupClassName={"data-field-container"}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                onChange={value => onChangeFormData(index, "summary", value)}
                            />
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <InputBadges
                                name={"tech-stack"}
                                id={"tech-stack"}
                                label={"Tech Stack"}
                                placeholder={"Tech Stack"}
                                groupClassName={"data-field-container"}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                badges={project?.technologyStack}
                                onChange={value => onChangeFormData(index, "technologyStack", value)}
                            />
                        </DataFieldWrapper>
                    </div>
                )}
            </>}
            {viewMode === VIEW_MODE.EDIT &&
                <Button variant={"outline-primary"} onClick={onAddButtonClick} className={"add-record-button"}>
                    <FontAwesomeIcon icon={faPlus}/> Add Record
                </Button>
            }
        </ProjectInformationWrapper>
    </>
};

ProjectInformation.propTypes = {
    data: PropTypes.object,
    viewMode: PropTypes.string,
    onChangeData: PropTypes.func,
    onDeleteItem: PropTypes.func

};
ProjectInformation.defaultProps = {
    data: {},
    viewMode: "VIEW"
};

export default ProjectInformation
