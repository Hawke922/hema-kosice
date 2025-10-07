import classes from "./Button.module.css";

type ButtonProps = {
  label: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const Button = ({ label, onMouseEnter, onMouseLeave }: ButtonProps) => {
  return (
    <>
      <button
        className={classes.button}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
