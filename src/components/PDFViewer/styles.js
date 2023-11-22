import styled from "styled-components";
import {COLORS} from "../../config/colors";

export const PDFViewerWrapper = styled.div`

  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: center;


    .description {
      margin-bottom: 1rem;
      margin-right: 1em;
      font-size: 0.9em;
      color: ${COLORS.TEXT.MEDIUM};
    }
  }
`;
