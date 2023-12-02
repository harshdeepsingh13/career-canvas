import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {NoRecordWrapper, SkillsInformationWrapper} from "../styles";
import {VIEW_MODE} from "../index";
import InputBadges, {CLICK_ACTIONS} from "../../../components/InputBadges";

const SkillsInformation = ({data, viewMode, onChangeData}) => {
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

    const onChangeFormData = (value) => {
        setFormData(prev => {
            prev.skills = value
            return {...prev};
        });
    }

    const value = useMemo(() => {
        if (viewMode === VIEW_MODE.VIEW) return data;
        if (viewMode === VIEW_MODE.EDIT) return formData;
        return data;
    }, [formData, data, viewMode]);

    return <>
        <SkillsInformationWrapper>
            {(!value?.skills || value?.skills?.length === 0) ?
                <NoRecordWrapper>
                    <p>Your skills details will come here. Add your details now</p>
                </NoRecordWrapper> :
                <>
                    <InputBadges
                        badges={value?.skills}
                        badgeProps={{bg: "primary"}}
                        clickAction={CLICK_ACTIONS.DELETE}
                        placeholder={"Skills"}
                        readOnly={viewMode === VIEW_MODE.VIEW}
                        onChange={onChangeFormData}
                    />
                </>
            }

            {/* {value?.skills?.map((skill, index) =>
                <div className={"skill-item"} key={skill._id}>
                    <CustomBadge bg={"primary"} pill={true}>{skill}</CustomBadge>
                </div>
            )}*/}
        </SkillsInformationWrapper>
    </>
};

SkillsInformation.propTypes = {
    data: PropTypes.object,
    viewMode: PropTypes.string,
    onChangeData: PropTypes.func
};
SkillsInformation.defaultProps = {
    data: {},
    viewMode: "VIEW"
};

export default SkillsInformation
