import React from "react";
import styled, { css } from "styled-components";

interface Props {
  variant: "primary" | "secondary";
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  variant,
  label,
  className,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton
      $variant={variant}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ $variant: string; className?: string }>`
  ${(props) =>
    props.$variant === "primary" &&
    css`
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
        width: 1.5rem;
        height: 1.5rem;
      }

      &:disabled {
        background-color: #eceff1;
        color: #7b99a9;
        pointer-events: none;

        &:after {
          position: relative;
          right: -33%;
          background: url("./assets/icon-chevron-right-grey.svg") no-repeat;
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    `}

  ${(props) =>
    props.$variant === "secondary" &&
    css`
      width: 8.438rem;
      padding: 1rem;
      background-color: transparent;
      border: 2px solid #e3e1e1;
      border-radius: 2.5rem;
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: #75d0be;
      cursor: pointer;

      &.selected {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #75d0be;
        color: #fff;
        border: none;
        transition: all 0.3s ease-in-out;

        &:after {
          content: "";
          display: inline-flex;
          background: url("./assets/icon-check.svg") no-repeat right;
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    `}
`;

export default Button;
