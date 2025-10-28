import Column from "./Column/Column";
import { useTranslations } from "../../contexts/TranslationContext";

import classes from "./LandingSection.module.css";

const LandingSection = () => {
  const { translations } = useTranslations();

  return (
    <section className={classes.section}>
      <Column
        imagePath="/images/Serm-1.jpg"
        type="left"
        buttonLabel={translations.landing.button.hema}
        targetSection="hema"
      />
      <Column
        imagePath="/images/Serm-105.jpg"
        type="center"
        buttonLabel={translations.landing.button.team}
        targetSection="team"
      />
      <Column
        imagePath="/images/Serm-99.jpg"
        type="right"
        buttonLabel={translations.landing.button.join}
        targetSection="join"
      />
    </section>
  );
};

export default LandingSection;
