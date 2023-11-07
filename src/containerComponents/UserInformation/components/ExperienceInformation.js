import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import InputV2, {CheckV2} from "../../../components/InputFields/v2";
import {DataFieldWrapper, ExperienceInformationWrapper, NoRecordWrapper} from "../styles";
import {VIEW_MODE} from "../index";
import moment from "moment";
import RichTextInput from "../../../components/RichTextInput";
import Button from "../../../components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

const ExperienceInformation = ({data, viewMode, onChangeData, onDeleteItem}) => {

    const [formData, setFormData] = useState(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    let isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            onChangeData && onChangeData(formData)
        }
    }, [formData]);
    const onChangeFormData = (index, key, value) => {
        setFormData(prev => {
            prev.workExperiences[index] = {...prev.workExperiences[index], [key]: value}
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
            prev.workExperiences = [...prev.workExperiences, {}];
            return {...prev};
        })
    }

    const onDeleteRecord = (index, id) => {
        if (window.confirm("Are you sure you want to delete the record?")) {
            if (id) {
                onDeleteItem && onDeleteItem(id);
            } else
                setFormData(prev => {
                    prev.educations = [...prev?.workExperiences?.slice(0, index), ...prev?.workExperiences?.slice(index + 1)]
                    return {...prev};
                })
        }
    }

    return <>
        <ExperienceInformationWrapper>
            {value?.workExperiences?.length === 0 ? <NoRecordWrapper>
                <p>Your professional experience details will come here. Add your details now</p>
            </NoRecordWrapper> : <>
                {value?.workExperiences?.map((experience, index) =>
                    <div className={"work-experience-item"} key={experience._id}>
                        {viewMode === VIEW_MODE.EDIT &&
                            <Button variant={"outline-danger"} className="delete-icon-container"
                                    onClick={() => onDeleteRecord(index, experience._id)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        }
                        <DataFieldWrapper>
                            <InputV2
                                id={"company"}
                                name={"company"}
                                value={experience?.company}
                                onChange={value => onChangeFormData(index, "company", value)}
                                label={"company name"}
                                placeholder={"company name"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <InputV2
                                id={"location"}
                                name={"location"}
                                value={experience?.location}
                                onChange={value => onChangeFormData(index, "location", value)}
                                label={"location"}
                                placeholder={"location"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <InputV2
                                id={"position"}
                                name={"position"}
                                value={experience?.position}
                                onChange={value => onChangeFormData(index, "position", value)}
                                label={"position"}
                                placeholder={"position"}
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
                                value={experience?.startDate && moment(experience?.startDate?.split("Z")[0]).format("YYYY-MM-DD")}
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
                                checked={experience?.isPresent}
                                onChange={value => onChangeFormData(index, "isPresent", !!value)}
                                label={"still working here?"}
                                placeholder={"still working here?"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        {!experience?.isPresent &&
                            <DataFieldWrapper>
                                <InputV2
                                    type={"date"}
                                    id={"endDate"}
                                    name={"endDate"}
                                    value={experience?.endDate && moment(experience?.endDate?.split("Z")[0]).format("YYYY-MM-DD")}
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
                            <RichTextInput
                                value={experience?.responsibilities}
                                label={"Responsibilities"}
                                placeholder={"Responsibilities"}
                                groupClassName={"data-field-container"}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                onChange={value => onChangeFormData(index, "responsibilities", value)}
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
        </ExperienceInformationWrapper>
    </>
};

ExperienceInformation.propTypes = {
    data: PropTypes.object,
    viewMode: PropTypes.string,
    onChangeData: PropTypes.func,
    onDeleteItem: PropTypes.func
};
ExperienceInformation.defaultProps = {
    data: {},
    viewMode: "VIEW"
};

export default ExperienceInformation
