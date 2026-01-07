import { useEffect, useState } from "react";

import { useDirectionalIntersection } from "../../../hooks/useDirectionalIntersection";
import { scrollToElement } from "../../../helpers/scroll";

import Button from "../../_scaffolding/Button/Button";
import Links from "../Links/Links";

import classes from "./Column.module.css";

type ColumnProps = {
  imagePath: string;
  type: "left" | "center" | "right";
  buttonLabel: string;
  targetSection: string;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
};

const Column = ({
  imagePath,
  type,
  buttonLabel,
  targetSection,
  isActive,
  onActivate,
  onDeactivate,
}: ColumnProps) => {
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
    <div
      className={classes.column}
      onClick={() => isMobile && scrollToElement(targetSection)}
      onMouseEnter={() => isMobile && onActivate()}
      onMouseLeave={() => isMobile && onDeactivate()}
    >
      <img
        ref={targetRef}
        className={`${classes.column__image} ${
          classes[`column__image--${type}`]
        } ${isActive ? classes["column__image--active"] : ""}`}
        src={imagePath}
        alt="Column"
      />
      <div className={classes.column__content}>
        <div className={classes.column__logo}>
          {type === "center" && (
            <img
              className={`${classes["column__logo-image"]} ${
                isActive ? classes["column__logo-image--active"] : ""
              }`}
              src={`${import.meta.env.BASE_URL}logo-complex.svg`}
              alt="KSC logo"
            />
          )}
        </div>
        <div className={classes.column__button}>
          <Button
            label={buttonLabel}
            onMouseEnter={onActivate}
            onMouseLeave={onDeactivate}
            onClick={() => scrollToElement(targetSection)}
          />
        </div>
        <div className={classes.column__spacer} />
      </div>
      {type === "right" && <Links isExpandable={!isIntersecting || isMobile} />}
    </div>
  );
};

export default Column;
