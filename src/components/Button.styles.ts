import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary" | "danger" | "sucess";

interface ButtonConteinerProps {
  variant: ButtonVariant;
}

const backgroundColorsVariant = {
  primary: "purple",
  secondary: "orange",
  danger: "red",
  sucess: "green",
};

export const ButtonContainer = styled.button<ButtonConteinerProps>`
  width: 100px;
  height: 40px;
  margin: 8px;
  border: none;
  color: #fff;

  background-color: ${(props) => props.theme["green-500"]};


`;
