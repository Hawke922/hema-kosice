import { useState } from "react";
import { useTranslations } from "../../contexts/TranslationContext";

import classes from "./JoinSection.module.css";

type PathOption = "beginner" | "advanced" | null;

const JoinSection = () => {
  const { translations } = useTranslations();
  const [selectedPath, setSelectedPath] = useState<PathOption>(null);
  const [hoveredTab, setHoveredTab] = useState<PathOption>(null);

  const getBackgroundImage = () => {
    switch (selectedPath) {
      case "beginner":
        return "Serm-training.webp";
      case "advanced":
        return "Serm-116.jpg";
      default:
        return "Serm-119.jpg";
    }
  };

  return (
    <section className={classes.wrapper} id="join">
      <div className={classes["background-container"]}>
        <img
          className={`${classes["background-image"]} ${classes["background-fade"]}`}
          src={`${import.meta.env.BASE_URL}images/${getBackgroundImage()}`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          key={getBackgroundImage()}
        />
      </div>
      <div className={classes.content}>
        <div>
          <h1 className={classes.header}>{translations.join.header}</h1>
          <p>{translations.join.intro}</p>
        </div>

        <div className={classes["tabs-container"]}>
          <div
            className={`${classes["tabs-wrapper"]} ${
              selectedPath ? classes["has-selection"] : ""
            }`}
          >
            <button
              className={`${classes["tab-button"]} ${
                selectedPath === "beginner" ? classes["tab-selected"] : ""
              }`}
              onClick={() =>
                setSelectedPath(selectedPath === "beginner" ? null : "beginner")
              }
              onMouseEnter={() => setHoveredTab("beginner")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {translations.join.options.beginner.title}
            </button>
            <button
              className={`${classes["tab-button"]} ${
                selectedPath === "advanced" ? classes["tab-selected"] : ""
              }`}
              onClick={() =>
                setSelectedPath(selectedPath === "advanced" ? null : "advanced")
              }
              onMouseEnter={() => setHoveredTab("advanced")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {translations.join.options.advanced.title}
            </button>
            <div
              className={`${classes["tab-indicator"]} ${
                (hoveredTab || selectedPath) === "advanced"
                  ? classes["indicator-right"]
                  : classes["indicator-left"]
              } ${
                !selectedPath && hoveredTab ? classes["indicator-hover"] : ""
              } ${
                !selectedPath && !hoveredTab ? classes["indicator-hidden"] : ""
              }`}
            />
          </div>
        </div>

        {selectedPath && (
          <div
            className={`${classes["detail-content"]} ${classes["content-fade-in"]}`}
          >
            <h2 className={classes["detail-header"]}>
              {translations.join.options[selectedPath].detailTitle}
            </h2>
            <div className={classes["detail-text"]}>
              {translations.join.options[selectedPath].content.map(
                (paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JoinSection;
