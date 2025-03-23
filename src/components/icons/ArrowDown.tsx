type ArrowDownProps = {
  isOpen: boolean;
  className?: string;
};

export function ArrowDown({ isOpen, className }: ArrowDownProps) {
  return (
    <svg
      className={`dropdown-arrow ${isOpen ? "open" : ""} ${className}`}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
