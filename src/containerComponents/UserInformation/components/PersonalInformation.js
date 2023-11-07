import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import InputV2 from "../../../components/InputFields/v2";
import {DataFieldWrapper, PersonalInformationWrapper} from "../styles";
import {VIEW_MODE} from "../index";
import InputBadges from "../../../components/InputBadges";

const PersonalInformation = ({data, viewMode, onChangeData}) => {

    const [formData, setFormData] = useState(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    let isMounted = useRef(false);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
        } else{
            onChangeData && onChangeData({basicInformation: formData})
        }
    }, [formData]);


    const onChangeFormData = (key, value) => {
        setFormData(prev => ({...prev, [key]: value}))
    }

    const value = useMemo(() => {
        if (viewMode === VIEW_MODE.VIEW) return data;
        if (viewMode === VIEW_MODE.EDIT) return formData;
        return data;
    }, [formData, data, viewMode]);

    return <>
        <PersonalInformationWrapper>
            <DataFieldWrapper>
                <InputV2
                    id={"name"}
                    name={"name"}
                    value={value?.name}
                    onChange={value => onChangeFormData("name", value)}
                    label={"name"}
                    placeholder={"name"}
                    disabled={viewMode === VIEW_MODE.VIEW}
                    readOnly={viewMode === VIEW_MODE.VIEW}
                    groupClassName={"data-field-container"}
                />
            </DataFieldWrapper>
            <DataFieldWrapper>
                <InputV2
                    id={"email"}
                    name={"email"}
                    value={data?.email}
                    // onChange={value => onChangeFormData("email", value)}
                    label={"email"}
                    placeholder={"email"}
                    disabled={true}
                    groupClassName={"data-field-container"}
                />
            </DataFieldWrapper>

            <DataFieldWrapper>
                <InputV2
                    id={"objective"}
                    name={"objective"}
                    as={"textarea"}
                    value={value?.objective}
                    onChange={value => onChangeFormData("objective", value)}
                    label={"profession summary"}
                    placeholder={"profession summary"}
                    disabled={viewMode === VIEW_MODE.VIEW}
                    readOnly={viewMode === VIEW_MODE.VIEW}
                    groupClassName={"data-field-container"}
                />
            </DataFieldWrapper>

            {/*<DataFieldWrapper>
                <InputBadges
                    id={"tag"}
                    name={"tag"}
                    badges={value?.tags}
                    label={"Profile Tags"}
                    placeholder={"Profile Tags"}
                    readOnly={viewMode === VIEW_MODE.VIEW}
                    groupClassName={"data-field-container"}
                    max={2}
                />
            </DataFieldWrapper>*/}

            <DataFieldWrapper>
                <InputV2
                    id={"currentLocation"}
                    name={"currentLocation"}
                    value={value?.currentLocation}
                    onChange={value => onChangeFormData("currentLocation", value)}
                    label={"location"}
                    placeholder={"location"}
                    disabled={viewMode === VIEW_MODE.VIEW}
                    readOnly={viewMode === VIEW_MODE.VIEW}
                    groupClassName={"data-field-container"}
                />
            </DataFieldWrapper>

            <DataFieldWrapper>
                <InputV2
                    id={"website"}
                    name={"website"}
                    value={value?.website}
                    onChange={value => onChangeFormData("website", value)}
                    label={"portfolio website"}
                    placeholder={"portfolio website"}
                    disabled={viewMode === VIEW_MODE.VIEW}
                    readOnly={viewMode === VIEW_MODE.VIEW}
                    groupClassName={"data-field-container"}
                />
            </DataFieldWrapper>

            <DataFieldWrapper>
                <InputV2
                    id={"linkedin"}
                    name={"linkedin"}
                    value={value?.socialMediaLinks?.linkedin}
                    onChange={value => onChangeFormData("socialMediaLinks.linkedin", value)}
                    label={"LinkedIn"}
                    placeholder={"LinkedIn"}
                    disabled={viewMode === VIEW_MODE.VIEW}
                    readOnly={viewMode === VIEW_MODE.VIEW}
                    groupClassName={"data-field-container"}
                />
            </DataFieldWrapper>

            <DataFieldWrapper>
                <InputV2
                    id={"github"}
                    name={"github"}
                    value={value?.socialMediaLinks?.github}
                    onChange={value => onChangeFormData("socialMediaLinks.github", value)}
                    label={"GitHub"}
                    placeholder={"GitHub"}
                    disabled={viewMode === VIEW_MODE.VIEW}
                    readOnly={viewMode === VIEW_MODE.VIEW}
                    groupClassName={"data-field-container"}
                />
            </DataFieldWrapper>

            <DataFieldWrapper>
                <InputV2
                    id={"instagram"}
                    name={"instagram"}
                    value={value?.socialMediaLinks?.instagram}
                    onChange={value => onChangeFormData("socialMediaLinks.instagram", value)}
                    label={"Instagram"}
                    placeholder={"Instagram"}
                    disabled={viewMode === VIEW_MODE.VIEW}
                    readOnly={viewMode === VIEW_MODE.VIEW}
                    groupClassName={"data-field-container"}
                />
            </DataFieldWrapper>

            <DataFieldWrapper>
                <InputV2
                    id={"facebook"}
                    name={"facebook"}
                    value={value?.socialMediaLinks?.facebook}
                    onChange={value => onChangeFormData("socialMediaLinks.facebook", value)}
                    label={"Facebook"}
                    placeholder={"Facebook"}
                    disabled={viewMode === VIEW_MODE.VIEW}
                    readOnly={viewMode === VIEW_MODE.VIEW}
                    groupClassName={"data-field-container"}
                />
            </DataFieldWrapper>

        </PersonalInformationWrapper>
    </>
};

PersonalInformation.propTypes = {
    data: PropTypes.object,
    viewMode: PropTypes.string,
    onChangeData: PropTypes.func
};
PersonalInformation.defaultProps = {
    data: {},
    viewMode: "VIEW"
};

export default PersonalInformation
