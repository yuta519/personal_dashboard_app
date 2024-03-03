import { MouseEvent } from "react";
import styled from "styled-components";

type Props = {
  color: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  type?: "submit";
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

const getButtonColor = (color: string) => {
  switch (color) {
    case "primary":
      return ["#007bff", "#0056b3"];
    case "secondary":
      return ["#6c757d", "#5a6268"];
    case "danger":
      return ["#dc3545", "#bd2130"];
    default:
      return ["#007bff", "#0056b3"];
  }
};

const Button = ({ color, children, ...prpos }: Props) => {
  const [backgroundColor, hoverColor] = getButtonColor(color);

  return (
    <StyledButton color={backgroundColor} hoverColor={hoverColor} {...prpos}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ color: string; hoverColor: string }>`
  max-width: 200px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

export default Button;
