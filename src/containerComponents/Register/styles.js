import styled from "styled-components";

export const RegisterWrapper = styled.div`
  width: 75%;
  margin: auto;

  .create-user-button {
    display: block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 250px;
    height: 50px;
    margin-top: 2em;
  }

  .phone-input-container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;

    label {
      width: 100%;
    }

    .autofill-input-container {
      display: inline-block;
      width: 75%;
    }

    .country-code-input-container {
      margin-bottom: unset;
      width: 23%;
    }
  }

`;
