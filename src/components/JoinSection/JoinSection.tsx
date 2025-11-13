import { useTranslations } from "../../contexts/TranslationContext";

import classes from "./JoinSection.module.css";

const JoinSection = () => {
  const { translations } = useTranslations();

  return (
    <section className={classes.wrapper} id="join">
      <div className={classes["background-container"]}>
        <img
          className={classes["background-image"]}
          src={`${import.meta.env.BASE_URL}images/Serm-119.jpg`}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>
      <div className={classes.content}>
        <h1 className={classes.header}>{translations.join.header}</h1>
        <div className={classes["text-wrapper"]}>
          <h2 className={classes["sub-header"]}>
            {translations.join.subheader}
          </h2>
          <p>{translations.join.content}</p>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
