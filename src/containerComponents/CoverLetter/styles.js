import styled from "styled-components";
import {COLORS} from "../../config/colors";

export const CoverLetterWrapper = styled.div`
  min-height: calc(100vh - 20em);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  //text-align: center;

  .job-description-container, .cover-letter-result-container {
    flex-basis: 49%;
  }

  .cover-letter-result-container {
    margin-top: 42px;
    padding: 1em;
    min-height: calc(100vh - 20em);
    border-radius: 6px;
    background-color: ${COLORS.PRIMARY.LIGHT};
    box-shadow: 0 0 16px -13px rgba(0, 0, 0);

    .cover-letter-rich-input {

    }

    .cover-letter-header {
      display: flex;
      align-items: stretch;
      justify-content: flex-end;

      .copy-action-btn {
        opacity: 0.6;
        font-size: 12px;
      }

      button {
        margin-left: 1em;

        svg {
          margin-right: 10px;
        }
      }
    }
  }

  .cover-letter-loader-container {
    text-align: center;
    color: ${COLORS.PRIMARY.DARK};

    svg {
      margin-right: 10px;
    }
  }
`;
