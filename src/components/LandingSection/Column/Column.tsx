import { useState } from "react";

import Button from "../../_scaffolding/Button/Button";
import Links from "../Links/Links";

import classes from "./Column.module.css";

type ColumnProps = {
  imagePath: string;
  type: "left" | "center" | "right";
  buttonLabel: string;
  targetSection: string;
};

const Column = ({
  imagePath,
  type,
  buttonLabel,
  targetSection,
}: ColumnProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={classes.column}>
      <img
        className={`${classes.column__image} ${classes[`column--${type}`]} ${
          isActive ? classes["column__image--active"] : ""
        }`}
        src={imagePath}
        alt="Column"
      />
      {type === "center" && (
        <img
          className={classes.column__logo}
          src="/logo-complex.svg"
          alt="KSC logo"
        />
      )}
      <Button
        label={buttonLabel}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        targetSection={targetSection}
      />
      {type === "right" && <Links />}
    </div>
  );
};

export default Column;
