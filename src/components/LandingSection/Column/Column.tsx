import Button from "../../_scaffolding/Button/Button";

import classes from "./Column.module.css";

type ColumnProps = {
  imagePath: string;
  type: "left" | "center" | "right";
  buttonLabel: string;
};

const Column = ({ imagePath, type, buttonLabel }: ColumnProps) => {
  return (
    <div className={classes.column}>
      <img
        className={`${classes.column__image} ${classes[`column--${type}`]}`}
        src={imagePath}
        alt="Column"
      />
      {type === "center" &&
        <img className={classes.column__logo} src="/logo-complex.svg" alt="KSC logo" />
      }
      <Button label={buttonLabel} />
    </div>
  );
};

export default Column;
