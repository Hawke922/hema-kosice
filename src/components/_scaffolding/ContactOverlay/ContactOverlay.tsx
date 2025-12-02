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
      <h2 className={classes.title}>{translations.contact.title}</h2>
      <p className={classes.subtitle}>{translations.contact.subtitle}</p>

      <ul className={classes["contact-list"]}>
        {contactOptions.map((option) => {
          const labelFromTranslations = option.labelKey
            ? translations.contact[
                option.labelKey as keyof typeof translations.contact
              ]
            : undefined;

          return (
            <li key={option.id} className={classes["contact-item"]}>
              <div className={classes["icon-wrapper"]}>
                <img
                  src={`${import.meta.env.BASE_URL}${option.icon}`}
                  alt={option.alt}
                  className={classes["social-icon"]}
                />
              </div>
              <div className={classes["contact-info"]}>
                {labelFromTranslations && (
                  <span className={classes["contact-label"]}>
                    {labelFromTranslations}
                  </span>
                )}
                <a href={option.href} className={classes["contact-link"]}>
                  {option.display}
                </a>
              </div>
            </li>
          );
        })}
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
