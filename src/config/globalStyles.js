import styled from "styled-components";
import {COLORS} from "./colors";

export const Container = styled.div`
  padding: 1em 10%;
`

export const PageViewContainer = styled(Container)`
  //min-height: 100vh;
  margin-top: 100px;
  margin-bottom: 100px;

  .education-item, .work-experience-item, .training-item, .project-item {
    padding-bottom: 2em;
    padding-top: 2em;
    padding-right: 5em;
    border-bottom: thin solid ${COLORS.TEXT.XLIGHT};
    position: relative;

    .delete-icon-container {
      position: absolute;
      right: 0;
    }

    &:first-child {
      padding-top: unset;
    }

    &:last-child {
      border-bottom: unset;
    }
  }
`;

export const H1 = styled.h1``;

export const H2 = styled.h2``;

export const PageHeader = styled.h3`
  color: ${COLORS.PRIMARY.BLUE};
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 133.023%; /* 19.953px */
  margin-bottom: 24px;
  //margin-top: 1em
`
