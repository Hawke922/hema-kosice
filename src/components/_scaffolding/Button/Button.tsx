import classes from "./Button.module.css";

type ButtonProps = {
  label: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
};

const Button = ({
  label,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={classes.button}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
