import React from "react";

/**
 * Tipo para las props del mock del botón
 */
export type MockButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Devuelve un mock para el componente Button
 */
export function getButtonMock() {
  return {
    Button: ({
      children,
      variant = "primary",
      size = "md",
      className = "",
      onClick,
      disabled,
      ...props
    }: MockButtonProps) => (
      <button 
        onClick={onClick}
        disabled={disabled}
        className={`button ${variant} ${size} ${className}`}
        {...props}
        data-testid="mock-button"
      >
        {children}
      </button>
    ),
  };
}
