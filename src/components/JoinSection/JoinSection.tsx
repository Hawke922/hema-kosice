import { useTranslations } from "../../contexts/TranslationContext";
import { useDirectionalIntersection } from "../../hooks/useDirectionalIntersection";

import classes from "./JoinSection.module.css";

const JoinSection = () => {
  const { targetRef: headerRef, isIntersecting: isHeaderIntersecting } =
    useDirectionalIntersection<HTMLHeadingElement>({
      rootMargin: "-10% 0px -20% 0px",
    });

  const { translations } = useTranslations();

  return (
    <section className={classes.wrapper} id="join">
      <div className={classes["background-container"]}>
        <img
          className={classes["background-image"]}
          src="/images/Serm-119.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>
      <div className={classes.content}>
        <h1 className={classes.header}>{translations.join.header}</h1>
        <div className={classes["text-wrapper"]}>
          <h2
            ref={headerRef}
            className={`${classes["sub-header"]} ${
              isHeaderIntersecting ? classes["sub-header--visible"] : ""
            }`}
          >
            {translations.join.subheader}
          </h2>
          <p>{translations.join.content}</p>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
