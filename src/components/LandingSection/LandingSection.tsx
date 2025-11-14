import { useState } from "react";
import Column from "./Column/Column";
import About from "./About/About";

import { useTranslations } from "../../contexts/TranslationContext";

import classes from "./LandingSection.module.css";

const COLUMNS = [
  {
    imagePath: `${import.meta.env.BASE_URL}images/Serm-1.jpg`,
    type: "left" as const,
    translationKey: "hema" as const,
    targetSection: "hema",
  },
  {
    imagePath: `${import.meta.env.BASE_URL}images/Serm-105.jpg`,
    type: "center" as const,
    translationKey: "team" as const,
    targetSection: "team",
  },
  {
    imagePath: `${import.meta.env.BASE_URL}images/Serm-99.jpg`,
    type: "right" as const,
    translationKey: "join" as const,
    targetSection: "join",
  },
];

const LandingSection = () => {
  const { translations } = useTranslations();
  const [activeColumn, setActiveColumn] = useState<
    "left" | "center" | "right" | null
  >(null);

  return (
    <section className={classes.wrapper}>
      <div className={classes.columns}>
        {COLUMNS.map((column) => (
          <Column
            key={column.targetSection}
            imagePath={column.imagePath}
            type={column.type}
            buttonLabel={translations.landing.button[column.translationKey]}
            targetSection={column.targetSection}
            isActive={activeColumn === column.type}
            showLogo={
              activeColumn === null
                ? column.type === "center"
                : activeColumn === column.type
            }
            onActivate={() => setActiveColumn(column.type)}
            onDeactivate={() => setActiveColumn(null)}
          />
        ))}
      </div>
      <About />
    </section>
  );
};

export default LandingSection;
