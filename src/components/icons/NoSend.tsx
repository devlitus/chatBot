export function NoSend() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-50"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
      {/* Cruz superpuesta */}
      <line x1="18" y1="6" x2="6" y2="18" className="text-red-500" />
      <line x1="6" y1="6" x2="18" y2="18" className="text-red-500" />
    </svg>
  );
}
