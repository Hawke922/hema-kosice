interface ChevronProps {
  direction?: "left" | "right";
  size?: number;
  className?: string;
}

const Chevron = ({ direction = "right", size = 20, className = "" }: ChevronProps) => {
  const path = direction === "right" ? "M7 4L13 10L7 16" : "M13 4L7 10L13 16";

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Chevron;
