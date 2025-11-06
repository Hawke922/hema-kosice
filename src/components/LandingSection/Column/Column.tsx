import { useState, useEffect } from "react";

import { useDirectionalIntersection } from "../../../hooks/useDirectionalIntersection";

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
  const [isMobile, setIsMobile] = useState(false);

  const { targetRef, isIntersecting } =
    useDirectionalIntersection<HTMLImageElement>({
      rootMargin: "0px 0px 0px 0px",
      threshold: 1,
    });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className={classes.column}>
      <img
        ref={targetRef}
        className={`${classes.column__image} ${
          classes[`column__image--${type}`]
        } ${isActive ? classes["column__image--active"] : ""}`}
        src={imagePath}
        alt="Column"
      />
      {type === "center" && (
        <img
          className={`${classes.column__logo} ${
            !isIntersecting ? classes["column__logo--hidden"] : ""
          }`}
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
      {type === "right" && <Links isExpandable={!isIntersecting || isMobile} />}
    </div>
  );
};

export default Column;
