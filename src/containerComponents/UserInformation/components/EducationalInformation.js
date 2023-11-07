import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import InputV2, {CheckV2, SelectV2} from "../../../components/InputFields/v2";
import {DataFieldWrapper, EducationalInformationWrapper, NoRecordWrapper} from "../styles";
import {VIEW_MODE} from "../index";
import {EDUCATION_TYPES} from "../../../config/config";
import moment from "moment";
import Button from "../../../components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

const EducationalInformation = ({data, viewMode, onChangeData, onDeleteItem}) => {

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
            prev.educations[index] = {...prev.educations[index], [key]: value}
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
            prev.educations = [...prev.educations, {}];
            return {...prev};
        })
    }

    const onDeleteRecord = (index, id) => {
        if (window.confirm("Are you sure you want to delete the record?")) {
            if (id) {
                onDeleteItem && onDeleteItem(id);
            } else
                setFormData(prev => {
                    prev.educations = [...prev.educations.slice(0, index), ...prev.educations.slice(index + 1)]
                    return {...prev};
                })
        }
    }

    return <>
        <EducationalInformationWrapper>
            {value?.educations?.length === 0 ? <NoRecordWrapper>
                <p>Your education details will come here. Add your details now</p>
            </NoRecordWrapper> : <>
                {value?.educations?.map((education, index) =>
                    <div className={"education-item"} key={education._id}>
                        {viewMode === VIEW_MODE.EDIT &&
                            <Button variant={"outline-danger"} className="delete-icon-container"
                                    onClick={() => onDeleteRecord(index, education._id)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        }
                        <DataFieldWrapper>
                            <SelectV2
                                id={"type"}
                                name={"type"}
                                value={education?.type}
                                onChange={value => onChangeFormData(index, "type", value)}
                                label={"Type of education"}
                                placeholder={"Type of education"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            >
                                {
                                    Object.entries(EDUCATION_TYPES).map(([key, value]) => <option
                                        className={"education-type-option"}
                                        value={key}
                                        key={key}
                                    >
                                        {value}
                                    </option>)
                                }
                            </SelectV2>
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <InputV2
                                id={"course"}
                                name={"course"}
                                value={education?.course}
                                onChange={value => onChangeFormData(index, "course", value)}
                                label={"course name"}
                                placeholder={"course name"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <InputV2
                                id={"instituteName"}
                                name={"instituteName"}
                                value={education?.instituteName}
                                onChange={value => onChangeFormData(index, "instituteName", value)}
                                label={"college"}
                                placeholder={"college"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <InputV2
                                id={"university"}
                                name={"university"}
                                value={education?.university}
                                onChange={value => onChangeFormData(index, "university", value)}
                                label={"university"}
                                placeholder={"university"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <InputV2
                                id={"location"}
                                name={"location"}
                                value={education?.location}
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
                                type={"date"}
                                id={"startDate"}
                                name={"startDate"}
                                value={education?.startDate && moment(education?.startDate?.split("Z")[0]).format("YYYY-MM-DD")}
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
                                checked={education?.isPresent}
                                onChange={value => onChangeFormData(index, "isPresent", !!value)}
                                label={"still studying here?"}
                                placeholder={"still studying here?"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        {!education?.isPresent &&
                            <DataFieldWrapper>
                                <InputV2
                                    type={"date"}
                                    id={"endDate"}
                                    name={"endDate"}
                                    value={education?.endDate && moment(education?.endDate?.split("Z")[0]).format("YYYY-MM-DD")}
                                    onChange={value => onChangeFormData(index, "endDate", value)}
                                    label={"end date"}
                                    placeholder={"end date"}
                                    disabled={viewMode === VIEW_MODE.VIEW}
                                    readOnly={viewMode === VIEW_MODE.VIEW}
                                    groupClassName={"data-field-container"}
                                />
                            </DataFieldWrapper>
                        }

                    </div>
                )}
            </>}
            {viewMode === VIEW_MODE.EDIT &&
                <Button variant={"outline-primary"} onClick={onAddButtonClick} className={"add-record-button"}>
                    <FontAwesomeIcon icon={faPlus}/> Add Record
                </Button>
            }
        </EducationalInformationWrapper>
    </>
};

EducationalInformation.propTypes = {
    data: PropTypes.object,
    viewMode: PropTypes.string,
    onChangeData: PropTypes.func,
    onDeleteItem: PropTypes.func
};
EducationalInformation.defaultProps = {
    data: {},
    viewMode: "VIEW"
};

export default EducationalInformation
