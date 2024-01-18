import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #75d0be;
  border: none;
  border-radius: 4px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;

  &:after {
    position: relative;
    right: -33%;
    content: " ";
    background: url("./assets/icon-chevron-right.svg") no-repeat;
    width: 24px;
    height: 24px;
  }

  &:disabled {
    background-color: #eceff1;
    color: #7b99a9;

    &:after {
      position: relative;
      right: -33%;
      background: url("./assets/icon-chevron-right-grey.svg") no-repeat;
      width: 24px;
      height: 24px;
    }
  }
`;

export default StyledButton;
