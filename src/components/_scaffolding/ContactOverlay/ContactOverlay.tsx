import { siteConfig } from "../../../config/site";
import { useTranslations } from "../../../contexts/TranslationContext";

import classes from "./ContactOverlay.module.css";

const ContactOverlay = () => {
  const { translations } = useTranslations();
  const { contact } = siteConfig;
  const contactOptions = contact.options ?? [];
  const socialLinks = contact.socials ?? [];

  return (
    <div className={classes["contact-overlay"]}>
      <div className={classes["header-wrapper"]}>
        <h3>{translations.contact.title}</h3>
        <p className={classes.subtitle}>{translations.contact.subtitle}</p>
      </div>

      <ul className={classes["contact-list"]}>
        {contactOptions.map((option) => (
          <li key={option.id} className={classes["contact-item"]}>
            <a className={classes["contact-link"]} href={option.href}>
              <div className={classes["icon-wrapper"]}>
                <img
                  src={`${import.meta.env.BASE_URL}${option.icon}`}
                  alt={option.alt}
                  className={classes["social-icon"]}
                />
              </div>
              <div className={classes["contact-info"]}>
                <span className={classes["contact-label"]}>
                  {translations.contact[option.labelKey]}
                </span>
                <span className={classes["contact-option"]}>
                  {option.display}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className={classes["social-links"]}>
        {socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes["social-link"]}
          >
            <img
              src={`${import.meta.env.BASE_URL}${social.icon}`}
              alt={social.alt}
              className={classes["social-icon"]}
            />
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactOverlay;
