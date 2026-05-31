import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {NoRecordWrapper, SkillsInformationWrapper} from '../styles';
import {VIEW_MODE} from '../index';
import InputBadges, {CLICK_ACTIONS} from '../../../components/InputBadges';
import styled from 'styled-components';

const CategoryCard = styled.div`
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    background: #fff;
`;

const CategoryHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
`;

const CategoryName = styled.h6`
    font-weight: 600;
    margin: 0;
`;

const CategoryDescription = styled.p`
    font-size: 0.875rem;
    color: #6c757d;
    margin-bottom: 0.5rem;
`;

const AddCategoryBtn = styled(Button)`
    margin-top: 0.5rem;
`;

const DEFAULT_CATEGORY = { category: '', description: '', skills: [] };

const SkillsInformation = ({data, viewMode, onChangeData}) => {
    const [formData, setFormData] = useState(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            onChangeData && onChangeData(formData);
        }
    }, [formData]);

    const categories = viewMode === VIEW_MODE.EDIT
        ? formData?.skillCategories || []
        : data?.skillCategories || [];

    const updateCategory = (index, field, value) => {
        setFormData(prev => {
            const updated = [...(prev.skillCategories || [])];
            updated[index] = {...updated[index], [field]: value};
            return {...prev, skillCategories: updated};
        });
    };

    const addCategory = () => {
        setFormData(prev => ({
            ...prev,
            skillCategories: [...(prev.skillCategories || []), {...DEFAULT_CATEGORY}],
        }));
    };

    const removeCategory = (index) => {
        setFormData(prev => {
            const updated = [...(prev.skillCategories || [])];
            updated.splice(index, 1);
            return {...prev, skillCategories: updated};
        });
    };

    if (!categories || categories.length === 0) {
        return (
            <SkillsInformationWrapper>
                <NoRecordWrapper>
                    <p>No skill categories yet. {viewMode === VIEW_MODE.EDIT ? 'Add a category below.' : 'Add your details now.'}</p>
                </NoRecordWrapper>
                {viewMode === VIEW_MODE.EDIT && (
                    <AddCategoryBtn variant="outline-primary" size="sm" onClick={addCategory}>
                        <FontAwesomeIcon icon={faPlus} /> Add Category
                    </AddCategoryBtn>
                )}
            </SkillsInformationWrapper>
        );
    }

    return (
        <SkillsInformationWrapper>
            {categories.map((cat, index) => (
                <CategoryCard key={index}>
                    <CategoryHeader>
                        {viewMode === VIEW_MODE.EDIT ? (
                            <Form.Control
                                size="sm"
                                placeholder="Category name (e.g. Frontend Development)"
                                value={cat.category || ''}
                                onChange={e => updateCategory(index, 'category', e.target.value)}
                                style={{fontWeight: 600, maxWidth: '60%'}}
                            />
                        ) : (
                            <CategoryName>{cat.category}</CategoryName>
                        )}
                        {viewMode === VIEW_MODE.EDIT && (
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removeCategory(index)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        )}
                    </CategoryHeader>

                    {viewMode === VIEW_MODE.EDIT ? (
                        <Form.Control
                            as="textarea"
                            rows={2}
                            size="sm"
                            placeholder="Short description (1-2 sentences shown on your portfolio)"
                            value={cat.description || ''}
                            onChange={e => updateCategory(index, 'description', e.target.value)}
                            className="mb-2"
                        />
                    ) : (
                        cat.description && <CategoryDescription>{cat.description}</CategoryDescription>
                    )}

                    <InputBadges
                        badges={cat.skills || []}
                        badgeProps={{bg: 'primary'}}
                        clickAction={CLICK_ACTIONS.DELETE}
                        placeholder="Add skill"
                        readOnly={viewMode === VIEW_MODE.VIEW}
                        onChange={value => updateCategory(index, 'skills', value)}
                    />
                </CategoryCard>
            ))}

            {viewMode === VIEW_MODE.EDIT && (
                <AddCategoryBtn variant="outline-primary" size="sm" onClick={addCategory}>
                    <FontAwesomeIcon icon={faPlus} /> Add Category
                </AddCategoryBtn>
            )}
        </SkillsInformationWrapper>
    );
};

SkillsInformation.propTypes = {
    data: PropTypes.object,
    viewMode: PropTypes.string,
    onChangeData: PropTypes.func,
};
SkillsInformation.defaultProps = {
    data: {},
    viewMode: 'VIEW',
};

export default SkillsInformation;
