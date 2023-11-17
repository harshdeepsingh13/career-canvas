import styled from "styled-components";
import {COLORS} from "../../config/colors";

export const ResumeBuilderWrapper = styled.div`

`;

export const TemplateDetailsWrapper = styled.div`

  .templates-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;

    .main-options-container {
      display: flex;
      align-items: center;

      .template-select {
        margin-right: 1em;
      }

      .template-name-input {
        width: 300px;
      }

      .action-btn {
        margin-left: 1em;
      }
    }
  }

  .template-details-container {
  }
`;

export const DataContentWrapper = styled.div`
  margin-bottom: 2.5em;

  .section-header {
    color: ${COLORS.PRIMARY.DARK};
    font-size: 1.5em;
    border-bottom: thin solid ${COLORS.TEXT.XLIGHT};
    padding-bottom: 16px;
    padding-left: 5px;
    //position: sticky;
    //top: 76px;
    //z-index: 99;
      //background-color: ${COLORS.PRIMARY.BACKGROUND};
  }

  .main-content {
    margin: 5px 20px;
    padding: 1em 0;

    &.skills-content {
      padding: unset;
    }

    .content-items-container {
      .content-item {
        background-color: ${COLORS.BASIC_SOLID.WHITE};
        margin: 1em 0;
        padding: 1em;
      }
    }
  }

  .skills-container {
    .badge-form-container {
      background-color: initial;
      border: initial;
      padding-left: unset;
      padding-right: unset;
      padding-top: 1em;
    }
  }

`;

export const NoTemplatesWrapper = styled.div`
  text-align: center;
  margin: 5em;

  h3 {
    color: ${COLORS.TEXT.MEDIUM};
    font-size: 1em;
    margin: 2em;
  }

`;

export const SaveWrapper = styled.div`
  width: 100%;
  background-color: ${COLORS.SECONDARY.ORANGE};
  position: fixed;
  bottom: 0;
  padding: 10px 2em;
  border-bottom: 8px solid ${COLORS.SECONDARY.DARK};
  box-shadow: 0 0 19px -7px rgb(0, 0, 0);
  text-align: right;
  transition: all 0.3s ease-in-out;

  ${props => props.show ? {
    visibility: "visible",
    opacity: 1,
  } : {
    visibility: "hidden",
    opacity: 0,
  }}
  .action-btn {
    width: 100px;
    margin-left: 1em;
  }
`;
