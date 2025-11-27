import { useTranslations } from "../../../contexts/TranslationContext";
import { scrollToElement } from "../../../helpers/scroll";
import Chevron from "../../_scaffolding/Chevron/Chevron";

import classes from "./About.module.css";

const About = () => {
  const { translations } = useTranslations();

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>{translations.about.title}</h1>
      <p className={classes.text}>{translations.about.content}</p>
      <div className={classes["button-container"]}>
        <button
          className={classes.button}
          onClick={() => console.log("Contact button clicked")}
        >
          {translations.about.contactButton}
          <Chevron className={classes.chevron} />
        </button>
        <button
          className={classes.button}
          onClick={() => scrollToElement("faq")}
        >
          {translations.about.faqButton}
          <Chevron className={classes.chevron} />
        </button>
      </div>
    </div>
  );
};

export default About;
