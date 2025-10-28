import { useTranslations } from "../../contexts/TranslationContext";
import classes from "./AboutSection.module.css";

const AboutSection = () => {
  const { translations } = useTranslations();

  return (
    <section className={classes.wrapper}>
      <h1 className={classes.header}>{translations.about.title}</h1>
      <p className={classes.text}>{translations.about.content}</p>
    </section>
  );
};

export default AboutSection;
