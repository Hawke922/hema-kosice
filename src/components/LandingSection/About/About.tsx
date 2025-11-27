import { useState } from "react";
import { useTranslations } from "../../../contexts/TranslationContext";
import { scrollToElement } from "../../../helpers/scroll";
import Icon from "../../_scaffolding/Icon/Icon";
import Overlay from "../../_scaffolding/Overlay/Overlay";
import ContactOverlay from "../../_scaffolding/ContactOverlay/ContactOverlay";

import classes from "./About.module.css";

const About = () => {
  const { translations } = useTranslations();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>{translations.about.title}</h1>
      <p className={classes.text}>{translations.about.content}</p>
      <div className={classes["button-container"]}>
        <button
          className={classes.button}
          onClick={() => setIsOverlayOpen(true)}
        >
          {translations.about.contactButton}
          <Icon name="chevron-right" className={classes.chevron} />
        </button>
        <button
          className={classes.button}
          onClick={() => scrollToElement("faq")}
        >
          {translations.about.faqButton}
          <Icon name="chevron-right" className={classes.chevron} />
        </button>
      </div>

      <Overlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <ContactOverlay />
      </Overlay>
    </div>
  );
};

export default About;
