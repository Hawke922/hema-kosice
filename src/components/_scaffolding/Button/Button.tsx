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
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        className={classes.button}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleButtonClick}
      >
        {label}
      </button>
      {/* <button className={classes["button-64"]} role="button">
        <span className={classes.text}>{label}</span>
      </button> */}
    </>
  );
};

export default Button;
