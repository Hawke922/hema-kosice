interface IconProps {
  name:
    | "chevron-left"
    | "chevron-right"
    | "chevron-up"
    | "chevron-down"
    | "cross";
  size?: number;
  className?: string;
}

const Icon = ({ name, size = 20, className = "" }: IconProps) => {
  const getPath = () => {
    switch (name) {
      case "chevron-right":
        return (
          <path
            d="M7 4L13 10L7 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case "chevron-left":
        return (
          <path
            d="M13 4L7 10L13 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case "chevron-down":
        return (
          <path
            d="M4 7L10 13L16 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case "chevron-up":
        return (
          <path
            d="M4 13L10 7L16 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case "cross":
        return (
          <>
            <path
              d="M5 5L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 5L5 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
    }
  };

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      {getPath()}
    </svg>
  );
};

export default Icon;
