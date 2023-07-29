// packages/design-system/src/Button.tsx
import React, { ReactNode } from "react";
import styled from "@emotion/styled";

type ButtonProps = {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const StyledButton = styled.button<ButtonProps>`
  background-color: transparent;
  padding: 10px;
  border: 1px solid #777;
  border-radius: 5px;
`;

const Button = ({ children, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
