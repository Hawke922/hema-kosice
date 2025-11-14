import classes from "./Button.module.css";

type ButtonProps = {
  label: string;
  targetSection: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const Button = ({
  label,
  onMouseEnter,
  onMouseLeave,
  targetSection,
}: ButtonProps) => {
  const handleButtonClick = () => {
    const section = document.getElementById(targetSection);

    if (section) {
      const sectionRect = section.getBoundingClientRect();
      const sectionCenter = sectionRect.top + sectionRect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const scrollOffset = window.scrollY + sectionCenter - viewportCenter;

      window.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      className={classes.button}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleButtonClick}
    >
      {label}
    </button>
  );
};

export default Button;
