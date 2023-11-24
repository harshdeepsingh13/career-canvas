import styled from "styled-components";
import {COLORS} from "../../config/colors";

export const JobSearchWrapper = styled.div`
  min-height: 100vh;

  .search-action-container {
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    .search-container {
      flex-basis: 55%;
      display: flex;
      align-items: stretch;
      justify-content: space-between;

      .filter-input {
        flex-basis: 48%;
      }
    }

    .filter-container {
      flex-basis: 42%;
      display: flex;
      align-items: stretch;
      justify-content: space-between;

      .filter-input {
        flex-basis: 32%;
      }
    }

    .filter-input {

      select {
        text-transform: capitalize;

        option {
          text-transform: capitalize;
        }
      }
    }

    /*.search-container {
      flex-basis: 35%;
    }*/
  }

  .job-results-container {
    min-height: 100vh;

    .loader-container {
      padding: 1em;
      text-align: center;

      svg {
        margin-right: 1em;
      }
    }

    .job-results {

      .job-item {
        padding: 1em 2em;
        margin-bottom: 1em;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        background-color: white;
        border-radius: 4px;
        border: thin solid ${COLORS.TEXT.XLIGHT};
        box-shadow: 0 0 20px -17px rgb(0, 0, 0);


        .company-logo {
          margin-right: 2em;
          width: 100px;
        }

        .job-details-container {
          flex-basis: 100%;

          .position {
            color: ${COLORS.PRIMARY.BLUE};
          }

          .extra-details {
            display: flex;
            font-size: 0.9em;
            color: ${COLORS.TEXT.MEDIUM};

            .extra-item {
              padding-right: 10px;
              margin-right: 10px;
              position: relative;

              &:after {
                content: "∎";
                position: absolute;
                top: 50%;
                right: 0;
                font-size: 0.5em;
                color: black;
                transform: translateY(-50%);
              }

              &:last-child {
                &:after {
                  content: unset;
                }
              }
            }
          }
        }

        .action-container {
          //flex-basis: 100%;
          flex-basis: 300px;

          a {
            padding: 1em 2em;
            background-color: ${COLORS.PRIMARY.BLUE};
            width: 200px;
            display: inline-block;
            text-align: center;
            border-radius: 4px;
            color: white;
            text-decoration: unset;

            svg {
              margin-left: 1em;
            }
          }
        }
      }
    }

  }
`;
