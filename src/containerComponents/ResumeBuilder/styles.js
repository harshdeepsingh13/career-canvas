import styled from "styled-components";
import {COLORS} from "../../config/colors";

export const ResumeBuilderWrapper = styled.div`
  position: relative;
`;

export const ResumeTemplateWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .template-details {
    flex-basis: calc(100% - 630px);
  }

  .template-view-container {
    width: 615px;
    position: sticky;
    top: 100px;

    .download-btn-container {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgb(255, 255, 255);
      background: -moz-linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 18%, rgba(1, 2, 32, 0.8758096988795518) 94%, rgba(1, 2, 32, 1) 100%);
      background: -webkit-linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 18%, rgba(1, 2, 32, 0.8758096988795518) 94%, rgba(1, 2, 32, 1) 100%);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 18%, rgba(1, 2, 32, 0.8758096988795518) 94%, rgba(1, 2, 32, 1) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#010220",GradientType=1);

      .download-btn {
        width: 250px;

        svg {
          margin-right: 1em;
        }
      }
    }
  }
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
        display: flex;
        align-items: center;

        .form-label {
          //flex-basis: 100%;
          margin-right: 1em;

        }
      }
    }

    .action-btn-container {

      .action-btn {
        margin-left: 1em;

        svg {
          margin-right: 10px;
        }
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
