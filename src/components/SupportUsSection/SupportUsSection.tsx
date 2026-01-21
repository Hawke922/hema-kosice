import { useState } from "react";
import { useTranslations } from "../../contexts/TranslationContext";
import { scrollToElement } from "../../helpers/scroll";
import Icon from "../_scaffolding/Icon/Icon";
import Overlay from "../_scaffolding/Overlay/Overlay";
import ContactOverlay from "../_scaffolding/ContactOverlay/ContactOverlay";

import classes from "./SupportUsSection.module.css";

const SupportUsSection = () => {
  const { translations } = useTranslations();
  const support = translations.support;
  const [areStepsOpen, setAreStepsOpen] = useState(false);
  const [isContactOverlayOpen, setIsContactOverlayOpen] = useState(false);

  return (
    <section className={classes.wrapper} id="support">
      <div className={classes.heading}>
        <h2>{support.header}</h2>
        <p className={classes.description}>{support.description}</p>
      </div>

      <div className={classes.highlights}>
        <article className={`${classes.card} ${classes.cardJoin}`}>
          <div className={classes["card-content"]}>
            <h3 className={classes["card-title"]}>
              {support.actions.join.title}
            </h3>
            <p className={classes["card-body"]}>{support.actions.join.body}</p>
          </div>
          <button
            type="button"
            className={`${classes.button} ${classes["primary-button"]}`}
            onClick={() => scrollToElement("join")}
          >
            {support.actions.join.cta}
            <Icon name="chevron-right" className={classes.chevron} />
          </button>
        </article>

        <article className={`${classes.card} ${classes.cardTax}`}>
          <div className={classes["card-content"]}>
            <h3 className={classes["card-title"]}>
              {support.actions.tax.title}
            </h3>
            <p className={classes["card-body"]}>{support.actions.tax.body}</p>
          </div>
          <button
            type="button"
            className={`${classes.button} ${classes["primary-button"]}`}
            onClick={() => setAreStepsOpen((prev) => !prev)}
            aria-expanded={areStepsOpen}
            aria-controls={areStepsOpen ? "support-steps" : undefined}
          >
            {areStepsOpen
              ? support.actions.tax.collapseCta
              : support.actions.tax.expandCta}
            <Icon name="chevron-right" className={classes.chevron} />
          </button>
        </article>
      </div>

      {areStepsOpen ? (
        <div className={classes.steps} id="support-steps">
          <h3 className={classes["steps-title"]}>{support.steps.title}</h3>
          <p className={classes["steps-intro"]}>{support.steps.intro}</p>
          <ol className={classes["steps-list"]}>
            {support.steps.items.map((item, index) => (
              <li key={item.title} className={classes["step-item"]}>
                <div className={classes["step-number"]}>{index + 1}</div>
                <div>
                  <h4 className={classes["step-heading"]}>{item.title}</h4>
                  <p className={classes["step-description"]}>
                    {item.description}
                    {item.link ? (
                      <>
                        {" "}
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className={classes.link}
                        >
                          {item.link.label}
                        </a>
                      </>
                    ) : null}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className={classes.note}>
            {support.contactNote}{" "}
            <button
              type="button"
              className={classes.linkButton}
              onClick={() => setIsContactOverlayOpen(true)}
            >
              {support.contactLinkLabel}
            </button>
          </p>
          <Overlay
            isOpen={isContactOverlayOpen}
            onClose={() => setIsContactOverlayOpen(false)}
          >
            <ContactOverlay />
          </Overlay>
        </div>
      ) : null}
    </section>
  );
};

export default SupportUsSection;
