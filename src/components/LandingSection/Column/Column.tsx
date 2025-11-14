import { useEffect, useState } from "react";

import { useDirectionalIntersection } from "../../../hooks/useDirectionalIntersection";

import Button from "../../_scaffolding/Button/Button";
import Links from "../Links/Links";

import classes from "./Column.module.css";

type ColumnProps = {
  imagePath: string;
  type: "left" | "center" | "right";
  buttonLabel: string;
  targetSection: string;
  isActive: boolean;
  showLogo: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
};

const Column = ({
  imagePath,
  type,
  buttonLabel,
  targetSection,
  isActive,
  showLogo,
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

  const scrollToSection = () => {
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
    <div
      className={classes.column}
      onClick={() => isMobile && scrollToSection()}
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
          <img
            className={`${classes["column__logo-image"]} ${
              !showLogo || !isIntersecting
                ? classes["column__logo-image--hidden"]
                : ""
            }`}
            src={`${import.meta.env.BASE_URL}logo-complex.svg`}
            alt="KSC logo"
          />
        </div>
        <div className={classes.column__button}>
          <Button
            label={buttonLabel}
            onMouseEnter={onActivate}
            onMouseLeave={onDeactivate}
            onClick={scrollToSection}
          />
        </div>
        <div className={classes.column__spacer} />
      </div>
      {type === "right" && <Links isExpandable={!isIntersecting || isMobile} />}
    </div>
  );
};

export default Column;
