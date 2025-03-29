import "./Spinner.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Spinner = ({ size = "md", className }: SpinnerProps) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`spinner ${sizes[size]} ${className}`}
      data-testid="spinner"
    ></div>
  );
};

export default Spinner;
