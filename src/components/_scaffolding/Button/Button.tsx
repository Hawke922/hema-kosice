import classes from "./Button.module.css";

type ButtonProps = {
  label: string;
};

const Button = ({ label }: ButtonProps) => {
  return (
    <>
      <button className={classes.button}>{label}</button>
      {/* <button className={classes["button-64"]} role="button">
        <span className={classes.text}>{label}</span>
      </button> */}
    </>
  );
};

export default Button;
