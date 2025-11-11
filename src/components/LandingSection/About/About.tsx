import { useTranslations } from "../../../contexts/TranslationContext";

import classes from "./About.module.css";

const About = () => {
  const { translations } = useTranslations();

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>{translations.about.title}</h1>
      <p className={classes.text}>{translations.about.content}</p>
    </div>
  );
};

export default About;
