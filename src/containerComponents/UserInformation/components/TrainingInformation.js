import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import InputV2, {CheckV2} from "../../../components/InputFields/v2";
import {DataFieldWrapper, NoRecordWrapper, TrainingInformationWrapper} from "../styles";
import {VIEW_MODE} from "../index";
import moment from "moment";
import RichTextInput from "../../../components/RichTextInput";
import Button from "../../../components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

const TrainingInformation = ({data, viewMode, onChangeData, onDeleteItem, addRecord}) => {

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
            prev.trainings[index] = {...prev.trainings[index], [key]: value}
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
            prev.trainings = [...prev.trainings, {}];
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
        <TrainingInformationWrapper>
            {value?.trainings?.length === 0 ? <NoRecordWrapper>
                <p>Your trainings/certifications details will come here. Add your details now</p>
            </NoRecordWrapper> : <>
                {value?.trainings?.map((training, index) =>
                    <div className={"training-item"} key={training._id}>
                        {viewMode === VIEW_MODE.EDIT &&
                            <Button variant={"outline-danger"} className="delete-icon-container"
                                    onClick={() => onDeleteRecord(index, training._id)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        }
                        <DataFieldWrapper>
                            <InputV2
                                id={"name"}
                                name={"name"}
                                value={training?.name}
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
                                value={training?.startDate && moment(training?.startDate.split("Z")[0]).format("YYYY-MM-DD")}
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
                                checked={training?.isPresent}
                                onChange={value => onChangeFormData(index, "isPresent", !!value)}
                                label={"still going on?"}
                                placeholder={"still going on?"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        {!training?.isPresent &&
                            <DataFieldWrapper>
                                <InputV2
                                    type={"date"}
                                    id={"endDate"}
                                    name={"endDate"}
                                    value={training?.endDate && moment(training?.endDate?.split("Z")[0]).format("YYYY-MM-DD")}
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
                                value={training?.link}
                                onChange={value => onChangeFormData("link", value)}
                                label={"Link"}
                                placeholder={"Link"}
                                disabled={viewMode === VIEW_MODE.VIEW}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                groupClassName={"data-field-container"}
                            />
                        </DataFieldWrapper>

                        <DataFieldWrapper>
                            <RichTextInput
                                value={training?.summary}
                                label={"summary"}
                                placeholder={"summary"}
                                groupClassName={"data-field-container"}
                                readOnly={viewMode === VIEW_MODE.VIEW}
                                onChange={value => onChangeFormData(index, "summary", value)}
                            />
                        </DataFieldWrapper>
                    </div>
                )}
            </>}
            {(viewMode === VIEW_MODE.EDIT && addRecord) &&
                <Button variant={"outline-primary"} onClick={onAddButtonClick} className={"add-record-button"}>
                    <FontAwesomeIcon icon={faPlus}/> Add Record
                </Button>
            }
        </TrainingInformationWrapper>
    </>
};

TrainingInformation.propTypes = {
    data: PropTypes.object,
    viewMode: PropTypes.string,
    onChangeData: PropTypes.func,
    onDeleteItem: PropTypes.func,
    addRecord: PropTypes.bool
};
TrainingInformation.defaultProps = {
    data: {},
    viewMode: "VIEW",
    addRecord: true
};

export default TrainingInformation
