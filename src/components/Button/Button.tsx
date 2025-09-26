import React from "react";
import "./Button.scss";

type ButtonProps = {
  text: string;
  bg?: string;
  color?: string;
  border?: string;
  uppercase?: boolean;
  block?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  glass?: boolean;
  blur?: number;
};
 
export default function Button({
  text,
  bg = "#ffffff",
  color = "#000000",
  border = "none",
  uppercase = false,
  block = true,
  disabled,
  onClick,
  className,
  style,
  blur = 12,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`button ${block ? "button--block" : ""} ${className ?? ""}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...(style || {}),
        ["--btn-bg" as any]: bg,
        ["--btn-fg" as any]: color,
        ["--btn-tt" as any]: uppercase ? "uppercase" : "none",
        ["--btn-bor" as any]: border,
        ["--glass-blur" as any]: `${blur}px`,
      }}
    >
      {text}
    </button>
  );
}
