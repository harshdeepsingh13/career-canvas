import styled from "styled-components";
import {COLORS} from "../../config/colors";

export const ResumeBuilderWrapper = styled.div``;

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

    &.skills-content{
      padding: unset;
    }

    .content-items-container{
      .content-item{
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

  h3{
    color: ${COLORS.TEXT.MEDIUM};
    font-size: 1em;
    margin: 2em;
  }

`;
