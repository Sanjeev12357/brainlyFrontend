//@ts-ignore
import { ReactElement } from "react";
import "./Button.css"; // Make sure to import the CSS file

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
}

export function Button({ variant, text, startIcon, onClick }: ButtonProps) {
  return (
    <button className={`custom-button text-center ${variant}`} onClick={onClick}>
      {startIcon && <span className="icon">{startIcon}</span>}
      <span>{text}</span>
    </button>
  );
}
