import styled from "styled-components";
import {Col} from "react-bootstrap";
import {COLORS} from "../../config/colors";

export const UserInformationWrapper = styled.div``;

export const UserInformationTabsWrapper = styled(Col)`
  //max-width: 200px;

  div.nav {
    position: sticky;
    top: 100px;
  }
`

export const TabContentWrapper = styled(Col)`

  .add-record-button {
    margin: 1em 0;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const PersonalInformationWrapper = styled.div``;

export const EducationalInformationWrapper = styled.div`

`;

export const ExperienceInformationWrapper = styled.div`

`;

export const TrainingInformationWrapper = styled.div`

`;

export const ProjectInformationWrapper = styled.div`

`;

export const SkillsInformationWrapper = styled.div``;

export const ActionsWrapper = styled.div`
  margin-bottom: 1em;
  text-align: right;
  //position: sticky;
  //top: 100px;

  button {
    margin: 0 1em;

    &:last-child {
      margin-right: unset;
    }

    svg {
      margin-right: 10px;
    }
  }

  .edit-button {
    padding: 5px 25px;
  }
`;

export const DataFieldWrapper = styled.div`

  .data-field-container {
    display: flex;
    align-items: flex-start;

    .form-label {
      margin-bottom: unset;
      flex-basis: 25%;
    }

    textarea {
      flex-basis: 100%;
    }

    .badge-form-container {
      padding-right: 12px;
      padding-left: 12px;
    }

    .form-control {

      &::-webkit-input-placeholder {
        text-transform: capitalize;
      }

      &:-moz-placeholder {
        text-transform: capitalize;
      }

      &::-moz-placeholder {
        text-transform: capitalize;
      }

      &:-ms-input-placeholder {
        text-transform: capitalize;
      }

    }

    select, .education-type-option {
      text-transform: capitalize;
    }
  }
`;

export const NoRecordWrapper = styled.div`
  text-align: center;
  margin-top: 2em;
  color: ${COLORS.TEXT.MEDIUM};
`;
