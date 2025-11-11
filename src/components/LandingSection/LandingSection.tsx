import Column from "./Column/Column";
import About from "./About/About";

import { useTranslations } from "../../contexts/TranslationContext";

import classes from "./LandingSection.module.css";

const COLUMNS = [
  {
    imagePath: "/images/Serm-1.jpg",
    type: "left" as const,
    translationKey: "hema" as const,
    targetSection: "hema",
  },
  {
    imagePath: "/images/Serm-105.jpg",
    type: "center" as const,
    translationKey: "team" as const,
    targetSection: "team",
  },
  {
    imagePath: "/images/Serm-99.jpg",
    type: "right" as const,
    translationKey: "join" as const,
    targetSection: "join",
  },
];

const LandingSection = () => {
  const { translations } = useTranslations();

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
          />
        ))}
      </div>
      <About />
    </section>
  );
};

export default LandingSection;
