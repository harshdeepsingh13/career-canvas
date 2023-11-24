import styled from "styled-components";
import {PageViewContainer} from "../../config/globalStyles";
import {COLORS} from "../../config/colors";

/*
export const HomeWrapper = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .home-button {
    background-color: magenta;
    //box-shadow: $box-shadow;
    //border-radius: $border-radius;
    color: white;
    width: 30%;
    padding: 20px;
    font-size: 17px;
    text-align: center;
    letter-spacing: 1px;

    &:hover {
      background-color: magenta;
    }
  }
`;
*/

export const HomeWrapper = styled.div`
  .section {
    margin-bottom: 96px;
  }

  .header-section {

    h2 {
      text-align: center;
      width: 741px;
      margin: 0 auto 48px auto;
      font-size: 48px;
      font-style: normal;
      font-weight: 500;
      line-height: 64px; /* 133.333% */
    }

    .description {
      text-align: center;
      width: 722px;
      margin: auto;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
    }
  }

  .actions-section {
    text-align: center;

    .action-button {
      width: 209px;
      height: 61px;
      margin: 0 48px;
      color: ${COLORS.BASIC_SOLID.WHITE};
    }
  }

  .features-section {
    h3 {
      margin: 156px auto 115px auto;
      width: 589px;
      text-align: center;
      font-size: 40px;
      font-style: normal;
      font-weight: 400;
      line-height: 64px; /* 160% */
    }

    .features-container {
      display: flex;
      align-items: stretch;
      justify-content: space-between;

      .feature {
        text-align: center;

        h4 {
          color: ${COLORS.PRIMARY.BLUE};
          text-align: center;
          font-size: 24px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          margin: 24px auto;
        }

        .description {
          text-align: center;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 24px; /* 171.429% */
          width: 409px;
          margin: 24px auto 0 auto;
        }
      }
    }
  }
`;
